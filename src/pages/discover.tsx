import GNB from "../components/global/GNB";
import { usePrediction } from "../utils/hooks/usePrediction";
import { useWebcam } from "../utils/hooks/useWebcam";

export default function Discover() {
  const { webcam, webcamRef } = useWebcam();
  const { rate, loading } = usePrediction(webcam);

  return (
    <div>
      <Progress rate={rate} />
      {rate}
      <br />
      model load: {loading ? "Loading..." : "complete"}
      <br />
      webcam load: {!webcam ? "Loading..." : "complete"}
      <br />
      <div
        className="absolute top-2 right-2 rounded-lg overflow-hidden
        [&>video]:object-cover [&>video]:w-36 [&>video]:h-64"
        ref={webcamRef}
      />
      <GNB />
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
        strokeDashoffset={circumference - (rate / 20) * circumference}
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
