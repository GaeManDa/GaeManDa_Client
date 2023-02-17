import { BackArrowIcon } from "@/src/icons/global";
import React from "react";

const Header = ({
  text,
  isBack = false,
}: {
  text: string;
  isBack?: boolean;
}) => {
  return (
    <div className="absolute top-0 z-50 w-full h-10 flex items-center justify-center bg-white">
      {isBack && <BackArrowIcon onClick={() => {}} />}
      {text}
    </div>
  );
};

export default Header;
