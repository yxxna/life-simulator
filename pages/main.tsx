// pages/main.tsx
"use client";

import LifeSimulator from "../components/LifeSimulator";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isFuture = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">📅 오늘 날짜:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) setSelectedDate(date);
          }}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="border px-2 py-1 rounded"
        />
      </div>

      <LifeSimulator selectedDate={selectedDate.toISOString().split("T")[0]} />
    </div>
  );
}
