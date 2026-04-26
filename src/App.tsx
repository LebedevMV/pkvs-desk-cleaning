import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScaledContainer from "./components/ScaledContainer";
import TitleSlide from "./components/TitleSlide";
import ComparisonSlide from "./components/ComparisonSlide";
import EndSlide from "./components/EndSlide";
import { slides } from "./config/slides";

type Screen = "title" | "slides" | "end";

const pageVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.6,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("title");
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleStart = () => {
    setDirection(1);
    setSlideIndex(0);
    setScreen("slides");
  };

  const handlePrev = () => {
    if (slideIndex === 0) {
      setDirection(-1);
      setScreen("title");
    } else {
      setDirection(-1);
      setSlideIndex((i) => i - 1);
    }
  };

  const handleNext = () => {
    if (slideIndex === slides.length - 1) {
      setDirection(1);
      setScreen("end");
    } else {
      setDirection(1);
      setSlideIndex((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setDirection(1);
    setSlideIndex(0);
    setScreen("title");
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <ScaledContainer>
        <AnimatePresence mode="wait" custom={direction}>
          {screen === "title" && (
            <motion.div
              key="title"
              className="absolute inset-0"
              variants={pageVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <TitleSlide onStart={handleStart} />
            </motion.div>
          )}

          {screen === "slides" && (
            <motion.div
              key="slides"
              className="absolute inset-0"
              variants={pageVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <ComparisonSlide
                slide={slides[slideIndex]}
                currentIndex={slideIndex}
                totalSlides={slides.length}
                direction={direction}
                onPrev={handlePrev}
                onNext={handleNext}
                onHome={handleRestart}
              />
            </motion.div>
          )}

          {screen === "end" && (
            <motion.div
              key="end"
              className="absolute inset-0"
              variants={pageVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
            >
              <EndSlide onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </ScaledContainer>
    </div>
  );
}
