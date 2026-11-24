import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { BrandLogo } from "../BrandLogo";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--gold),transparent_45%)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-1">
          <BrandLogo variant="lockup" isScrolled={false} withLicense={true} hideTextOnMobile={false} />
          <p className="mt-4 text-sm opacity-80 leading-relaxed">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link to="/" className="hover:text-gold transition">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/consultation" className="hover:text-gold transition">
                {t("nav.consultation")}
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gold transition">
                {t("nav.faqs")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t("footer.contactTitle")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              {t("contact.riyadh")}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
              {t("contact.jeddah")}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              920016546
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              contact@fefa.sa
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
            {t("contact.followTitle")}
          </h4>
          <div className="mt-4 flex gap-3">
            <SocialLink
              href="https://www.facebook.com/people/%D9%81%D9%8A%D9%81%D8%A7-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9-%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9/61580280413784/"
              label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/fefa.saudi.realestate/" label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@fefa.sa" label="TikTok">
              <span className="text-[10px] font-bold">TT</span>
            </SocialLink>
            <SocialLink href="https://www.snapchat.com/@fefa.sa" label="Snapchat">
              <span className="text-[10px] font-bold">SC</span>
            </SocialLink>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {t("brand.full")} — {t("footer.rights")}
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-gold hover:text-gold hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
