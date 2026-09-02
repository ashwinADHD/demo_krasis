import { useCallback } from "react";

export default function ExploreButton() {
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  return (
    <button type="button" onClick={scrollToContact} className="btn-primary">
      Explore
    </button>
  );
}
