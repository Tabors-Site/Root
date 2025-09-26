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

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const storedUserId = Cookies.get("userId");
    const loggedIn = Cookies.get("loggedIn");

    if (loggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "");
      setUserId(storedUserId || "");
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    setShowLoginForm(false);
    Cookies.remove("username");
    Cookies.remove("userId");
    Cookies.remove("loggedIn");
    Cookies.remove("token");
  };
  const hideLoginForm = () => {
    setShowLoginForm(false);
    console.log("hideLoginForm called");
  };

  if (!isLoggedIn && showLoginForm) {
    return (
      <div className="app-container">
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
    <div className="app-container">
      <WelcomeSection />
      <div className="divider"></div> {/* divider */}
      <NavMenu
        username={username}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      {!isLoggedIn && !showLoginForm && (
        <button className="login-button" onClick={() => setShowLoginForm(true)}>Login</button>
      )}
    </div>
  );
};

export default App;
