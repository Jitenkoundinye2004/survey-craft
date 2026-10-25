"use client";

import { motion } from "framer-motion";
import React from "react";

export const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`will-change-opacity transform-gpu will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};
