import { useCallback, useEffect, useState } from "react";

import { useModel } from "./useModel";
import type { Webcam } from "@teachablemachine/image";

interface Prediction {
  className: string;
  probability: number;
}

export const usePrediction = (webcam: Webcam | null) => {
  const { model } = useModel("./model");
  
  const [rate, setRate] = useState(0);
  const MAX = 20;
  
  const deltaRate = useCallback((delta: number) =>
    setRate(rate => Math.min(Math.max(rate + delta, -MAX), MAX))
  , []);
  
  useEffect(() => {
    if (!(model && webcam)) return;
    
    const interval = setInterval(async () => {
      webcam.update();
      const prediction = (await model.predict(webcam.canvas)).at(0);
      
      if (!prediction) return;
      const delta = prediction.probability > 0.5 ? 1 : -1;
      deltaRate(delta);
    }, 100);
    
    return () => clearInterval(interval);
  }, [model, webcam, deltaRate]);
  
  return {
    loading: !model,
    rate,
  };
};
