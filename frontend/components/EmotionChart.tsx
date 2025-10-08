'use client';
import styles from './EmotionChart.module.css';

interface Emotion {
  label: string;
  score: number;
}

interface EmotionChartProps {
  emotions: Emotion[];
}

const emotionColors: { [key: string]: string } = {
  joy: "hsl(var(--chart-1))",
  sadness: "hsl(var(--chart-2))",
  anger: "hsl(var(--chart-3))",
  surprise: "hsl(var(--chart-4))",
  neutral: "hsl(var(--muted-foreground))",
  fear: "hsl(var(--chart-5))",
  disgust: "hsl(var(--destructive))",
};

export default function EmotionChart({ emotions }: EmotionChartProps) {
  if (!emotions || emotions.length === 0) {
    return null;
  }

  const topEmotion = emotions[0];

  return (
    <div>
      <p>
        Top Emotion: {topEmotion.label} (
        {Math.round(topEmotion.score * 100)}%)
      </p>
      <div className={styles.chartContainer}>
        {emotions.map((emotion) => (
          <div key={emotion.label} className={styles.emotionRow}>
            <div className={styles.label}>{emotion.label}</div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{
                  width: `${emotion.score * 100}%`,
                  backgroundColor:
                    emotionColors[emotion.label.toLowerCase()] || "black",
                }}
              ></div>
            </div>
            <div className={styles.percentage}>
              {Math.round(emotion.score * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}