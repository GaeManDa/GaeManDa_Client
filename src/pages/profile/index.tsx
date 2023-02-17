import React from "react";

import { useRouter } from "next/router";
import GNB from "@/src/components/global/GNB";
import ProfileImage from "@/src/components/global/ProfileImage";
import Header from "@/src/components/global/Header";

const Profile = () => {
  const { query } = useRouter();

  return (
    <div>
      <Header isLogo text="" />
      <div className="pt-12 px-2 flex items-center justify-center h-full w-full flex-col gap-4">
        <ProfileImage />
        <h1 className=" font-bold text-3xl ">{"도라"}</h1>
        <p>생일: {"2022-11-22"}</p>
        <p className=" font-normal text-md text-gray-500">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida tortor velit, id gravida nisi posuere vitae. Maecenas at velit neque. Cras mi sapien, mattis in velit eget, lobortis elementum enim. Sed sollicitudin, orci ac eleifend molestie, dolor "
          }
        </p>
        <p>{"Male" ? "♂" : "♀"}</p>
      </div>
      <GNB />
    </div>
  );
};

export default Profile;
