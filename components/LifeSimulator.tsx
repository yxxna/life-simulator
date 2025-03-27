"use client";

import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function LifeSimulator() {
  const [life, setLife] = useState(87.6);
  const [log, setLog] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);

  const choices = [
    {
      question: "🌅 아침 습관은?",
      options: [
        { label: "A. 핸드폰 1시간 보다 일어남", effect: -1 },
        { label: "B. 스트레칭 5분 하기", effect: +1 },
        { label: "C. 5시간 자고 일어나기", effect: -2 },
      ],
    },
    {
      question: "🚬 스트레스 해소 방법은?",
      options: [
        { label: "A. 담배 피움", effect: -3 },
        { label: "B. 참고 일함", effect: -1 },
        { label: "C. 산책하거나 음악 듣기", effect: +1 },
      ],
    },
    {
      question: "🏃 퇴근 후 루틴은?",
      options: [
        { label: "A. 소파에서 유튜브", effect: -1 },
        { label: "B. 스트레칭 + 물 마시기", effect: +1 },
        { label: "C. 산책 + 하루 정리하기", effect: +2 },
      ],
    },
    {
      question: "🍟 저녁 식사는?",
      options: [
        { label: "A. 치킨 + 맥주", effect: -2 },
        { label: "B. 김밥 + 음료수", effect: -1 },
        { label: "C. 샐러드 + 닭가슴살", effect: +2 },
      ],
    },
    {
      question: "🧘 하나만 바꾼다면?",
      options: [
        { label: "A. 담배 끊기", effect: +6 },
        { label: "B. 수면 7시간 확보", effect: +3 },
        { label: "C. 운동 주 3회", effect: +2 },
      ],
    },
  ];

  const handleChoice = (option: { label: string; effect: number }) => {
    setLife((prev) => prev + option.effect);
    setLog((prev) => [...prev, `${option.label} → ${option.effect > 0 ? "+" : ""}${option.effect}년`]);
    setReport(null);
  };

  const generateReport = () => {
    const negatives = log.filter((entry) => entry.includes("-")).length;
    const positives = log.filter((entry) => entry.includes("+")).length;
    const total = log.length;

    const reportText = `이번 주 Yuna의 습관 리포트 📝

` +
      `✅ 긍정적인 선택: ${positives}회
` +
      `⚠️ 부정적인 선택: ${negatives}회
` +
      `📊 전체 선택 수: ${total}회

` +
      (positives > negatives
        ? "🎉 좋은 습관이 더 많았어요! 계속 유지해봐요."
        : "💡 나쁜 습관이 살짝 많았어요. 하나씩만 바꿔봐요!");

    setReport(reportText);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">🎮 YUNA: 생존의 기술</h1>
      <p className="text-center">당신의 현재 생존 예상 나이: <strong>{life.toFixed(1)}세</strong></p>

      {choices.map((choice, i) => (
        <Card key={i}>
          <CardContent className="space-y-2 p-4">
            <p className="font-semibold">{choice.question}</p>
            <div className="grid gap-2">
              {choice.options.map((option, j) => (
                <Button key={j} variant="outline" onClick={() => handleChoice(option)}>
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-bold">📝 선택 로그</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
          <Button className="mt-4" onClick={generateReport}>
            📊 습관 리포트 생성하기
          </Button>
          {report && (
            <div className="mt-4 bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
              {report}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}