import type { Dog } from "../../types/Dog";
import { Progress } from "./Progress";

interface Props {
  transition?: boolean;
  dog: Dog | undefined;
  className?: string;
  loadNext?: () => void;
  onReady?: () => void;
  rate: number;
}

export function Profile({
  transition,
  className,
  dog,
  loadNext,
  onReady,
  rate,
}: Props) {
  
  if (!dog) return <div className="absolute top-0 left-0 w-full h-screen bg-black"/>
  
  return (
    <div
      className={`${transition ? "animate-slide" : ""}
      absolute top-0 left-0 w-full h-screen object-cover
      ${className}
    `}
      onAnimationEnd={loadNext}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dog.picture}
        alt="dog"
        onLoad={onReady}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 z-50
      bg-gradient-to-t from-black w-full h-48 p-8
      flex flex-row justify-between
      ">
        <div>
          <div className="text-white font-bold text-5xl mt-4">{dog.name}</div>
          <div className="text-white font-light text-lg">{dog.description}</div>
        </div>
        <Progress
          rate={rate}
        />
      </div>
    </div>
  );
  
}
