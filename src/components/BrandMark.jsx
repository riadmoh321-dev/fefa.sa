import React from "react";

/**
 * Precision Vector Brand Mark for FEFA Alsaudi Real Estate.
 * Features the signature architectural "F" monogram with the integrated
 * house silhouette and 4 window panes (representing property, shelter, and modern development).
 *
 * @param {Object} props
 * @param {string} [props.className] - CSS classes for sizing and styling
 * @param {"dark" | "light" | "gold" | "emerald" | "dual" | "auto"} [props.tone="auto"] - Color theme
 * @param {boolean} [props.accentWindows=true] - Whether window panes use luxury gold accent
 * @param {boolean} [props.interactive=true] - Subtle hover micro-animation
 */
export function BrandMark({
  className = "h-10 w-10",
  tone = "auto",
  accentWindows = true,
  interactive = false,
  ...props
}) {
  // Color resolution based on tone
  let mainColor = "currentColor";
  let windowColor = "var(--gold, #c5a044)";

  switch (tone) {
    case "light":
      mainColor = "#ffffff";
      windowColor = accentWindows ? "var(--gold, #c5a044)" : "#ffffff";
      break;
    case "dark":
      mainColor = "var(--emerald-deep, #1b4d3e)";
      windowColor = accentWindows ? "var(--gold, #c5a044)" : "var(--emerald-deep, #1b4d3e)";
      break;
    case "emerald":
      mainColor = "var(--emerald-deep, #1b4d3e)";
      windowColor = accentWindows ? "var(--gold, #c5a044)" : "var(--emerald-mid, #2c6e59)";
      break;
    case "gold":
      mainColor = "var(--gold, #c5a044)";
      windowColor = "#ffffff";
      break;
    case "dual":
      mainColor = "var(--emerald-deep, #1b4d3e)";
      windowColor = "var(--gold, #c5a044)";
      break;
    case "auto":
    default:
      mainColor = "currentColor";
      windowColor = accentWindows ? "var(--gold, #c5a044)" : "currentColor";
      break;
  }

  return (
    <svg
      className={`shrink-0 transition-transform duration-300 ${interactive ? "hover:scale-105" : ""} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FEFA Alsaudi Logo"
      {...props}
    >
      <defs>
        {/* Luxury Gold Gradient for accents */}
        <linearGradient id="fefaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c977" />
          <stop offset="50%" stopColor="#c5a044" />
          <stop offset="100%" stopColor="#9a7628" />
        </linearGradient>

        {/* Subtle drop glow for dark headers */}
        <filter id="fefaGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#fefaGlow)">
        {/*
          Architectural Monogram "F" with House Roof Cutout:
          - Top horizontal bar: (14,10) to (88,10) -> down to (88,30) -> (36,30)
          - Middle horizontal bar: (36,46) to (84,46) -> down to (84,66)
          - House cutout roofline: peaks at (52, 54), slopes to (26, 70) and (84, 70)
          - Stem & base: left wall (14,10) to (14,92)
        */}
        <path
          d="M14 10 H88 V30 H36 V46 H84 V66 L52 50 L26 66 V92 H14 V10 Z"
          fill={mainColor}
          fillRule="evenodd"
          clipRule="evenodd"
        />

        {/* The House Structure / Window Quad (2x2 Grid) in the lower cutout */}
        <g fill={windowColor === "var(--gold, #c5a044)" ? "url(#fefaGoldGrad)" : windowColor}>
          {/* Top-Left Window */}
          <rect x="40" y="66" width="9" height="9" rx="1" />
          {/* Top-Right Window */}
          <rect x="54" y="66" width="9" height="9" rx="1" />
          {/* Bottom-Left Window */}
          <rect x="40" y="79" width="9" height="9" rx="1" />
          {/* Bottom-Right Window */}
          <rect x="54" y="79" width="9" height="9" rx="1" />
        </g>
      </g>
    </svg>
  );
}
