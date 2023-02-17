import { Webcam } from "@teachablemachine/image";
import { useEffect, useRef, useState } from "react";
import { isIOS } from "../isIOS";

export const useWebcam = (size?: number) => {
  const webcamRef = useRef<HTMLDivElement>(null);
  const [webcam, setWebcam] = useState<Webcam | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState("");
  
  useEffect(() => {
    const initWebcam = async () => {
      const _webcam = new Webcam(size, size, true);
      await _webcam.setup();
      
      setMsg(webcamRef.current?.tagName || "ERROR");
      webcamRef.current?.appendChild(_webcam.webcam);
      // if (isIOS()) {
      const webCamVideo = document.getElementsByTagName("video")[0];
      try {
        webCamVideo.setAttribute("playsinline", "playsinline");
        webCamVideo.muted = true;
        webCamVideo.style.width = `${size}px`;
        webCamVideo.style.height = `${size}px`;
      } catch (e) {
        setMsg(msg => msg + (e as Error).message);
      }
      // }
      
      await _webcam.play();
      return _webcam;
    };
    if (!webcam) initWebcam()
      .then(setWebcam)
      .catch(setError);
    return () => webcam?.stop();
  }, [setWebcam, setError, webcam, size]);
  
  return { webcam, error, webcamRef, msg };
};
