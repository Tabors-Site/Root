import React from "react";
import "./NavMenu.css";

const NavMenu = () => {
  const treeDomain = import.meta.env.VITE_TREE_FRONTEND;
  const menuItems = [
    { label: "TreeOS", url: `${treeDomain}` },
    { label: "RIZZ OFF", url: `https://rizzoff.com` },
  ];

  return (
    <div className="navmenu-container">
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
    </div>
  );
};

export default NavMenu;
