"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto w-full pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-mono text-accent text-sm tracking-widest uppercase"
          >
            — portfolio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-text-primary leading-tight"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-text-muted text-lg sm:text-xl max-w-xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t("cta_work")}
              <ArrowDown size={16} />
            </a>
            <a
              href="/cv-ania-sk.pdf"
              download
              className="inline-flex items-center gap-2 border border-border hover:border-accent text-text-primary hover:text-accent text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t("cta_cv")}
              <FileDown size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
