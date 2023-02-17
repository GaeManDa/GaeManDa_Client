import { BackArrowIcon } from "@/src/icons/global";
import { useRouter } from "next/router";
import React from "react";
import Logo from "./Logo";

const Header = ({
  text,
  isBack = false,
  isLogo,
}: {
  text: string;
  isBack?: boolean;
  isLogo?: boolean;
}) => {
  const { back } = useRouter();
  return (
    <div className="absolute top-0 z-50 w-full h-10 flex items-center justify-center bg-white">
      {isLogo ? (
        <Logo />
      ) : (
        isBack && (
          <BackArrowIcon
            onClick={() => {
              back();
            }}
          />
        )
      )}
      {text}
    </div>
  );
};

export default Header;
