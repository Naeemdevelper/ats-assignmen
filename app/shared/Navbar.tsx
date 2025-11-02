"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const Navbar: React.FC = () => {
  const menuItems = ["How it Works", "Mission", "Contact"];


  const parentVariants: Variants = {
    rest: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
    hover: {
      transition: { staggerChildren: 0.04, staggerDirection: 1 },
    },
  };

  const letterVariants: Variants = {
    rest: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      y: -24,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full mx-auto mt-4 max-w-fit px-10 py-3 flex justify-center items-center shadow-lg transition-all duration-300 hover:bg-white/15">
        <ul className="flex justify-center gap-10">
          {menuItems.map((item, idx) => {
            const chars = item.split("");
            return (
              <motion.li
                key={idx}
                className="relative cursor-pointer overflow-hidden text-white font-medium text-lg py-1"
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={parentVariants}
              >
                {chars.map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={letterVariants}
                    aria-hidden={ch === " "}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
