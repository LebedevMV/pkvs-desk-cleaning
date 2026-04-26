import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { titleSlide } from "../config/slides";

interface TitleSlideProps {
  onStart: () => void;
}

// "Будет чисто до утра, если в деле " + "два" + " бобра" → strike "два" → type " 13"
const BEFORE = "Будет чисто до утра, если в деле ";
const STRIKE_WORD = "два";
const AFTER_INITIAL = " бобра";
const INSERT = " 13";

type Phase = "typing" | "pause" | "striking" | "inserting" | "done";

function useSubheadingAnimation(startDelay = 1200, typeSpeed = 45) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [strikeProgress, setStrikeProgress] = useState(0); // 0 to 1
  const [insertTyped, setInsertTyped] = useState("");

  const fullInitial = BEFORE + STRIKE_WORD + AFTER_INITIAL;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    // Phase 1: wait then type full initial text
    timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setTyped(fullInitial.slice(0, i));
        if (i >= fullInitial.length) {
          clearInterval(timer);
          setPhase("pause");
        }
      }, typeSpeed);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [fullInitial, startDelay, typeSpeed]);

  useEffect(() => {
    if (phase !== "pause") return;
    const timeout = setTimeout(() => setPhase("striking"), 500);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "striking") return;
    const duration = 300;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setStrikeProgress(p);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase("inserting");
      }
    };
    requestAnimationFrame(animate);
  }, [phase]);

  useEffect(() => {
    if (phase !== "inserting") return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setInsertTyped(INSERT.slice(0, i));
      if (i >= INSERT.length) {
        clearInterval(timer);
        setPhase("done");
      }
    }, typeSpeed * 3);
    return () => clearInterval(timer);
  }, [phase, typeSpeed]);

  return { typed, phase, strikeProgress, insertTyped, fullInitial };
}

export default function TitleSlide({ onStart }: TitleSlideProps) {
  const { typed, phase, strikeProgress, insertTyped } = useSubheadingAnimation();

  const showCursor = phase !== "done";
  const isStruck = phase === "striking" || phase === "inserting" || phase === "done";

  // Build the rendered text
  const renderSubheading = () => {
    if (typed.length <= BEFORE.length) {
      // Still typing the "before" part
      return (
        <>
          {typed}
        </>
      );
    }

    const afterBeforeTyped = typed.slice(BEFORE.length);
    if (afterBeforeTyped.length <= STRIKE_WORD.length) {
      // Typing the strike word
      return (
        <>
          {BEFORE}
          {afterBeforeTyped}
        </>
      );
    }

    // Strike word is fully typed, rest is AFTER_INITIAL
    const afterPart = afterBeforeTyped.slice(STRIKE_WORD.length);

    return (
      <>
        {BEFORE}
        <span className="relative inline-block">
          {STRIKE_WORD}
          {isStruck && (
            <span
              className="absolute left-0 h-[3px] bg-white"
              style={{
                top: "60%",
                width: `${strikeProgress * 100}%`,
                transition: phase === "striking" ? "none" : undefined,
              }}
            />
          )}
        </span>
        {insertTyped}
        {afterPart}
      </>
    );
  };

  return (
    <div className="w-[1920px] h-[1080px] bg-[#a0cd45] flex flex-col" style={{ padding: "100px 100px 96px" }}>
      {/* Top row: logos */}
      <div className="flex justify-between items-start">
        <motion.img
          src="/assets/logos/pkvs-logo.svg"
          alt="PKVS"
          style={{ width: 206, height: 238 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.img
          src="/assets/logos/bbr-logo.svg"
          alt="BBR"
          style={{ width: 239, height: 236 }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        />
      </div>

      {/* Middle: heading */}
      <div className="flex-1 flex items-end">
        <motion.h1
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-bold text-white uppercase m-0"
          style={{ fontSize: 164, lineHeight: "170px", marginLeft: -11 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          {titleSlide.heading.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h1>
      </div>

      {/* Bottom row: subheading + button */}
      <div className="flex justify-between items-end" style={{ marginTop: 30 }}>
        <p
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-semibold text-white whitespace-nowrap m-0"
          style={{ fontSize: 64, lineHeight: 1 }}
        >
          {renderSubheading()}
          <span
            className="inline-block w-[3px] h-[1em] ml-[0px] translate-y-[0.15em]"
            style={{
              backgroundColor: showCursor ? "white" : "transparent",
              animation: showCursor ? "blink 0.7s steps(1) infinite" : "none",
            }}
          />
        </p>

        <motion.button
          onClick={onStart}
          className="bg-[#e6c600] text-white font-bold text-[32px] rounded-full font-['Inter',sans-serif] cursor-pointer whitespace-nowrap hover:brightness-90 transition-all border-none flex items-center justify-center"
          style={{ width: 300, padding: "22px 36px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {titleSlide.buttonText}
        </motion.button>
      </div>
    </div>
  );
}
