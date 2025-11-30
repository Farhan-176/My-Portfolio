import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AboutSection.css";

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [activeRole, setActiveRole] = useState("both");
  const roleContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside handler to reset to "both"
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleContainerRef.current && !roleContainerRef.current.contains(event.target)) {
        setActiveRole("both");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const contentFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  // Role-specific content
  const roleContent = {
    both: {
      title: "The Perfect Blend",
      paragraphs: [
        "A versatile professional dedicated to connecting creative ideas with effective technical solutions. With a background blending storytelling and web development, Farhan combines strategic insight and hands-on experience to craft engaging digital experiences. Through thoughtful content and responsive technology, Farhan aims to deliver value to audiences and drive meaningful results for every project."
      ]
    },
    social: {
      title: "Social Media Manager",
      paragraphs: [
        "I specialize in <span class='highlight'>building authentic brand identities</span> through strategic social media management. My approach combines data-driven insights with creative storytelling to maximize engagement and reach.",
        "My expertise includes <strong>content strategy</strong>, <strong>community management</strong>, <strong>analytics & reporting</strong>, and <strong>paid social advertising</strong>. I've successfully grown multiple brand accounts from scratch to thousands of engaged followers.",
        "I create content that doesn't just look good—it performs. From viral campaigns to daily engagement strategies, I know how to make your brand stand out in crowded social feeds and convert followers into customers.",
        "Platforms I master: <span class='highlight'>Instagram, Facebook, Twitter/X, LinkedIn, TikTok, and YouTube</span>. Each platform gets a tailored strategy that speaks to its unique audience."
      ]
    },
    frontend: {
      title: "Frontend Developer",
      paragraphs: [
        "I build <span class='highlight'>modern, responsive web applications</span> that combine beautiful design with flawless functionality. My code is clean, maintainable, and optimized for performance.",
        "My tech stack includes <strong>React.js</strong>, <strong>JavaScript (ES6+)</strong>, <strong>HTML5 & CSS3</strong>, <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong>, and <strong>responsive design principles</strong>. I stay updated with the latest web technologies and best practices.",
        "Every project I deliver is <span class='highlight'>mobile-first</span>, <span class='highlight'>accessible</span>, and <span class='highlight'>performance-optimized</span>. I focus on creating seamless user experiences that work perfectly across all devices and browsers.",
        "From single-page applications to complex dashboards, I turn design mockups into production-ready code that exceeds expectations and delights users."
      ]
    }
  };

  return (
  <section className="about-section" id="about">
    {isMobile ? (
      /* MOBILE VIEW - Single About Me text */
      <div className="mobile-about-content">
        <motion.h1
          className="mobile-about-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>

        <motion.div
          className="mobile-bio-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            I'm a passionate <span className="highlight">Frontend Developer</span> specializing in building modern, responsive web applications with <strong>React.js</strong> and cutting-edge technologies. I craft seamless user experiences that are <span className="highlight">mobile-first</span>, <span className="highlight">accessible</span>, and <span className="highlight">performance-optimized</span>.
          </p>
          <p>
            My expertise includes <strong>JavaScript (ES6+)</strong>, <strong>HTML5 & CSS3</strong>, <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong>, and responsive design principles. I transform design concepts into clean, maintainable code that works flawlessly across all devices and browsers.
          </p>
          <p>
            From single-page applications to complex interactive interfaces, I focus on delivering high-quality solutions that exceed expectations and create lasting impressions.
          </p>
        </motion.div>
      </div>
    ) : (
      /* DESKTOP VIEW - Single About Me text */
      <div className="about-container">
        <motion.div 
          className="vertical-heading"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>ABOUT ME</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="combined-bio"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bio-content">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I'm a passionate <span className="highlight">Frontend Developer</span> specializing in building modern, responsive web applications with <strong>React.js</strong> and cutting-edge technologies. I craft seamless user experiences that are <span className="highlight">mobile-first</span>, <span className="highlight">accessible</span>, and <span className="highlight">performance-optimized</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My expertise includes <strong>JavaScript (ES6+)</strong>, <strong>HTML5 & CSS3</strong>, <strong>Tailwind CSS</strong>, <strong>Framer Motion</strong>, and responsive design principles. I transform design concepts into clean, maintainable code that works flawlessly across all devices and browsers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                From single-page applications to complex interactive interfaces, I focus on delivering high-quality solutions that exceed expectations and create lasting impressions.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    )}
  </section>
);
}
