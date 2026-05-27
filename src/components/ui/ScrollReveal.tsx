"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight";
  duration?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  variant = "slideUp",
  duration = 0.6,
  delay = 0,
}: ScrollRevealProps) {
  // Definicje różnych stylów animacji do wyboru
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true, // Animacja odpali się tylko raz (przy pierwszym scrollu)
        amount: 0.15, // Odrzut/aktywacja, gdy 15% sekcji pojawi się na ekranie
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Elegancki, customowy easing (easeOutCubic)
      }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
