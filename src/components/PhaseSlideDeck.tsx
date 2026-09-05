import React, { useState, useEffect, useRef, useCallback } from "react";
import { engineeringPhases } from "@/lib/content";

export default function PhaseSlideDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = engineeringPhases.length;
  const currentPhase = engineeringPhases[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="group relative mt-14 overflow-hidden rounded-3xl border border-line bg-surface/60 shadow-2xl backdrop-blur-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40"
      aria-label="Engineering Phases Interactive Presentation Deck"
    >
      {/* Top Status Bar (iPod OS Style) */}
      <div className="flex items-center justify-between border-b border-line bg-surface/90 px-5 py-3 font-mono text-xs text-body">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-heading">
            KRASIS OS // PHASE DECK
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded bg-canvas/80 px-2 py-0.5 font-semibold text-accent">
            PHASE [ 0{activeIndex + 1} / 0{total} ]
          </span>
          <span className="hidden sm:inline text-[11px] text-body/80">
            USE ARROW KEYS OR CLICK
          </span>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Tabs Strip (< lg) */}
      <div className="lg:hidden border-b border-line bg-canvas/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-orientation="horizontal">
          {engineeringPhases.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.phase}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "bg-surface border border-line text-body hover:text-heading"
                }`}
              >
                <span className={`font-mono text-[11px] ${isActive ? "text-white/90" : "text-accent"}`}>
                  0{idx + 1}
                </span>
                <span>{item.phase}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split-Screen Deck */}
      <div className="grid lg:grid-cols-12 min-h-[420px]">
        {/* Left Column: The iPod Menu (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 border-r border-line bg-canvas/40 p-6 flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                SELECT PHASE
              </span>
              <span className="font-mono text-[11px] text-body">{total} STAGES</span>
            </div>

            <div className="space-y-1.5" role="tablist" aria-orientation="vertical">
              {engineeringPhases.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.phase}
                    id={`phase-tab-${idx}`}
                    role="tab"
                    aria-controls="phase-tabpanel"
                    aria-selected={isActive}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-white shadow-md font-semibold"
                        : "text-body hover:bg-surface-hover hover:text-heading"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-white/90 font-bold" : "text-accent"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="truncate text-sm sm:text-[15px]">{item.phase}</span>
                    </div>
                    <span
                      className={`font-mono text-base transition-transform duration-200 ${
                        isActive ? "translate-x-0.5 text-white font-bold" : "text-body/60"
                      }`}
                    >
                      ›
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrub bar & playback indicators */}
          <div className="mt-6 pt-4 border-t border-line/60">
            <div className="flex justify-between text-[11px] font-mono text-body mb-2">
              <span>PROGRESSION</span>
              <span>{Math.round(((activeIndex + 1) / total) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: The Presentation Slide */}
        <div
          role="tabpanel"
          id="phase-tabpanel"
          aria-labelledby={`phase-tab-${activeIndex}`}
          className="col-span-12 lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between bg-surface/30"
        >
          <div>
            {/* Slide Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Phase 0{activeIndex + 1} Architecture
                </span>
                <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-heading">
                  {currentPhase.phase}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {engineeringPhases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to Phase ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-6 bg-accent" : "w-2 bg-line hover:bg-body"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Content: AI Velocity vs Human Oversight */}
            <div className="space-y-4">
              {/* AI Machine Velocity Card */}
              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5 transition-all duration-300 hover:border-purple-500/40">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
                      AI Machine Velocity
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-purple-400/80 bg-purple-500/10 px-2 py-0.5 rounded-md">
                    Automated Tier
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-heading/90 sm:text-base">
                  {currentPhase.ai}
                </p>
              </div>

              {/* Human Architect Oversight Card */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 transition-all duration-300 hover:border-amber-500/40">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-500">
                      Human Architect Oversight
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    Deterministic Sign-off
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-heading/90 sm:text-base">
                  {currentPhase.human}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Deck Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Phase"
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
              >
                <span>‹</span>
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Phase"
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
              >
                <span>Next</span>
                <span>›</span>
              </button>
            </div>

            <span className="font-mono text-xs text-body">
              Stage {activeIndex + 1} of {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
