import { usePrediction } from "../utils/hooks/usePrediction";
import { useWebcam } from "../utils/hooks/useWebcam";
import { useEffect, useState } from "react";
import { Profile } from "../components/discover/Profile";
import { useQuery } from "@tanstack/react-query";
import { getAllDogList } from "../api/fetchers";

export default function Discover() {
  const { webcam, webcamRef } = useWebcam();
  const { rate, resetRate, start } = usePrediction(webcam);
  
  const query = useQuery({queryKey: "dogs", queryFn: getAllDogList});
  
  const [dog, setDog] = useState({
    id: 1,
    name: "도라",
    birth: "2021-01-01",
    picture: "https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwZG9nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    description: "댕댕이",
    breed: "푸들",
    gender: "남",
  });
  const [nextDog, setNextDog] = useState({
    id: 1,
    name: "도라",
    birth: "2021-01-01",
    picture: "https://www.purina.co.uk/sites/default/files/2020-11/Working%20Dogs%20Everything%20You%20Need%20to%20KnowTEASER.jpeg",
    description: "댕댕이",
    breed: "푸들",
    gender: "남",
  });
  
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
  
  const loadNext = () => {
    setDog(nextDog);
    setNextDog({
      id: 1,
      name: "도라",
      birth: "2021-01-01",
      picture: "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",
      description: "스팍스 부회장 dora의 강아지에용",
      breed: "푸들",
      gender: "남",
    });
  };
  
  const onReady = () => {
    setTransition(false);
    start();
  }
  
  // useEffect(onReady);
  
  return (
    <div>
      {/*<Progress rate={rate}/>*/}
      
      <Profile
        transition={transition}
        dog={dog}
        loadNext={loadNext}
        onReady={onReady}
        className="z-10"
        rate={rate}
      />
       <Profile
        dog={nextDog}
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

