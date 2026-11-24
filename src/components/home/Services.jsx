import { motion } from "framer-motion";
import { Home, Building, Banknote, LineChart, Megaphone, KeyRound } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "../motion/Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

const icons = [Home, Building, Banknote, LineChart, Megaphone, KeyRound];

export function Services() {
  const { t } = useLanguage();
  const list = t("services.list") || [];
  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t("services.eyebrow")}</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {t("services.title")}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {list.map((s, i) => {
            const Icon = icons[i] || Home;
            return (
              <motion.div
                key={s.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl border border-border/60 bg-card p-4 transition hover:border-gold/60 hover:shadow-elegant lg:p-5"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary transition group-hover:bg-gold group-hover:text-ink">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-foreground sm:text-base">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
