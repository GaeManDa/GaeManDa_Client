import { CenterIcon, HomeIcon, ProfileIcon } from "@/src/icons/global";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const GNB = () => {
  const { pathname, push } = useRouter();

  return (
    <div className="w-full px-8 pb-3 absolute z-30 bottom-0 flex items-center justify-around ">
      {/* <img className="absolute z-1 bottom-0" src="/assets/Union.png" /> */}
      <Link
        className="z-30"
        href={"/main"}
        // onClick={() => {
        //   push("/main");
        // }}
      >
        <HomeIcon isActive={pathname === "/main"} />
      </Link>
      <Link
        className="z-30"
        href={"/discover"}
        prefetch
        // onClick={() => {
        //   push("/discover");
        // }}
      >
        <CenterIcon onClick={() => {}} />
      </Link>
      <Link
        className="z-30"
        href={"/profile"}
        // onClick={() => {
        //   push("/profile");
        // }}
      >
        <ProfileIcon isActive={pathname === "/profile"} />
      </Link>
      <div className="absolute z-20 bg-white bottom-0 w-full h-20 border-solid border-2 border-gray" />
    </div>
  );
};

export default GNB;
