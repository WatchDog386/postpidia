import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  ChevronRight,
  Mail,
  UserPlus,
  Sliders,
  BookOpen,
  Check,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import whyImg from "@/public/why.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postpidia — Sales Tracking Software" },
      { name: "description", content: "Track, analyze, and close more deals with Postpidia" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Landing,
});

// Exact Tag Color Mapper from the design
const getCategoryStyles = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("fashion") || cat.includes("design") || cat.includes("leads") || cat.includes("lead")) return "bg-[#ff007b] text-white"; 
  if (cat.includes("food") || cat.includes("grading") || cat.includes("pipeline") || cat.includes("dashboard")) return "bg-[#ff6a00] text-white"; 
  if (cat.includes("travel") || cat.includes("graphics") || cat.includes("forecast") || cat.includes("reports")) return "bg-[#00c3ff] text-white"; 
  if (cat.includes("tech") || cat.includes("editing") || cat.includes("crm") || cat.includes("integrate") || cat.includes("reporting") || cat.includes("integrations")) return "bg-[#006aff] text-white"; 
  if (cat.includes("creative") || cat.includes("analytics") || cat.includes("sales")) return "bg-[#ffb300] text-black"; 
  if (cat.includes("sports")) return "bg-[#4caf50] text-white"; 
  if (cat.includes("racing") || cat.includes("production")) return "bg-[#ff5722] text-white"; 
  if (cat.includes("music") || cat.includes("team")) return "bg-[#f44336] text-white"; 
  return "bg-indigo-600 text-white";
};

