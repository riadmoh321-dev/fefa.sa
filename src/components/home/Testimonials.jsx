import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useLanguage } from "../../i18n/LanguageContext";

export function Testimonials() {
  const { t, dir } = useLanguage();
  const reviews = t("testimonials.reviews") || [];

  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-20">
      <div className="absolute inset-y-0 start-0 w-1/3 bg-[radial-gradient(circle_at_center,var(--gold),transparent_68%)] opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            {t("testimonials.eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h2>
        </Reveal>

        <Carousel opts={{ align: "start", loop: true, direction: dir }} className="mt-10">
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={review.name} className="basis-[92%] pl-4 md:basis-1/2">
                <motion.figure
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm lg:p-7"
                >
                  <div className="flex items-center justify-between">
                    <Quote className="h-7 w-7 text-gold" aria-hidden />
                    <div className="flex gap-0.5" aria-label={t("testimonials.ratingLabel")}>
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star key={star} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-5 flex-1 text-base leading-8 text-white/90">
                    “{review.body}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-bold text-ink">
                      {review.initials}
                    </span>
                    <span>
                      <span className="block font-semibold">{review.name}</span>
                      <span className="mt-0.5 block text-xs text-white/60">{review.type}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="start-0 top-auto right-auto bottom-[-3rem] left-auto hidden translate-y-0 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white sm:inline-flex" />
          <CarouselNext className="start-11 top-auto right-auto bottom-[-3rem] left-auto hidden translate-y-0 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
