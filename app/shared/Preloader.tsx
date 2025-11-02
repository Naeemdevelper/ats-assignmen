"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const line1 = "Welcome to the";
  const line2 = [
    { text: "Revolution", color: "#4f148a" }, 
    { text: "of", color: "#000000" },         
    { text: "Accounting", color: "#ed7525" }, 
  ]

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#e7dfdf] z-[9999] overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: 4.5, duration: 0.8, ease: "easeInOut" }}
    >

      <motion.h1
        className="text-4xl md:text-7xl font-bold text-black mb-4 text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {line1}
      </motion.h1>
 
      <motion.h1
        className="text-3xl md:text-6xl font-bold flex flex-wrap justify-center text-center gap-x-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {line2.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex">
            {word.text.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                style={{ color: word.color }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 0.6,
                  delay: 1.2 + (wordIndex * 0.3 + charIndex * 0.05),
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Preloader;
