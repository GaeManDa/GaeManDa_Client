import React from "react";
import GNB from "../../components/global/GNB";
import CardList from "../../components/main/CardList";
import Header from "@/src/components/global/Header";

const main = () => {
  return (
    <>
      <Header isLogo text="" />
      <p className="pt-12 text-2xl font-semibold w-full pl-6">
        <span className=" text-[#DE8481] text-3xl">{"누구누구"}</span>가{" "}
        <span className=" text-[#DE8481]">좋다고</span> 한 반려견들이에요
      </p>
      <div className="h-full w-full pt-6 pb-52 bg-[#f8fbff] overflow-y-scroll scrollbar-hide">
        <CardList />
        <GNB />
      </div>
    </>
  );
};

export default main;
