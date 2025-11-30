import React, { useEffect, useState } from "react";
import "./ContactSection.css";

export default function ContactSection() {
  const CONTACT_EMAIL = "afridifarhan96@gmail.com";
  const CONTACT_PHONE = "03491940560";
  const LOCATION = "Pakistan";
  const DISPLAY_PHONE = "+92 349 194 0560"; // formatted for readability
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`contact-section ${isMobile ? "mobile" : ""}`} id="contact">
      {isMobile ? (
        <div className="contact-mobile-content">
          <h1 className="contact-title">Contact</h1>
          <p className="contact-lead">Open to opportunities and collaborations. Reach out via email or connect on socials.</p>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <a className="info-value" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a className="info-value" href={`tel:${CONTACT_PHONE}`}>{DISPLAY_PHONE}</a>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{LOCATION}</span>
            </div>
          </div>

          <div className="contact-links">
            <a href="https://github.com/Farhan-176" target="_blank" rel="noreferrer" className="link">GitHub</a>
            <a href="https://www.linkedin.com/in/farhanafrididev" target="_blank" rel="noreferrer" className="link">LinkedIn</a>
            <a href={`https://wa.me/${CONTACT_PHONE}`} target="_blank" rel="noreferrer" className="link">WhatsApp</a>
          </div>
        </div>
      ) : (
        <div className="contact-inner">
          <h2>Contact</h2>
          <p className="contact-lead">Open to opportunities and collaborations. Reach out via email or connect on socials.</p>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-label">Email</span>
              <a className="info-value" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <a className="info-value" href={`tel:${CONTACT_PHONE}`}>{DISPLAY_PHONE}</a>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{LOCATION}</span>
            </div>
          </div>

          <div className="contact-links">
            <a href="https://github.com/Farhan-176" target="_blank" rel="noreferrer" className="link">GitHub</a>
            <a href="https://www.linkedin.com/in/farhanafrididev" target="_blank" rel="noreferrer" className="link">LinkedIn</a>
            <a href={`https://wa.me/${CONTACT_PHONE}`} target="_blank" rel="noreferrer" className="link">WhatsApp</a>
          </div>
        </div>
      )}
    </section>
  );
}
