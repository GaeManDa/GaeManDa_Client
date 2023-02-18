import React from "react";
import GNB from "../../components/global/GNB";
import CardList from "../../components/main/CardList";
import Header from "@/src/components/global/Header";
import { getAllDogList, getDogDetail, getLikedDogList } from "@/src/api/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import UserInfoState from "@/src/atoms/UserInfoAtom";

const Main = () => {
  const dogListQuery = useQuery(["dogList"], getAllDogList);
  const [info, setInfo] = useRecoilState(UserInfoState)
  const dogQuery = useQuery(['dogInfo', info.token], () => getDogDetail(info.token, info.token))
  if (dogListQuery.isLoading) {
    return <div> Loading </div>;
  }

  return (
    <>
      <Header isLogo text="" />
      <p className="pt-12 text-xl font-semibold w-full pl-1">
        <span className=" text-[#DE8481] text-3xl">{dogQuery?.data?.name}</span>(이)한테{" "}
        <span className=" text-[#DE8481]">관심</span>이 있는 반려견들이에요
      </p>
      <div className="h-full w-full pt-6 pb-52 bg-[#f8fbff] overflow-y-scroll scrollbar-hide">
        <CardList data={dogListQuery.data?.filter((dog) => dog.name !== dogQuery?.data?.name)} />
        <GNB />
      </div>
    </>
  );
};

export default Main;
