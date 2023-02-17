import { Webcam } from "@teachablemachine/image";
import { useEffect, useState } from "react";

export const useWebcam = (size?: number) => {
  const [webcam, setWebcam] = useState<Webcam | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const initWebcam = async () => {
      const _webcam = new Webcam(size, size, true);
      await _webcam.setup();
      await _webcam.play();
      return _webcam;
    };
    if (!webcam) initWebcam()
      .then(setWebcam)
      .catch(setError);
    return () => webcam?.stop();
  }, [setWebcam, setError, webcam, size]);
  
  return { webcam, error };
};
