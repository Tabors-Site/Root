import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import NavMenu from "./components/NavMenu.jsx";
import WelcomeSection from "./components/WelcomeSection.jsx";
import "./App.css";

const App = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme === "day") {
      setIsNightMode(false);
    } else {
      setIsNightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    Cookies.set("theme", newMode ? "night" : "day", { expires: 7 });
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `
          radial-gradient(
            circle at center,
            rgba(0, 255, 100, 0.05) 0%,
            rgba(0, 0, 0, ${isNightMode ? "0.85" : "0.6"}) 60%,
            rgba(0, 0, 0, ${isNightMode ? "0.97" : "0.8"}) 80%,
            rgba(0, 0, 0, ${isNightMode ? "1" : "0.9"}) 100%
          ),
          url("${isNightMode ? "/treeBackgroundNight.jpg" : "/treeBackground.png"
          }")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        title={isNightMode ? "Switch to Day" : "Switch to Night"}
      >
        {!isNightMode ? "☀️" : "🌙"}
      </button>
      <WelcomeSection />
      <div className="divider"></div> {/* divider */}
      <NavMenu />
      <footer className="footer">
        © 2026 Tabor Holly | Portland, OR, USA |{" "}
        <a href="https://tabors.site">tabors.site</a>
      </footer>
    </div>
  );
};

export default App;
