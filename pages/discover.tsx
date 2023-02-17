import { usePrediction } from "../utils/hooks/usePrediction";

export default function Discover() {
  const { rate } = usePrediction();
  
  return (
    <div>
      <Progress rate={rate}/>
      {rate}
    </div>
  );
}

interface ProgressProps {
  rate: number;
  radius?: number;
}

function Progress({ rate, radius = 30 }: ProgressProps) {
  const circumference = 2 * Math.PI * radius;
  
  return (
    <svg className="w-20 h-20">
      <circle
        style={{ transition: "stroke-dashoffset .2s" }}
        className="text-blue-600"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - rate / 20 * circumference}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="40"
        cy="40"
      />
    </svg>
  );
}