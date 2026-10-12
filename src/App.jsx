import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Gem,
  Sparkles,
  Sparkle,
  Smile,
  SmilePlus,
  Eye,
  CircleDot,
  PenTool,
  Brush,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Check,
  MapPin,
  Phone,
  ArrowUpRight,
  Navigation,
  Maximize2,
} from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

/* ====================================================================
   CONFIG — change contact details here
   ==================================================================== */
const BRAND = "inkedbynnaya";
const WHATSAPP = "2347052747757"; // international format, no + or spaces
const PHONE_DISPLAY = "0705 274 7757";
const PHONE_TEL = "+2347052747757";
const ADDRESS_LINE = "Ikota Shopping Complex, Lekki-Ajah, Lagos";
const TIKTOK = "https://www.tiktok.com/@inked_by_nnaya";
const MAP_QUERY = encodeURIComponent(
  "Ikota Shopping Complex, Lekki-Ajah, Lagos, Nigeria",
);
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const img = (n) => `/images/${n}`;
const BOOK = wa("Hello inkedbynnaya, I would like to book an appointment.");

/* ====================================================================
   CONTENT
   ==================================================================== */
const SERVICES = [
  {
    icon: Gem,
    title: "Back Dermal Piercing",
    text: "Subtle sparkle along your lower back.",
    image: "back-dermal.webp",
    pos: "50% 62%",
  },
  {
    icon: Sparkles,
    title: "Tooth Gems",
    text: "Tiny crystals, big smile.",
    image: "tooth-gems.webp",
    pos: "50% 40%",
  },
  {
    icon: Smile,
    title: "Fashion Braces",
    text: "Colourful and double power chains.",
    image: "braces-teal.webp",
    pos: "55% 52%",
  },
  {
    icon: SmilePlus,
    title: "Teeth Whitening",
    text: "A brighter, fresher smile.",
    image: "whitening-braces.webp",
    pos: "55% 52%",
  },
  {
    icon: Eye,
    title: "Lash Extension",
    text: "Full, fluttery lashes.",
    image: "clean-brows.webp",
    pos: "50% 55%",
  },
  {
    icon: Star,
    title: "Doll Eyes with Spikes",
    text: "Wide-eyed doll look with spiked lashes.",
    image: "doll-eyes.webp",
    pos: "50% 42%",
  },
  {
    icon: CircleDot,
    title: "Eyebrow Piercing",
    text: "Classic and anti-eyebrow placements.",
    image: "eyebrow-piercing.webp",
    pos: "50% 50%",
  },
  {
    icon: Sparkle,
    title: "Nose Piercing",
    text: "Stud or ring, placed to flatter you.",
    image: "nose-piercing.webp",
    pos: "50% 50%",
  },
  {
    icon: Gem,
    title: "Body Piercing",
    text: "Tell us where you want it.",
    image: null,
  },
  {
    icon: PenTool,
    title: "Permanent Tattoo",
    text: "Custom ink made to stay.",
    image: null,
  },
  {
    icon: Brush,
    title: "Semi-Permanent Tattoo",
    text: "Softer ink for a lighter commitment.",
    image: null,
  },
];

const SLIDES = [
  {
    title: "Tooth Gems",
    tag: "Smile · Sparkle",
    image: "tooth-gems.webp",
    pos: "50% 38%",
  },
  {
    title: "Back Dermal Piercing",
    tag: "Piercing",
    image: "back-dermal.webp",
    pos: "50% 62%",
  },
  {
    title: "Fashion Braces",
    tag: "Smile",
    image: "braces-teal.webp",
    pos: "55% 52%",
  },
  {
    title: "Nose Piercing",
    tag: "Piercing",
    image: "nose-piercing.webp",
    pos: "50% 50%",
  },
  {
    title: "Doll Eyes with Spikes",
    tag: "Lashes",
    image: "doll-eyes.webp",
    pos: "50% 42%",
  },
  {
    title: "Double Power Chain",
    tag: "Fashion braces",
    image: "power-chain-pink.webp",
    pos: "55% 55%",
  },
];

