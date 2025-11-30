import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HeroSection.css";

export default function HeroSection() {
  const [typedCode, setTypedCode] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [introStage, setIntroStage] = useState("symbol");

  // Developer-themed code lines for the right-side screen
  const codeFiles = [
    [
      "// Build fast, accessible web apps",
      "import React from 'react';",
      "import './styles.css';",
      "const App = () => (<UI performance='high' accessibility='AA' />);",
    ],
    [
      "// Component-driven development",
      "export const Button = ({ label }) => ",
      "  <button className='btn btn-primary'>{label}</button>;",
      "// Ship clean code you can trust",
    ],
  ];

  useEffect(() => {
    const symbolTimer = setTimeout(() => setIntroStage("welcome"), 2000);
    const welcomeTimer = setTimeout(() => setIntroStage("done"), 4000);
    return () => {
      clearTimeout(symbolTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let file = 0, line = 0, ch = 0;
    function type() {
      if (ch <= codeFiles[file][line].length) {
        setTypedCode(prev => {
          const n = [...prev];
          n[line] = codeFiles[file][line].slice(0, ch);
          return n;
        });
        ch++;
        // Slow down per-character typing to reduce flicker
        setTimeout(type, 140);
      } else {
        ch = 0; line++;
        if (line >= codeFiles[file].length) {
          line = 0; file = (file + 1) % codeFiles.length;
          setTypedCode(new Array(codeFiles[file].length).fill(""));
        }
        // Add longer pause between lines to stabilize the screen
        setTimeout(type, 700);
      }
    }
    setTypedCode(new Array(codeFiles[0].length).fill(""));
    type();
  }, []);

  return (
    <section id="home" className={`hero ${isMobile ? "mobile-hero" : ""}`}>
      <AnimatePresence>
        {introStage === "symbol" && (
          <motion.div
            className="intro-cinematic"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, scale: 20 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
          >
            <motion.div
              className="intro-symbol"
              initial={{ scale: 1, rotateY: 0 }}
              animate={{ scale: 1.5, rotateY: 720 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            >
              {"< />"}
            </motion.div>
          </motion.div>
        )}

        {introStage === "welcome" && (
          <motion.div
            className="welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="welcome-text">Welcome to Farhan's Portfolio</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {introStage === "done" && (
        <>
          {isMobile ? (
            <div className="hero-mobile-content">
              <h1>Hi, I'm Farhan Afridi</h1>
              <p>Building responsive, fast web apps with modern React.</p>
              <div className="hero-mobile-buttons">
                <a href="#projects" className="cta-btn primary" aria-label="View Projects">View Projects</a>
                <a href="#contact" className="cta-btn outline" aria-label="Hire Me">Hire Me</a>
              </div>
              <div className="mobile-animation">
                <div className="code-bubble">
                  {"<Crafting accessible React interfaces with blazing performance />"}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="hero-left">
                <h1>Hi, I'm Farhan Afridi</h1>
                <p className="hero-subtitle">
                  I craft responsive, performant web apps with modern React.
                </p>
                <div className="hero-buttons">
                  <a href="#projects" className="cta-btn primary" aria-label="View Projects">View Projects</a>
                  <a href="#contact" className="cta-btn outline" aria-label="Hire Me">Hire Me</a>
                </div>
              </div>

              <div className="hero-right">
                <div className="developer-laptop">
                  <div className="screen">
                    <div className="screen-toolbar">
                      <div className="dot red" />
                      <div className="dot yellow" />
                      <div className="dot green" />
                      <div className="tab">app.jsx</div>
                      <div className="tab muted">styles.css</div>
                    </div>
                    {typedCode.map((line, i) => (
                      <div key={i} className="code-line">{line}</div>
                    ))}
                    <div className="cursor"></div>
                  </div>
                  <div className="keyboard"></div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
