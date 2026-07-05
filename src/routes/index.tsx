import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Sliders,
  BookOpen,
  Check,
  Phone,
  ArrowUpRight,
  Home,
  Megaphone,
  Grid,
  Tag,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import whyImg from "@/public/why.png";
import { Input } from "@/components/ui/input";
import { AboutPage } from "./about";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postpidia — Premium Video Editing for Social Commerce" },
      {
        name: "description",
        content: "Turn your content into sales machines with Postpidia. Premium video editing and sales tracking tools tailored for TikTok Shop, Instagram Reels, and YouTube Shorts.",
      },
    ],
  }),
  component: Landing,
});

const getCategoryStyles = (category: string) => {
  const cat = category.toLowerCase();
  const base = "px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-r-full rounded-bl-full rounded-tl-none";
  if (cat.includes("fashion") || cat.includes("design") || cat.includes("leads") || cat.includes("lead")) return `${base} bg-[#f0514e] text-white`;
  if (cat.includes("food") || cat.includes("grading") || cat.includes("pipeline") || cat.includes("dashboard")) return `${base} bg-[#ff6a00] text-white`;
  if (cat.includes("travel") || cat.includes("graphics") || cat.includes("forecast") || cat.includes("reports")) return `${base} bg-[#00c3ff] text-white`;
  if (cat.includes("tech") || cat.includes("editing") || cat.includes("crm") || cat.includes("integrate") || cat.includes("reporting") || cat.includes("integrations")) return `${base} bg-[#006aff] text-white`;
  if (cat.includes("creative") || cat.includes("analytics") || cat.includes("sales")) return `${base} bg-[#ffb300] text-black`;
  if (cat.includes("sports")) return `${base} bg-[#4caf50] text-white`;
  if (cat.includes("racing") || cat.includes("production")) return `${base} bg-[#ff5722] text-white`;
  if (cat.includes("music") || cat.includes("team")) return `${base} bg-[#f44336] text-white`;
  return `${base} bg-indigo-600 text-white`;
};

function Landing() {
  return (
    <div className="min-h-screen bg-[#111111] antialiased">
      <div className="relative w-full overflow-hidden flex flex-col">
        <Nav />
        <FloatingThemeToggle />
        <HeroSection />
        <StatsSection />
      </div>
      <main className="relative">
        <ServicesSection />
        <TrustedCreators />
        <HowItWorksSection />
        <BottomSection />
        <PricingSection />
        <AboutPage isHomePage={true} />
        <ClientTestimonialsSection />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: "Features", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 sm:px-28 lg:px-72 py-4 sm:py-6 lg:py-8">
      <a href="#" className="shrink-0">
        <span className="sr-only">Postpidia</span>
              <img src="/logo.png" alt="Postpidia" className="h-16 sm:h-20 w-auto" />
      </a>

      <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-400">
        <div className="relative text-[#DF8885] flex flex-col items-center">
          <span className="cursor-pointer">Home</span>
          <span className="absolute -bottom-2 w-1.5 h-1.5 bg-[#DF8885] rounded-full"></span>
        </div>
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollTo(e, item.href)}
            className="hover:text-white transition"
          >
            {item.label}
          </a>
        ))}
        <Link
          to="/about"
          className="hover:text-white transition"
        >
          About Us
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <a href="#contact" className="hidden md:block">
          <Button className="bg-[#DF8885] hover:bg-[#DF8885]/90 text-white rounded-full px-6 text-sm font-semibold">
            Get Started
          </Button>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-300 hover:text-white p-1 md:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 right-4 h-auto pb-4 max-h-[calc(100vh-32px)] w-[280px] bg-white z-50 shadow-2xl rounded-2xl md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <img src="/logo.png" alt="Postpidia" className="h-20 sm:h-24 w-auto" />
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-900 p-1">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-4 py-6 flex-1">
              <span className="text-sm font-semibold text-gray-900 px-3 py-2.5">Home</span>
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition"
              >
                About Us
              </Link>
            </div>
            <div className="border-t border-gray-100 px-4 py-5 flex flex-col gap-3">
              <a href="#contact" onClick={() => setOpen(false)} className="w-full text-center bg-[#DF8885] text-white rounded-full px-5 py-3 text-sm font-semibold hover:bg-[#DF8885]/90 transition">
                Get Started
              </a>
            </div>
          </motion.div>
        </>
      )}
    </nav>
  );
}

