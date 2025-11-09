import React from "react";
import "./NavMenu.css";

const NavMenu = ({ username, isLoggedIn, onLogout }) => {
  const baseDomain = import.meta.env.VITE_ROOT_DOMAIN;
  const treeDomain = import.meta.env.VITE_TREE_FRONTEND;
  const beDomain = import.meta.env.VITE_BE_FRONTEND;
  const wordDomain = import.meta.env.VITE_WORD_FRONTEND;
  const menuItems = [
    { label: "Rizz Game", url: `https://rizz.tabors.site` },
    { label: "Tree", url: `${treeDomain}` },
    { label: "Be", url: `${beDomain}` },
    { label: "Word", url: `${wordDomain}` },
  ];

  return (
    <div className="navmenu-container">
      <h1>
        {isLoggedIn ? `Welcome, ${username} 👋` : "Login For Full Access"}
      </h1>

      <p>Select a section:</p>
      <ul className="navmenu-list">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a href={item.url} className="navmenu-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {isLoggedIn && (
        <button
          className="login-button"
          onClick={onLogout}
          style={{ marginLeft: "1rem" }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NavMenu;
