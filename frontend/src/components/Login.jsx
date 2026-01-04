import React, { useState } from "react";
import Cookies from "js-cookie";
import "./Login.css";

const Login = ({ setUsername, setUserId, setIsLoggedIn, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [username, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_TREE_API_URL;

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("username", username, { expires: 7, secure: true });
        Cookies.set("userId", data.userId, { expires: 7, secure: true });
        Cookies.set("loggedIn", true, { expires: 7, secure: true });

        setUsername(username);
        setUserId(data.userId);
        setIsLoggedIn(true);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Success! Look for our email to complete the setup.");
        setIsRegistering(false);
        setPassword("");
        setConfirmPassword("");
        setEmail("");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || "Email sent if registered.");

      setEmail("");
      setIsForgotPassword(false);
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      handleForgotPassword();
    } else if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="../../tree.png" alt="Logo" className="logo" />
      </div>

      <h2>
        {isForgotPassword
          ? "Forgot Password"
          : isRegistering
            ? "Register"
            : "Login"}
      </h2>

      <form onSubmit={handleSubmit}>
        {isForgotPassword && (
          <>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit">Send Reset Email</button>

            <p
              style={{ cursor: "pointer", marginTop: "10px" }}
              onClick={() => {
                setIsForgotPassword(false);
                setIsRegistering(false);
                setMessage("");
              }}
            >
              ← Back to Login
            </p>
          </>
        )}

        {!isRegistering && !isForgotPassword && (
          <>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Login</button>

            <p
              style={{ cursor: "pointer", marginTop: "10px" }}
              onClick={() => {
                setIsForgotPassword(true);
                setIsRegistering(false);
                setMessage("");
              }}
            >
              Forgot Password?
            </p>
          </>
        )}

        {isRegistering && !isForgotPassword && (
          <>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>


            <button type="submit">Register</button>
          </>
        )}
      </form>

      <p className="error-message">{message}</p>

      {!isForgotPassword && (
        <p>
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account yet?"}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage("");
            }}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      )}

      <button className="go-back-btn" onClick={onCancel}>
        ← Go Back
      </button>
    </div>
  );
};

export default Login;
