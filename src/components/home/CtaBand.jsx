import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export function CtaBand() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="relative overflow-hidden rounded-3xl bg-cta-gradient p-10 shadow-elegant lg:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-black/20 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("cta.title")}</h2>
              <p className="mt-4 text-white/80">{t("cta.body")}</p>
            </div>
            <Link
              to="/consultation"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary shadow-gold transition hover:-translate-y-0.5"
            >
              {t("cta.button")}
              <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
