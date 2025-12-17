import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Login from "./components/Login.jsx";
import NavMenu from "./components/NavMenu.jsx";
import WelcomeSection from "./components/WelcomeSection.jsx";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const storedUserId = Cookies.get("userId");
    const loggedIn = Cookies.get("loggedIn");
    const savedTheme = Cookies.get("theme");

    if (loggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "");
      setUserId(storedUserId || "");
    }

    if (savedTheme === "day") {
      setIsNightMode(false);
    } else {
      setIsNightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isNightMode;
    setIsNightMode(newMode);
    Cookies.set("theme", newMode ? "night" : "day", { expires: 7 }); // 7 days
  };

 const handleLogout = async () => {
  try {
    const apiUrl = import.meta.env.VITE_TREE_API_URL;

    await fetch(`${apiUrl}/logout`, {
      method: "POST",
      credentials: "include", 
    });
  } catch (err) {
    console.error("Logout request failed:", err);
 
  }

  setIsLoggedIn(false);
  setUsername("");
  setUserId("");
  setShowLoginForm(false);

  // Clear frontend-managed cookies only
  Cookies.remove("username");
  Cookies.remove("userId");
  Cookies.remove("loggedIn");
};

  const hideLoginForm = () => {
    setShowLoginForm(false);
    console.log("hideLoginForm called");
  };

  if (!isLoggedIn && showLoginForm) {
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
          url("${
            isNightMode ? "/treeBackgroundNight.jpg" : "/treeBackground.png"
          }")
        `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setUserId={setUserId}
          onCancel={hideLoginForm}
        />
      </div>
    );
  }

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
          url("${
            isNightMode ? "/treeBackgroundNight.jpg" : "/treeBackground.png"
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
      <NavMenu
        username={username}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      {!isLoggedIn && !showLoginForm && (
        <button className="login-button" onClick={() => setShowLoginForm(true)}>
          Login
        </button>
      )}
      <footer className="footer">
        © 2025 Tabor Holly | Portland, OR, USA |{" "}
        <a href="https://tabors.site">tabors.site</a>
      </footer>
    </div>
  );
};

export default App;
