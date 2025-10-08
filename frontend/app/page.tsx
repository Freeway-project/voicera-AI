"use client";
import { useState } from "react";
import EmotionChart from "../components/EmotionChart";
import VoiceInput from "../components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const handleVoiceTranscript = (transcript: string) => {
    setText(transcript);
  };

  return (
    <main>
      <h1>Transformers Demo</h1>
      <p>Summarization (DistilBART) + Emotion (DistilRoBERTa)</p>

      <Tabs defaultValue="text" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="voice">Voice</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="text">Your Text</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste long text…"
              id="text"
            />
          </div>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label>Voice Recording</Label>
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <VoiceInput onTranscript={handleVoiceTranscript} />
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Click the microphone to start recording your voice
              </p>
            </div>
            {text && (
              <div className="mt-4">
                <Label>Transcribed Text</Label>
                <Textarea value={text} readOnly className="mt-2" />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-4">
        <Button onClick={summarize} disabled={loadingA || !text}>
          {loadingA ? "Summarizing…" : "Summarize"}
        </Button>
        <Button onClick={emotion} disabled={loadingB || !text}>
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