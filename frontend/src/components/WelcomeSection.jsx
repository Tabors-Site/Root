// WelcomeSection.jsx
import React from "react";
import { Github, Youtube } from "lucide-react";

const WelcomeSection = () => {
  return (
    <div className="welcome-section text-center p-6">

      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent animate-twinkle">
        Tabor's Site!
      </h1>

      <p className="text-lg mb-2">
        Hi, I’m <strong>Tabor Holly</strong>. This is my site where I host all of my projects.
      </p>
      <p className="text-lg">
        Currently, I’m working on a <strong>life planner powered by LLMs</strong>.
      </p>

      {/* Icon Links */}
      <div className="fixed bottom-4 right-4 flex gap-4">
        <a
          href="https://github.com/taborgreat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Github size={28} />
        </a>
        <a
          href="https://www.youtube.com/@KingCityConnections"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00ff9d] hover:text-[#66ffcc] transition-colors"
        >
          <Youtube size={28} />
        </a>
      </div>
    </div>
  );
};

export default WelcomeSection;
