import dynamic from "next/dynamic";
const UserInfoForm = dynamic(() => import("../components/UserInfoForm"), { ssr: false });

export default function UserInfoPage() {
  return <UserInfoForm />;
}
