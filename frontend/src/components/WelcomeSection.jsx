// WelcomeSection.jsx
import React from "react";
import { Github, Youtube, Twitter, Linkedin } from "lucide-react";
import "./WelcomeSection.css";
const WelcomeSection = () => {
  return (
    <div className="welcome-section text-center p-6">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent animate-twinkle">
        Tabor's Site!
      </h1>
      <p className="text-lg mt-2">
        I'm <strong>Tabor Holly</strong>, a systems architect and creator
        exploring how
        <strong> tree structures</strong>,{" "}
        <strong>Large Language Models (LLMs)</strong>, and
        <strong> Model Context Protocol (MCP) </strong>
        can improve productivity and creative flow.
      </p>
      <p className="text-lg mt-2">
        This site serves as the official hub for my projects, writings, and
        experiments in
        <strong> system design</strong> and <strong>general scripting</strong>.
      </p>

      {/* Icon Links */}
      <div className="icon-links fixed bottom-4 right-4">
        <a
          href="https://github.com/taborgreat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Github size={28} />
        </a>
        <a
          href="https://www.youtube.com/@taborgreat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Youtube size={28} />
        </a>
        <a
          href="https://x.com/taborgreat" // 🐦 your X link
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Twitter size={28} />
        </a>

        <a
          href="https://www.linkedin.com/in/tabor-holly-36a727292" // 💼 your LinkedIn link
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Linkedin size={28} />
        </a>
      </div>
    </div>
  );
};

export default WelcomeSection;
