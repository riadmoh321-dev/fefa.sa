import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroImg from "../../assets/hero.jpeg";
import { useLanguage } from "../../i18n/LanguageContext";

export function Hero() {
  const { t, dir } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="h-[115%] w-full object-cover"
          width={1920}
          height={1200}
        />
      </motion.div>
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.55),transparent_60%)]" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24 lg:px-10"
      >
        {/* <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {t("hero.eyebrow")}
        </motion.span> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/consultation"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink shadow-gold transition hover:-translate-y-0.5"
          >
            {t("common.requestConsultation")}
            <Arrow className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
          {/* <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            {t("common.contactUs")}
          </Link> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-16 flex items-center gap-4 text-xs uppercase tracking-widest text-white/60"
        >
          <span className="h-px w-12 bg-gold/60" />
          {t("brand.license")}
        </motion.div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}
