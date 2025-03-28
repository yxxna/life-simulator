import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 화면은 항상 먼저 보여짐. 클릭 시 정보 수집 페이지로 이동
  }, []);

  const handleStart = () => {
    localStorage.removeItem("user-info"); // 초기화 필요 시 삭제
    router.push("/userinfo");
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">🎮 생존 시뮬레이터에 오신 것을 환영합니다!</h1>
      <p>당신의 삶을 시뮬레이션할 준비가 되셨나요?</p>
      <button onClick={handleStart} className="bg-black text-white px-4 py-2 rounded-xl">
        👉 시작하기
      </button>
    </div>
  );
}
