import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AWS from "aws-sdk";

import { useRecoilState } from "recoil";

import UserInfoState from "@/src/atoms/UserInfoAtom";
import Header from "@/src/components/global/Header";
import { CameraIcon } from "@/src/icons/global";
import Button from "@/src/components/global/Button";

const region = "ap-northeast-2";
const bucket = "channel-gaemanda";

AWS.config.update({
  region: region,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const Information1 = () => {
  const { query, push } = useRouter();
  const [image, setImage] = useState("");
  const [info, setInfo] = useRecoilState(UserInfoState);
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
      setInfo({
        ...info,
        picture: res.Location,
      });
      push(`/info/2?id=${query.id}`);
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

  const handleChange = (e: any) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full h-full">
      <Header text="회원가입" isBack />
      <div className="h-full pt-16 px-6 flex flex-col items-center ">
        <p className="w-full text-2xl font-extrabold text-[#242424]">
          반려견의 정보를 입력해주세요
        </p>
        <div className="w-full mt-10">
          <p>반려견의 이름을 입력해주세요.</p>
          <input
            name="name"
            onChange={handleChange}
            value={info.name}
            placeholder="Ex. 댕댕이"
            className="w-full h-10 rounded-md  bg-slate-100 text-black pl-4 mt-2"
          />
        </div>
        <div className="flex items-center justify-center py-10">
          {image ? (
            <div
              id="img__box"
              className="w-[150px] h-[150px] bg-cover rounded-2xl bg-center"
            />
          ) : (
            <div
              onClick={onUploadImageButtonClick}
              className="w-[150px] h-[150px] flex items-center justify-center bg-[#f4f4f4] rounded-2xl z-10"
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
        <div className="flex flex-col gap-4 w-full mb-6">
          <p>반려견의 생일을 입력해주세요.</p>
          <input
            name="birth"
            onChange={handleChange}
            value={info.birth}
            placeholder="Ex. YYYY-MM-DD"
            className="w-full h-10 rounded-md  bg-slate-100 text-black pl-4"
          />
          <p>반려견을 간략하게 설명해주세요</p>
          <input
            name="description"
            onChange={handleChange}
            value={info.description}
            placeholder="Ex. 우리 반려견은 똑똑하고 착합니다..."
            className="w-full h-10 rounded-md  bg-slate-100 text-black pl-4"
          />
        </div>
        <div className="flex items-center justify-center h-10 my-8">
          <Button
            onClick={() => {
              if (info.name && info.birth && info.description) {
                // handleClick();
                push(`/info/2?id=${query.id}`);
              }
            }}
            text="다음으로"
          />
        </div>
      </div>
    </div>
  );
};

export default Information1;
