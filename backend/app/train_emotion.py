from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
from sklearn.metrics import accuracy_score, f1_score
import numpy as np, random


MODEL_NAME  = "distilroberta-base"               
OUTPUT_DIR  = "app/models/emotion-roberta-demo"   
MAX_LENGTH  = 128
NUM_EPOCHS  = 2           
LR          = 2e-5
BATCH_TRAIN = 16
BATCH_EVAL  = 32
SEED        = 42

random.seed(SEED); np.random.seed(SEED)


KEEP = ["anger","disgust","fear","joy","sadness","surprise","neutral"]


raw = load_dataset("go_emotions")


label_names = raw["train"].features["labels"].feature.names
keep_ids = [label_names.index(x) for x in KEEP]

def pick_single_label(example):

    kept = [lid for lid in example["labels"] if lid in keep_ids]
    if len(kept) == 0:
        example["use"] = 0
        example["label"] = -1
    else:
        example["use"] = 1
        example["label"] = keep_ids.index(kept[0])  # map to 0..len(KEEP)-1
    return example

raw = raw.map(pick_single_label)
raw = raw.filter(lambda x: x["use"] == 1)
raw = raw.remove_columns(["id","labels","use"])


raw["train"]       = raw["train"].shuffle(seed=SEED).select(range(min(6000, len(raw["train"]))))
raw["validation"]  = raw["validation"].shuffle(seed=SEED).select(range(min(1000, len(raw["validation"]))))

num_labels = len(KEEP)
id2label = {i: KEEP[i] for i in range(num_labels)}
label2id = {v: k for k, v in id2label.items()}


tok = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize(batch):
    return tok(batch["text"], truncation=True, padding="max_length", max_length=MAX_LENGTH)

tokenized = raw.map(tokenize, batched=True)
tokenized = tokenized.rename_column("label", "labels")
tokenized.set_format(type="torch", columns=["input_ids","attention_mask","labels"])


model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=num_labels,
    id2label=id2label,
    label2id=label2id
)


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {
        "accuracy": accuracy_score(labels, preds),
        "f1_macro": f1_score(labels, preds, average="macro"),
    }


args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    learning_rate=LR,
    per_device_train_batch_size=BATCH_TRAIN,
    per_device_eval_batch_size=BATCH_EVAL,
    num_train_epochs=NUM_EPOCHS,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1_macro",
    report_to=[],  # no wandb/tensorboard
    seed=SEED,
)


trainer = Trainer(
    model=model,
    args=args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["validation"],
    tokenizer=tok,
    compute_metrics=compute_metrics
)

trainer.train()
trainer.save_model(OUTPUT_DIR)
tok.save_pretrained(OUTPUT_DIR)

print("\nSaved fine-tuned model to:", OUTPUT_DIR)
print("Label mapping:", id2label)
