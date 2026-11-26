"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO } from "@/data/home";
import { IMAGES } from "@/data/images";
import {
  LinkedinIcon,
  FacebookIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/ui/social-icons";
import { useLanguage } from "@/components/providers/language-provider";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
};

interface Slide {
  type: "video" | "image";
  src: string;
}

const SLIDES: Slide[] = [
  { type: "video", src: IMAGES.hero.video },
  ...IMAGES.hero.slides.map((src: string) => ({ type: "image" as const, src })),
];

export const Hero = () => {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const delay = current === 0 ? 15000 : 6500;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [current, paused]);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal flex flex-col justify-between"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {SLIDES[current].type === "video" ? (
              <video
                key={SLIDES[current].src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // poster="/class-picture.jpg"
                className="h-full w-full object-cover"
                aria-label="University of Swat student video"
              >
                <source src={SLIDES[current].src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={SLIDES[current].src}
                alt="University of Swat campus and Swat Valley"
                fill
                priority={current === 1}
                className="object-cover"
                sizes="100vw"
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-charcoal/20 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-charcoal/10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-end pt-28 sm:pt-36 lg:pt-40 xl:pt-[160px] pb-20 sm:pb-20 lg:pb-24">
        <div className="max-w-[980px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 flex items-center gap-3 sm:gap-4"
          >
            <span aria-hidden="true" className="h-px w-10 sm:w-14 bg-white/60" />
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-white/85">
              {language === "ur" ? "یونیورسٹی آف سوات" : "University of Swat · Est. 2010"}
            </span>
          </motion.div>
          <h1
            className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-semibold text-white text-balance leading-[1.08] sm:leading-[1.06] mb-4 sm:mb-6 tracking-[-0.03em]"
          >
            {language === "ur" ? "معیار کی تعلیم، وابستگی کے ساتھ" : HERO.headline}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-10 max-w-[640px] font-light leading-relaxed drop-shadow-sm"
          >
            {language === "ur"
              ? "جامعہ سوات 2010 میں قائم ہوئی اور سوات اور وسیع علاقے کو تعلیم، تحقیق اور کمیونٹی کی خدمات فراہم کرتی ہے۔"
              : HERO.subtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none"
          >
            <Button href="/about" variant="secondary" size="lg" className="w-full sm:w-auto text-center justify-center px-8 sm:px-10 text-base sm:text-lg">
              {language === "ur" ? "مزید پڑھیں" : "Learn More"}
            </Button>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 rounded-none text-base sm:text-lg font-medium border border-white text-white hover:bg-white hover:text-charcoal transition-colors text-center backdrop-blur-xs bg-black/10 sm:bg-transparent"
            >
              {language === "ur" ? "تعلیمی پروگرام" : "Explore Programs"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 sm:w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-1">
        {HERO.social.map((social) => {
          const Icon = SOCIAL_ICONS[social.icon];
          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/15 transition-colors text-white"
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
        <div className="w-px h-10 bg-white/30 my-3" />
        <Link
          href="#about"
          className="flex flex-col items-center gap-1 text-[10px] tracking-widest text-white/70 hover:text-white transition-colors"
        >
          {HERO.scroll} <ChevronDown className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
};
