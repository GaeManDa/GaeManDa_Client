interface ProgressProps {
  rate: number;
  radius?: number;
}

export function Progress({ rate, radius = 46 }: ProgressProps) {
  const circumference = 2 * Math.PI * radius;
  
  return (
    <svg className="w-28 h-28" viewBox="-12 -12 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_37_295)">
        <circle cx="43.5" cy="39.5" r="37.5" fill="white" fillOpacity="0.35" shapeRendering="crispEdges"/>
      </g>
      <circle
        style={{ transition: "stroke-dashoffset .2s" }}
        className={rate > 0 ? "text-green-600" : "text-red-600"}
        strokeWidth="6"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - rate / 20 * circumference}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="43.5"
        cy="39.5"
      />
      <path
        d="M58.1606 47.4406C56.9806 40.3806 50.2006 34.6406 43.0406 34.6406C35.2606 34.6406 28.4206 40.9406 27.7606 48.7006C27.5006 51.7006 28.4606 54.5406 30.4406 56.6806C32.4006 58.8206 35.1606 60.0006 38.1606 60.0006H47.5206C50.9006 60.0006 53.8606 58.6806 55.8806 56.3006C57.9006 53.9206 58.7006 50.7606 58.1606 47.4406Z"
        fill="white"/>
      <path
        d="M40.5592 31.72C43.7956 31.72 46.4192 29.0964 46.4192 25.86C46.4192 22.6236 43.7956 20 40.5592 20C37.3228 20 34.6992 22.6236 34.6992 25.86C34.6992 29.0964 37.3228 31.72 40.5592 31.72Z"
        fill="white"/>
      <path
        d="M53.88 34.0569C56.5752 34.0569 58.76 31.872 58.76 29.1769C58.76 26.4817 56.5752 24.2969 53.88 24.2969C51.1848 24.2969 49 26.4817 49 29.1769C49 31.872 51.1848 34.0569 53.88 34.0569Z"
        fill="white"/>
      <path
        d="M61.0992 41.8626C63.2532 41.8626 64.9992 40.1164 64.9992 37.9624C64.9992 35.8086 63.2532 34.0625 61.0992 34.0625C58.9454 34.0625 57.1992 35.8086 57.1992 37.9624C57.1992 40.1164 58.9454 41.8626 61.0992 41.8626Z"
        fill="white"/>
      <path
        d="M27.88 37.9632C30.5751 37.9632 32.76 35.7783 32.76 33.0831C32.76 30.388 30.5751 28.2031 27.88 28.2031C25.1849 28.2031 23 30.388 23 33.0831C23 35.7783 25.1849 37.9632 27.88 37.9632Z"
        fill="white"/>
      <defs>
        <filter id="filter0_d_37_295" x="0" y="0" width="87" height="87" filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_295"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_295" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
}
