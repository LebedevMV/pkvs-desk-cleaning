import { motion } from "framer-motion";
import { endSlide } from "../config/slides";

interface EndSlideProps {
  onRestart: () => void;
}

export default function EndSlide({ onRestart }: EndSlideProps) {
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
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-bold text-white uppercase m-0 whitespace-pre"
          style={{ fontSize: 164, lineHeight: "170px", marginLeft: -11 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          {endSlide.heading.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h1>
      </div>

      {/* Bottom row: subheading + button */}
      <div className="flex justify-between items-end" style={{ marginTop: 30 }}>
        <motion.p
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-semibold text-white whitespace-nowrap m-0"
          style={{ fontSize: 64 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          {endSlide.subheading}
        </motion.p>

        <motion.button
          onClick={onRestart}
          className="bg-[#ffdc00] text-white font-bold text-[24px] rounded-full font-['Inter',sans-serif] cursor-pointer whitespace-nowrap hover:brightness-110 transition-all border-none flex items-center justify-center"
          style={{ width: 239, padding: "16px 24px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {endSlide.buttonText}
        </motion.button>
      </div>
    </div>
  );
}
