// components/UserInfoForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface UserInfo {
  nickname: string;
  gender: string;
  age: number;
  exercise: string;
  meals: string;
  stress: string;
  smoking: string;
  alcohol: string;
  job: string;
  sleep: string;
  healthCheck: string;
  mentalHealth: string;
  social: string;
}

const defaultData: UserInfo = {
  nickname: "",
  gender: "",
  age: 25,
  exercise: "",
  meals: "",
  stress: "",
  smoking: "",
  alcohol: "",
  job: "",
  sleep: "",
  healthCheck: "",
  mentalHealth: "",
  social: "",
};

export default function UserInfoForm() {
  const [form, setForm] = useState<UserInfo>(defaultData);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("user-info");
    if (saved) {
      router.replace("/main");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem("user-info", JSON.stringify(form));
    setSubmitted(true);
    setTimeout(() => {
      router.replace("/main");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">🧍 사용자 정보 입력</h1>

      {submitted ? (
        <p className="text-green-600">✅ 저장되었습니다!</p>
      ) : (
        <Card>
          <CardContent className="space-y-4">
            <div>
              <label>별명: </label>
              <input type="text" name="nickname" value={form.nickname} onChange={handleChange} className="border rounded px-2 py-1" />
            </div>

            <div>
              <label>성별: </label>
              <select name="gender" value={form.gender} onChange={handleChange} className="border rounded px-2 py-1">
                <option value="">선택</option>
                <option>남성</option>
                <option>여성</option>
                <option>논바이너리</option>
                <option>선택 안 함</option>
              </select>
            </div>

            <div>
              <label>나이: </label>
              <input type="number" name="age" value={form.age} onChange={handleChange} min={1} max={100} className="border rounded px-2 py-1" />
            </div>

            <div>
              <label>운동 빈도: </label>
              <select name="exercise" value={form.exercise} onChange={handleChange} className="border rounded px-2 py-1">
                <option>전혀 안 함</option>
                <option>가끔</option>
                <option>보통</option>
                <option>자주</option>
                <option>거의 매일</option>
              </select>
            </div>

            <div>
              <label>하루 식사 횟수: </label>
              <select name="meals" value={form.meals} onChange={handleChange} className="border rounded px-2 py-1">
                <option>1일 1식</option>
                <option>1일 2식</option>
                <option>1일 3식</option>
                <option>끼니 자주 거름</option>
              </select>
            </div>

            <div>
              <label>스트레스 수준: </label>
              <select name="stress" value={form.stress} onChange={handleChange} className="border rounded px-2 py-1">
                <option>전혀 없음</option>
                <option>가끔 있음</option>
                <option>자주 느낀다</option>
                <option>매우 높음</option>
              </select>
            </div>

            <div>
              <label>흡연 여부: </label>
              <select name="smoking" value={form.smoking} onChange={handleChange} className="border rounded px-2 py-1">
                <option>비흡연자</option>
                <option>과거 흡연자</option>
                <option>가끔 흡연</option>
                <option>매일 흡연</option>
              </select>
            </div>

            <div>
              <label>음주 빈도: </label>
              <select name="alcohol" value={form.alcohol} onChange={handleChange} className="border rounded px-2 py-1">
                <option>전혀 안 마심</option>
                <option>월 1~2회</option>
                <option>주 1~2회</option>
                <option>주 3회 이상</option>
                <option>거의 매일</option>
              </select>
            </div>

            <div>
              <label>일의 형태: </label>
              <select name="job" value={form.job} onChange={handleChange} className="border rounded px-2 py-1">
                <option>사무직</option>
                <option>판매직</option>
                <option>물류/운송</option>
                <option>건설/운동선수</option>
              </select>
            </div>

            <div>
              <label>수면 시간: </label>
              <select name="sleep" value={form.sleep} onChange={handleChange} className="border rounded px-2 py-1">
                <option>4시간 이하</option>
                <option>5~6시간</option>
                <option>7~8시간</option>
                <option>9시간 이상</option>
              </select>
            </div>

            <div>
              <label>정기 건강검진 여부: </label>
              <select name="healthCheck" value={form.healthCheck} onChange={handleChange} className="border rounded px-2 py-1">
                <option>매년 1회 이상</option>
                <option>2년 1회</option>
                <option>5년 1회 이하</option>
                <option>거의 안 받음</option>
              </select>
            </div>

            <div>
              <label>정신 건강 상태: </label>
              <select name="mentalHealth" value={form.mentalHealth} onChange={handleChange} className="border rounded px-2 py-1">
                <option>건강함</option>
                <option>가끔 불안/우울</option>
                <option>상담 또는 치료 중</option>
              </select>
            </div>

            <div>
              <label>사회적 관계 만족도: </label>
              <select name="social" value={form.social} onChange={handleChange} className="border rounded px-2 py-1">
                <option>매우 만족</option>
                <option>적당히 만족</option>
                <option>외로움 느낀다</option>
                <option>거의 없음</option>
              </select>
            </div>

            <Button onClick={handleSubmit} className="mt-2">✅ 저장하기</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
