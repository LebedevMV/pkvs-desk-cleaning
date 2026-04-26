import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(95);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const animationRef = useRef<number>(0);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      setIsAnimating(false);
      cancelAnimationFrame(animationRef.current);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Auto-reveal animation: starts at 95% (mostly "before"), slides to 50%
  useEffect(() => {
    setSliderPosition(95);
    setIsAnimating(true);

    const startTime = performance.now();
    const duration = 1200;
    const from = 95;
    const to = 85;

    const delay = setTimeout(() => {
      const animate = (now: number) => {
        const elapsed = now - startTime - 400;
        if (elapsed < 0) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setSliderPosition(from + (to - from) * eased);
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(animationRef.current);
    };
  }, [beforeImage, afterImage]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-col-resize select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After image — full size, behind */}
      <img
        src={afterImage}
        alt="После"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image — same size, clipped with clip-path */}
      <img
        src={beforeImage}
        alt="До"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
        draggable={false}
      />

      {/* Labels */}
      <div
        className="absolute bg-[#ffdc00] text-white font-bold text-[24px] rounded-full font-['Inter',sans-serif] flex items-center justify-center pointer-events-none"
        style={{ left: 21, top: 19, width: 155, padding: "16px 24px" }}
      >
        ДО
      </div>
      <div
        className="absolute bg-[#ffdc00] text-white font-bold text-[24px] rounded-full font-['Inter',sans-serif] flex items-center justify-center pointer-events-none"
        style={{ right: 21, top: 20, width: 155, padding: "16px 24px" }}
      >
        ПОСЛЕ
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      />

      {/* Slider handle */}
      <div
        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%`, width: 60, height: 60 }}
      >
        <div
          className="w-full h-full bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          style={{
            animation: isAnimating ? undefined : "pulse-glow 2s ease-in-out 1s 3",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5L3 12L8 19M16 5L21 12L16 19"
              stroke="#a0cd45"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
