import { useState, useRef, useCallback } from "react";
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

const SWIPE_THRESHOLD = 50;

export default function App() {
  const [screen, setScreen] = useState<Screen>("title");
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleStart = () => {
    setDirection(1);
    setSlideIndex(0);
    setScreen("slides");
  };

  const handlePrev = useCallback(() => {
    if (screen === "end") {
      setDirection(-1);
      setSlideIndex(slides.length - 1);
      setScreen("slides");
    } else if (screen === "slides") {
      if (slideIndex === 0) {
        setDirection(-1);
        setScreen("title");
      } else {
        setDirection(-1);
        setSlideIndex((i) => i - 1);
      }
    }
  }, [screen, slideIndex]);

  const handleNext = useCallback(() => {
    if (screen === "title") {
      handleStart();
    } else if (screen === "slides") {
      if (slideIndex === slides.length - 1) {
        setDirection(1);
        setScreen("end");
      } else {
        setDirection(1);
        setSlideIndex((i) => i + 1);
      }
    }
  }, [screen, slideIndex]);

  const handleRestart = () => {
    setDirection(1);
    setSlideIndex(0);
    setScreen("title");
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) handleNext();
    else handlePrev();
  };

  const bgColor = screen === "slides" ? "#ffffff" : "#a0cd45";

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ScaledContainer bgColor={bgColor}>
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
