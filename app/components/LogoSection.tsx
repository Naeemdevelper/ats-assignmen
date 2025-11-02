"use client";

import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import circlesAnimation from "@/public/circlesv3.json"; 

export default function ScrollLottieSection() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!lottieRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - windowHeight;

  
      const scrollProgress = Math.min(scrollTop / docHeight, 1);


      const totalFrames = lottieRef.current.getDuration(true) || 0;
      const frame = totalFrames * scrollProgress;

   
      lottieRef.current.goToAndStop(frame, true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[100vh] bg-black flex flex-col justify-center items-center">
    

      <div className=" top-1/2 -translate-y-1/2">
        <Lottie
          lottieRef={lottieRef}
          animationData={circlesAnimation}
          loop={false} 
          autoplay={false} 
          style={{ width: 1000, height: 1000 }}
        />
      </div>
    </section>
  );
}
