import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trustVectors } from "@/lib/content";

export default function TrustVectorStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = trustVectors.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="mt-14 pt-10 border-t border-line/60 mx-auto max-w-3xl focus:outline-none"
      aria-label="Trust Architecture Guarantees Stack"
    >
      {/* Centered Minimalist Selector Pills */}
      <div className="mb-6 flex items-center justify-center gap-2.5" role="tablist">
        {trustVectors.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.title}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-accent text-white shadow-md scale-105"
                  : "border border-line bg-surface/60 text-body hover:border-accent/40 hover:text-heading"
              }`}
            >
              <span className={`font-mono text-xs ${isActive ? "text-white/90 font-bold" : "text-accent"}`}>
                0{idx + 1}
              </span>
              <span className="hidden sm:inline">Pillar 0{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Layered 3D Card Stack */}
      <div className="relative min-h-[260px] sm:min-h-[220px]">
        {trustVectors.map((item, idx) => {
          const offset = (idx - activeIndex + total) % total;
          const isFront = offset === 0;
          const isSecond = offset === 1;

          return (
            <div
              key={item.title}
              onClick={() => !isFront && setActiveIndex(idx)}
              className={`rounded-3xl border border-line bg-surface/95 p-7 sm:p-9 text-center backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out ${
                isFront
                  ? "relative z-30 opacity-100 scale-100 translate-y-0 shadow-accent/5 border-accent/40"
                  : isSecond
                  ? "absolute inset-0 z-20 opacity-60 scale-[0.96] translate-y-3.5 hover:opacity-80 cursor-pointer pointer-events-auto"
                  : "absolute inset-0 z-10 opacity-30 scale-[0.92] translate-y-7 pointer-events-none"
              }`}
              style={{
                transformOrigin: "top center",
              }}
            >
              {/* Centered Number Indicator */}
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>PILLAR 0{idx + 1}</span>
              </div>

              {/* Centered Subhead / Title */}
              <h3 className="mb-3 font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-heading">
                {item.title}
              </h3>

              {/* Centered Body */}
              <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-body">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* Centered Bottom Navigation Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Guarantee"
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent shadow-sm"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Prev</span>
        </button>

        {/* Centered Dots Indicator */}
        <div className="flex items-center gap-1.5">
          {trustVectors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to pillar 0${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-accent" : "w-2 bg-line hover:bg-body"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Guarantee"
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent shadow-sm"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
