"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function LifeSimulator() {
  const [life, setLife] = useState(87.6);
  const [log, setLog] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);

  useEffect(() => {
    const today = getToday();
    const saved = localStorage.getItem("habit-" + today);
    if (saved) setLog(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const today = getToday();
    localStorage.setItem("habit-" + today, JSON.stringify(log));
  }, [log]);

  const choices = [
    {
      question: "☀️ 아침 습관은?",
      options: [
        { label: "A. 핸드폰 1시간 보다 일어남", effect: -1 },
        { label: "B. 스트레칭 5분 하기", effect: +1 },
        { label: "C. 5시간 자고 일어나기", effect: -2 },
      ],
    },
    {
      question: "🧘 스트레스 해소 방법은?",
      options: [
        { label: "A. 담배 피움", effect: -3 },
        { label: "B. 참고 일함", effect: -1 },
        { label: "C. 산책하거나 음악 듣기", effect: +1 },
      ],
    },
  ];

  const handleSelect = (option: { label: string; effect: number }) => {
    setLife((prev) => prev + option.effect);
    setLog((prev) => [...prev, option.label]);
  };

  const generateReport = () => {
    const positive = log.filter((l) => l.includes("+"));
    const negative = log.filter((l) => l.includes("-")).length;
    setReport(
      `이번 주 Yuna의 습관 리포트 📗\n✅ 긍정적인 선택: ${positive.length}회  ⚠️ 부정적인 선택: ${negative}회  📊 전체 선택 수: ${log.length}회`
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">🎮 YUNA: 생존의 기술</h1>
      <p>당신의 현재 생존 예상 나이: <b>{life.toFixed(1)}세</b></p>

      {choices.map((q, i) => (
        <Card key={i}>
          <CardContent>
            <p className="font-medium mb-2">{q.question}</p>
            <div className="space-x-2">
              {q.options.map((o, j) => (
                <Button key={j} onClick={() => handleSelect(o)}>
                  {o.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        <h2 className="font-bold mt-6">📝 선택 로그</h2>
        <ul className="list-disc list-inside">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
        <Button onClick={generateReport} className="mt-2">📊 습관 리포트 생성하기</Button>
        {report && <p className="mt-2 whitespace-pre-line">{report}</p>}
      </div>
    </div>
  );
}