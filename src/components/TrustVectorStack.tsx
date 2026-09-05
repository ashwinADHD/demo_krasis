import React, { useState, useEffect, useRef, useCallback } from "react";
import { ShieldCheck, FileKey, Cpu, ChevronLeft, ChevronRight, CheckCircle2, Layers } from "lucide-react";

interface TrustItem {
  number: string;
  badge: string;
  title: string;
  body: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const trustItems: TrustItem[] = [
  {
    number: "01",
    badge: "100% Unencumbered Ownership",
    tag: "IP & ASSETS",
    title: "100% IP & Source Ownership",
    body: "Every schematic, board layout, firmware repository, and cloud infrastructure-as-code template transfers cleanly to your organization with zero proprietary vendor lock-in.",
    highlights: [
      "Complete Git repository history, CI/CD pipelines & deployment manifests",
      "Full hardware EDA schematics, BOM lists & Gerber manufacturing files",
      "Zero recurring runtime royalties or proprietary platform dependencies",
    ],
    icon: FileKey,
  },
  {
    number: "02",
    badge: "Deterministic Engineering Rigor",
    tag: "VERIFICATION",
    title: "Deterministic Human Sign-Off",
    body: "AI accelerates boilerplate scaffolding, trace routing, and fuzz test generation, but every physical trace, cryptographic boundary, and mission-critical commit is validated and signed by senior engineers.",
    highlights: [
      "Zero unsupervised AI code deployed into production environments",
      "Senior systems architect mandatory line-by-line review & sign-off",
      "Hardware bench testing, thermal chamber runs & physical validation",
    ],
    icon: Cpu,
  },
  {
    number: "03",
    badge: "Continuous Audit Readiness",
    tag: "COMPLIANCE",
    title: "Continuous Compliance-as-Code",
    body: "Built-in policy engines monitor multi-cloud infrastructure and embedded firmware against SOC 2, ISO 27001, HIPAA, and IEC 62304 standards with automated evidence harvesting.",
    highlights: [
      "Real-time drift detection for Terraform, Pulumi, and Helm charts",
      "IEC 62304 Class B/C and ISO 13485 medical device lifecycle compliance",
      "Continuous SBOM generation, CVE tracking, and cryptographic auditing",
    ],
    icon: ShieldCheck,
  },
];

export default function TrustVectorStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = trustItems.length;

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
      className="mt-16 text-left focus:outline-none"
      aria-label="KRASIS Trust Guarantees Stack"
    >
      {/* Top Stack Header & Toggle Controls */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              TRUST ARCHITECTURE // 0{total} PILLARS
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-heading">
            The KRASIS Trust Stack
          </h2>
        </div>

        {/* View Mode Toggle: Interactive Stack vs Expanded List */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              !isExpanded
                ? "bg-accent text-white shadow-md"
                : "border border-line bg-surface text-body hover:text-heading"
            }`}
            aria-label="View as interactive card stack"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Interactive Stack</span>
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              isExpanded
                ? "bg-accent text-white shadow-md"
                : "border border-line bg-surface text-body hover:text-heading"
            }`}
            aria-label="View all cards expanded"
          >
            <span>Show All Stacked</span>
          </button>
        </div>
      </div>

      {!isExpanded ? (
        /* ================= INTERACTIVE STACK VIEW ================= */
        <div className="relative">
          {/* Top Pill Tabs */}
          <div className="mb-6 flex flex-wrap gap-2" role="tablist">
            {trustItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.number}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-white shadow-md scale-[1.02]"
                      : "border border-line bg-surface/60 text-body hover:border-accent/40 hover:text-heading"
                  }`}
                >
                  <span className={`font-mono text-xs ${isActive ? "text-white" : "text-accent"}`}>
                    {item.number}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* 3D Stack Cards Container */}
          <div className="relative min-h-[380px] sm:min-h-[340px]">
            {trustItems.map((item, idx) => {
              // Calculate relative offset from active item
              const offset = (idx - activeIndex + total) % total;
              const isFront = offset === 0;
              const isSecond = offset === 1;

              const IconComponent = item.icon;

              return (
                <div
                  key={item.number}
                  onClick={() => !isFront && setActiveIndex(idx)}
                  className={`rounded-3xl border border-line bg-surface/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out ${
                    isFront
                      ? "relative z-30 opacity-100 scale-100 translate-y-0 shadow-accent/5 border-accent/40"
                      : isSecond
                      ? "absolute inset-0 z-20 opacity-60 scale-[0.96] translate-y-4 hover:opacity-80 cursor-pointer pointer-events-auto"
                      : "absolute inset-0 z-10 opacity-30 scale-[0.92] translate-y-8 pointer-events-none"
                  }`}
                  style={{
                    transformOrigin: "top center",
                  }}
                >
                  {/* Card Header */}
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                            Pillar {item.number} // {item.tag}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-heading">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full border border-line bg-canvas/70 px-3.5 py-1 font-mono text-[11px] font-semibold text-body">
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Body */}
                  <p className="mb-6 text-sm sm:text-base leading-relaxed text-body">
                    {item.body}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 border-t border-line/50 pt-4">
                    {item.highlights.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-heading/90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer Status */}
                  <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-4 text-[11px] font-mono text-body/80">
                    <span>STATUS: HARDWARE & CODE LEVEL GUARANTEE</span>
                    <span className="text-accent font-semibold">STAGE {activeIndex + 1} / {total}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls below stack */}
          <div className="mt-12 flex items-center justify-between border-t border-line/60 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Trust Guarantee"
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev Pillar</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Trust Guarantee"
                className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-heading transition-all hover:border-accent hover:text-accent"
              >
                <span>Next Pillar</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {trustItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to pillar ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-6 bg-accent" : "w-2 bg-line hover:bg-body"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ================= SHOW ALL STACKED VIEW ================= */
        <div className="space-y-6">
          {trustItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="rounded-3xl border border-line bg-surface/95 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all hover:border-accent/50"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                        Pillar {item.number} // {item.tag}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-heading">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="rounded-full border border-line bg-canvas/70 px-3.5 py-1 font-mono text-[11px] font-semibold text-body">
                    {item.badge}
                  </span>
                </div>

                <p className="mb-6 text-sm sm:text-base leading-relaxed text-body">
                  {item.body}
                </p>

                <div className="space-y-2.5 border-t border-line/50 pt-4">
                  {item.highlights.map((point) => (
                    <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-heading/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
