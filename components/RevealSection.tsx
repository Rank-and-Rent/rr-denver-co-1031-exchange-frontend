"use client";

import { motion } from "framer-motion";
import React from "react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
  delay?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className,
  as = "section",
  delay = 0,
}) => {
  const motionProps = {
    className,
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  };

  switch (as) {
    case "div":
      return <motion.div {...motionProps}>{children}</motion.div>;
    case "section":
      return <motion.section {...motionProps}>{children}</motion.section>;
    case "article":
      return <motion.article {...motionProps}>{children}</motion.article>;
    case "header":
      return <motion.header {...motionProps}>{children}</motion.header>;
    case "footer":
      return <motion.footer {...motionProps}>{children}</motion.footer>;
    case "main":
      return <motion.main {...motionProps}>{children}</motion.main>;
    default:
      return <motion.section {...motionProps}>{children}</motion.section>;
  }
};

