import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./InfoPopover.css";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const InfoPopover = ({ children, content, title, image, visitUrl, side }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState("above");
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const leaveTimer = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = 320;
    const popoverHeight = 160;
    const gap = 12;

    let top, left;

    if (side) {
      // Position to the right or left of the trigger
      top = rect.top + rect.height / 2 - popoverHeight / 2;
      top = Math.max(10, Math.min(top, window.innerHeight - popoverHeight - 10));

      if (rect.right + gap + popoverWidth < window.innerWidth - 10) {
        left = rect.right + gap;
        setPlacement("right");
      } else {
        left = rect.left - popoverWidth - gap;
        setPlacement("left");
      }
    } else {
      // Position above or below the trigger
      if (rect.top > popoverHeight + gap) {
        top = rect.top - popoverHeight - gap;
        setPlacement("above");
      } else {
        top = rect.bottom + gap;
        setPlacement("below");
      }
      left = rect.left + rect.width / 2 - popoverWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - popoverWidth - 10));
    }

    setPosition({ top, left });
  }, [side]);

  const open = useCallback(() => {
    clearTimeout(leaveTimer.current);
    calculatePosition();
    setIsOpen(true);
  }, [calculatePosition]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const delayedClose = useCallback(() => {
    leaveTimer.current = setTimeout(close, 150);
  }, [close]);

  const cancelClose = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  // Close on scroll (desktop)
  useEffect(() => {
    if (!isOpen || !canHover) return;
    const handleScroll = () => close();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, close]);

  // Close on click outside (mobile)
  useEffect(() => {
    if (!isOpen || canHover) return;
    const handleOutside = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        popoverRef.current && !popoverRef.current.contains(e.target)
      ) {
        close();
      }
    };
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen, close]);

  const handleTriggerClick = (e) => {
    if (!canHover) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => !prev);
      if (!isOpen) calculatePosition();
    }
  };

  const popoverContent = (
    <>
      {!canHover && isOpen && <div className="info-popover-backdrop" onClick={close} />}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`info-popover ${placement}`}
          style={canHover ? { top: position.top, left: position.left } : undefined}
          onMouseEnter={canHover ? cancelClose : undefined}
          onMouseLeave={canHover ? delayedClose : undefined}
        >
          {!canHover && (
            <button className="info-popover-close" onClick={close}>
              ✕
            </button>
          )}
          {image && <img src={image} alt={title || ""} className="info-popover-image" />}
          {title && <div className="info-popover-title">{title}</div>}
          <div>{content}</div>
          {visitUrl && (
            <a href={visitUrl} className="info-popover-visit" target="_blank" rel="noopener noreferrer">
              Visit →
            </a>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="info-trigger"
        onMouseEnter={canHover ? open : undefined}
        onMouseLeave={canHover ? delayedClose : undefined}
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        {children}
      </span>
      {ReactDOM.createPortal(popoverContent, document.body)}
    </>
  );
};

export default InfoPopover;
