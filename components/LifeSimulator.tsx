// components/LifeSimulator.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

// props 타입 정의
type LifeSimulatorProps = {
  selectedDate: string;
};

const choices = [
  {
    time: "morning",
    question: "☀️ 아침에 무엇을 했나요?",
    options: [
      { label: "A. 물 한 잔 마심", effect: +1 },
      { label: "B. 스트레칭 5분", effect: +1 },
      { label: "C. 아무것도 안 함", effect: -1 },
    ],
  },
  {
    time: "lunch",
    question: "🌿 점심 직후 어떤 활동을 했나요?",
    options: [
      { label: "A. 산책 5분", effect: +1 },
      { label: "B. 커피 마심", effect: 0 },
      { label: "C. 바로 앉아 일함", effect: -1 },
    ],
  },
  {
    time: "evening",
    question: "🌙 저녁에 무엇을 했나요?",
    options: [
      { label: "A. 기름진 음식 섭취", effect: -2 },
      { label: "B. 가벼운 스트레칭", effect: +1 },
      { label: "C. 운동 30분", effect: +2 },
    ],
  },
];

export default function LifeSimulator({ selectedDate }: LifeSimulatorProps) {
  const [life, setLife] = useState(87.6);
  const [log, setLog] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("habit-" + selectedDate);
    if (saved) setLog(JSON.parse(saved));
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("habit-" + selectedDate, JSON.stringify(log));
  }, [log, selectedDate]);

  const handleSelect = (option: { label: string; effect: number }) => {
    setLog((prev) => [...prev, `${option.label} → ${option.effect > 0 ? "+" : ""}${option.effect}년`]);
    setLife((prev) => Math.round((prev + option.effect) * 10) / 10);
  };

  const getFeedback = () => {
    const good = log.filter((l) => l.includes("+")).length;
    const bad = log.filter((l) => l.includes("-")).length;
    const total = log.length;

    if (good > bad) {
      return `🎉 좋은 습관이 더 많았어요! 계속 유지해봐요.`;
    } else if (bad > 0) {
      return `⚠️ 안 좋은 습관이 더 많아요. 내일은 더 좋은 선택을 해봐요.`;
    } else {
      return `기록이 없어요.`;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">🧬 Yuna의 생존 시뮬레이터</h2>
      <p className="text-lg">당신의 현재 생존 예상 나이: <b>{life.toFixed(1)}세</b></p>

      {choices.map((choice, i) => (
        <Card key={i}>
          <CardContent className="space-y-2 py-4">
            <p className="font-semibold">{choice.question}</p>
            <div className="flex gap-2 flex-wrap">
              {choice.options.map((opt, j) => (
                <Button key={j} variant="outline" onClick={() => handleSelect(opt)}>
                  {opt.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        <h3 className="font-semibold text-md">📋 선택 로그</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t pt-4 text-sm">
        <p>이번 날 선택 리포트 📆 {selectedDate}</p>
        <p>{getFeedback()}</p>
      </div>
    </div>
  );
}
