"use client";
import { useState } from "react";
import EmotionChart from "../components/EmotionChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API = process.env.NEXT_PUBLIC_API_URL || "https://opulent-space-fiesta-94pgrxq6pg5f7xq9-5000.app.github.dev";

export default function Home() {
  const [text, setText] = useState("");
  const [sum, setSum] = useState<any>(null);
  const [emo, setEmo] = useState<any>(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const summarize = async () => {
    setLoadingA(true);
    setSum(null);
    const res = await fetch(`${API}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, max_words: 120 }),
    });
    setSum(await res.json());
    setLoadingA(false);
  };

  const emotion = async () => {
    setLoadingB(true);
    setEmo(null);
    const res = await fetch(`${API}/api/emotion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setEmo(await res.json());
    setLoadingB(false);
  };

  return (
    <main>
      <h1>Transformers Demo</h1>
      <p>Summarization (DistilBART) + Emotion (DistilRoBERTa)</p>

      <div className="grid w-full gap-1.5 mt-4">
        <Label htmlFor="text">Your Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste long text…"
          id="text"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <Button onClick={summarize} disabled={loadingA}>
          {loadingA ? "Summarizing…" : "Summarize"}
        </Button>
        <Button onClick={emotion} disabled={loadingB}>
          {loadingB ? "Detecting Emotion…" : "Detect Emotion"}
        </Button>
      </div>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{sum ? (sum.summary || JSON.stringify(sum, null, 2)) : "—"}</pre>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Emotion</CardTitle>
          </CardHeader>
          <CardContent>
            {emo ? <EmotionChart emotions={emo.probs} /> : "—"}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}