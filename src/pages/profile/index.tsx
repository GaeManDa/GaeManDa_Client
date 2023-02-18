import React from "react";

import { useRouter } from "next/router";
import GNB from "@/src/components/global/GNB";
import ProfileImage from "@/src/components/global/ProfileImage";
import Header from "@/src/components/global/Header";
import { useRecoilState } from "recoil";
import UserInfoState from "@/src/atoms/UserInfoAtom";
import { useQuery } from "@tanstack/react-query";
import { getDogDetail } from "@/src/api/fetchers";

const Profile = () => {
  const { query } = useRouter();
  const [info, setInfo] = useRecoilState(UserInfoState)
  const dogQuery = useQuery(['dogInfo', info.token], () => getDogDetail(info.token, info.token))

  if(dogQuery.isLoading){
    return <div> loading.. . .</div>
  }

  return (
    <div>
      <Header isLogo text="" />
      <div className="pt-12 px-2 flex items-center justify-center h-full w-full flex-col gap-4">
        <ProfileImage />
        <h1 className=" font-bold text-3xl ">{dogQuery.data.name}</h1>
        <p>생일: {dogQuery.data.birth}</p>
        <p className=" font-normal text-md text-gray-500">
          {
            dogQuery.data.description
          }
        </p>
        <p>{dogQuery.data.gender === "Male" ? "♂" : "♀"}</p>
      </div>
      <GNB />
    </div>
  );
};

export default Profile;
