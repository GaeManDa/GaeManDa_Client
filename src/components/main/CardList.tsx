import React from "react";
import Card from "./Card";

// const tempData = Array(10)
//   .fill("")
//   .map((_, idx) => {
//     return {
//       id: String(idx),
//       name: "테스트",
//       description: "테스트",
//       image: "/assets/pic.png",
//     };
//   });

const CardList = ({data}: any) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {data.map((dat: any) => (
        <Card key={dat.id} {...dat} />
      ))}
    </div>
  );
};

export default CardList;
