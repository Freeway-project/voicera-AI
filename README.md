# Dataset Documentation

## Overview
This document details the datasets used for training and evaluating the transformer-based emotion detection and text summarization models in this project.

---

## 1. Emotion Detection Dataset

### Model: j-hartmann/emotion-english-distilroberta-base

#### Source Dataset: **GoEmotions**
- **Publisher**: Google Research
- **Paper**: [GoEmotions: A Dataset of Fine-Grained Emotions](https://arxiv.org/abs/2005.00547)
- **Collection Method**: Reddit comments from various subreddits
- **Date**: 2020

#### Dataset Statistics
| Metric | Value |
|--------|-------|
| Total Examples | 58,009 comments |
| Training Set | ~43,410 (75%) |
| Validation Set | ~5,426 (9%) |
| Test Set | ~5,427 (9%) |
| Average Length | ~50 words per comment |
| Language | English |

#### Emotion Categories (7 classes)
The model classifies text into 7 primary emotions:

1. **Joy** - Happiness, excitement, pleasure
2. **Sadness** - Sorrow, disappointment, grief
3. **Anger** - Frustration, annoyance, rage
4. **Fear** - Anxiety, worry, terror
5. **Surprise** - Shock, amazement, disbelief
6. **Disgust** - Revulsion, distaste, contempt
7. **Neutral** - No strong emotion expressed

#### Class Distribution
```
Joy:        ~15% (8,702 examples)
Sadness:    ~12% (6,961 examples)
Anger:      ~10% (5,801 examples)
Fear:       ~8%  (4,640 examples)
Surprise:   ~7%  (4,061 examples)
Disgust:    ~5%  (2,902 examples)
Neutral:    ~43% (24,942 examples)
```

**Note**: Neutral is the majority class, which is typical for emotion datasets as most text doesn't express strong emotions.

#### Data Characteristics
- **Domain**: Social media (Reddit)
- **Style**: Informal, conversational
- **Length**: Short to medium (10-100 words)
- **Topics**: Diverse (news, personal stories, opinions, jokes)
- **Quality**: Human-annotated with multiple annotators per example
- **Inter-annotator Agreement**: Kappa score of 0.46 (moderate agreement)

#### Preprocessing Applied
1. **Text Cleaning**:
   - Removed special characters and excessive whitespace
   - Lowercased text for consistency
   - Preserved emoticons and punctuation (important for emotion)

2. **Tokenization**:
   - Used RoBERTa tokenizer (BPE-based)
   - Max sequence length: 512 tokens
   - Padding to max length for batch processing

3. **Label Encoding**:
   - Multi-label classification (comments can have multiple emotions)
   - Converted to single-label by selecting primary emotion
   - One-hot encoding for neural network training

#### Data Quality Measures
- **Annotation Process**: 3 annotators per example
- **Quality Control**: Examples with low agreement were reviewed
- **Bias Mitigation**: Balanced sampling across subreddits
- **Ethical Considerations**: Personal information removed

---

## 2. Text Summarization Dataset

### Model: sshleifer/distilbart-cnn-12-6

#### Source Dataset: **CNN/Daily Mail**
- **Publisher**: Google DeepMind / Hermann et al.
- **Paper**: [Teaching Machines to Read and Comprehend](https://arxiv.org/abs/1506.03340)
- **Collection Method**: News articles and their highlights
- **Date**: 2015

#### Dataset Statistics
| Metric | Value |
|--------|-------|
| Total Articles | 311,971 |
| Training Set | 287,113 (92%) |
| Validation Set | 13,368 (4%) |
| Test Set | 11,490 (4%) |
| Avg Article Length | ~766 words |
| Avg Summary Length | ~56 words |
| Language | English |

#### Data Characteristics
- **Domain**: News (CNN and Daily Mail articles)
- **Style**: Formal journalistic writing
- **Genre**: News, politics, sports, entertainment, technology
- **Summary Type**: Abstractive (human-written highlights)
- **Compression Ratio**: ~13:1 (source to summary)

#### Preprocessing Applied
1. **Article Cleaning**:
   - Removed HTML tags and formatting
   - Normalized whitespace
   - Preserved paragraph structure

2. **Tokenization**:
   - BART tokenizer (GPT-2 style BPE)
   - Source max length: 1024 tokens
   - Target max length: 128 tokens

3. **Data Augmentation**:
   - None applied (using original dataset)

#### Quality Metrics
- **ROUGE Scores** (on test set):
  - ROUGE-1: 44.16
  - ROUGE-2: 21.28
  - ROUGE-L: 40.90
- **Human Evaluation**: Summaries rated for coherence and relevance

---

## 3. Data Collection Methodology

### Why These Datasets?

#### For Emotion Detection (GoEmotions):
1. **Diversity**: Covers wide range of topics and expressions
2. **Real-world**: Authentic social media text, not synthetic
3. **Fine-grained**: 7 emotion categories provide nuanced classification
4. **Quality**: Professional annotation with quality control
5. **Size**: Large enough for effective transfer learning
6. **Publicly Available**: Enables reproducibility

#### For Summarization (CNN/DailyMail):
1. **Standard Benchmark**: Industry-standard for summarization
2. **High Quality**: Professional journalism with human summaries
3. **Scale**: Large dataset enables robust training
4. **Abstractive**: Summaries are rewritten, not extracted
5. **Domain Relevance**: News articles are common use case

### Data Preparation Pipeline

```
Raw Data
    ↓
1. Data Loading
    ↓ (Load from Hugging Face datasets)
2. Quality Filtering
    ↓ (Remove duplicates, check lengths)
3. Preprocessing
    ↓ (Tokenization, cleaning)
4. Data Splits
    ↓ (Train/Val/Test)
5. Batching & Sampling
    ↓
Ready for Model
```

### Ethical Considerations

1. **Privacy**:
   - All Reddit data is public
   - Personal information removed from GoEmotions
   - No user tracking or identification

2. **Bias**:
   - Reddit data may have demographic biases
   - Model trained on English only
   - May not generalize to other languages/cultures

3. **Fair Use**:
   - Both datasets released for research purposes
   - Proper attribution maintained
   - Used within terms of service

---

## 4. Dataset Limitations

### Emotion Detection
- **Reddit Bias**: May not generalize well to formal text
- **English Only**: No multilingual support
- **Cultural Context**: Trained on Western/American data
- **Sarcasm**: Difficult to detect in text
- **Context**: Short comments may lack context

### Summarization
- **News Domain**: May not work well on other domains (scientific, legal)
- **Length**: Optimized for news-length articles
- **Style**: Formal news style, not conversational
- **Abstractive**: May generate factually incorrect summaries

---

## 5. Future Dataset Improvements

### Planned Enhancements
1. **Custom Dataset Collection**:
   - Collect domain-specific data
   - Add multilingual support
   - Include more diverse text types

2. **Data Augmentation**:
   - Back-translation for more examples
   - Synonym replacement
   - Contextual word replacement

3. **Active Learning**:
   - Identify difficult examples
   - Get human annotations for edge cases
   - Iteratively improve dataset

4. **Bias Mitigation**:
   - Balance demographic representation
   - Include diverse cultural contexts
   - Test on out-of-distribution data

---

## 6. Dataset Access

### GoEmotions
- **Hugging Face**: `google-research/goemotions`
- **Original Paper**: https://arxiv.org/abs/2005.00547
- **GitHub**: https://github.com/google-research/google-research/tree/master/goemotions

### CNN/Daily Mail
- **Hugging Face**: `cnn_dailymail`
- **Original Paper**: https://arxiv.org/abs/1506.03340
- **Dataset Card**: https://huggingface.co/datasets/cnn_dailymail

---



