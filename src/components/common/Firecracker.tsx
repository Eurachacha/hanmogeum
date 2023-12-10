import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

interface FirecrackerProps {
  setStyle?: "" | "bigCenter";
  duration?: number;
  onComplete?: () => void;
}

const Firecracker = ({ duration = 2200, setStyle = "", onComplete }: FirecrackerProps) => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (setStyle === "bigCenter") {
    return (
      <ConfettiExplosion
        force={0.8}
        particleCount={250}
        duration={4000}
        width={dimensions.width + 500}
        height={dimensions.height + 500}
        onComplete={onComplete}
      />
    );
  }

  return (
    <ConfettiExplosion
      onComplete={onComplete}
      duration={duration}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default Firecracker;
