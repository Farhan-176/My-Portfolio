import React, { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className={`site-footer ${isMobile ? "mobile" : ""}`}>
      <div className="footer-inner">
        <div className="footer-left">
          <div className="brand">Farhan Afridi</div>
          <div className="footer-copy">© {new Date().getFullYear()} Farhan Afridi. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
