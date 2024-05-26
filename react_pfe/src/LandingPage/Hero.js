import React from "react";
import { motion } from "framer-motion";
import './Hero.css';

export default function HeroSection() {
  return (
    <div>
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title">
            Better Mental Health <br />
            Starts Here
          </h1>

          <h2 className="hero-text">
            Everyone benefits when people feel their best. Spring Health is the proven <br />mental health solution for employers and health plans that changes lives and <br /> drives business results, everywhere.
          </h2>

          <motion.button
            className="hero-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span>Click Me</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
