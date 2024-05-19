import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../PageHeader";

const loadingContainer = {
  minWidth: "4rem",
  minHeight: "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const loadingCircle = {
  display: "block",
  minWidth: "3vh",
  minHeight: "3vh",
  backgroundColor: "black",
  borderRadius: "50%",
  marginTop: "5vh",
};

const loadingText = {
  display: "block",
  margin: "0 0.1rem",
  marginTop: "-25vh",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.8,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

const circleTransition = {
  duration: 0.3,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut",
};

interface ThreeDotsWaveProps {
  text: string;
}

export default function ThreeDotsWave({ text }: ThreeDotsWaveProps) {
  const loadingTextArray = text.split("");

  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      {loadingTextArray.map((letter, index) => (
        <motion.span
          key={index}
          style={loadingText}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        >
          {<PageHeader text={letter} />}
        </motion.span>
      ))}
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={`dot-${index}`}
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={circleTransition}
          // Add a non-breaking space as content to ensure the circles are rendered
          children="&nbsp;"
        />
      ))}
    </motion.div>
  );
}
