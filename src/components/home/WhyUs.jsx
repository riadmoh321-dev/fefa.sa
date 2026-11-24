import { motion } from "framer-motion";
import { Sparkles, Building2, Handshake } from "lucide-react";
import { Reveal, Stagger, staggerItem } from "../motion/Reveal";
import { useLanguage } from "../../i18n/LanguageContext";

export function WhyUs() {
  const { t } = useLanguage();
  const items = [
    { key: "why.items.values", Icon: Sparkles },
    { key: "why.items.services", Icon: Building2 },
    { key: "why.items.trust", Icon: Handshake },
  ];
  return (
    <section className="relative bg-secondary/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{t("why.eyebrow")}</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {t("why.title")}
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map(({ key, Icon }) => (
            <motion.div
              key={key}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border/60 transition hover:shadow-elegant lg:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
              <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-elegant">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}.body`)}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
