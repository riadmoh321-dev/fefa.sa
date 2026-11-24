import React from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import { BrandMark } from "./BrandMark";
import logoImg from "../assets/logo.png";

/**
 * High-End Responsive Brand Logo Component for FEFA Alsaudi Real Estate.
 *
 * @param {Object} props
 * @param {"lockup" | "image" | "symbol" | "auto"} [props.variant="lockup"]
 *   - "lockup": Vector emblem + localized Arabic/English typography + License subtitle.
 *   - "image": High-resolution official transparent PNG logo with adaptive brightness/filters.
 *   - "symbol": Iconic architectural "F" emblem only.
 * @param {"light" | "dark" | "gold" | "emerald" | "auto"} [props.tone="auto"]
 * @param {boolean} [props.isScrolled=false] - Whether navbar is currently in scrolled state
 * @param {boolean} [props.withLicense=true] - Whether to show the REGA license badge
 * @param {string} [props.className] - Container CSS classes
 * @param {string} [props.imageClassName] - CSS classes specifically for the logo image/mark
 */
export function BrandLogo({
  variant = "lockup",
  tone = "auto",
  isScrolled = false,
  withLicense = true,
  className = "",
  imageClassName = "",
  hideTextOnMobile = true,
  onClick,
}) {
  const { t, lang } = useLanguage();

  // Determine effective color tone based on scroll state if set to "auto"
  const effectiveTone = tone !== "auto" ? tone : isScrolled ? "dark" : "light";

  const isLight = effectiveTone === "light";

  if (variant === "image") {
    return (
      <Link
        to="/"
        onClick={onClick}
        className={`group flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
        aria-label="FEFA Alsaudi Real Estate Home"
      >
        <img
          src={logoImg}
          alt="FEFA Alsaudi Real Estate"
          className={`h-11 sm:h-12 w-auto object-contain transition-all duration-300 ${isLight
            ? "filter brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            : "filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            } ${imageClassName}`}
        />
      </Link>
    );
  }

  if (variant === "symbol") {
    return (
      <Link
        to="/"
        onClick={onClick}
        className={`group flex items-center justify-center transition-transform hover:scale-105 ${className}`}
        aria-label="FEFA Alsaudi Real Estate Home"
      >
        <BrandMark
          tone={effectiveTone}
          className={`h-10 w-10 sm:h-11 sm:w-11 ${imageClassName}`}
          accentWindows={true}
        />
      </Link>
    );
  }

  // Default: "lockup" (Vector Emblem + Localized Luxury Typography)
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group flex items-center gap-3.5 select-none transition-all duration-300 ${className}`}
      aria-label="FEFA Alsaudi Real Estate Home"
    >
      {/* Emblem with luxury gold window accents and subtle glow */}
      <div className="relative flex items-center justify-center">
        <BrandMark
          tone={effectiveTone}
          className={`transition-all duration-300 group-hover:scale-105 ${isScrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-10 w-10 sm:h-11 sm:w-11"
            } ${isLight
              ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              : "drop-shadow-[0_2px_4px_rgba(27,77,62,0.15)]"
            } ${imageClassName}`}
          accentWindows={true}
        />
      </div>

      {/* Brand Typography & License */}
      <div className={`${hideTextOnMobile ? "hidden md:flex" : "flex"} flex-col leading-tight`}>
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-tight transition-colors duration-300 ${isScrolled
              ? "text-foreground text-[15px] sm:text-[16px]"
              : "text-white text-[15px] sm:text-[16px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
              }`}
          >
            {t("brand.full")}
          </span>
        </div>

        {withLicense && (
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`text-[10.5px] font-medium tracking-wide transition-colors duration-300 ${isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}
            >
              {t("brand.license")}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
