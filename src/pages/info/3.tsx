import UserInfoState from "@/src/atoms/UserInfoAtom";
import Button from "@/src/components/global/Button";
import Header from "@/src/components/global/Header";
import { ANSWER, QUESTION } from "@/src/constant/question";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const Info3 = () => {
  const [info, setInfo] = useRecoilState(UserInfoState);
  const [active, setActive] = useState([true, true, true, true]);
  const { push } = useRouter();

  const handleClick = (idx: number, type: boolean) => {
    let temp = [...active];

    temp[idx] = type;

    setActive(temp);
  };

  const handleSubmit = () => {
    let temp = "";
    active.forEach((i, idx) => {
      if (i) {
        temp += ANSWER[idx][0];
      } else {
        temp += ANSWER[idx][1];
      }
    });

    setInfo({
      ...info,
      dogMbti: temp,
    });

    console.log(temp);
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header text="회원가입" isBack />
      <div className="h-full pt-16 px-6 flex flex-col items-center justify-center">
        <p className="w-full text-2xl font-extrabold text-[#242424]">
          반려견의 정보를 입력해주세요
        </p>
        <div className="flex grow flex-col gap-6 w-full my-12">
          {QUESTION.map((question, idx) => (
            <>
              <p>{question}</p>
              <div className="flex w-full items-center justify-around gap-4">
                <div
                  onClick={() => handleClick(idx, true)}
                  className={active[idx] ? ActiveTab : InactiveTab}
                >
                  예
                </div>
                <div
                  onClick={() => handleClick(idx, false)}
                  className={!active[idx] ? ActiveTab : InactiveTab}
                >
                  아니오
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex items-center justify-center h-10 my-8">
          <Button onClick={handleSubmit} text="완료하기" />
        </div>
      </div>
    </div>
  );
};

const ActiveTab =
  "w-full h-10 bg-[#DE8481] text-white flex font-semibold items-center justify-center rounded-2xl";
const InactiveTab =
  "w-full h-10 bg-[#d4c4c4] text-white flex font-semibold items-center justify-center rounded-2xl";

export default Info3;
