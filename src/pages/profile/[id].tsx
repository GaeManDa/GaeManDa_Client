import GNB from "@/src/components/global/GNB";
import Header from "@/src/components/global/Header";
import ProfileImage from "@/src/components/global/ProfileImage";
import { useRouter } from "next/router";
import React from "react";

const Detail = () => {
  const { query } = useRouter();
  return (
    <div>
      <Header isLogo text="" />
      <div className=" pt-12 flex items-center justify-center h-full w-full flex-col gap-4">
        <ProfileImage />
        <h1 className=" font-bold text-3xl ">{"도라"}</h1>
      </div>
      <GNB />
    </div>
  );
};

export default Detail;
