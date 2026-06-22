import React, { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Eye,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Calendar,
  User,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  UserPlus,
  Sliders,
  BookOpen,
  Check,
  Phone,
  ArrowUpRight,
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
      { title: "Postpidia — Sales Tracking Software" },
      { name: "description", content: "Track, analyze, and close more deals with Postpidia" },
    ],
    links: [],
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
    <div className="min-h-screen antialiased">
      <div className="hero-pattern hero-diagonal w-full">
        <div className="hero-diagonal-right"></div>
        <Nav />
      </div>
      <main className="relative">
        <FloatingThemeToggle />
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <BottomSection />
        <PricingSection />
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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="bg-black/40 backdrop-blur-sm">
      {/* Top Ticker Row */}
      <div className="bg-black/20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-end text-[11px] font-semibold">
          <div className="hidden lg:flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-3">
              <span>Contact:</span>
              <Phone className="h-3.5 w-3.5 text-[#00d084]" />
              <span className="text-gray-300">+254 757 740186</span>
            </div>
            <Mail className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Brand & Ad Spot Row */}
      <div className="bg-black/20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-white p-1 lg:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <a href="#" className="flex items-center gap-3">
              <img src="/logo.png" alt="Postpidia" className="h-10 w-auto" />
              <span className="text-2xl font-medium tracking-tight text-white leading-none">Postpidia</span>
            </a>
          </div>

          {/* Ad Banner */}
          <div className="hidden lg:flex flex-1 max-w-[700px] ml-8 bg-white h-[70px] relative overflow-hidden items-center justify-between px-6">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 opacity-20 [clip-path:polygon(0_0,100%_0,80%_100%,0%_100%)]"></div>
            <div className="absolute left-0 bottom-0 w-12 h-12 bg-blue-500 [clip-path:polygon(0_100%,100%_100%,0_0)]"></div>
            <div className="absolute left-8 top-0 w-16 h-16 bg-yellow-400 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"></div>
            
            <h2 className="text-black font-bold text-xl z-10 ml-16">
              Postpidia Sales Tracking — Close More Deals
            </h2>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => {
                const el = document.querySelector("#pricing");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="relative bg-[#00d084] text-white font-medium text-[11px] uppercase tracking-wider px-6 py-2.5 z-10 rounded-full hover:opacity-90 transition-all duration-200"
            >
              GET STARTED
            </motion.button>
            
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#f0514e] [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]"></div>
            <div className="absolute right-8 top-0 bottom-0 w-16 bg-white opacity-20 [clip-path:polygon(30%_0,100%_0,70%_100%,0%_100%)]"></div>
          </div>
        </div>
      </div>

      {/* Main Nav Links Row */}
      <div className="bg-black/20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="text-[13px] font-medium text-gray-200 hover:text-[#f0514e] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-end"></div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/30 backdrop-blur-sm px-4 py-4"
          >
            <div className="space-y-0">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="block py-3 text-sm font-medium text-gray-300 hover:text-[#f0514e]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
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
  const sideStories = [
    { category: "LEADS", title: "Capture & qualify leads from every channel automatically", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=150&h=150&fit=crop" },
    { category: "PIPELINE", title: "Visual pipeline management with drag-and-drop deal stages", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop" },
    { category: "FORECAST", title: "AI-powered revenue forecasting with 95% accuracy", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=150&h=150&fit=crop" },
    { category: "REPORTS", title: "Real-time sales dashboards and custom performance reports", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=150&h=150&fit=crop" },
    { category: "TEAM", title: "Team performance tracking with gamification & leaderboards", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop" },
    { category: "INTEGRATE", title: "Seamless integration with CRM, email, and payment tools", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop" },
  ];

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 pb-8 grid lg:grid-cols-12 gap-8">
      {/* Featured Large Block Left */}
      <div className="lg:col-span-8 grid gap-8">
        <div className="relative group overflow-hidden bg-[#1a1a1a] cursor-pointer block">
          <img
            src="https://i.pinimg.com/1200x/78/89/62/78896223da124b4dee27d388ce04ca36.jpg"
            alt="Hero Banner"
            className="w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/9] object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <span className={getCategoryStyles("SALES")}>
              SALES TRACKING
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white mt-4 leading-tight tracking-tight">
              Turn Your Content Into Sales Machines
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-[11px] font-medium tracking-wider mt-5 uppercase">
              <span>BY POSTPIDIA</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> JUN 18, 2026</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> 12K+ DEALS</span>
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> 95% ACCURACY</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split Cards Below Hero */}
        <div className="grid grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://i.pinimg.com/1200x/d7/e0/d2/d7e0d280728e0a201b7139334b09920b.jpg" alt="Why Choose Us" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 ${getCategoryStyles("ANALYTICS")}`}>WHY US</span>
            </div>
            <h3 className="font-semibold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#f0514e] transition-colors">
              Built for Sales Teams That Want to Close More
            </h3>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://i.pinimg.com/736x/94/53/0c/94530cf01d8d7f935a07097ce6d61a2c.jpg" alt="Trusted Platform" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 ${getCategoryStyles("SALES")}`}>TRUSTED</span>
            </div>
            <h3 className="font-semibold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#f0514e] transition-colors">
              Trusted by 10,000+ Sales Professionals Worldwide
            </h3>
          </div>
        </div>
      </div>

  {/* Mobile Card Layout */}
  <div className="lg:hidden grid grid-cols-2 gap-4">
    {sideStories.map((story, idx) => (
      <div key={idx} className="bg-[#0a0a0a] group cursor-pointer flex flex-col relative overflow-hidden rounded-[2px] h-[220px] border border-[#222]">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={story.img}
            alt={story.title}
            className="w-full h-full object-cover object-[center_35%] opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        <div className="relative z-20 flex flex-col justify-end h-full p-5">
          <span className={`${getCategoryStyles(story.category)} w-fit mb-3`}>
            {story.category}
          </span>
          <h4 className="font-semibold text-[15px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#f0514e] transition-colors">
            {story.title}
          </h4>
          <div className="text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1.5 uppercase">
            <Calendar className="h-3 w-3" /> {story.date}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Desktop Sidebar Layout */}
  <div className="hidden lg:flex lg:col-span-4 flex-col space-y-6">
    {sideStories.map((story, idx) => (
      <div key={idx} className="flex gap-4 items-start group cursor-pointer">
        <div className="relative shrink-0 overflow-hidden">
          <img
            src={story.img}
            alt={story.title}
            className="w-[100px] h-[100px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center min-h-[100px] py-1">
          <div className="mb-2">
            <span className={getCategoryStyles(story.category)}>
              {story.category}
            </span>
          </div>
          <h4 className="font-semibold text-[15px] text-gray-200 line-clamp-2 leading-snug group-hover:text-[#f0514e] transition-colors">
            {story.title}
          </h4>
          <div className="text-[10px] text-gray-500 mt-2 font-medium flex items-center gap-1.5 uppercase">
            <Calendar className="h-3 w-3" /> {story.date}
          </div>
        </div>
      </div>
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
  const [sliderPage, setSliderPage] = useState(0);

  const services = [
    { category: "EDITING", title: "Video Editing", desc: "Professional editing tailored for TikTok Shop, Instagram Reels, YouTube Shorts and Amazon product videos.", img: "https://i.pinimg.com/1200x/4e/a2/f8/4ea2f876c2a2546347f860846c44d936.jpg" },
    { category: "MOTION", title: "Motion Graphics", desc: "Dynamic 2D/3D animations, text overlays, and visual effects that grab attention and drive engagement.", img: "https://i.pinimg.com/736x/c7/76/59/c77659f60e02cd32b2b1488946f8d534.jpg" },
    { category: "THUMBNAIL", title: "Thumbnail Design", desc: "A/B tested thumbnail variations designed to maximize click-through rates and views on every platform.", img: "https://i.pinimg.com/736x/74/c6/79/74c679b74ddeeac0e3c2d00f2642011b.jpg" },
    { category: "COLOR", title: "Color Grading", desc: "Advanced color correction and grading to give your content a cinematic, brand-consistent look.", img: "https://i.pinimg.com/736x/19/80/c3/1980c3b439b7314ec8ac85e25c855c00.jpg" },
    { category: "ANALYTICS", title: "Performance Analytics", desc: "Data-driven insights on content performance. SEO and keyword strategy for every video we deliver.", img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop" },
    { category: "AUDIO", title: "Audio Production", desc: "Professional noise reduction, audio leveling, and royalty-free background music selection.", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&h=350&fit=crop" },
  ];

  const visibleServices = sliderPage === 0 ? services.slice(0, 4) : services.slice(2, 6);

  return (
    <section id="services" className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h2 className="text-4xl md:text-[44px] font-light text-white">Services Built to Convert</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {visibleServices.map((item, idx) => (
          <div key={idx} className="bg-[#1a1a1a] group cursor-pointer flex flex-col h-full border border-[#222] hover:border-[#333] transition-colors relative">
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
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-3xl sm:text-5xl font-bold text-white/5 select-none pointer-events-none">
              {String(idx + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Slider Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
         <button 
           onClick={() => setSliderPage(0)}
           className={`h-1.5 transition-all duration-300 ${sliderPage === 0 ? "w-6 bg-[#5c45fd]" : "w-1.5 bg-gray-500"}`}
         />
         <button 
           onClick={() => setSliderPage(1)}
           className={`h-1.5 transition-all duration-300 ${sliderPage === 1 ? "w-6 bg-[#5c45fd]" : "w-1.5 bg-gray-500"}`}
         />
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
    <section className="py-8 md:py-16 overflow-hidden mt-8 md:mt-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeader 
          title="Trending Stories"
        />

        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:h-[320px]">
          {/* Left Card — Featured Story (full-height) */}
          <div className="bg-black p-6 sm:p-8 flex flex-col justify-end relative overflow-hidden rounded-[2px] h-[300px] md:h-full group border border-[#0a3a1e]">
            <div className="absolute inset-0 z-0">
              <img src={stories[0].img} alt={stories[0].title} className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 w-full flex flex-col items-start">
              <span className={`${getCategoryStyles("SALES")} mb-3`}>FEATURED</span>
              <h3 className="text-white text-[20px] sm:text-[24px] lg:text-[30px] font-bold leading-tight mb-2 max-w-full">{stories[0].title}</h3>
              <p className="text-gray-300 text-[13px] sm:text-[14px] mb-5 font-medium max-w-full line-clamp-2">{stories[0].subtitle}</p>
              <Link
                to="/story"
                search={{ title: stories[0].title, category: stories[0].category, subtitle: stories[0].subtitle, img: stories[0].img, tag: stories[0].tag, body: stories[0].body }}
                className="bg-white text-black rounded-full px-6 py-2.5 h-10 w-fit text-[11px] font-medium uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 inline-flex items-center"
              >
                Read Story
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 h-full">
            {/* Top Row — 2 smaller cards */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 h-[200px] md:h-[calc(50%-12px)]">
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
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center text-center bg-[#1a1a1a] rounded-xl p-6 shadow-sm border border-transparent transition-all duration-300 relative overflow-hidden"
            >
              {/* Background number */}
              <div className="absolute top-1 right-2 text-[100px] md:text-[120px] font-bold text-white/[0.06] leading-none select-none pointer-events-none">
                {item.step}
              </div>

              <img
                src={item.iconUrl}
                alt={item.title}
                className="w-16 h-16 object-contain mb-5"
              />

              {/* Text Content */}
              <h3 className="text-[15px] font-bold text-[#f0514e] mb-2 uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-[12px] text-gray-400 leading-relaxed">
                {item.desc}
              </p>

              {/* Arrow indicator on mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden mt-4 text-[#f0514e]">
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
    company: "Fashion & Retail",
    name: "Fashion Hub Nairobi",
    quote: "Postpidia completely transformed our TikTok Shop presence. Their video editing made our product launches go viral — we saw a 300% increase in sales within the first month. Absolutely outstanding work.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    overlay: "rgba(0, 0, 0, 0.35)",
  },
  {
    id: 2,
    company: "Consumer Electronics",
    name: "TechVibe Electronics",
    quote: "As a tech retailer, product videos are everything. Postpidia's team understands how to showcase electronics in a way that drives clicks and conversions. Our brand engagement has never been stronger.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    overlay: "rgba(0, 0, 0, 0.30)",
  },
  {
    id: 3,
    company: "Food & Beverage",
    name: "FreshBite Foods",
    quote: "Running a food brand on social media requires constant content. Postpidia delivers scroll-stopping videos that make our products look irresistible. Our followers grew by 10K in just 3 months.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    overlay: "rgba(0, 0, 0, 0.30)",
  },
  {
    id: 4,
    company: "Luxury Boutique",
    name: "Style Lounge Boutique",
    quote: "What sets Postpidia apart is their understanding of social commerce. They don't just edit videos — they create content that converts viewers into buyers. Our ROI has doubled since partnering with them.",
    imageUrl: "https://assets.vogue.in/photos/5ce4a28bb40d263bbed764a1/16:9/w_1280,c_limit/TASSELStyleLounge.jpg?mbid=social_retweet",
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
          What Our Clients Say
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
    image: "https://cdn.brandfetch.io/cruva.com/w/400/h/400/theme/dark/icon?c=1bxid64Mup7aczewSAYMX",
  },
  {
    name: "Kalodata",
    role: "TikTok Analytics",
    company: "Kalodata",
    description: "Kalodata provides deep analytics for TikTok Shop sellers, tracking product trends, competitor performance, and viral content patterns. We leverage it to identify high-performing video formats and optimize our clients' content strategy for maximum sales.",
    image: "https://cdn.brandfetch.io/kalodata.com/w/400/h/400/theme/dark/icon?c=1bxid64Mup7aczewSAYMX",
  },
  {
    name: "TikTok Shop",
    role: "Social Commerce",
    company: "TikTok Shop",
    description: "TikTok Shop is the leading social commerce platform integrating short-form video with seamless in-app purchasing. We track real-time sales data, monitor video-driven transactions, and analyze customer behavior to refine content that converts browsers into buyers.",
    image: "https://cdn.brandfetch.io/tiktokshop.com/w/400/h/400/theme/dark/icon?c=1bxid64Mup7aczewSAYMX",
  },
  {
    name: "FastMoss",
    role: "TikTok Data Intelligence",
    company: "FastMoss",
    description: "FastMoss delivers advanced TikTok commerce intelligence, tracking trending products, shop performance, and creator analytics. We use it to benchmark our clients' video performance against market leaders and identify untapped sales opportunities.",
    image: "https://cdn.brandfetch.io/iddtWGI7z6/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1776620051524",
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
                <div className="w-full sm:w-[160px] h-auto sm:h-[140px] shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto sm:h-full object-contain sm:object-cover"
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
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Postpidia" className="h-10 w-auto" />
            <span className="text-xl font-medium tracking-tight text-white leading-none">Postpidia</span>
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
              <li key={link} className="hover:text-[#f0514e] cursor-pointer transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#f0514e]" />
                {link}
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
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-gray-500">
        <div>&copy; {new Date().getFullYear()} Postpidia. All rights reserved.</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <a key={link} href="#" className="hover:text-gray-300 transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}