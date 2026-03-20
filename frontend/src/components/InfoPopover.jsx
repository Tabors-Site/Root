import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import "./InfoPopover.css";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
const NARROW_BREAKPOINT = 600;

const InfoPopover = ({ children, content, title, image, visitUrl, side }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const leaveTimer = useRef(null);
  const posRef = useRef({ top: 0, left: 0, placement: "above", narrow: false });

  const computeLayout = useCallback(() => {
    const narrow = window.innerWidth < NARROW_BREAKPOINT;
    if (narrow) {
      posRef.current = { top: 0, left: 0, placement: "centered", narrow: true };
      return;
    }
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = 320;
    const popoverHeight = 160;
    const gap = 12;
    let top, left, placement;

    if (side) {
      top = rect.top + rect.height / 2 - popoverHeight / 2;
      top = Math.max(10, Math.min(top, window.innerHeight - popoverHeight - 10));
      if (rect.right + gap + popoverWidth < window.innerWidth - 10) {
        left = rect.right + gap;
        placement = "right";
      } else {
        left = rect.left - popoverWidth - gap;
        placement = "left";
      }
    } else {
      if (rect.top > popoverHeight + gap) {
        top = rect.top - popoverHeight - gap;
        placement = "above";
      } else {
        top = rect.bottom + gap;
        placement = "below";
      }
      left = rect.left + rect.width / 2 - popoverWidth / 2;
      left = Math.max(10, Math.min(left, window.innerWidth - popoverWidth - 10));
    }

    posRef.current = { top, left, placement, narrow: false };
  }, [side]);

  const open = useCallback(() => {
    clearTimeout(leaveTimer.current);
    computeLayout();
    setIsOpen(true);
  }, [computeLayout]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const delayedClose = useCallback(() => {
    leaveTimer.current = setTimeout(close, 150);
  }, [close]);

  const cancelClose = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  // Close on scroll (wide screens)
  useEffect(() => {
    if (!isOpen || posRef.current.narrow) return;
    const handleScroll = () => close();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen, close]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
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

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < NARROW_BREAKPOINT) return;
    open();
  }, [open]);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth < NARROW_BREAKPOINT) return;
    delayedClose();
  }, [delayedClose]);

  const handleTriggerClick = (e) => {
    if (!canHover || window.innerWidth < NARROW_BREAKPOINT) {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen) {
        close();
      } else {
        open();
      }
    }
  };

  const { top, left, placement, narrow } = posRef.current;

  const popoverContent = (
    <>
      {narrow && isOpen && <div className="info-popover-backdrop" onClick={close} />}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`info-popover ${placement}`}
          style={!narrow ? { top, left } : undefined}
          onMouseEnter={!narrow ? cancelClose : undefined}
          onMouseLeave={!narrow ? handleMouseLeave : undefined}
        >
          {narrow && (
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
        onMouseEnter={canHover ? handleMouseEnter : undefined}
        onMouseLeave={canHover ? handleMouseLeave : undefined}
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
