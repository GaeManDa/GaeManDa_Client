import { useRouter } from "next/router";
import React from "react";

const Card = ({
  id,
  name,
  description,
  image,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
}) => {
  const { push } = useRouter();

  const handleClick = (id: string) => {
    push(`/profile/${id}`);
  };

  return (
    <div
      onClick={() => {
        handleClick(id);
      }}
      className="w-[90%]"
    >
      <div className="flex border-solid border-2 border-gray p-4 rounded-2xl bg-white">
        <img src={image} className="w-14 h-14 mr-6 rounded-full" />
        <div className="flex flex-col items-start justify-center gap-2">
          <p className=" text-xl font-bold">{name}</p>
          <p className=" font-light text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
