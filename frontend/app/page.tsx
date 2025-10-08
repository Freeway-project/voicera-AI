"use client";
import { useState } from "react";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [text, setText] = useState("");
  const [sum, setSum] = useState<any>(null);
  const [emo, setEmo] = useState<any>(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const summarize = async () => {
    setLoadingA(true); setSum(null);
    const res = await fetch(`${API}/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, max_words: 120 }),
    });
    setSum(await res.json());
    setLoadingA(false);
  };

  const emotion = async () => {
    setLoadingB(true); setEmo(null);
    const res = await fetch(`${API}/api/emotion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setEmo(await res.json());
    setLoadingB(false);
  };

  const box = { background:"#f6f8fa", padding:12 as const, borderRadius:8, whiteSpace:"pre-wrap" as const };

  return (
    <main style={{maxWidth:900, margin:"40px auto", padding:16, fontFamily:"system-ui,sans-serif"}}>
      <h1>Transformers Demo</h1>
      <p>Summarization (DistilBART) + Emotion (DistilRoBERTa)</p>

      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Paste long text…" 
        style={{width:"100%", minHeight:160, padding:10, marginTop:12}} />

      <div style={{display:"flex", gap:12, marginTop:12}}>
        <button onClick={summarize} disabled={loadingA} style={{padding:"10px 16px"}}>
          {loadingA ? "Summarizing…" : "Summarize"}
        </button>
        <button onClick={emotion} disabled={loadingB} style={{padding:"10px 16px"}}>
          {loadingB ? "Detecting Emotion…" : "Detect Emotion"}
        </button>
      </div>

      <section style={{marginTop:24}}>
        <h3>Summary</h3>
        <pre style={box}>{sum ? (sum.summary || JSON.stringify(sum, null, 2)) : "—"}</pre>
      </section>

      <section style={{marginTop:24}}>
        <h3>Emotion</h3>
        <pre style={box}>{emo ? JSON.stringify(emo, null, 2) : "—"}</pre>
      </section>
    </main>
  );
}
