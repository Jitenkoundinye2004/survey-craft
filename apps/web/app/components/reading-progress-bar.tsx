"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

export const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-1 origin-left transform-gpu bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600"
    />
  );
};
