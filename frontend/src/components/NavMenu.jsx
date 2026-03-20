import React from "react";
import InfoPopover from "./InfoPopover";
import "./NavMenu.css";

const NavMenu = () => {
  const treeDomain = import.meta.env.VITE_TREE_FRONTEND;
  const menuItems = [
    {
      label: "TreeOS",
      url: `${treeDomain}`,
      popover:
        "A tree-based operating system interface for navigating and managing hierarchical data structures. Think of it as a file system reimagined around trees.",
    },
    {
      label: "RIZZ OFF",
      url: `https://rizzoff.com`,
      popover:
        "LLM powered online multiplayer game where you can join and leave at anytime for a quick play.",
    },
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
            <InfoPopover
              title={item.label}
              content={item.popover}
              visitUrl={item.url}
              side
              infoButton
            >
              <span className="info-btn">i</span>
            </InfoPopover>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;
