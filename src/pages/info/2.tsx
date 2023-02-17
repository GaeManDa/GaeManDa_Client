import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AWS from "aws-sdk";

import { useRecoilState } from "recoil";

import UserInfoState from "@/src/atoms/UserInfoAtom";
import Header from "@/src/components/global/Header";

import Button from "@/src/components/global/Button";

const region = "ap-northeast-2";
const bucket = "channel-gaemanda";

AWS.config.update({
  region: region,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const Information2 = () => {
  const { query, push } = useRouter();

  const [info, setInfo] = useRecoilState(UserInfoState);

  const handleChange = (e: any) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderClick = (value: string) => {
    setInfo({
      ...info,
      gender: value,
    });
  };

  const handleIsNeutralClick = (value: boolean) => {
    setInfo({
      ...info,
      isNeutered: value,
    });
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header text="회원가입" isBack />
      <div className="h-full pt-16 px-6 flex flex-col items-center justify-center">
        <p className="w-full text-2xl font-extrabold text-[#242424]">
          반려견의 정보를 입력해주세요
        </p>
        <div className="flex grow flex-col gap-6 w-full my-12">
          <p>반려견의 성별을 입력해주세요.</p>
          <div className="flex w-full items-center justify-around gap-4">
            <div
              onClick={() => handleGenderClick("Male")}
              className={info.gender === "Male" ? ActiveTab : InactiveTab}
            >
              남성
            </div>
            <div
              onClick={() => handleGenderClick("Female")}
              className={info.gender === "Female" ? ActiveTab : InactiveTab}
            >
              여성
            </div>
          </div>

          <p>반려견의 무게를 입력해주세요.</p>
          <input
            name="weight"
            onChange={handleChange}
            value={info.weight}
            placeholder="Ex. 43"
            className="w-full h-10 rounded-md  bg-slate-100 text-black pl-4"
          />
          <p>반려견을 키를 입력해주세요</p>
          <input
            name="height"
            onChange={handleChange}
            value={info.height}
            placeholder="Ex. 100"
            className="w-full h-10 rounded-md  bg-slate-100 text-black pl-4"
          />
          <p>반려견의 중성화 여부를 입력해주세요.</p>
          <div className="flex w-full items-center justify-around gap-4">
            <div
              onClick={() => handleIsNeutralClick(true)}
              className={info.isNeutered ? ActiveTab : InactiveTab}
            >
              예
            </div>
            <div
              onClick={() => handleIsNeutralClick(false)}
              className={!info.isNeutered ? ActiveTab : InactiveTab}
            >
              아니오
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-10 my-8">
          <Button
            onClick={() => {
              push(`/info/3?id=${query.id}`);
            }}
            text="완료하기"
          />
        </div>
      </div>
    </div>
  );
};

const ActiveTab =
  "w-full h-10 bg-[#DE8481] text-white flex font-semibold items-center justify-center rounded-2xl";
const InactiveTab =
  "w-full h-10 bg-[#d4c4c4] text-white flex font-semibold items-center justify-center rounded-2xl";

export default Information2;
