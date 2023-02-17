import { usePrediction } from "../utils/hooks/usePrediction";
import { useWebcam } from "../utils/hooks/useWebcam";
import { useEffect, useState } from "react";
import { Profile } from "../components/discover/Profile";
import { useQuery } from "@tanstack/react-query";
import { getAllDogList, getLikedDogList } from "../api/fetchers";
import UserInfoState from "../atoms/UserInfoAtom";
import { useRecoilValue } from "recoil";

export default function Discover() {
  const { webcam, webcamRef } = useWebcam();
  const { rate, resetRate, start } = usePrediction(webcam);
  
  const user = useRecoilValue(UserInfoState);
  
  const { data: dogs } = useQuery({ queryKey: ["dogs"], queryFn: () => getLikedDogList(user.id) });
  
  const [idx, setIdx] = useState(0);

  const [transition, setTransition] = useState(false);
  
  const next = () => {
    setTransition(true);
  };
  
  useEffect(() => {
    if (rate > 20 || rate < -20) {
      next();
      resetRate();
    }
  }, [rate, resetRate]);
  
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
      
      
      <div className="absolute bottom-0 left-0 z-50">
        qwer
        <button className="z-40" onClick={next}>next</button>
      </div>
      
      
      <div
        className="absolute top-2 right-2 rounded-lg overflow-hidden drop-shadow-xl z-20
        [&>video]:object-cover [&>video]:w-36 [&>video]:h-64 [&>video]:scale-x-[-1]"
        ref={webcamRef}
      />
    </div>
  );
}

