import { Webcam } from "@teachablemachine/image";
import { useEffect, useRef, useState } from "react";

export const useWebcam = (size: number = 400) => {
  const webcamRef = useRef<HTMLDivElement>(null);
  const [webcam, setWebcam] = useState<Webcam | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const initWebcam = async () => {
      console.log("init webcam")
      const _webcam = new Webcam(size, size, true);
      await _webcam.setup();
      
      if (!webcamRef.current?.children.length) {
        webcamRef.current?.appendChild(_webcam.webcam);
        const webCamVideo = document.getElementsByTagName("video")[0];
        webCamVideo.setAttribute("playsinline", "playsinline");
        webCamVideo.muted = true;
      }
      
      await _webcam.play();
      return _webcam;
    };
    
    if (!webcam) initWebcam()
      .then(setWebcam)
      .catch(setError);
    return () => webcam?.stop();
  }, [setWebcam, setError, webcam, size]);
  
  return { webcam, error, webcamRef };
};
