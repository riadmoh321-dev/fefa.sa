import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../motion/Reveal";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import aboutImg from "../../assets/about-office.jpg";
import visionImg from "../../assets/vision-skyline.jpg";
import missionImg from "../../assets/mission-plans.jpg";
import { useLanguage } from "../../i18n/LanguageContext";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function IntroTriptych() {
  const { t, dir, language } = useLanguage();
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    { img: aboutImg, key: "intro.about", num: "01" },
    { img: visionImg, key: "intro.vision", num: "02" },
    { img: missionImg, key: "intro.mission", num: "03" },
  ];

  // Sync Carousel API state & active slide index
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto-carousel interval (4 seconds), pauses on hover/touch
  useEffect(() => {
    if (!api || isPaused) return;

    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [api, isPaused]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-background">
      {/* Decorative subtle background accents */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {t("hero.eyebrow")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight">
            {t("intro.about.title")}
          </h2>
        </Reveal>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative mt-10 lg:mt-14"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              direction: dir,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {cards.map((c) => (
                <CarouselItem
                  key={c.key}
                  className="pl-4 sm:pl-6 basis-[92%] sm:basis-[60%] lg:basis-[33.333%]"
                >
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-2 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
                  >
                    {/* Image container with number pill badge */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <img
                        src={c.img}
                        alt={t(`${c.key}.title`)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition duration-300 group-hover:opacity-40" />

                      {/* Number Badge */}
                      <div className="absolute top-3.5 start-3.5 flex h-9 w-9 items-center justify-center rounded-xl bg-background/80 backdrop-blur-md border border-border/60 text-xs font-bold text-gold shadow-md">
                        {c.num}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
                        {t(`${c.key}.eyebrow`)}
                      </span>
                      <h3 className="mt-2 text-lg sm:text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                        {t(`${c.key}.title`)}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {t(`${c.key}.body`)}
                      </p>

                      {/* Bottom line accent */}
                      <div className="mt-auto pt-5">
                        <div className="h-0.5 w-12 bg-gradient-to-r from-gold via-gold/50 to-transparent transition-all duration-500 group-hover:w-full" />
                      </div>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Bottom Controls: Indicators + Navigation */}
            <div className="mt-8 flex items-center justify-between px-2 sm:px-4">
              {/* Pagination Dot Indicators */}
              <div className="flex items-center gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      current === i
                        ? "w-8 bg-gold shadow-sm"
                        : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Custom Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background text-foreground shadow-sm transition hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                  aria-label="Previous slide"
                >
                  {language === "ar" ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => api?.scrollNext()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background text-foreground shadow-sm transition hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
                  aria-label="Next slide"
                >
                  {language === "ar" ? (
                    <ChevronLeft className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
