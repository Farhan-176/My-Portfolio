import React, { useState, useEffect } from "react";
import "./Header.css";
import { Menu } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Typing texts: exclude "Social Media Manager" on mobile
  const texts = isMobile
    ? ["Farhan Afridi", "Frontend Developer"]
    : ["Farhan Afridi", "Frontend Developer", "Social Media Manager"];

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset typing effect when switching between mobile/desktop to avoid index mismatch
  useEffect(() => {
    setTextIndex(0);
    setIndex(0);
    setIsDeleting(false);
  }, [isMobile]);

  // Typing effect (enabled on mobile and desktop; mobile cycles name + role)
  useEffect(() => {
    if (isScrolled) {
      setDisplayedText("Farhan Afridi");
      return;
    }

    const current = texts[textIndex];
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      setDisplayedText(
        isDeleting ? current.substring(0, index - 1) : current.substring(0, index + 1)
      );

      if (!isDeleting && index === current.length) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }

      setIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, textIndex, isScrolled]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/MyCV.pdf";
    link.download = "FarhanAfridi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {isMobile ? (
        <>
          {/* MOBILE HEADER */}
          <header className="header mobile-header">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={28} color="#00bcd4" />
            </div>

            <div className="animated-text typewriter">
              <span>{displayedText}</span>
              <span className="cursor">|</span>
            </div>

            {/* <button className="resume-btn" style={{ padding: "10px 22px", fontSize: "1.2rem", borderRadius: "8px" }} onClick={handleDownload}>
              CV
            </button> */}
          </header>

          {/* Mobile Slide Menu */}
{menuOpen && (
  <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
)}
<div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
  <div className="mobile-menu-inner">
    <ul>
      <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
      <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
      <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
      <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
      <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
    </ul>
  </div>
</div>
        </>
      ) : (
        <>
          {/* DESKTOP HEADER */}
          <header className="header desktop-header">
            <div className="logo">PORTFOLIO</div>
            <nav className="nav-center">
              <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            {/* <button
              className="resume-btn"
              style={{ padding: "10px 22px", fontSize: "1rem", borderRadius: "8px" }}
              onClick={handleDownload}
            >
              Download CV
            </button> */}
          </header>
        </>
      )}
    </>
  );
}

export default Header;