const GALLERY = [
  { image: "tooth-gems.webp", label: "Tooth gems" },
  { image: "power-chain-pink.webp", label: "Double power chain" },
  { image: "back-dermal.webp", label: "Back dermal piercing" },
  { image: "doll-eyes.webp", label: "Doll eyes with spikes" },
  { image: "nose-piercing.webp", label: "Nose piercing" },
  { image: "braces-teal.webp", label: "Fashion braces" },
  { image: "eyebrow-piercing.webp", label: "Eyebrow piercing" },
  { image: "whitening-braces.webp", label: "Teeth whitening & braces" },
  { image: "anti-eyebrow.webp", label: "Anti-eyebrow piercing" },
  { image: "power-chain-black.webp", label: "Double power chain" },
  { image: "clean-brows.webp", label: "Lashes & brows" },
];

const STEPS = [
  {
    n: "01",
    t: "Message us",
    d: "Tap the WhatsApp button and tell us the service you want. Send reference pictures if you have them.",
  },
  {
    n: "02",
    t: "Pick your time",
    d: "We confirm the details and a time that works for you.",
  },
  {
    n: "03",
    t: "Visit the studio",
    d: "Come to Ikota Shopping Complex, Lekki-Ajah and leave glowing.",
  },
];

/* ====================================================================
   MOTION HELPERS
   Each card reveals when IT scrolls into view (works on mobile stacks too)
   ==================================================================== */
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: (i % 4) * 0.08,
    },
  }),
};
const reveal = (i = 0) => ({
  variants: itemVariants,
  custom: i,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-40px" },
});
const fromLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};
const fromRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ====================================================================
   SMALL PIECES
   ==================================================================== */
