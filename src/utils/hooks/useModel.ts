import { useEffect, useState } from "react";
import * as TMImage from "@teachablemachine/image";

export const useModel = (url: string) => {
  const [model, setModel] = useState<TMImage.CustomMobileNet | null>(null);
  
  useEffect(() => {
    TMImage
      .load(`${url}/model.json`, `${url}/metadata.json`)
      .then(setModel);
  }, [url]);
  
  return { model };
};
