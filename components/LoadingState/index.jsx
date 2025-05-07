import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkle, NoTakeAway } from "../assets";

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
}

const LoadingState = ({ title = "Loading", subtitle = "" }: LoadingStateProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#10131A]">
      <div className="bg-[#282C3A] p-5 rounded-[12px] text-white">
        <div className="flex gap-3 mb-2">
          <Image src={Sparkle} alt="Sparkle" width={20} height={20} />
          <p className="font-medium">{title}</p>
        </div>
        {subtitle && (
          <div className="text-center mb-4">
            <p className="text-[14px] text-gray-300">{subtitle}</p>
          </div>
        )}
        <div className="flex justify-center items-center flex-col">
          <Image
            src={NoTakeAway}
            alt="Loading"
            width={48}
            height={48}
            className="animate-spin mb-2"
          />
          <p className="text-[14px] text-gray-300">
            Scanning through snapshots{dots}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
