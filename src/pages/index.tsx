import { useRouter } from "next/router";
import { KakaoLoginIcon, MainLogo, PawIcon } from "../icons/global";

export default function Home() {
  const { push } = useRouter();

  const handleClick = () => {
    push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`
    );
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-between py-16">
      <MainLogo />
      <PawIcon />
      <KakaoLoginIcon onClick={handleClick} />
    </div>
  );
}
