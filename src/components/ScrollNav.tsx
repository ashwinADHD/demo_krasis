import { useCallback, useEffect, useState } from "react";
import { SECTIONS, MOBILE_BREAKPOINT, type SectionId } from "@/lib/site";

export default function ScrollNav() {
  const [active, setActive] = useState<SectionId>("hero");

  const scrollTo = useCallback((target: SectionId) => {
    const panel = document.getElementById(target);
    panel?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActive(target);
  }, []);

  useEffect(() => {
    const track = document.getElementById("scroll-track");
    if (!track) return;

    const update = () => {
      const horizontal = window.innerWidth >= MOBILE_BREAKPOINT;
      const scrollPos = horizontal ? track.scrollLeft : track.scrollTop;
      const viewportSize = horizontal ? track.clientWidth : track.clientHeight;
      const center = scrollPos + viewportSize / 2;

      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-section]"));
      let closest = panels[0];
      let closestDist = Infinity;

      panels.forEach((panel) => {
        const start = horizontal ? panel.offsetLeft : panel.offsetTop;
        const size = horizontal ? panel.offsetWidth : panel.offsetHeight;
        const dist = Math.abs(center - (start + size / 2));
        if (dist < closestDist) {
          closestDist = dist;
          closest = panel;
        }
      });

      const id = closest?.dataset.section as SectionId | undefined;
      if (id) setActive(id);
    };

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < MOBILE_BREAKPOINT) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", update);
    update();

    return () => {
      track.removeEventListener("scroll", update);
      track.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Section navigation" className="pointer-events-auto flex gap-2.5">
      {SECTIONS.map((id) => (
        <button
          key={id}
          type="button"
          aria-label={`Go to ${id}`}
          aria-current={active === id ? "true" : undefined}
          onClick={() => scrollTo(id)}
          className={`h-2.5 w-2.5 rounded-full border-[1.5px] p-0 transition-all duration-250 ${
            active === id
              ? "scale-125 border-accent bg-accent"
              : "border-line bg-transparent hover:border-accent"
          }`}
        />
      ))}
    </nav>
  );
}
