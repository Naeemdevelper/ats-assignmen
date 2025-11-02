"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  [
    { word: "Control", color: "#EDC5FC" },
    { word: "Your", color: "#EDC5FC" },
  ],
  [
    { word: "Mind", color: "#FBC5C5" },
    { word: "Manifest", color: "#FBC5C5" },
  ],
  [
    { word: "Your", color: "#C5FCEB" },
    { word: "Reality", color: "#C5FCEB" },
  ],
];

const AboutSection = () => {
  const sectionRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], 
  });

  const startOffset = 0.1;

  const transforms = Array.from({ length: 6 }).map((_, index) => {
    const start = startOffset + index * 0.15; 
    const end = start + 0.2;
    return {
      opacity: useTransform(scrollYProgress, [start, end], [1, 0]),
      x: useTransform(scrollYProgress, [start, end], [0, -100]),
    };
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-[200vh] bg-black text-light flex flex-col items-center justify-center gap-10 py-20"
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex items-center justify-center gap-5">
          {line.map((item, index) => {
            const transformIndex = lineIndex * 2 + index; 
            const { opacity, x } = transforms[transformIndex];

            return (
              <motion.div
                key={index}
                style={{ opacity, x }}
                className="flex items-center gap-3"
              >
                <h1
                  className="text-6xl text-white md:text-8xl font-bold"
                  style={{ fontSize: "clamp(2em, 8vw, 7em)" }}
                >
                  {item.word}
                </h1>
                <div className="rounded-xl border-2 border-black bg-gray-300 p-2 w-[80px] h-[60px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 206 141"
                    className="w-full h-full"
                  >
                    <path
                      stroke={item.color}
                      d="M67.91 87.666c-2.865-4.963 10.055-17.796 28.834-28.638"
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </section>
  );
};

export default AboutSection;
