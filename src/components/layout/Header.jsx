import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, Home, Sparkles, HelpCircle, ArrowUpRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { BrandLogo } from "../BrandLogo";
import { LanguageToggle } from "./LanguageToggle";

const links = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/consultation", key: "nav.consultation", icon: Sparkles },
  { to: "/faqs", key: "nav.faqs", icon: HelpCircle },
];

export function Header() {
  const { t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.06)] py-3"
        : "bg-gradient-to-b from-black/55 via-black/20 to-transparent py-4 sm:py-5"
        }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Left Spacer to balance flex layout */}
        <div className="flex items-center gap-3"></div>

        {/* Brand Logo & Name - Pinned in absolute center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <BrandLogo variant="image" isScrolled={scrolled} withLicense={true} />
        </div>

        {/* Desktop Navigation Links */}
        {/* <nav className="hidden items-center gap-1 lg:flex bg-black/[0.04] dark:bg-white/[0.04] p-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-sm">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                data-active={active}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? scrolled
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-white/20 text-white shadow-sm backdrop-blur-md"
                    : scrolled
                      ? "text-foreground/75 hover:text-foreground hover:bg-black/[0.03]"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav> */}

        {/* Desktop Actions (Phone CTA + Language Switcher) */}
        <div className="hidden items-center gap-3 lg:flex relative z-10">
          <a
            href="tel:920016546"
            className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${scrolled
              ? "bg-primary text-primary-foreground shadow-elegant hover:bg-emerald-mid"
              : "bg-gradient-to-r from-[#e8c977] via-[#c5a044] to-[#b38d32] text-ink shadow-gold hover:shadow-lg hover:shadow-gold/25"
              }`}
            aria-label="Call 920016546"
          >
            <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            <span dir="ltr" className="tracking-wide">
              920016546
            </span>
          </a>

          <LanguageToggle
            className={
              scrolled
                ? ""
                : "border-white/25 bg-white/10 text-white hover:border-gold hover:text-gold hover:bg-white/15"
            }
          />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden relative z-10">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all ${scrolled
              ? "border-border/60 bg-background/80 text-foreground"
              : "border-white/25 bg-white/15 text-white backdrop-blur-md"
              }`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden border-t border-border/60 bg-background/98 backdrop-blur-2xl shadow-2xl my-5"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6">
              {/* Navigation Links */}
              {/* <div className="space-y-1.5">
                {links.map((l) => {
                  const active = pathname === l.to;
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-gradient-to-r from-[#c5a044]/15 to-[#c5a044]/5 text-[#9e7a20] font-semibold border border-[#c5a044]/30 shadow-xs"
                          : "text-foreground/85 hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            active
                              ? "bg-[#c5a044]/20 text-[#9e7a20]"
                              : "bg-muted/70 text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[14.5px]">{t(l.key)}</span>
                      </div>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform ${
                          active ? "text-[#c5a044]" : "text-muted-foreground/40"
                        } ${dir === "rtl" ? "rotate-90" : ""}`}
                      />
                    </Link>
                  );
                })}
              </div> */}

              {/* Utility Row: Language Switcher */}
              <div className="flex items-center justify-between rounded-xl bg-muted/30 border border-border/50 px-4 py-2.5">
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#c5a044]/10 text-[#9e7a20]">
                    <Globe className="h-3.5 w-3.5" />
                  </div>
                  <span>{dir === "rtl" ? "اللغة المفضلة" : "Language"}</span>
                </div>
                <LanguageToggle className="h-8 px-3 text-xs shadow-none border-border/70 hover:border-[#c5a044] hover:text-[#9e7a20] bg-background" />
              </div>

              {/* Action Section: Phone CTA + Official License */}
              <div className="pt-2 border-t border-border/40 space-y-2.5">
                <a
                  href="tel:920016546"
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#e8c977] via-[#c5a044] to-[#b38d32] py-3 text-sm font-semibold text-ink shadow-gold hover:shadow-lg transition-all active:scale-[0.99]"
                >
                  <Phone className="h-4 w-4" />
                  <span dir="ltr" className="tracking-wide font-bold">
                    {t("common.callUs")}: 920016546
                  </span>
                </a>

                {/* License Tag */}
                <p className="text-center text-[10.5px] text-muted-foreground/75 tracking-wide pt-0.5">
                  {t("brand.license")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
