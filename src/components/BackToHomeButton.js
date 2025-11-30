import React, { useEffect, useState } from "react";
import "./BackToHomeButton.css";

export default function BackToHomeButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      // Show when scrolled some distance; always visible per request but keep subtle logic
      setVisible(window.scrollY > 120);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a href="#home" className="floating-back-to-home" aria-label="Back to Home">↑</a>
  );
}
