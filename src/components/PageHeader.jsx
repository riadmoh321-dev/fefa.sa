import { motion } from "framer-motion";

export function PageHeader({ eyebrow, title, body }) {
  return (
    <section className="relative overflow-hidden bg-primary pt-40 pb-20 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-glow/40 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80"
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
