import COLOR from "@/src/constant/color";
import React from "react";

const Button = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <div
      onClick={onClick}
      className="w-72 h-10 bg-[#DE8481] rounded-2xl flex items-center justify-center text-white"
    >
      {text}
    </div>
  );
};

export default Button;