function FloatingThemeToggle() {
  return (
    <div className="fixed right-0 top-1/3 bg-white text-black p-2 shadow-lg z-40 border border-gray-200 cursor-pointer rounded-l hidden lg:flex flex-col items-center gap-2">
       <div className="w-4 h-4 bg-gray-200 rounded-full border border-gray-400 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gray-800"></div>
       </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative z-10 flex flex-col flex-1 w-full pb-0 lg:pb-20">
      <div className="flex-1 flex flex-col lg:flex-row px-4 sm:px-28 lg:px-72 mt-8 sm:mt-16">

        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start pr-0 lg:pr-12 relative z-20 text-center lg:text-left lg:pt-16">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-4xl lg:text-[52px] text-white font-light leading-[1.05] tracking-tight mb-3 sm:mb-4"
          >
            Want to Grow<br />or <span className="text-[#FF7A00]">Boost Your Sales?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-[16px] sm:text-[15px] mb-6 sm:mb-8 leading-snug"
          >
            Premium video editing & sales tracking for<br />social commerce platforms
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <a href="#services">
              <Button className="bg-[#DF8885] hover:bg-[#DF8885]/90 text-white px-4 sm:px-6 py-3 sm:py-5 rounded-full text-sm font-semibold h-auto">
                View Services
              </Button>
            </a>
            <a href="#pricing">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-4 sm:px-6 py-3 sm:py-5 rounded-full text-sm font-semibold h-auto">
                See Pricing
              </Button>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block w-full lg:w-[50%] relative justify-center mt-8 min-h-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#DF8885] text-white px-6 py-3 rounded-2xl rounded-br-none text-lg font-semibold shadow-xl z-30"
          >
            Our Core<br />Services
          </motion.div>

          <div className="absolute top-28 left-1/2 -translate-x-1/2 flex flex-row items-center space-x-6 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-gradient-to-b from-[#8b0000] to-[#000000] p-6 rounded-[28px] w-[300px] shadow-2xl border border-[#8b0000]/30"
            >
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#8b0000] mb-4">
                <Megaphone size={22} />
              </div>
              <h3 className="text-white text-[22px] font-bold mb-1">Video Editing</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                TikTok Shop, Instagram<br />Reels, YouTube Shorts
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="bg-[#0a3a1e]/80 backdrop-blur-md p-6 rounded-[28px] w-[300px] shadow-2xl border border-[#0a3a1e]/50 opacity-90"
            >
              <div className="bg-[#99B761] w-12 h-12 rounded-full flex items-center justify-center text-[#0a3a1e] mb-4">
                <Grid size={22} />
              </div>
              <h3 className="text-white text-[22px] font-bold mb-1">Sales Tracking</h3>
              <p className="text-gray-400 text-[13px] leading-relaxed">
                Real-time analytics &<br />revenue forecasting
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-16 right-12 text-right text-[13px] text-gray-400 leading-snug"
          >
            Give us a Call <span className="font-bold text-white">1-888-498-9240</span> and<br/>
            We can set you up, or <a href="#" className="text-[#99B761] underline decoration-[#99B761]/50 underline-offset-2">check our<br/>pricing plans</a>
          </motion.div>
        </motion.div>

      </div>

      <div className="lg:hidden flex flex-row items-stretch gap-3 px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex-1 bg-gradient-to-b from-[#8b0000] to-[#000000] p-4 rounded-[20px] shadow-2xl border border-[#8b0000]/30"
        >
          <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-[#8b0000] mb-3 mx-auto lg:mx-0">
            <Megaphone size={18} />
          </div>
          <h3 className="text-white text-[16px] font-bold mb-1 text-center lg:text-left">Video Editing</h3>
          <p className="text-gray-400 text-[12px] leading-relaxed text-center lg:text-left">
            TikTok Shop, Instagram<br />Reels, YouTube Shorts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex-1 bg-[#0a3a1e]/80 backdrop-blur-md p-4 rounded-[20px] shadow-2xl border border-[#0a3a1e]/50"
        >
          <div className="bg-[#99B761] w-10 h-10 rounded-full flex items-center justify-center text-[#0a3a1e] mb-3 mx-auto lg:mx-0">
            <Grid size={18} />
          </div>
          <h3 className="text-white text-[16px] font-bold mb-1 text-center lg:text-left">Sales Tracking</h3>
          <p className="text-gray-400 text-[12px] leading-relaxed text-center lg:text-left">
            Real-time analytics &<br />revenue forecasting
          </p>
        </motion.div>
      </div>

    </div>
  );
}

const testimonials = [
  {
    name: "Ava Thompson",
    role: "Beauty Brand Owner",
    quote: "Postpidia's editing completely elevated our ads, and their tracking tools showed a 30% jump in direct sales.",
    image:
      "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcus Reed",
    role: "E-Commerce Director",
    quote: "They don't just edit videos. Postpidia tracked our marketing funnel and helped us double our ROI.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nina Patel",
    role: "Marketing Manager",
    quote: "Being able to see the direct correlation between the edits and our sales growth is a game-changer.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Jordan Lee",
    role: "DTC Founder",
    quote: "Since we started with Postpidia, our video ad conversions have skyrocketed. Their metrics prove it.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sofia Martinez",
    role: "Social Media Lead",
    quote: "Our engagement went up, but more importantly, Postpidia showed us exactly how those views turned into revenue.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Daniel Okafor",
    role: "Growth Marketer",
    quote: "The combination of high-end video production and transparent sales tracking is unmatched. Postpidia delivered.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

const marqueeGroups = [0, 1];

const TrustedCreators = () => {
  return (
    <section
      id="trusted-creators"
      className="relative overflow-hidden bg-[#111111] font-['Outfit_Variable',_sans-serif] py-8 md:py-12"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-2 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-6 max-w-[760px] text-center md:mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
            <div className="h-[1.5px] w-6 bg-[#f0514e]"></div>
            <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-gray-500">
              Trusted by Creators
            </span>
            <div className="h-[1.5px] w-6 bg-[#f0514e]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl leading-[1.15] mb-2 tracking-tight text-white">
            <span className="font-light">Creators who move with </span>
            <span className="font-bold text-[#f0514e]">Postpidia</span>
          </h2>
          <p className="text-[13px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            Real creators, real results. Postpidia helps businesses boost their revenue with premium video editing, while also tracking sales and monitoring growth metrics directly for your business.
          </p>
        </motion.div>

        <div className="relative overflow-hidden py-3 md:py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#111111] via-[#111111]/85 to-transparent md:w-24" />

          <div className="trusted-marquee-track marquee-track flex w-max items-stretch gap-0 will-change-transform">
            {marqueeGroups.map((groupIndex) => (
              <div key={groupIndex} className="flex shrink-0 items-stretch gap-6 pr-6 md:gap-8 md:pr-8">
                {testimonials.map((item, index) => (
                  <article
                    key={`${groupIndex}-${item.name}-${index}`}
                    className="flex w-[250px] shrink-0 flex-col items-center py-4 text-center md:w-[300px]"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#222] bg-[#1a1a1a] p-1 shadow-[0_8px_18px_rgba(0,0,0,0.3)] md:h-24 md:w-24">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <p className="text-[13px] font-medium leading-[1.55] text-gray-400 md:text-[14px]">
                      "{item.quote}"
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function StatsSection() {
  const stats = [
    { value: "95%", label: "Sales Forecast Accuracy", suffix: "" },
    { value: "10,000", label: "Sales Professionals Trust Us", suffix: "+" },
    { value: "217", label: "Average Revenue Increase", suffix: "%" },
    { value: "12K", label: "Deals Closed & Counting", suffix: "+" },
    { value: "4.9", label: "Client Satisfaction Rating", suffix: "/5" },
  ];

  return (
    <section className="pt-10 md:pt-40 pb-6 md:pb-20 bg-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-4xl md:text-[44px] font-light text-white">
            Trusted by Sales Teams Worldwide
          </h2>
        </div>

        <div className="relative overflow-hidden md:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#111111] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#111111] to-transparent" />
          <div className="marquee-track flex w-max items-stretch gap-0 will-change-transform">
            {[0, 1].map((groupIdx) => (
              <div key={groupIdx} className="flex shrink-0 items-stretch gap-8 pr-8">
                {stats.map((stat, i) => (
                  <div key={`${groupIdx}-${stat.label}`} className="text-center group shrink-0 w-[140px]">
                    <div className="text-xl font-light text-white leading-none mb-1 tracking-tight">
                      {stat.value}<span className="text-[#f0514e]">{stat.suffix}</span>
                    </div>
                    <p className="text-[9px] text-gray-400 font-light leading-snug max-w-[120px] mx-auto">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="text-center group"
            >
              <div className="text-[44px] font-light text-white leading-none mb-3 tracking-tight group-hover:text-[#f0514e] transition-colors duration-300">
                {stat.value}<span className="text-[#f0514e]">{stat.suffix}</span>
              </div>
              <p className="text-sm text-gray-400 font-light leading-snug max-w-[160px] mx-auto">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, endSlot }: { title: string, endSlot?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div className="flex items-center w-full">
         <h2 className="text-[22px] font-semibold text-white whitespace-nowrap pr-6">{title}</h2>
         {endSlot && <div className="pl-6">{endSlot}</div>}
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    { category: "EDITING", title: "Video Editing", desc: "Professional editing tailored for TikTok Shop, Instagram Reels, YouTube Shorts and Amazon product videos.", img: "https://i.pinimg.com/1200x/4e/a2/f8/4ea2f876c2a2546347f860846c44d936.jpg" },
    { category: "MOTION", title: "Motion Graphics", desc: "Dynamic 2D/3D animations, text overlays, and visual effects that grab attention and drive engagement.", img: "https://i.pinimg.com/736x/c7/76/59/c77659f60e02cd32b2b1488946f8d534.jpg" },
    { category: "THUMBNAIL", title: "Thumbnail Design", desc: "A/B tested thumbnail variations designed to maximize click-through rates and views on every platform.", img: "https://i.pinimg.com/736x/74/c6/79/74c679b74ddeeac0e3c2d00f2642011b.jpg" },
    { category: "COLOR", title: "Color Grading", desc: "Advanced color correction and grading to give your content a cinematic, brand-consistent look.", img: "https://i.pinimg.com/736x/19/80/c3/1980c3b439b7314ec8ac85e25c855c00.jpg" },
    { category: "ANALYTICS", title: "Performance Analytics", desc: "Data-driven insights on content performance. SEO and keyword strategy for every video we deliver.", img: "https://i.pinimg.com/1200x/3f/bd/39/3fbd39179ec2be6cd25a41cfdfe94b9a.jpg" },
    { category: "AUDIO", title: "Audio Production", desc: "Professional noise reduction, audio leveling, and royalty-free background music selection.", img: "https://i.pinimg.com/736x/a1/89/22/a1892208824db9a0574252c8fb632bb2.jpg" },
  ];

  return (
    <section id="services" className="bg-[#111111] max-w-[1400px] mx-auto px-4 lg:px-8 mt-6 md:mt-20 pt-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h2 className="text-4xl md:text-[44px] font-light text-white">Services Built to Convert</h2>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 sm:gap-6">
        {services.map((item, idx) => (
          <div key={idx} className={`bg-[#1a1a1a] group cursor-pointer flex flex-col h-full border border-[#222] hover:border-[#333] transition-colors relative ${idx === 4 ? 'lg:col-start-2' : ''} ${idx === 5 ? 'lg:col-start-3' : ''}`}>
            <div className="relative overflow-hidden bg-black shrink-0 aspect-[4/3]">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <span className={`absolute top-2 left-2 sm:top-4 sm:left-4 ${getCategoryStyles(item.category)}`}>
                {item.category}
              </span>
            </div>
            <div className="p-2 sm:p-5 flex flex-col flex-grow relative z-10">
              <h3 className="font-semibold text-[11px] sm:text-[15px] text-gray-200 line-clamp-1 leading-snug group-hover:text-[#f0514e] transition-colors">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed font-medium">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-2 sm:pt-4 text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                <span className="hidden sm:inline">FEATURES</span>
                <span className="flex items-center gap-1"><Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5c45fd]" /> READY</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-3xl sm:text-5xl font-bold text-white/5 select-none pointer-events-none">
              {String(idx + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomSection() {
  const stories = [
    {
      category: "SALES INTELLIGENCE",
      title: "How Postpidia Helps Brands Decode TikTok Shop Trends Before They Peak",
      subtitle: "Real-time analytics that turned a skincare brand's slow quarter into their best ever",
      tag: "Trending",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
      body: "When GlowRoot Skincare noticed their TikTok Shop sales plateauing in Q2, they turned to Postpidia's sales intelligence dashboard for answers. Within minutes, the platform's trending product tracker revealed that niacinamide serums were surging across Southeast Asian markets — a signal their team had completely missed by relying on manual spreadsheet tracking.\n\nPostpidia's real-time data pipeline aggregates millions of transactions daily across TikTok Shop, giving brands a window into what's selling, who's buying, and which creators are driving the most conversions. For GlowRoot, the insight was immediate and actionable: they repositioned their niacinamide product line, partnered with three mid-tier creators that Postpidia's influencer analytics flagged as high-conversion, and adjusted their pricing to match the competitive sweet spot the platform identified.\n\nThe result? A 217% increase in monthly revenue and a top-10 ranking in their product category within six weeks. GlowRoot's founder now checks Postpidia before making any inventory decision. As she put it: 'Before Postpidia, we were guessing. Now we know.'",
    },
    {
      category: "CREATOR ECONOMICS",
      title: "The Creator ROI Playbook: Measuring What Actually Matters on TikTok Shop",
      subtitle: "Why follower counts mislead and how Postpidia's engagement-to-revenue metrics changed the game",
      tag: "New",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
      body: "For months, fitness apparel brand KinetikFit was pouring budget into creator partnerships based on one metric: follower count. They booked creators with 500K+ followers and watched their cost-per-acquisition climb while conversion rates flatlined. The disconnect was obvious — reach doesn't equal revenue.\n\nPostpidia's creator analytics module gave KinetikFit a completely different lens. Instead of surface-level metrics, the platform tracks engagement-to-revenue ratios: how many viewers actually click through, add to cart, and complete a purchase after watching a creator's content. The data revealed that creators in the 15K-80K follower range consistently outperformed mega-influencers on TikTok Shop, with conversion rates 3.4x higher on average.\n\nArmed with this insight, KinetikFit rebuilt their creator roster from scratch. They replaced three high-cost mega-influencer deals with twelve micro and mid-tier creators selected through Postpidia's performance rankings. Campaign costs dropped 62%, while total attributed revenue increased 89%. The lesson was clear: on TikTok Shop, authenticity and niche audience alignment beat raw reach every time — and Postpidia makes that data impossible to ignore.",
    },
    {
      category: "MARKET ANALYTICS",
      title: "Why Your Competitor's Best-Seller Is Your Next Opportunity",
      subtitle: "How competitive gap analysis on Postpidia reveals untapped product categories",
      tag: "Hot",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
      body: "Every TikTok Shop seller knows the feeling: you spot a competitor's product climbing the best-seller list, and your first instinct is to replicate it. But Postpidia's competitive analytics engine suggests a smarter move — look at the gaps around that product, not the product itself.\n\nWhen home goods brand NestaLiving analyzed a competitor's viral bamboo utensil set through Postpidia, they noticed something the competitor missed. While the utensil set dominated the 'eco kitchen' category, related searches for 'travel-friendly eco cutlery' were growing 340% month-over-month with almost zero inventory supply. Postpidia's demand-supply gap indicator flagged it as a high-opportunity zone — strong demand, minimal competition, and a clear adjacent positioning to an already-validated market.\n\nNestaLiving launched a compact travel cutlery kit within three weeks. Postpidia's pricing intelligence helped them undercut the competitor's price point by 12% while maintaining healthy margins, and their product launch was featured in Postpidia's 'Rising Products' feed — driving organic discovery. Within two months, the travel kit outsold the original bamboo set in its category. Competitive intelligence isn't about copying; it's about seeing what the competition can't.",
    },
  ];

  return (
    <section className="py-16 overflow-hidden mt-16 bg-[#111111]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeader 
          title="Trending Stories"
        />

        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:h-[420px]">
          {/* Left Card — Featured Story (full-height) */}
          <div className="bg-black p-8 flex flex-col justify-center md:justify-center relative overflow-hidden rounded-[2px] h-[400px] md:h-full group border border-[#0a3a1e]">
            {/* Mobile: full background image layout */}
            <div className="md:hidden absolute inset-0 z-0">
              <img src={stories[0].img} alt={stories[0].title} className="w-full h-full object-cover object-center opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
            <div className="md:hidden relative z-10 w-full flex flex-col items-start justify-end h-full pb-0">
              <span className={`${getCategoryStyles("SALES")} mb-2`}>FEATURED</span>
              <h3 className="text-white text-[18px] font-bold leading-tight mb-2 max-w-full">{stories[0].title}</h3>
              <p className="text-gray-300 text-[12px] mb-4 font-medium max-w-full line-clamp-2">{stories[0].subtitle}</p>
              <Link
                to="/story"
                search={{ title: stories[0].title, category: stories[0].category, subtitle: stories[0].subtitle, img: stories[0].img, tag: stories[0].tag, body: stories[0].body }}
                className="bg-white text-black rounded-full px-5 py-2 h-9 w-fit text-[10px] font-medium uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 inline-flex items-center"
              >
                Read Story
              </Link>
            </div>
            {/* Desktop: original layout */}
            <div className="hidden md:flex relative z-10 w-[60%] ml-auto text-right flex-col items-end">
              <span className={`${getCategoryStyles("SALES")} mb-2`}>FEATURED</span>
              <h3 className="text-white text-[22px] lg:text-[28px] font-bold leading-tight mb-3">{stories[0].title}</h3>
              <p className="text-gray-400 text-[12px] mb-6 font-medium">{stories[0].subtitle}</p>
              <Link
                to="/story"
                search={{ title: stories[0].title, category: stories[0].category, subtitle: stories[0].subtitle, img: stories[0].img, tag: stories[0].tag, body: stories[0].body }}
                className="bg-transparent border-[1.5px] border-white text-white rounded-full px-6 py-2.5 h-10 w-fit text-[11px] font-medium uppercase tracking-wider hover:bg-white hover:text-[#111] transition-all duration-200 inline-flex items-center"
              >
                Read Story
              </Link>
            </div>
            <div className="hidden md:block absolute left-[-5%] bottom-0 w-[75%] h-[95%] pointer-events-none">
              <img src={stories[0].img} alt={stories[0].title} className="w-full h-full object-cover object-bottom opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 h-full">
            {/* Top Row — 2 smaller cards */}
            <div className="grid grid-cols-2 gap-6 h-[200px]">
              <div className="bg-[#5c45fd] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#6b56ff]">
                <div className="bg-white/20 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm w-fit mb-2 relative z-10 tracking-widest">
                  {stories[1].tag}
                </div>
                <h4 className="text-white text-[15px] font-medium mb-1 relative z-10 leading-tight">{stories[1].title}</h4>
                <p className="text-white/70 text-[11px] relative z-10 mb-auto font-medium">{stories[1].subtitle}</p>
                <Link
                  to="/story"
                  search={{ title: stories[1].title, category: stories[1].category, subtitle: stories[1].subtitle, img: stories[1].img, tag: stories[1].tag, body: stories[1].body }}
                  className="text-white text-[11px] font-medium flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link"
                >
                  Read More <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </Link>
                <div className="absolute -right-4 bottom-[-10%] w-[80%] h-[90%] pointer-events-none">
                  <img src={stories[1].img} alt={stories[1].title} className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="bg-[#f0514e] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#ff1a8a]">
                <div className="bg-white/20 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm w-fit mb-2 relative z-10 tracking-widest">
                  {stories[2].tag}
                </div>
                <h4 className="text-white text-[15px] font-medium mb-1 relative z-10 leading-tight">{stories[2].title}</h4>
                <p className="text-white/70 text-[11px] relative z-10 mb-auto font-medium">{stories[2].subtitle}</p>
                <Link
                  to="/story"
                  search={{ title: stories[2].title, category: stories[2].category, subtitle: stories[2].subtitle, img: stories[2].img, tag: stories[2].tag, body: stories[2].body }}
                  className="text-white text-[11px] font-medium flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link"
                >
                  Read More <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </Link>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-[85%] h-[120%] pointer-events-none">
                  <img src={stories[2].img} alt={stories[2].title} className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Bottom Row — wider CTA card */}
            <div className="bg-[#1a1a1a] p-6 relative overflow-hidden rounded-[2px] h-[200px] md:h-[calc(50%-12px)] flex flex-col justify-center group border border-[#222]">
              <p className={`absolute top-3 left-3 z-20 ${getCategoryStyles("SALES")}`}>Sales Tracking</p>
              <div className="relative z-10">
                <h4 className="text-white text-[20px] lg:text-[24px] font-medium mb-1">Sales Tracking Platform</h4>
                <p className="text-gray-400 text-[11px] font-medium tracking-widest uppercase mb-3">ALL FEATURES THIS WEEK</p>
                <Link to="/stories" className="inline-flex items-center gap-2 bg-transparent border border-white text-white rounded-full text-[11px] font-medium uppercase tracking-wider px-5 py-2.5 hover:bg-white hover:text-[#111] transition-all duration-200">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55%] h-[120%] pointer-events-none">
                <img src="https://i.pinimg.com/736x/6d/67/f6/6d67f6947d704ce2ab4b0feb3c5099b0.jpg" alt="Sales tracking platform" className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: "01", iconUrl: "https://img.icons8.com/color/96/price-tag.png", title: "Choose Your Plan", desc: "Select the package that fits your content volume and business goals. Upgrade anytime as you grow." },
    { step: "02", iconUrl: "https://img.icons8.com/color/96/upload--v1.png", title: "Send Your Raw Footage", desc: "Upload your raw videos, brand guidelines, and any special requests. We handle the rest." },
    { step: "03", iconUrl: "https://img.icons8.com/color/96/video-editing.png", title: "We Edit & Optimize", desc: "Our team transforms your footage into scroll-stopping content optimized for each platform." },
    { step: "04", iconUrl: "https://img.icons8.com/color/96/share.png", title: "Publish & Profit", desc: "Receive your polished videos ready to upload. Watch your engagement and sales grow." },
  ];

  return (
      <section id="how-it-works" className="bg-[#111111] font-['Outfit_Variable',_sans-serif] py-8 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8 md:mb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
            <div className="h-[1.5px] w-6 bg-[#f0514e]"></div>
            <span className="text-[10px] font-bold uppercase tracking-[2.5px] text-gray-500">
              Process
            </span>
            <div className="h-[1.5px] w-6 bg-[#f0514e]"></div>
          </div>

          <h2 className="text-3xl md:text-4xl leading-[1.15] mb-4 tracking-tight text-white">
            <span className="font-light">How It </span>
            <span className="font-bold text-[#f0514e]">Works</span>
          </h2>
          <p className="text-[13px] text-gray-400 max-w-xl mx-auto leading-relaxed">
            From raw footage to viral content in four simple steps. Our streamlined process ensures quick turnaround without sacrificing quality.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-row md:flex-col items-center text-center bg-[#1a1a1a] rounded-xl p-3 md:p-6 shadow-sm border border-transparent transition-all duration-300 relative overflow-hidden gap-3 md:gap-0"
            >
              {/* Background number */}
              <div className="absolute top-1 right-2 text-[60px] md:text-[120px] font-bold text-white/[0.06] leading-none select-none pointer-events-none">
                {item.step}
              </div>

              <img
                src={item.iconUrl}
                alt={item.title}
                className="w-10 h-10 md:w-16 md:h-16 object-contain shrink-0"
              />

              {/* Text Content */}
              <div className="text-left md:text-center flex-1 min-w-0">
                <h3 className="text-[12px] md:text-[15px] font-bold text-[#f0514e] mb-0.5 md:mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              {/* Arrow indicator on mobile */}
              {i < steps.length - 1 && (
                <div className="hidden md:block mt-4 text-[#f0514e]">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const router = useRouter();
  const [yearly, setYearly] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Enterprise Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nBudget: ${formData.budget || "Not specified"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:support@postpidia.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setDialogOpen(false);
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
    }, 500);
  };

  const plans = [
    {
      name: "Basic",
      desc: "Perfect for small brands getting started with video content",
      monthly: 99,
      yearly: 79,
      popular: false,
      features: [
        "Up to 4 Edited Videos",
        "Royalty-Free Background Music",
        "Advanced Color Grading",
        "Noise Reduction & Audio Leveling",
        "Custom Thumbnail (1 per video)",
        "3% Sales Commission Agreement",
      ],
    },
    {
      name: "Essential",
      desc: "Best value for growing brands ready to scale their content output",
      monthly: 149,
      yearly: 119,
      popular: true,
      features: [
        "Up to 5 Edited Videos",
        "Dynamic Motion Graphics",
        "Advanced Color Correction",
        "A/B Testing Thumbnail Variations",
        "Dedicated Project Manager",
        "Multi-Platform Exports (TikTok/YT/IG)",
        "3% Sales Commission Agreement",
      ],
    },
    {
      name: "Professional",
      desc: "Full-service for brands serious about dominating social commerce",
      monthly: 189,
      yearly: 149,
      popular: false,
      features: [
        "Up to 8 Edited Videos",
        "High-End 2D/3D Animations",
        "Custom Brand Identity Kit",
        "Premium Stock Footage Access",
        "Performance Analytics Consulting",
        "Dedicated Project Manager",
        "Postpidia Asset Library Access",
        "24-Hour Priority Support",
        "Professional Voiceover Integration",
        "SEO & Keyword Strategy for Video",
        "3% Sales Commission Agreement",
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-[#111111] py-16 flex items-center justify-center font-sans tracking-wide">
      <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-[44px] font-light text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[15px] text-gray-300 mb-6">
            Choose the plan that fits your project needs
          </p>

          <div className="inline-flex items-center gap-3 bg-[#27272a] rounded-xl px-4 py-2">
            <button
              onClick={() => setYearly(false)}
              className={`text-sm font-bold px-4 py-1.5 rounded-lg transition-all duration-200 ${
                !yearly
                  ? "bg-[#f0514e] text-white shadow-md shadow-[#f0514e]/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`text-sm font-bold px-4 py-1.5 rounded-lg transition-all duration-200 ${
                yearly
                  ? "bg-[#f0514e] text-white shadow-md shadow-[#f0514e]/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Yearly
            </button>
            <span className="bg-[#f0514e]/20 text-[#f0514e] text-[10px] font-bold px-2 py-0.5 rounded-md leading-none">
              Save 20%
            </span>
          </div>
        </motion.div>

        <div className="mb-8 bg-[#1a1a1a] border border-[#f0514e]/20 rounded-xl p-5 md:p-6 text-center">
          <p className="text-white text-sm md:text-base font-light leading-relaxed">
            <span className="text-[#f0514e] font-semibold text-lg md:text-xl">3%</span> commission{" "}
            <span className="font-medium">only on videos that generate sales</span>.
            <span className="text-gray-400 block sm:inline sm:ml-1"> No sale? No commission.</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#27272a] shadow-2xl rounded-2xl flex flex-col border border-[#333] ${
                  activeIndex === i
                    ? "shadow-xl scale-[1.02] border-[#f0514e]/40"
                    : "cursor-pointer hover:border-[#444]"
                }`}
                onClick={activeIndex !== i ? () => setActiveIndex(i) : undefined}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-[#f0514e] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg leading-none">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[44px] text-[#f97316] font-light leading-none">${price}</span>
                      <span className="text-base text-gray-300">/mo</span>
                    </div>
                    {yearly && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] text-gray-400 line-through">${plan.monthly}/mo</span>
                        <span className="bg-[#f0514e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">Save 20%</span>
                      </div>
                    )}
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {yearly ? "billed annually" : "billed monthly"}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {plan.features.slice(0, activeIndex === i ? plan.features.length : 4).map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#f0514e] shrink-0" />
                        <span className="text-[13px] text-gray-200">{feature}</span>
                      </li>
                    ))}
                    {activeIndex !== i && plan.features.length > 4 && (
                      <li className="text-[12px] text-gray-400 pl-3">+{plan.features.length - 4} more features</li>
                    )}
                  </ul>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.navigate({
                        to: "/payment",
                        search: {
                          plan: plan.name,
                          price: String(price),
                          billing: yearly ? "yearly" : "monthly",
                        },
                      });
                    }}
                    className={`w-full bg-[#00d084] text-white text-[11px] font-medium lowercase tracking-wider px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-200 ${
                      activeIndex === i ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    subscribe now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-r from-[#27272a] to-[#1e1e22] rounded-none border border-transparent hover:border-[#f0514e]/20 transition-all duration-300 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white">Enterprise</h3>
              <span className="bg-[#f0514e] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg leading-none">
                Custom
              </span>
            </div>
            <p className="text-[15px] text-gray-300 mb-4">
              Need a tailored solution for your business? Get a custom plan with dedicated support, personalized onboarding, and enterprise-grade features.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
              {[
                "Custom Video Volume & Pricing",
                "Dedicated Account Manager",
                "Priority 24/7 Support",
                "Custom Integrations & API Access",
                "Team Collaboration Tools",
                "Custom Brand Identity Kit",
                "Performance Analytics Dashboard",
                "SLA Guarantees",
              ].map((feature, j) => (
                <li key={j} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#f0514e] shrink-0" />
                  <span className="text-[13px] text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => setDialogOpen(true)}
            className="shrink-0 bg-[#f0514e] text-white text-[13px] font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#f0514e]/30"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1e1e22] border border-[#333] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Contact Sales</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Fill in your details and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger className="bg-[#27272a] border-[#444] text-white text-sm">
                <SelectValue placeholder="Select your budget" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272a] border-[#444] text-white">
                <SelectItem value="1k-10k">1k-10k</SelectItem>
                <SelectItem value="10k-100k">10k-100k</SelectItem>
                <SelectItem value="100k+">100k+</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm resize-none"
            />
            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-[#f0514e] hover:bg-[#d94441] text-white text-sm font-medium py-2.5 rounded-full cursor-pointer"
            >
              {sending ? "Opening Email..." : "Send Inquiry"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

const testimonialsData = [
  {
    id: 1,
    company: "Beauty & Cosmetics",
    name: "The First Lady Beauty Shop",
    quote: "Postpidia completely transformed our TikTok Shop presence. Their video editing made our product launches go viral — we saw a 300% increase in sales within the first month. Absolutely outstanding work.",
    imageUrl: "https://i.pinimg.com/736x/a1/51/b3/a151b351f59a0f322d1676bde4804eba.jpg",
    overlay: "rgba(0, 0, 0, 0.35)",
  },
  {
    id: 2,
    company: "Consumer Electronics",
    name: "TechVibe Electronics",
    quote: "As a tech retailer in Singapore, product videos are everything. Postpidia's team understands how to showcase electronics in a way that drives clicks and conversions. Our brand engagement has never been stronger.",
    imageUrl: "https://i.pinimg.com/736x/26/51/b4/2651b49b8e82db47d4130fb80f51b95e.jpg",
    overlay: "rgba(0, 0, 0, 0.30)",
  },
  {
    id: 3,
    company: "Food & Beverage",
    name: "FreshBite Foods",
    quote: "Running a food brand in the UK on social media requires constant content. Postpidia delivers scroll-stopping videos that make our products look irresistible. Our followers grew by 10K in just 3 months.",
    imageUrl: "https://i.pinimg.com/1200x/a0/54/ef/a054ef97e0a3f27433179ae840bfe440.jpg",
    overlay: "rgba(0, 0, 0, 0.30)",
  },
  {
    id: 4,
    company: "Luxury Boutique",
    name: "Style Lounge Boutique",
    quote: "What sets Postpidia apart is their understanding of social commerce in Dubai. They don't just edit videos — they create content that converts viewers into buyers. Our ROI has doubled since partnering with them.",
    imageUrl: "https://i.pinimg.com/1200x/f1/d5/c0/f1d5c0f13640cf7029414e36f9e3e00f.jpg",
    overlay: "rgba(0, 0, 0, 0.35)",
  },
];

const PER_VIEW = 3;
const SLIDE = 1;

type Testimonial = {
  id: number;
  company: string;
  name: string;
  quote: string;
  imageUrl: string;
  overlay: string;
};

function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = testimonialsData.length;

  const pages = useMemo(() => {
    const arr: Testimonial[][] = [];
    for (let i = 0; i < testimonialsData.length; i += SLIDE) {
      const slice: Testimonial[] = [];
      for (let j = 0; j < PER_VIEW; j++) {
        slice.push(testimonialsData[(i + j) % testimonialsData.length]);
      }
      arr.push(slice);
    }
    return arr;
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setDirection(-1);
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 bg-[#111111] scroll-mt-28 relative overflow-hidden"
      style={{
        fontFamily: "'Outfit', sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-white text-4xl md:text-[44px] font-light mb-11 md:mb-12 relative z-10">
          What Businesses Say
        </h2>

        <div className="relative z-10">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? -110 : 110 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? 110 : -110 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {pages[page].map((item, idx) => (
<motion.article
          key={item.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: idx * 0.12 }}
          className="group"
        >
          <div className="relative h-[220px] md:h-[250px] overflow-hidden rounded-[2px]">
            <img
              src={item.imageUrl}
              alt={`${item.name} testimonial`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
          <div className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#f05847] flex items-center justify-center text-white text-sm font-bold shrink-0">
                {item.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-white text-[16px] md:text-[18px] font-semibold leading-tight">{item.name}</h3>
                <p className="text-[#f05847] text-[11px] font-medium uppercase tracking-wider">{item.company}</p>
              </div>
            </div>
            <p className="text-gray-300 text-[13px] leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
          </div>
        </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > page ? 1 : -1);
                setPage(idx);
              }}
              aria-label={`Go to testimonial page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === page ? "w-9 bg-[#f05847]" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const clientTestimonials = [
  {
    name: "Cruva AI",
    role: "Affiliate Marketing Platform",
    company: "Cruva AI",
    description: "Cruva AI helps brands manage and optimize affiliate marketing campaigns at scale. We use it to track affiliate-driven video performance, monitor conversion rates, and attribute sales to specific content pieces across TikTok Shop and other platforms.",
    image: "/cruva.png",
  },
  {
    name: "Kalodata",
    role: "TikTok Analytics",
    company: "Kalodata",
    description: "Kalodata provides deep analytics for TikTok Shop sellers, tracking product trends, competitor performance, and viral content patterns. We leverage it to identify high-performing video formats and optimize our clients' content strategy for maximum sales.",
    image: "/kalodata.png",
  },
  {
    name: "TikTok Shop",
    role: "Social Commerce",
    company: "TikTok Shop",
    description: "TikTok Shop is the leading social commerce platform integrating short-form video with seamless in-app purchasing. We track real-time sales data, monitor video-driven transactions, and analyze customer behavior to refine content that converts browsers into buyers.",
    image: "/tiktok.png",
  },
  {
    name: "FastMoss",
    role: "TikTok Data Intelligence",
    company: "FastMoss",
    description: "FastMoss delivers advanced TikTok commerce intelligence, tracking trending products, shop performance, and creator analytics. We use it to benchmark our clients' video performance against market leaders and identify untapped sales opportunities.",
    image: "/fastmoss.png",
  },
];

function ClientTestimonialsSection() {
  return (
    <section
      className="py-20 bg-[#111111] overflow-hidden"
      style={{
        fontFamily: "'Outfit', sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-center text-white text-4xl md:text-[44px] font-light">
            Softwares We Use to <span className="text-[#f05847]">Track Sales</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
            {clientTestimonials.map((item) => (
              <div
                key={item.name}
                className="flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="relative w-full sm:w-[220px] h-[180px] shrink-0">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <svg width="180" height="200" viewBox="0 0 180 200" className="overflow-visible">
                      <line x1="90" y1="0" x2="90" y2="14" stroke="#666" strokeWidth="1.5" />
                      <path d="M72 14 L108 14 L105 22 L75 22 Z" fill="#fff" opacity="0.15" />
                      <path d="M75 22 L105 22 L98 32 Q90 35 82 32 Z" fill="#fff" opacity="0.25" />
                      <ellipse cx="90" cy="34" rx="14" ry="3" fill="#fff" opacity="0.4" />
                      <ellipse cx="90" cy="34" rx="6" ry="1.5" fill="#fff" opacity="0.8" className="animate-pulse" />
                      <path d="M15 36 L165 36 L200 200 Q90 180 -20 200 Z" fill="url(#lampBeam)" opacity="0.15" className="animate-pulse" style={{ animationDuration: "3s" }} />
                      <defs>
                        <radialGradient id="lampBeam" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <h3 className="text-[#f05847] text-[18px] font-semibold mb-3">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-2">
                    {item.role}
                  </p>
                  <p className="text-gray-300 text-[12px] leading-relaxed mb-5">
                    {item.description}
                  </p>
                  <Link
                    to="/software"
                    search={{ name: item.name, role: item.role, description: item.description, image: item.image }}
                    className="bg-[#f05847] hover:bg-[#d94441] text-white rounded-none px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors mt-auto inline-flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [branch, setBranch] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message received — we'll get back to you within one business day.");
  };

  return (
    <section id="contact" className="bg-[#111111] pt-16 pb-16">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 relative flex flex-col lg:flex-row items-end gap-16 lg:gap-12">
        <div className="w-full lg:w-[45%] relative flex items-end justify-center lg:justify-end pt-32 lg:pt-0 -mb-16">
          <div className="absolute top-10 lg:-top-10 left-0 lg:left-0 xl:left-[-20px] z-10 bg-[#f0514e] rounded-[24px] text-white p-8 w-[240px] sm:w-[280px] shadow-2xl">
            <div className="bg-white text-[#f0514e] w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-center font-medium text-[18px] mb-3">Chat With Live !</h3>
            <p className="text-center text-[11px] leading-relaxed text-white/90 mb-8 pt-2">
              Have questions? Our support team is ready to help you with any enquiry.
            </p>
        <div className="flex justify-center">
          <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-r-full rounded-bl-full rounded-tl-none bg-[#ffb300] text-black cursor-default">
            LET'S CHAT
          </span>
        </div>
          </div>

          <div className="relative z-20 w-[260px] md:w-[320px] max-w-[380px] lg:mr-8 xl:mr-16">
            <img
              src={whyImg}
              alt="Customer Service"
              className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] block"
            />
          </div>
        </div>

        <div className="w-full lg:w-[55%] flex flex-col justify-center pb-0">
          <div>
            <div className="inline-flex items-center gap-2 text-[#f0514e] text-[10px] font-medium uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0514e]"></span>
              CONTACT US
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0514e]"></span>
            </div>
            <h2 className="text-white font-[400] text-[32px] md:text-[42px] leading-[1.1] mb-10">
              <span className="text-[#f0514e]">Reach</span> & Get In Touch<br />
              With Us !
            </h2>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your name*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#f0514e]"
                required
              />
              <Input
                placeholder="Your Email*"
                type="email"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#f0514e]"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your number*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#f0514e]"
              />
              <Input
                placeholder="Your Subject*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#f0514e]"
              />
            </div>
            <Textarea
              placeholder="Enter message"
              rows={5}
              className="bg-[#1a1a1a] border border-[#333] rounded-[20px] p-6 text-[13px] text-gray-200 placeholder:text-gray-500 resize-none focus-visible:ring-1 focus-visible:ring-[#f0514e]"
            />

            <div className="mt-2 text-left">
              <Button
                type="submit"
                className="bg-[#f0514e] hover:opacity-90 text-white rounded-full px-8 py-6 h-12 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 w-[200px]"
              >
                SEND MESSAGE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-[#111111] max-w-[1400px] mx-auto px-4 lg:px-8 mb-24">
      <div className="relative bg-gradient-to-b from-[#8b0000] to-[#000000] px-8 py-16 sm:p-16 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-6 leading-tight">
            Ready to Close More Deals?
          </h2>
          <p className="text-gray-200 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Join thousands of sales teams using Postpidia to track, analyze, and close deals faster than ever before.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => {
                const el = document.querySelector("#pricing");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="bg-white text-[#dc2626] font-normal text-xs uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 hover:opacity-90 transition-all duration-200"
            >
              <span>Get Started Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>

          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const quickLinks = ["Services", "Pricing", "How It Works", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Legal Notice"];

  return (
    <footer className="bg-[#161616] border-t border-[#222] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 mb-12">
        <div className="col-span-2 lg:col-span-5 flex flex-col space-y-6">
<a href="#" className="flex items-center">
  <img src="/logo.png" alt="Postpidia" className="h-16 sm:h-20 w-auto" />
</a>
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
            Postpidia delivers high-conversion video editing tailored for social commerce platforms. Boost your brand with expert content production.
          </p>
          <div className="flex items-center gap-3 text-gray-500">
            <Facebook className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            <Youtube className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <h4 className="text-[11px] font-medium text-white uppercase tracking-wider mb-4 border-l-2 border-[#f0514e] pl-3">Quick Links</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
  {quickLinks.map((link) => (
  <li key={link}>
    <a href="#" className="hover:text-[#f0514e] transition-colors flex items-center gap-1.5 group">
      <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#f0514e]" />
      {link}
    </a>
  </li>
))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-2 flex flex-col space-y-3">
          <h4 className="text-[11px] font-medium text-white uppercase tracking-wider border-l-2 border-[#df9a28] pl-3">Contact</h4>
          <p className="text-gray-400 text-xs font-medium leading-relaxed">
            Have questions? Reach out to our team.
          </p>
          <a href="mailto:support@postpidia.com" className="text-[#f0514e] text-xs font-semibold hover:underline">
            support@postpidia.com
          </a>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-[11px] font-medium text-white uppercase tracking-wider mb-4 border-l-2 border-[#5c45fd] pl-3">Legal</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
            <li className="hover:text-[#5c45fd] transition-colors flex items-center gap-1.5 group">
              <Link to="/privacy" className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#5c45fd]" />
                Privacy Policy
              </Link>
            </li>
            <li className="hover:text-[#5c45fd] transition-colors flex items-center gap-1.5 group">
              <Link to="/terms" className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#5c45fd]" />
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-gray-500">
        <div>&copy; {new Date().getFullYear()} Postpidia. All rights reserved.</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <span className="text-gray-600">Legal Notice</span>
        </div>
      </div>
    </footer>
  );
}