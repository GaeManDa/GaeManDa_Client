import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AWS from "aws-sdk";
import { CameraIcon } from "../icons/global";
import { UserInfo } from "../types/UserInfo";
import Header from "../components/global/Header";
import COLOR from "../constant/color";

const region = "ap-northeast-2";
const bucket = "channel-gaemanda";

AWS.config.update({
  region: region,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const Information = () => {
  const { query, push } = useRouter();
  const [image, setImage] = useState("");
  const { info, setInfo } = useState({
    id: "",
    name: "",
    address: "",
    birth: "",
    picture: "",
    description: "",
    breed: "",
    gender: "",
    age: 0,
    weight: 0,
    height: 0,
  });
  const inputRef = useRef(null);

  const compressImage = async (
    file: any,
    { quality = 1, type = file.type }
  ) => {
    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    //@ts-ignore
    ctx.drawImage(imageBitmap, 0, 0);
    return await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );
  };

  const handleImageUpload = async (e: any) => {
    let compressedImage = await compressImage(e.target.files[0], {
      quality: 0.2,
      type: "image/jpeg",
    });
    console.log(compressedImage);
    console.log(e.target.files[0]);
    // setImage(e.target.files[0]);
    //@ts-ignore
    setImage(compressedImage);
  };

  const handleClick = async () => {
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: `${info.id}-${info.name}`,
        Body: image,
      },
    });
    upload.promise().then((res: any) => {
      console.log(res.Location);
      // TodoSubmitMutation.mutate(res.Location);
    });
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) {
      return;
    }
    //@ts-ignore
    inputRef.current.click();
  };

  useEffect(() => {
    preview();
  }, [image]);

  const preview = () => {
    if (!image) return false;

    const imgEL = document.querySelector("#img__box");
    const reader = new FileReader();
    if (imgEL) {
      reader.onload = () =>
        //@ts-ignore
        (imgEL.style.backgroundImage = `url(${reader.result})`);
      //@ts-ignore
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="w-full h-full">
      <Header text="회원가입" isBack />
      <div className="pt-16 px-6 flex flex-col items-center justify-center">
        <p className="w-full text-2xl font-extrabold text-[#242424]">
          반려견의 정보를 입력해주세요
        </p>
        <div className="grow">
          {image ? (
            <div
              id="img__box"
              className="w-[300px] h-[300px] bg-cover rounded-2xl bg-center"
            />
          ) : (
            <div
              onClick={onUploadImageButtonClick}
              className="w-[300px] h-[300px] flex items-center justify-center bg-[#f4f4f4] rounded-2xl z-10"
            >
              <CameraIcon />
              <input
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Information;