"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ModalAnimateProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAnimate({
  children,
  isOpen,
  onClose,
}: ModalAnimateProps) {
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        variants={contentVariants}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
