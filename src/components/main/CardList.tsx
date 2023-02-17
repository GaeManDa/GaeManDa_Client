import React from "react";
import Card from "./Card";

const tempData = Array(10)
  .fill("")
  .map((_, idx) => {
    return {
      id: String(idx),
      name: "테스트",
      description: "테스트",
      image: "/assets/pic.png",
    };
  });

const CardList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {tempData.map((data) => (
        <Card key={data.id} {...data} />
      ))}
    </div>
  );
};

export default CardList;
