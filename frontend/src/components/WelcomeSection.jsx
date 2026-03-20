// WelcomeSection.jsx
import React from "react";
import { Github, Youtube, Twitter, Linkedin } from "lucide-react";
import InfoPopover from "./InfoPopover";
import "./WelcomeSection.css";
const WelcomeSection = () => {
  return (
    <div className="welcome-section text-center p-6" style={{ marginTop: "20px" }}>
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent animate-twinkle">
        Tabor's Site!
      </h1>
      <p className="text-lg mt-2">
        I'm{" "}
        <InfoPopover
          title="Tabor Holly"
          content="Born in 1998. Fullstack system builder out of Portland, OR. Datacenter experience, several fullstack builds, always chasing innovative solutions. Outside of code, makes music, spends time in nature, meditates, drinks black coffee, makes YouTube videos, and connects deeply with people. Not a fake person. Gets deep and sees through the surface."
          image="/tabor.jpg"
        >
          <strong>Tabor Holly</strong>
        </InfoPopover>
        , a systems architect and creator exploring how
        <InfoPopover
          title="Tree Structure"
          content="A data structure where everything connects to parents, so all nodes are hierarchically linked. Think folders inside folders, every piece of data knows where it belongs in the hierarchy."
          image="/treeStructure.png"
        >
          <strong> tree structures</strong>
        </InfoPopover>
        ,{" "}
        <InfoPopover
          title="Large Language Model"
          content="A new piece of tech that takes input, runs it through some magic, and gives back output, but is stateless. No memory between calls, every request starts fresh."
        >
          <strong>LLMs</strong>
        </InfoPopover>
        , and{" "}
        <InfoPopover
          title="Model Context Protocol"
          content="A way for LLM clients to call tools reliably that interact with servers and databases. It standardizes how AI models connect to external systems."
        >
          <strong>MCP</strong>
        </InfoPopover>
        {" "}can improve productivity and creative flow.
      </p>
      <p className="text-lg mt-2">
        This site serves as the official hub for my projects, writings, and
        experiments in
        system design and general scripting.
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