export default function Landing() {
  return (
    <div className="bg-[#111111] text-gray-200 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      <Nav />
      <main className="relative">
        <FloatingThemeToggle />
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <BottomSection />
        <PricingSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const navLinks = ["Features", "Pricing", "How It Works", "Contact"];

  return (
    <header className="bg-[#111111]">
      {/* Top Ticker Row */}
      <div className="bg-[#111111] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-[11px] font-semibold">
          <div className="flex items-center gap-3">
            <span className="bg-[#5c45fd] text-white px-2.5 py-1 tracking-wider">
              JANUARY 17, 2023
            </span>
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="h-3 w-3 text-[#ff5722]" />
              <span className="text-gray-300">Trending News:</span>
              <span className="hover:text-white cursor-pointer transition-colors hidden sm:block">
                We Believe Announce Will the iPhone this Day...
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-3">
              <span>Follow Us</span>
              <Facebook className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
              <Twitter className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
              <Linkedin className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
              <Instagram className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
              <Youtube className="h-3.5 w-3.5 hover:text-white cursor-pointer" />
            </div>
            <User className="h-3.5 w-3.5 hover:text-white cursor-pointer ml-2" />
          </div>
        </div>
      </div>

      {/* Brand & Ad Spot Row */}
      <div className="bg-[#1a1a1a] border-b border-[#222]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-white p-1 lg:hidden border border-gray-700"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <a href="#" className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-[#ff007b] to-[#ff5722] text-white w-10 h-10 flex items-center justify-center font-bold text-xl">
                P
              </div>
               <div className="text-2xl font-bold tracking-tight text-white leading-none">
                 Postpidia
               </div>
            </a>
          </div>

          {/* Ad Banner */}
          <div className="hidden lg:flex flex-1 max-w-[700px] ml-8 bg-white h-[70px] relative overflow-hidden items-center justify-between px-6">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 opacity-20 [clip-path:polygon(0_0,100%_0,80%_100%,0%_100%)]"></div>
            <div className="absolute left-0 bottom-0 w-12 h-12 bg-blue-500 [clip-path:polygon(0_100%,100%_100%,0_0)]"></div>
            <div className="absolute left-8 top-0 w-16 h-16 bg-yellow-400 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"></div>
            
            <h2 className="text-black font-black text-xl z-10 ml-16">
              Postpidia Sales Tracking — Close More Deals
            </h2>
            
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="relative bg-[#00d084] text-white font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 z-10 shadow-[0_4px_0_0_#009c63] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded"
            >
              GET STARTED
            </motion.button>
            
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#ff007b] [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]"></div>
            <div className="absolute right-8 top-0 bottom-0 w-16 bg-white opacity-20 [clip-path:polygon(30%_0,100%_0,70%_100%,0%_100%)]"></div>
          </div>
        </div>
      </div>

      {/* Main Nav Links Row */}
      <div className="bg-[#111111]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[13px] font-bold text-gray-200 hover:text-[#ff007b] transition-colors flex items-center gap-1.5 group"
              >
                {label}
                <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-[#ff007b] transition-colors" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
            <div className="relative hidden sm:flex items-center w-64 border border-[#333] focus-within:border-[#ff007b] transition-colors">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-transparent text-xs text-gray-200 placeholder:text-gray-600 pl-3 pr-10 py-2 w-full focus:outline-none"
              />
              <Search className="h-3.5 w-3.5 text-gray-400 absolute right-3 pointer-events-none" />
            </div>
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="relative bg-[#5c45fd] text-white font-bold px-6 py-2 text-[11px] tracking-wider uppercase shadow-[0_4px_0_0_#4430ca] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded"
            >
              LOGIN
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1a1a1a] border-t border-[#333] px-4 py-4"
          >
            <div className="space-y-0">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="block py-3 text-sm font-bold text-gray-300 hover:text-[#ff007b] border-b border-[#333] flex justify-between items-center"
                >
                  {label}
                  <ChevronRight className="h-4 w-4" />
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
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-8 grid lg:grid-cols-12 gap-8">
      {/* Featured Large Block Left */}
      <div className="lg:col-span-8 grid gap-8">
        <div className="relative group overflow-hidden bg-[#1a1a1a] cursor-pointer block">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop"
            alt="Hero Banner"
            className="w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/9] object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <span className={`px-2 py-1 text-[10px] font-bold tracking-widest ${getCategoryStyles("SALES")}`}>
              SALES TRACKING
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 leading-tight tracking-tight group-hover:text-[#ff007b] transition-colors">
              Turn Your Content Into Sales Machines
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-[11px] font-bold tracking-wider mt-5 uppercase">
              <span>BY POSTPIDIA</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> JUN 18, 2026</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> 12K+ DEALS</span>
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> 95% ACCURACY</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split Cards Below Hero */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=380&fit=crop" alt="Why Choose Us" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("ANALYTICS")}`}>WHY US</span>
            </div>
            <h3 className="font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
              Built for Sales Teams That Want to Close More
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider">
              <span>BY POSTPIDIA</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> JUN 18, 2026</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +47% CONVERSION</span>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=380&fit=crop" alt="Trusted Platform" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("SALES")}`}>TRUSTED</span>
            </div>
            <h3 className="font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
              Trusted by 10,000+ Sales Professionals Worldwide
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider">
              <span>BY POSTPIDIA</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> JUN 18, 2026</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> 4.9/5 RATING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar List Grid Right */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
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
                 <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest ${getCategoryStyles(story.category)}`}>
                   {story.category}
                 </span>
              </div>
              <h4 className="font-extrabold text-[15px] text-gray-200 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
                {story.title}
              </h4>
              <div className="text-[10px] text-gray-500 mt-2 font-bold flex items-center gap-1.5 uppercase">
                <Calendar className="h-3 w-3" /> {story.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ title, endSlot }: { title: string, endSlot?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div className="flex items-center w-full">
         <h2 className="text-[22px] font-extrabold text-white whitespace-nowrap pr-6">{title}</h2>
         <div className="h-[1px] bg-[#333] flex-grow"></div>
         {endSlot && <div className="pl-6">{endSlot}</div>}
      </div>
    </div>
  );
}

function ServicesSection() {
  const [sliderPage, setSliderPage] = useState(0);

  const services = [
    { category: "LEAD TRACKING", title: "Lead Management", desc: "Capture, organize, and score leads from every channel. Automated follow-ups ensure no opportunity slips through the cracks.", img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=350&fit=crop" },
    { category: "PIPELINE", title: "Pipeline Analytics", desc: "Visual deal stages with drag-and-drop management. See exactly where every deal stands and what needs attention.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop" },
    { category: "FORECASTING", title: "Revenue Forecasting", desc: "AI-powered predictions with 95% accuracy. Know your future revenue and make data-driven business decisions confidently.", img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=350&fit=crop" },
    { category: "DASHBOARDS", title: "Custom Dashboards", desc: "Real-time sales KPIs, conversion funnels, and team performance metrics all in one customizable view.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop" },
    { category: "INTEGRATIONS", title: "Seamless Integrations", desc: "Connect with your CRM, email marketing, Stripe, Slack, and 200+ tools. Your data syncs automatically.", img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop" },
    { category: "REPORTING", title: "Automated Reporting", desc: "Generate and schedule custom sales reports. Share insights with your team automatically via email or Slack.", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&h=350&fit=crop" },
  ];

  const visibleServices = sliderPage === 0 ? services.slice(0, 4) : services.slice(2, 6);

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20">
      <SectionHeader title="Sales Tracking Features" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleServices.map((item, idx) => (
          <div key={idx} className="bg-[#1a1a1a] group cursor-pointer flex flex-col h-full border border border-[#222] hover:border-[#333] transition-colors">
            <div className="relative overflow-hidden bg-black shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <span className={`absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles(item.category)}`}>
                {item.category}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-extrabold text-[15px] text-gray-200 line-clamp-1 leading-snug group-hover:text-[#ff007b] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed font-medium">
                {item.desc}
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span>FEATURES</span>
                <span className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#5c45fd]" /> READY</span>
              </div>
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
      category: "SALES",
      title: "How Top Sales Teams Close 3X More Deals With Data",
      subtitle: "Data-driven selling strategies that work",
      tag: "Trending",
      img: "https://images.unsplash.com/photo-1553729459-afe8f2e7afb8?w=500&h=350&fit=crop",
    },
    {
      category: "SALES",
      title: "AI-Powered Forecasting: The Future of Revenue Prediction",
      subtitle: "Machine learning in sales",
      tag: "New",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop",
    },
    {
      category: "SALES",
      title: "Pipeline Management Secrets From Million-Dollar Reps",
      subtitle: "Proven pipeline tactics",
      tag: "Hot",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop",
    },
  ];

  return (
    <section className="py-16 overflow-hidden mt-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <SectionHeader 
          title="Trending Stories"
          endSlot={
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="relative bg-[#5c45fd] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 shadow-[0_4px_0_0_#4430ca] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded"
            >
              ALL STORIES <ChevronRight className="w-3 h-3" />
            </motion.button>
          }
        />

        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:h-[420px]">
          {/* Left Card — Featured Story (full-height) */}
          <div className="bg-[#1a1a1a] p-8 flex flex-col justify-center relative overflow-hidden rounded-[2px] h-[400px] md:h-full group border border-[#222]">
            <div className="relative z-10 w-[60%] ml-auto text-right flex flex-col items-end">
              <span className="text-[#ff007b] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">FEATURED</span>
              <h3 className="text-white text-[22px] lg:text-[28px] font-black leading-tight mb-3">{stories[0].title}</h3>
              <p className="text-gray-400 text-[12px] mb-6 font-medium">{stories[0].subtitle}</p>
              <button className="bg-transparent border-[1.5px] border-white text-white hover:bg-white hover:text-[#111] rounded-full px-6 py-2.5 h-10 w-fit text-[11px] font-bold uppercase tracking-wider transition-all duration-300">
                Read Story
              </button>
            </div>
            <div className="absolute left-[-5%] bottom-0 w-[70%] h-[95%] pointer-events-none">
              <img src={stories[0].img} alt={stories[0].title} className="w-full h-full object-cover object-bottom opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 h-full">
            {/* Top Row — 2 smaller cards */}
            <div className="grid grid-cols-2 gap-6 h-[200px] md:h-[calc(50%-12px)]">
              <div className="bg-[#5c45fd] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#6b56ff]">
                <div className="bg-white/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px] w-fit mb-2 relative z-10 tracking-widest">
                  {stories[1].tag}
                </div>
                <h4 className="text-white text-[15px] font-bold mb-1 relative z-10 leading-tight">{stories[1].title}</h4>
                <p className="text-white/70 text-[11px] relative z-10 mb-auto font-medium">{stories[1].subtitle}</p>
                <a href="#" className="text-white text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link">
                  Read More <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </a>
                <div className="absolute -right-4 bottom-[-10%] w-[80%] h-[90%] pointer-events-none">
                  <img src={stories[1].img} alt={stories[1].title} className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="bg-[#ff007b] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#ff1a8a]">
                <div className="bg-white/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px] w-fit mb-2 relative z-10 tracking-widest">
                  {stories[2].tag}
                </div>
                <h4 className="text-white text-[15px] font-bold mb-1 relative z-10 leading-tight">{stories[2].title}</h4>
                <p className="text-white/70 text-[11px] relative z-10 mb-auto font-medium">{stories[2].subtitle}</p>
                <a href="#" className="text-white text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link">
                  Read More <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </a>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-[85%] h-[120%] pointer-events-none">
                  <img src={stories[2].img} alt={stories[2].title} className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>

            {/* Bottom Row — wider CTA card */}
            <div className="bg-[#1a1a1a] p-6 relative overflow-hidden rounded-[2px] h-[200px] md:h-[calc(50%-12px)] flex flex-col justify-center group border border-[#222]">
              <div className="relative z-10">
                <p className="text-[#ff007b] text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">FEATURES</p>
                <h4 className="text-white text-[20px] lg:text-[24px] font-bold mb-1">Sales Tracking Platform</h4>
                <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-3">ALL FEATURES THIS WEEK</p>
                <a href="#" className="inline-flex items-center gap-2 bg-transparent border border-white text-white hover:bg-white hover:text-[#111] text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 transition-all duration-300">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55%] h-[120%] pointer-events-none">
                <img src={stories[0].img} alt="Food lifestyle" className="w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105" />
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
    { step: "01", title: "Connect Your Tools", desc: "Integrate your CRM, email, calendar, and payment platforms. Postpidia syncs all your sales data automatically." },
    { step: "02", title: "Track Every Deal", desc: "Log deals, set stages, and update progress with a simple drag-and-drop interface. Never lose sight of an opportunity." },
    { step: "03", title: "Analyze & Forecast", desc: "Get AI-powered insights on your pipeline health, conversion rates, and revenue forecasts with 95% accuracy." },
    { step: "04", title: "Close & Scale", desc: "Automate follow-ups, generate reports, and replicate your winning sales playbook across the entire team." }
  ];

  return (
    <section className="bg-[#0b0b0b] py-24 text-center mt-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="inline-block border border-[#df9a28]/40 text-[#df9a28] bg-[#df9a28]/5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest mb-4">
          Process
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
          How It Works
        </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-20 leading-relaxed font-medium">
            From first touch to closed deal in four simple steps. Our platform streamlines your
            sales process so you can focus on what matters — closing more revenue.
          </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-1 mb-4 select-none">
                {index > 0 && <span className="text-[#3b2d18] font-bold text-xl mr-1">—</span>}
                <span className="text-4xl font-black text-[#2e2415] tracking-tight">
                  {item.step}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Starter",
      price: isYearly ? 39 : 49,
      gradient: "from-blue-600 via-purple-600 to-purple-700",
      features: [
        "Up to 500 deals tracked",
        "3 team members",
        "Pipeline management",
        "Email integration",
        "Basic dashboards",
        "Lead capture forms",
        "Mobile app access",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: isYearly ? 69 : 89,
      gradient: "from-orange-500 via-red-500 to-pink-600",
      features: [
        "Unlimited deals tracked",
        "10 team members",
        "AI revenue forecasting",
        "Custom pipeline stages",
        "Advanced analytics",
        "Automated workflows",
        "Slack & Stripe integration",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      price: isYearly ? 99 : 129,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      features: [
        "Unlimited everything",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "White-label reporting",
        "API access",
        "SSO & RBAC",
        "24/7 phone support"
      ]
    }
  ];

  return (
    <section className="bg-[#111111] py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Choose your plan
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            Scale your sales tracking from solo to enterprise. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Dynamic State Switcher */}
        <div className="flex justify-center items-center mb-16">
          <div className="bg-[#1a1a1a] p-1 rounded-full flex items-center border border-[#333]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                !isYearly ? "bg-[#5c45fd] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                isYearly ? "bg-[#5c45fd] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${isYearly ? "bg-white/20 text-white" : "bg-[#5c45fd]/20 text-[#5c45fd]"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl overflow-hidden flex flex-col min-h-[600px] transition-transform hover:scale-105 duration-300`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-90`} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-8">
                <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
                  {tier.name}
                </h3>

                <ul className="space-y-4 mb-auto">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-medium text-white/90">
                      <Check className="w-4 h-4 shrink-0 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-black text-white tracking-tight">
                      ${tier.price}
                    </span>
                    <span className="text-sm text-white/80 font-medium">
                      per month
                    </span>
                  </div>

                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`w-full font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 ${
                      index === 1 
                        ? "bg-[#111111] text-white shadow-lg" 
                        : "bg-[#111111]/80 text-white backdrop-blur-sm hover:bg-[#111111]"
                    }`}
                  >
                    <span>Sign up</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-xs font-medium">
            © 2020 BooStock. Designed by Harry Boo
          </p>
        </div>
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
    <section className="bg-[#111111] pt-0 pb-16">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-8 relative flex flex-col lg:flex-row items-end gap-16 lg:gap-12">
        <div className="w-full lg:w-[45%] relative flex items-end justify-center lg:justify-end pt-32 lg:pt-0 -mb-3 lg:-mb-4">
          <div className="absolute top-10 lg:-top-10 left-0 lg:left-0 xl:left-[-20px] z-10 bg-[#ff007b] rounded-[24px] text-white p-8 w-[240px] sm:w-[280px] shadow-2xl">
            <div className="bg-white text-[#ff007b] w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-center font-bold text-[18px] mb-3">Chat With Live !</h3>
            <p className="text-center text-[11px] leading-relaxed text-white/90 mb-8 pt-2">
              Have questions? Our support team is ready to help you with any enquiry.
            </p>
            <div className="flex justify-center">
              <Button className="bg-white text-[#ff007b] hover:bg-gray-100 rounded-full px-6 py-2 h-9 text-[10px] font-extrabold uppercase tracking-widest">
                LET'S CHAT
              </Button>
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
            <div className="inline-flex items-center gap-2 text-[#ff007b] text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007b]"></span>
              CONTACT US
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff007b]"></span>
            </div>
            <h2 className="text-white font-display font-[900] text-[32px] md:text-[42px] leading-[1.1] mb-10">
              <span className="text-[#ff007b]">Reach</span> & Get In Touch<br />
              With Us !
            </h2>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your name*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
                required
              />
              <Input
                placeholder="Your Email*"
                type="email"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your number*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
              />
              <Input
                placeholder="Your Subject*"
                className="bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
              />
            </div>
            <Textarea
              placeholder="Enter message"
              rows={5}
              className="bg-[#1a1a1a] border border-[#333] rounded-[20px] p-6 text-[13px] text-gray-200 placeholder:text-gray-500 resize-none focus-visible:ring-1 focus-visible:ring-[#ff007b]"
            />

            <div className="mt-2 text-left">
              <Button
                type="submit"
                className="bg-[#ff007b] hover:bg-[#e0006b] text-white rounded-full px-8 py-6 h-12 text-[11px] font-extrabold uppercase tracking-widest shadow-md transition-transform hover:-translate-y-0.5 w-[200px]"
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
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-24">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1c144e] to-[#0b0b0b] border border-[#33259e]/50 px-8 py-16 sm:p-16 text-center rounded-2xl">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5c45fd]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff007b]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Ready to Close More Deals?
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Join thousands of sales teams using Postpidia to track, analyze, and close deals faster than ever before.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className="bg-[#5c45fd] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 shadow-[0_5px_0_0_#4430ca] active:translate-y-[5px] active:shadow-none transition-all duration-150 rounded"
            >
              <span>Get Started Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className="bg-transparent text-white border border-gray-700 font-bold text-xs uppercase tracking-widest px-8 py-3.5 shadow-[0_5px_0_0_#222] active:translate-y-[5px] active:shadow-none transition-all duration-150 rounded hover:bg-white/5"
            >
              View Case Studies
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const categories = ["Lead Management", "Pipeline", "Forecasting", "Reports", "Integrations", "Dashboard", "Mobile"];
  const companyLinks = ["About Us", "Features", "Pricing", "Contact Info", "Careers"];
  const legalityLinks = ["Terms of Service", "Privacy Policy", "Content Guidelines", "Cookie Settings"];

  return (
    <footer className="bg-[#161616] border-t border-[#222] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 mb-12">
        <div className="col-span-2 lg:col-span-4 flex flex-col space-y-6">
          <a href="#" className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-[#ff007b] to-[#ff5722] text-white w-9 h-9 flex items-center justify-center font-bold text-lg">
              P
            </div>
            <div className="text-xl font-bold tracking-tight text-white leading-none">
              Postpidia
            </div>
          </a>
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
            Sales tracking platform designed for modern teams. Track deals, forecast revenue, and close more with data-driven insights and automation.
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
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#ff007b] pl-3">Categories</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
            {categories.map((cat) => (
              <li key={cat} className="hover:text-[#ff007b] cursor-pointer transition-colors flex items-center gap-1.5 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#ff007b]" />
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#5c45fd] pl-3">Company</h4>
          <ul className="space-y-2 text-xs font-semibold text-gray-400">
            {companyLinks.map((link) => (
              <li key={link} className="hover:text-white cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3 flex flex-col space-y-4">
          <h4 className="text-[11px] font-bold text-white uppercase tracking-wider border-l-2 border-[#df9a28] pl-3">Newsletter</h4>
          <p className="text-gray-400 text-xs font-medium leading-relaxed">
            Subscribe for sales tips, product updates, and exclusive offers.
          </p>
          <div className="relative flex items-center border border-[#333] focus-within:border-[#df9a28] bg-[#111] transition-colors rounded overflow-hidden">
            <input type="email" placeholder="Your Email..." className="bg-transparent text-xs text-gray-200 placeholder:text-gray-600 pl-3 pr-12 py-2.5 w-full focus:outline-none" />
            <button className="bg-[#df9a28] text-black h-full px-3 absolute right-0 flex items-center justify-center hover:bg-[#c9861f] transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-gray-500">
        <div>&copy; {new Date().getFullYear()} POSTPIDIA. ALL RIGHTS RESERVED.</div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {legalityLinks.map((link) => (
            <a key={link} href="#" className="hover:text-gray-300 transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}