import React, { useState, useEffect, useRef, useCallback } from "react";
import { engagementModels } from "@/lib/content";

export default function EngagementSlideDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = engagementModels.length;
  const currentModel = engagementModels[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
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
      className="group relative mt-12 overflow-hidden rounded-3xl border border-line bg-surface/60 shadow-2xl backdrop-blur-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40"
      aria-label="Engagement Models Interactive Presentation Deck"
    >
      {/* Top Status Bar (iPod OS Style) */}
      <div className="flex items-center justify-between border-b border-line bg-surface/90 px-5 py-3 font-mono text-xs text-body">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-heading">
            KRASIS OS // ENGAGEMENT MODELS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded bg-canvas/80 px-2 py-0.5 font-semibold text-accent">
            MODEL [ 0{activeIndex + 1} / 0{total} ]
          </span>
          <span className="hidden sm:inline text-[11px] text-body/80">
            USE ARROW KEYS OR CLICK
          </span>
        </div>
      </div>

      {/* Main Split-Screen Deck */}
      <div className="grid lg:grid-cols-12 min-h-[420px]">
        {/* Left Column: The iPod Menu */}
        <div className="border-b lg:border-b-0 lg:border-r border-line bg-canvas/40 p-4 sm:p-6 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                SELECT DELIVERY MODEL
              </span>
              <span className="font-mono text-[11px] text-body">{total} STRUCTURES</span>
            </div>

            <div className="space-y-1.5" role="tablist" aria-orientation="vertical">
              {engagementModels.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.title}
                    id={`engage-tab-${idx}`}
                    role="tab"
                    aria-controls="engage-tabpanel"
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
                      <span className="truncate text-sm sm:text-[15px]">{item.title}</span>
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

          {/* Model Scope Progress */}
          <div className="mt-6 pt-4 border-t border-line/60 hidden lg:block">
            <div className="flex justify-between text-[11px] font-mono text-body mb-2">
              <span>ACTIVE MODEL SELECTION</span>
              <span>
                0{activeIndex + 1} / 0{total}
              </span>
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
          id="engage-tabpanel"
          aria-labelledby={`engage-tab-${activeIndex}`}
          className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between bg-surface/30"
        >
          <div>
            {/* Slide Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Engagement Model 0{activeIndex + 1}
                </span>
                <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-bold tracking-tight text-heading">
                  {currentModel.title}
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-body">{currentModel.subtitle}</p>
              </div>
              <div className="flex items-center gap-1">
                {engagementModels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to Model ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-6 bg-accent" : "w-2 bg-line hover:bg-body"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Deliverables & Commitments List */}
            <div className="rounded-2xl border border-line bg-canvas/50 p-5 sm:p-6 shadow-inner">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent block mb-3">
                Key Operational Deliverables:
              </span>
              <ul className="space-y-3 pl-0 text-sm sm:text-base text-heading/90">
                {currentModel.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Single Unified Action Button & Deck Controls */}
          <div className="mt-8 space-y-4 border-t border-line/60 pt-4">
            {/* The Single Unified Action Button */}
            <div>
              <a
                href="#contact"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-center text-sm font-semibold shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Contact Us About {currentModel.title}</span>
                <span className="font-mono text-xs opacity-90">→</span>
              </a>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Model"
                  className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
                >
                  <span>‹</span>
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Model"
                  className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
                >
                  <span>Next</span>
                  <span>›</span>
                </button>
              </div>

              <span className="font-mono text-xs text-body">
                Model {activeIndex + 1} of {total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
