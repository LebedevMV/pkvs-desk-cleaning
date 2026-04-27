import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";
import type { SlideConfig } from "../config/slides";

function useTypewriter(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

interface ComparisonSlideProps {
  slide: SlideConfig;
  currentIndex: number;
  totalSlides: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
}

const imageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.96,
  }),
};

export default function ComparisonSlide({
  slide,
  currentIndex,
  totalSlides,
  direction,
  onPrev,
  onNext,
  onHome,
}: ComparisonSlideProps) {
  const { displayed: typedCaption, done: typingDone } = useTypewriter(slide.caption);

  return (
    <div className="w-[1920px] h-[1080px] bg-white flex flex-col" style={{ padding: 100 }}>
      {/* Top row: photo + logo */}
      <div className="flex gap-[100px]" style={{ height: 780 }}>
        {/* Photo slider */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              variants={imageVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              <BeforeAfterSlider
                beforeImage={slide.beforeImage}
                afterImage={slide.afterImage}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-start cursor-pointer" style={{ width: 239 }} onClick={onHome}>
          <img
            src="/assets/logos/LOGO_BBR.svg"
            alt="BBR"
            style={{ width: 239, height: 236 }}
          />
        </div>
      </div>

      {/* Bottom row: caption + navigation */}
      <div className="flex justify-between items-end flex-1" style={{ gap: 40 }}>
        {/* Caption — typewriter */}
        <p
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-semibold text-[#a0cd45] m-0 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontSize: 64, lineHeight: 1, marginLeft: -4, flex: "1 1 0", minWidth: 0 }}
        >
          {typedCaption}
          <span
            className="inline-block w-[3px] h-[1em] ml-[0px] translate-y-[0.15em]"
            style={{
              backgroundColor: typingDone ? "transparent" : "#a0cd45",
              animation: typingDone ? "none" : "blink 0.7s steps(1) infinite",
            }}
          />
        </p>

        {/* Navigation */}
        <div className="flex items-center flex-shrink-0" style={{ gap: 10 }}>
          <button
            onClick={onPrev}
            className="bg-[#a0cd45] rounded-full flex items-center justify-center cursor-pointer hover:brightness-110 active:scale-90 transition-all border-none"
            style={{ width: 60, height: 60 }}
            aria-label="Предыдущий"
          >
            <img
              src="/assets/logos/arrow-icon.svg"
              alt=""
              className="rotate-90"
              style={{ width: 34, height: 35 }}
            />
          </button>

          <span
            className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] text-[#a0cd45] text-[24px] text-center whitespace-nowrap"
            style={{ minWidth: 80 }}
          >
            {currentIndex + 1} из {totalSlides}
          </span>

          <button
            onClick={onNext}
            className="bg-[#a0cd45] rounded-full flex items-center justify-center cursor-pointer hover:brightness-110 active:scale-90 transition-all border-none"
            style={{ width: 60, height: 60 }}
            aria-label="Следующий"
          >
            <img
              src="/assets/logos/arrow-icon.svg"
              alt=""
              className="-rotate-90"
              style={{ width: 34, height: 35 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
