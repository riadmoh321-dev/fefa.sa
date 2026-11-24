import { Counter } from "../motion/Counter";
import { Reveal } from "../motion/Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export function StatBand() {
  const { t, language } = useLanguage();
  const stats = [
    { id: "years", value: 15, suffix: "+", label: t("stats.years"), caption: t("stats.yearsCaption") },
    { id: "clients", value: 2500, suffix: "+", label: t("stats.clients"), caption: t("stats.clientsCaption") },
    { id: "deals", value: 800, suffix: "+", label: t("stats.deals"), caption: t("stats.dealsCaption") },
  ];
  return (
    <section className="relative overflow-hidden bg-primary py-12 text-primary-foreground lg:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-glow/40 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 sm:gap-6 sm:px-6 lg:px-10">
        {stats.map((s, i) => (
          <Reveal key={`${s.id}-${language}`} delay={i * 0.1} className="min-w-0 text-center md:text-start">
            <div className="flex flex-col items-center justify-center sm:flex-row sm:items-baseline sm:gap-1 md:justify-start">
              <Counter
                to={s.value}
                suffix={s.suffix}
                className="text-3xl font-bold text-gradient-gold sm:text-5xl lg:text-7xl"
              />
              <span className="text-xs font-medium text-gold/90 sm:text-base lg:text-xl">
                {s.label}
              </span>
            </div>
            <p className="mt-3 hidden text-sm text-white/70 sm:block">{s.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
