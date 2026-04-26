import { useEffect, useRef, useState, type ReactNode } from "react";

const DESIGN_W = 1920;
const DESIGN_H = 1080;

interface ScaledContainerProps {
  children: ReactNode;
}

export default function ScaledContainer({ children }: ScaledContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsPortrait(h > w);
      // cover: всегда заполняем экран, обрезая по меньшей стороне
      setScale(Math.max(w / DESIGN_W, h / DESIGN_H));
    };

    update();
    window.addEventListener("resize", update);
    // Слушаем и визуальный viewport (для pinch-zoom на мобильных)
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#a0cd45] gap-8 p-10">
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "white", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M9 53c-2.21 0-4-1.789-4-4V9a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v40c0 2.211-1.79 4-4 4z" />
          <path d="m25 5-2 4h-8l-2-4M11 53v2c0 2.211 1.79 4 4 4h40c2.21 0 4-1.789 4-4V37a4 4 0 0 0-4-4H31" />
          <path d="m59 53-4-2v-8l4-2M46 21l6 6 6-6" />
          <path d="M52 27V16a4 4 0 0 0-4-4H37" />
        </svg>
        <p
          className="font-['Gill_Sans','Gill_Sans_MT',sans-serif] font-semibold text-white text-center"
          style={{ fontSize: 28 }}
        >
          Переверните экран
        </p>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
