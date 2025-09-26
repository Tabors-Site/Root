import React from "react";

const NavMenu = ({ username, isLoggedIn, onLogout }) => {
  const baseDomain = import.meta.env.VITE_ROOT_DOMAIN;
  const treeDomain = import.meta.env.VITE_TREE_FRONTEND;
  const menuItems = [{ label: "Tree", url: `${treeDomain}` }];

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
        <button className="login-button" onClick={onLogout} style={{ marginLeft: "1rem" }}>
          Logout
        </button>
      )}
    </div>
  );
};

export default NavMenu;