function SectionHead({ eyebrow, title, sub, align = "center" }) {
  return (
    <motion.div
      {...reveal(0)}
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-5 text-white/60">{sub}</p>}
      <div
        className={`mt-6 flex items-center gap-3 text-rose-500 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-px w-12 bg-rose-500/50" />
        <Sparkle size={14} />
        <span className="h-px w-12 bg-rose-500/50" />
      </div>
    </motion.div>
  );
}

function FloatingSparkles() {
  const spots = [
    ["3%", "30%", 22, "0s"],
    ["95%", "14%", 28, "1s"],
    ["92%", "74%", 18, "2s"],
    ["5%", "82%", 26, "1.5s"],
    ["97%", "44%", 16, "0.5s"],
    ["2%", "55%", 14, "2.5s"],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {spots.map(([l, t, s, d], k) => (
        <Sparkle
          key={k}
          size={s}
          className="absolute text-rose-300/70 animate-twinkle"
          style={{ left: l, top: t, animationDelay: d }}
        />
      ))}
    </div>
  );
}

function Logo({ size = "h-11 w-11" }) {
  return <img src="/logo-mark.svg" alt={`${BRAND} logo`} className={size} />;
}

/* ====================================================================
   NAV
   ==================================================================== */

   const NAV_OFFSET = 64; // height of the fixed header

function smoothScrollTo(hash) {
  const id = hash.replace("#", "");
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;

  // recalculated every frame so lazy-loaded images can't throw it off
  const getTarget = () =>
    id === "top" ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: getTarget(), behavior: "instant" });
    return;
  }

  const startY = window.scrollY;
  const duration = Math.min(1100, Math.max(500, Math.abs(getTarget() - startY) * 0.5));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let t0 = null;
  let cancelled = false;

  const cancel = () => { cancelled = true; };
  const cleanup = () => {
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("wheel", cancel);
  };
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("wheel", cancel, { passive: true });

  const step = (now) => {
    if (cancelled) return cleanup();
    if (t0 === null) t0 = now;
    const p = Math.min(1, (now - t0) / duration);
    const y = startY + (getTarget() - startY) * ease(p);
    window.scrollTo({ top: y, behavior: "instant" });
    if (p < 1) requestAnimationFrame(step);
    else cleanup();
  };
  requestAnimationFrame(step);
}

const goTo = (e, hash, after) => {
  e.preventDefault();
  smoothScrollTo(hash);
  history.replaceState(null, "", hash);
  after?.();
};

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    ["Services", "#services"],
    ["Smile Studio", "#smile"],
    ["Piercings", "#piercing"],
    ["Gallery", "#gallery"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "glass border-x-0 border-t-0 bg-ink-950/75" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" onClick={(e) => goTo(e, "#top")} className="flex items-center gap-2.5" aria-label={BRAND}>
          <Logo />
          <span className="font-display text-xl font-semibold tracking-wide">
            inked<span className="text-rose-400">by</span>nnaya
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={(e) => goTo(e, h)}
              className="text-sm text-white/70 transition hover:text-rose-300"
            >
              {l}
            </a>
          ))}
          <a
            href={BOOK}
            target="_blank"
            rel="noreferrer"
            className="btn-rose !py-2.5"
          >
            <FaWhatsapp size={16} /> Book Now
          </a>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden border-x-0 bg-ink-950/90 md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {links.map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  onClick={(e) => {
                    goTo(e, h);
                    setOpen(false);
                  }}
                  className="text-lg text-white/80"
                >
                  {l}
                </a>
              ))}
              <a
                href={BOOK}
                target="_blank"
                rel="noreferrer"
                className="btn-rose"
              >
                <FaWhatsapp size={18} /> Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ====================================================================
   HERO
   ==================================================================== */
function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3a1428_0%,#16101a_45%,#09080a_100%)]" />
      <FloatingSparkles />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-rose-600/25 blur-[120px] animate-float" />
      <div
        className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-rose-400/15 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            variants={itemVariants}
            className="hidden md:block eyebrow mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-rose-400" /> Tattoo · Piercing · Smile
            &amp; Lash Studio
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Body art that makes you{" "}
            <span className="rose-text italic">glow.</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/65"
          >
            Permanent &amp; semi permanent tattoos, body piercing, tooth gems,
            fashion braces, teeth whitening and lash extensions all at Ikota
            Shopping Complex, Lekki-Ajah, Lagos.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={BOOK}
              target="_blank"
              rel="noreferrer"
              className="btn-rose"
            >
               Book Now
            </a>
            <a href="#gallery" className="btn-ghost">
              See our work <ArrowUpRight size={16} />
            </a>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="hidden md:block mt-12 flex flex-wrap gap-x-9 gap-y-4 text-sm text-white/55"
          >
            {[
              "Lekki-Ajah, Lagos",
              "Book via WhatsApp",
              "11 beauty & body services",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check size={16} className="text-rose-400" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <HeroCarousel />
      </div>
    </section>
  );
}

function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = () => setI((v) => (v - 1 + n) % n);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);
  const s = SLIDES[i];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-rose-500/35 via-rose-700/20 to-transparent blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-3">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
          className="relative aspect-[4/5] cursor-grab touch-pan-y overflow-hidden rounded-[1.5rem] bg-ink-800 active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={s.image}
              src={img(s.image)}
              alt={s.title}
              draggable={false}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: s.pos }}
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 p-6"
            >
              <span className="eyebrow !text-[10px]">{s.tag}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">
                {s.title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="flex items-center justify-between px-3 pb-2 pt-4">
          <div className="flex gap-2">
            {SLIDES.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-rose-400" : "w-3 bg-white/25"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-rose-400 hover:text-rose-400"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-rose-400 hover:text-rose-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ====================================================================
   MARQUEE
   ==================================================================== */
function Marquee() {
  const words = [
    "Tattoos",
    "Piercings",
    "Tooth Gems",
    "Fashion Braces",
    "Lash Extensions",
    "Teeth Whitening",
    "Doll Eyes",
    "Dermal Piercing",
  ];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-rose-500/20 bg-ink-900 py-5">
      <div className="flex w-max animate-marquee gap-12">
        {row.map((w, k) => (
          <span
            key={k}
            className="flex items-center gap-12 font-display text-2xl italic text-white/70"
          >
            {w}
            <Sparkle size={14} className="text-rose-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   SERVICES
   ==================================================================== */
function Services() {
  return (
    <section id="services" className="relative scroll-mt-16 bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="What we do"
          title="Everything you need to feel your best"
          sub="Pick a service and message us on WhatsApp — we’ll take it from there."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text, image, pos }, i) => (
            <motion.a
              key={title}
              {...reveal(i)}
              whileHover={{ y: -8 }}
              href={wa(`Hello inkedbynnaya, I would like to book: ${title}.`)}
              target="_blank"
              rel="noreferrer"
              className="glass group relative flex flex-col overflow-hidden rounded-3xl transition-colors hover:border-rose-500/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {image ? (
                  <img
                    src={img(image)}
                    alt={title}
                    loading="lazy"
                    style={{ objectPosition: pos }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-rose-700/40 via-ink-800 to-rose-500/20">
                    <Icon
                      size={64}
                      strokeWidth={1.2}
                      className="text-rose-300/80 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-rose-300 backdrop-blur">
                  <Icon size={16} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55 sm:text-sm">
                  {text}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-rose-300 transition-all group-hover:gap-2 sm:text-sm">
                  Book now <ChevronRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
          <motion.a
            {...reveal(SERVICES.length)}
            whileHover={{ y: -8 }}
            href={wa("Hello inkedbynnaya, I need help choosing a service.")}
            target="_blank"
            rel="noreferrer"
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-500/20 to-rose-800/20 p-6 text-center"
          >
            <FaWhatsapp size={34} className="mb-4 text-rose-300" />
            <h3 className="font-display text-xl font-semibold">
              Not sure what to book?
            </h3>
            <p className="mt-2 text-xs text-white/60 sm:text-sm">
              Chat with us and we’ll guide you.
            </p>
            <span className="btn-rose mt-5 !px-5 !py-2.5 text-xs">
              Ask Us <ArrowUpRight size={12} />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   SMILE STUDIO
   ==================================================================== */
function SmileStudio() {
  const points = [
    ["Tooth gems", "Sparkling crystals placed on your teeth."],
    ["Fashion braces", "Pink, teal, black — single and double power chains."],
    ["Teeth whitening", "Brighten your smile before you show it off."],
  ];
  return (
    <section id="smile" className="relative scroll-mt-16 overflow-hidden py-14">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-600/20 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          {...fromLeft}
          className="relative mx-auto h-[34rem] w-full max-w-md sm:h-[38rem]"
        >
          <img
            src={img("tooth-gems.webp")}
            alt="Tooth gems"
            loading="lazy"
            className="absolute left-0 top-0 h-[68%] w-[58%] -rotate-3 rounded-3xl border border-white/10 object-cover shadow-2xl"
            style={{ objectPosition: "50% 38%" }}
          />
          <img
            src={img("power-chain-pink.webp")}
            alt="Pink double power chain braces"
            loading="lazy"
            className="absolute right-0 top-[8%] h-[58%] w-[48%] rotate-3 rounded-3xl border border-white/10 object-cover shadow-2xl"
            style={{ objectPosition: "55% 55%" }}
          />
          <img
            src={img("braces-teal.webp")}
            alt="Fashion braces"
            loading="lazy"
            className="absolute bottom-0 left-[22%] h-[44%] w-[56%] rotate-1 rounded-3xl border border-rose-400/40 object-cover shadow-[0_0_50px_rgba(255,77,151,0.3)]"
            style={{ objectPosition: "55% 52%" }}
          />
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="glass absolute -right-1 bottom-[8%] rounded-2xl px-4 py-3 text-xs text-white/80 sm:-right-4"
          >
            <Sparkles size={16} className="mb-1 text-rose-300" /> Smile glow-up
          </motion.span>
        </motion.div>

        <div>
          <motion.p {...reveal(0)} className="eyebrow mb-4">
            Smile studio
          </motion.p>
          <motion.h2
            {...reveal(1)}
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Your smile, <span className="rose-text italic">upgraded.</span>
          </motion.h2>
          <motion.p
            {...reveal(2)}
            className="mt-6 leading-relaxed text-white/65"
          >
            From dainty tooth gems to bold double power chains, we help you wear
            your smile with confidence. Teeth whitening and fashion braces make
            every photo a good one.
          </motion.p>
          <ul className="mt-8 space-y-4">
            {points.map(([t, d], k) => (
              <motion.li
                key={t}
                {...reveal(k + 3)}
                className="glass flex items-start gap-4 rounded-2xl p-4"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rose-500/20 text-rose-300">
                  <Check size={16} />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold">
                    {t}
                  </span>
                  <span className="text-sm text-white/60">{d}</span>
                </span>
              </motion.li>
            ))}
          </ul>
          <motion.div {...reveal(6)} className="mt-10">
            <a
              href={wa(
                "Hello inkedbynnaya, I would like to book tooth gems / fashion braces / teeth whitening.",
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-rose"
            >
               Book your smile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   PIERCINGS
   ==================================================================== */
function Piercings() {
  const tiles = [
    ["eyebrow-piercing.webp", "Eyebrow piercing", "50% 50%"],
    ["anti-eyebrow.webp", "Anti-eyebrow piercing", "50% 50%"],
    ["nose-piercing.webp", "Nose piercing", "50% 50%"],
    ["back-dermal.webp", "Back dermal piercing", "50% 62%"],
  ];
  return (
    <section
      id="piercing"
      className="relative scroll-mt-16 overflow-hidden bg-ink-900 py-14"
    >
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-rose-500/15 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <motion.p {...reveal(0)} className="eyebrow mb-4">
            Piercing studio
          </motion.p>
          <motion.h2
            {...reveal(1)}
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Little details.{" "}
            <span className="rose-text italic">Big statement.</span>
          </motion.h2>
          <motion.p
            {...reveal(2)}
            className="mt-6 leading-relaxed text-white/65"
          >
            Eyebrow, anti-eyebrow, nose, back dermals and more. Tell us the look
            you’re after send a reference picture on WhatsApp and we’ll
            confirm the placement and jewellery with you before your
            appointment.
          </motion.p>
          <motion.div {...reveal(3)} className="mt-8 flex flex-wrap gap-3">
            {[
              "Eyebrow",
              "Anti-eyebrow",
              "Nose",
              "Back dermal",
              "Body piercing",
              "Body care",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div {...reveal(4)} className="mt-10">
            <a
              href={wa("Hello inkedbynnaya, I would like to book a piercing.")}
              target="_blank"
              rel="noreferrer"
              className="btn-rose"
            >
              <FaWhatsapp size={18} /> Book a piercing
            </a>
          </motion.div>
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
          {tiles.map(([f, label, pos], k) => (
            <motion.figure
              key={f}
              {...reveal(k)}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${k % 2 ? "mt-8" : ""}`}
            >
              <img
                src={img(f)}
                alt={label}
                loading="lazy"
                style={{ objectPosition: pos }}
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-base font-semibold sm:text-lg">
                {label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   EYES + TATTOO BANNER
   ==================================================================== */
function Eyes() {
  return (
    <section className="relative overflow-hidden py-14">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p {...reveal(0)} className="eyebrow mb-4">
            Lashes &amp; brows
          </motion.p>
          <motion.h2
            {...reveal(1)}
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Doll eyes with <span className="rose-text italic">spikes.</span>
          </motion.h2>
          <motion.p
            {...reveal(2)}
            className="mt-6 max-w-xl leading-relaxed text-white/65"
          >
            Full lash extensions, wide-eyed doll looks and spiked lashes,
            finished with clean, sharp brows. Message us the style you love and
            we’ll recreate it.
          </motion.p>
          <motion.div {...reveal(3)} className="mt-10">
            <a
              href={wa(
                "Hello inkedbynnaya, I would like to book lash extensions / doll eyes with spikes.",
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-rose"
            >
              <FaWhatsapp size={18} /> Book lashes
            </a>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.img
            {...reveal(1)}
            src={img("doll-eyes.webp")}
            alt="Doll eyes with spikes"
            loading="lazy"
            style={{ objectPosition: "50% 42%" }}
            className="aspect-[3/4] w-full rounded-3xl border border-white/10 object-cover"
          />
          <motion.img
            {...reveal(2)}
            src={img("clean-brows.webp")}
            alt="Lash extensions and clean brows"
            loading="lazy"
            style={{ objectPosition: "50% 55%" }}
            className="mt-10 aspect-[3/4] w-full rounded-3xl border border-white/10 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function TattooBanner() {
  return (
    <section className="relative overflow-hidden py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#4a1633_0%,#09080a_70%)]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div
          {...reveal(0)}
          className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-rose-400/50 text-rose-300"
        >
          <PenTool size={26} />
        </motion.div>
        <motion.h2
          {...reveal(1)}
          className="font-display text-4xl font-semibold leading-tight sm:text-6xl"
        >
          Permanent &amp; semi-permanent{" "}
          <span className="rose-text italic">tattoos.</span>
        </motion.h2>
        <motion.p
          {...reveal(2)}
          className="mx-auto mt-6 max-w-xl text-white/65"
        >
          Got a design in mind? Send your reference pictures on WhatsApp and
          tell us where you want it — we’ll talk through the details together.
        </motion.p>
        <motion.div
          {...reveal(3)}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href={wa(
              "Hello inkedbynnaya, I would like to book a tattoo. I have a reference picture.",
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-rose"
          >
            <FaWhatsapp size={18} /> Book a tattoo
          </a>
          <a
            href={TIKTOK}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <FaTiktok size={15} /> More on TikTok
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ====================================================================
   GALLERY + LIGHTBOX
   ==================================================================== */
function Gallery() {
  const [open, setOpen] = useState(null);
  const n = GALLERY.length;
  const close = () => setOpen(null);
  const step = useCallback(
    (d) => setOpen((v) => (v === null ? v : (v + d + n) % n)),
    [n],
  );
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);
  return (
    <section id="gallery" className="scroll-mt-16 bg-ink-950 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Our work"
          title="Fresh from the studio"
          sub="Tap any photo to view it bigger."
        />
        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, k) => (
            <motion.button
              key={g.image}
              {...reveal(k)}
              onClick={() => setOpen(k)}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 text-left"
              aria-label={`Open ${g.label}`}
            >
              <img
                src={img(g.image)}
                alt={g.label}
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-xs opacity-0 transition group-hover:opacity-100 sm:text-sm">
                {g.label}
                <Maximize2 size={14} />
              </span>
            </motion.button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={TIKTOK}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <FaTiktok size={15} /> See more on TikTok @inked_by_nnaya
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6"
            >
              <ChevronRight />
            </button>
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full"
            >
              <img
                src={img(GALLERY[open].image)}
                alt={GALLERY[open].label}
                className="max-h-[80vh] max-w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-white/70">
                {GALLERY[open].label}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ====================================================================
   HOW IT WORKS
   ==================================================================== */
function Process() {
  return (
    <section className="bg-ink-900 py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead eyebrow="Simple booking" title="How it works" />
        <div className="grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              {...reveal(i)}
              className="relative text-center"
            >
              <div className="font-display text-7xl font-semibold text-rose-500/25">
                {s.n}
              </div>
              <h3 className="-mt-4 font-display text-2xl font-semibold">
                {s.t}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm text-white/60">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   CONTACT + MAP
   ==================================================================== */
function Contact() {
  const cards = [
    { icon: FaWhatsapp, label: "WhatsApp", value: PHONE_DISPLAY, href: BOOK },
    {
      icon: Phone,
      label: "Call us",
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_TEL}`,
    },
    { icon: MapPin, label: "Find us", value: ADDRESS_LINE, href: MAP_LINK },
    { icon: FaTiktok, label: "TikTok", value: "@inked_by_nnaya", href: TIKTOK },
  ];
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden py-16 sm:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#3a1428_0%,#09080a_60%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8">
        <SectionHead
          eyebrow="Visit & book"
          title="Come see us in Lekki-Ajah"
          sub="Message us on WhatsApp to book, confirm available times and ask anything before you come."
        />

        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Left column */}
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
            {cards.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                {...reveal(i)}
                href={href}
                target={href.startsWith("tel") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass group flex w-full min-w-0 items-center gap-3 rounded-2xl p-4 transition-colors hover:border-rose-500/60 sm:gap-4 sm:p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-500/20 text-rose-300 sm:h-12 sm:w-12">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-widest text-white/45 sm:text-xs">
                    {label}
                  </span>
                  <span className="block break-words font-display text-base font-semibold leading-snug sm:text-lg xl:text-xl">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-white/40 transition group-hover:text-rose-300"
                />
              </motion.a>
            ))}

            <div className="flex justify-center pt-4">
              <motion.a
              {...reveal(4)}
              href={BOOK}
              target="_blank"
              rel="noreferrer"
              className="btn-rose !whitespace-normal w-44 !px-5 !py-4 text-center text-sm leading-snug sm:text-base"
            >
              
              <span>Book &amp; Now</span>
            </motion.a>
            </div>
          </div>

          {/* Map */}
          <motion.div
            {...fromRight}
            className="relative h-72 min-w-0 overflow-hidden rounded-3xl border border-white/10 sm:h-96 lg:h-auto lg:min-h-[28rem]"
          >
            <iframe
              title="inkedbynnaya location — Ikota Shopping Complex, Lekki-Ajah, Lagos"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ border: 0, filter: "grayscale(0.25) contrast(1.05)" }}
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-rose absolute bottom-3 left-3 !px-4 !py-2 text-xs shadow-xl sm:bottom-4 sm:left-4 sm:!px-5 sm:!py-2.5"
            >
              <Navigation size={14} /> Get directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   FOOTER + FLOATING BUTTONS
   ==================================================================== */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size="h-10 w-10" />
          <span className="font-display text-xl font-semibold">
            inked<span className="text-rose-400">by</span>nnaya
          </span>
        </a>
        <p className="text-sm text-white/50">
          Tattoos · Piercings · Tooth Gems · Fashion Braces · Lash Extensions
        </p>
        <p className="text-sm text-white/50">
          {ADDRESS_LINE} ·{" "}
          <a href={`tel:${PHONE_TEL}`} className="hover:text-rose-300">
            {PHONE_DISPLAY}
          </a>
        </p>

        {/* Builder Credit */}
        <p className="text-xs sm:text-sm opacity-80 flex items-center justify-center gap-2">
          <img
              src="/logos.jpg"
              alt="Elvionweb Logo"
              className="w-8 h-8 object-contain"
          />
          Built by{" "}
          <a
            href="https://www.elvionweb.com"
        target="_blank"
          rel="noopener noreferrer"
        className="font-semibold underline underline-offset-4 hover:opacity-100 transition-opacity"
          >
          Elvionweb
          </a>
          </p>
          
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {BRAND}. All rights reserved.
        </p>
      </div>      
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={BOOK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseRing" />
      <FaWhatsapp className="relative" size={28} />
    </a>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-rose-600 via-rose-300 to-rose-500"
    />
  );
}

/* ====================================================================
   APP
   ==================================================================== */
export default function App() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <SmileStudio />
        <Piercings />
        <Eyes />
        <TattooBanner />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
