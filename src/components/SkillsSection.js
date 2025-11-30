import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SkillsSection.css";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillsData = {
    frontend: [
      { name: "React.js", level: 80, icon: "⚛️" },
      { name: "JavaScript (ES6+)", level: 85, icon: "🟨" },
      { name: "HTML5 & CSS3", level: 90, icon: "🎨" },
      { name: "Tailwind CSS", level: 70, icon: "💨" },
      { name: "Framer Motion", level: 45, icon: "🎬" },
      { name: "Responsive Design", level: 90, icon: "📱" }
    ],
    tools: [
      { name: "Git & GitHub", level: 80, icon: "🐙" },
      { name: "VS Code", level: 90, icon: "💻" },
      { name: "Figma", level: 45, icon: "🎨" },
      { name: "Chrome DevTools", level: 57, icon: "🔧" },
      { name: "NPM/Yarn", level: 75, icon: "📦" }
    ],
    // social category removed for developer-only portfolio
  };

  const categories = [
    { id: "all", label: "All Skills", icon: "🎯" },
    { id: "frontend", label: "Frontend", icon: "💻" },
    { id: "tools", label: "Tools", icon: "🛠️" }
  ];

  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return Object.values(skillsData).flat();
    }
    return skillsData[activeCategory] || [];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className="skills-section" id="skills">
      {isMobile ? (
        <div className="mobile-skills-content">
          <motion.h1
            className="mobile-skills-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Skills
          </motion.h1>

          {/* Mobile Category Filter */}
          <motion.div
            className="mobile-category-filter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`mobile-category-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Mobile Skills Grid */}
          <motion.div
            className="mobile-skills-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {getFilteredSkills().map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                className="mobile-skill-card"
                variants={cardVariants}
              >
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="skills-container">
          {/* Vertical Heading */}
          <motion.div
            className="vertical-heading"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>MY SKILLS</h2>
          </motion.div>

          <div className="skills-content">
            {/* Category Tabs */}
            <motion.div
              className="category-tabs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-label">{cat.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeCategory}
            >
              {getFilteredSkills().map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  className="skill-card"
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "0 10px 40px rgba(91, 140, 255, 0.3)" }}
                >
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <div className="skill-bar-container">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
