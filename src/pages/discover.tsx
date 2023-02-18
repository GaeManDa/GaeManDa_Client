import { usePrediction } from "../utils/hooks/usePrediction";
import { useWebcam } from "../utils/hooks/useWebcam";
import { useEffect, useState } from "react";
import { Profile } from "../components/discover/Profile";
import { useQuery } from "@tanstack/react-query";
import { getAllDogList, postLikeDog } from "../api/fetchers";
import UserInfoState from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { Dog } from "../types/Dog";

export default function Discover() {
  const { webcam, webcamRef } = useWebcam();
  const { rate, resetRate, start } = usePrediction(webcam);
  const { push } = useRouter();
  const user = useRecoilValue(UserInfoState);
  
  // const { data: dogs } = useQuery({ queryKey: ["dogs"], queryFn: getAllDogList });
  
  
  
  const dogs: Dog[] = [
    { id: "2", name: "밤빵", description: "채널톡 최고 귀요미 밤빵이입니당", picture: "./dogs/2.jpeg"},
    { id: "1", name: "도라", description: "도라는 매우매우 귀엽습니다", picture: "./dogs/1.jpeg"},
    { id: "4", name: "멈뭄미", description: "네모네모 매력에 빠져보세요", picture: "https://mblogthumb-phinf.pstatic.net/MjAxNzA1MTdfMjA0/MDAxNDk1MDIyNjg0NDQz.rg9SYSV_EJ82-XiMuLxlqRWc_DlteLuYKUQnXxfiXwwg.U4YfV0B9V-mkaAIBViGuVu0rBLwgh0ZqcMXNELl0lfAg.JPEG.bichon-haru/IMG_4573.jpg?type=w800"},
    { id: "3", name: "멍뭉이", description: "스팍스 동방에 사는 푹신하고 귀여운 친구입니다", picture: "./dogs/3.jpeg"},
    { id: "5", name: "코기", description: "귀여운 웰시코기", picture: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG"},
  ]
  
  
  const [idx, setIdx] = useState(0);
  
  const [transition, setTransition] = useState(false);
  
  
  useEffect(() => {
    if (rate > 20 || rate < -20) {
      setTransition(true);
      // if (dogs?.[idx]) postLikeDog(dogs[idx].id, user.id)
      resetRate();
      if (dogs?.length && idx + 1 >= dogs.length) {
        push("/main");
      }
    }
  }, [rate, resetRate, setTransition, dogs?.length, idx, push]);
  
  const loadNext = () => {setIdx(idx => idx + 1);};
  
  const onReady = () => {
    setTransition(false);
    start();
  };
  
  if (!dogs) return (<div>Loading</div>);
  
  return (
    <div>
      <Profile
        transition={transition}
        dog={dogs[idx]}
        loadNext={loadNext}
        onReady={onReady}
        className="z-10"
        rate={rate}
      />
      <Profile
        dog={dogs[idx + 1]}
        className="z-0"
        rate={0}
      />
      
      <div
        className="absolute top-2 right-2 rounded-lg overflow-hidden drop-shadow-xl z-20
        [&>video]:object-cover [&>video]:w-36 [&>video]:h-64 [&>video]:scale-x-[-1]"
        ref={webcamRef}
      />
    </div>
  );
}

