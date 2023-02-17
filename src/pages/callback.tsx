import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Callback = () => {
  const { query, isReady, push } = useRouter();

  const getAuthInfo = async () => {
    const kakao_response = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${query.code}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const kakao_user_info = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${kakao_response.data.access_token}`,
        },
      }
    );

    push(`/info?id=${kakao_user_info.data.id}`);
  };

  useEffect(() => {
    if (isReady) {
      getAuthInfo();
    }
  }, [isReady]);

  return <div className="h-full w-full animate-pulse"></div>;
};

export default Callback;
