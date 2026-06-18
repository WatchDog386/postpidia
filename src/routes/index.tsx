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
  Send
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postpidia — Premium Magazine & Content Platform" },
      { name: "description", content: "Premium Magazine Platform" },
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
  if (cat.includes("fashion") || cat.includes("design")) return "bg-[#ff007b] text-white"; 
  if (cat.includes("food") || cat.includes("grading")) return "bg-[#ff6a00] text-white"; 
  if (cat.includes("travel") || cat.includes("graphics")) return "bg-[#00c3ff] text-white"; 
  if (cat.includes("tech") || cat.includes("editing")) return "bg-[#006aff] text-white"; 
  if (cat.includes("creative") || cat.includes("analytics")) return "bg-[#ffb300] text-black"; 
  if (cat.includes("sports")) return "bg-[#4caf50] text-white"; 
  if (cat.includes("racing") || cat.includes("production")) return "bg-[#ff5722] text-white"; 
  if (cat.includes("music")) return "bg-[#f44336] text-white"; 
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
        <BottomSection />
        <HowItWorksSection />
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
  const navLinks = ["Services", "Pricing", "How It Work", "Contact"];

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
              Postidia Premium Content & Trends
            </h2>
            
            <button className="bg-[#00d084] text-white font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 z-10 hover:bg-[#00b371] transition-colors">
              GET STARTED
            </button>
            
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
            <button className="bg-[#5c45fd] text-white font-bold px-6 py-2 text-[11px] tracking-wider uppercase hover:bg-[#4a36d9] transition-colors">
              LOGIN
            </button>
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
  )
}

function HeroSection() {
  const sideStories = [
    { category: "FASHION", title: "Trip Iqaluit Nunavut A Canadian Arctic City", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
    { category: "CREATIVE", title: "Sony Laptops Are Still Part Of The Sony Family", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&h=150&fit=crop" },
    { category: "SPORTS", title: "Copa America: Suarez devastated US", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop" },
    { category: "TECH", title: "We believe Apple Will announce iPhone.", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop" },
    { category: "MUSIC", title: "10 Things I've Learnt at Money Freelancer", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop" },
    { category: "TRAVEL", title: "Trip To Iqaluit In Nunavut A Canadian Arctic Nice City..", date: "JUL 07, 2022", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&h=150&fit=crop" },
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
            <span className={`px-2 py-1 text-[10px] font-bold tracking-widest ${getCategoryStyles("FASHION")}`}>
              FASHION
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 leading-tight tracking-tight group-hover:text-[#ff007b] transition-colors">
              Fashion Trends and Li Edelkoort the Culture Shock Special Report
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-[11px] font-bold tracking-wider mt-5 uppercase">
              <span>BY DAVID</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> JUL 07, 2022</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> 1 COMMENT</span>
              <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> 787 VIEWS</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split Cards Below Hero */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=380&fit=crop" alt="Travel" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("TRAVEL")}`}>TRAVEL</span>
            </div>
            <h3 className="font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
              Trip To Iqaluit In Nunavut A Canadian Arctic Nice City..
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider">
              <span>BY DAVID</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> JUL 07, 2022</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> 0 COMMENTS</span>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&h=380&fit=crop" alt="Food" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("FOOD")}`}>FOOD</span>
            </div>
            <h3 className="font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
              Smarter Food Choices 101 Tips For The Busy Women
            </h3>
            <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider">
              <span>BY DAVID</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> JUL 07, 2022</span>
              <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> 0 COMMENTS</span>
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
    { category: "VIDEO EDITING", title: "Video Editing", desc: "Professional editing tailored for TikTok Shop, Instagram Reels, YouTube Shorts and Amazon product videos.", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=350&fit=crop" },
    { category: "MOTION GRAPHICS", title: "Motion Graphics", desc: "Dynamic 2D/3D animations, text overlays, and visual effects that grab attention and drive engagement.", img: "https://images.unsplash.com/photo-1551269901-5c5e14c30ded?w=500&h=350&fit=crop" },
    { category: "THUMBNAIL DESIGN", title: "Thumbnail Design", desc: "A/B tested thumbnail variations designed to maximize click-through rates and views on every platform.", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=350&fit=crop" },
    { category: "COLOR GRADING", title: "Color Grading", desc: "Advanced color correction and grading to give your content a cinematic, brand-consistent look.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=350&fit=crop" },
    { category: "ANALYTICS", title: "Performance Analytics", desc: "Data-driven insights on content performance. SEO and keyword strategy for every video we deliver.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop" },
    { category: "AUDIO PRODUCTION", title: "Audio Production", desc: "Professional noise reduction, audio leveling, and royalty-free background music selection.", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=350&fit=crop" },
  ];

  // Sliding window mechanic: shows 4 cards on screen at any time.
  // Page 0 displays items 0, 1, 2, 3. Page 1 slides to display items 2, 3, 4, 5.
  const visibleServices = sliderPage === 0 ? services.slice(0, 4) : services.slice(2, 6);

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20">
      <SectionHeader title="Our Services" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleServices.map((item, idx) => (
          <div key={idx} className="bg-[#1a1a1a] group cursor-pointer flex flex-col h-full border border-[#222] hover:border-[#333] transition-colors">
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
                <span>SERVICES</span>
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
  const leftFeed = [
    { category: "FOOD", title: "Smarter Food Choices 101 Tips For The Busy Women", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=350&fit=crop" },
    { category: "FOOD", title: "Healthy Eating Habits For Long-term Mental Balance", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500&h=350&fit=crop" },
    { category: "FOOD", title: "The Absolute Best Fast Food Burgers Globally Ranked", img: "https://images.unsplash.com/photo-1495474472207-464a8d960972?w=500&h=350&fit=crop" },
  ];

  const socialStats = [
    { icon: <Facebook className="w-4 h-4" />, count: "30 k+", label: "Like", color: "text-[#3b5998]" },
    { icon: <Youtube className="w-4 h-4" />, count: "25 k+", label: "Subscrib", color: "text-[#ff0000]" },
    { icon: <Twitter className="w-4 h-4" />, count: "25 k+", label: "Followers", color: "text-[#1da1f2]" },
    { icon: <div className="text-sm font-bold italic">P</div>, count: "25 k+", label: "Followers", color: "text-[#bd081c]" }, 
    { icon: <Instagram className="w-4 h-4" />, count: "25 k+", label: "Followers", color: "text-[#e1306c]" },
    { icon: <Linkedin className="w-4 h-4" />, count: "17 k+", label: "Followers", color: "text-[#0077b5]" },
    { icon: <span className="font-bold">Bē</span>, count: "30 k+", label: "Followers", color: "text-[#1769ff]" },
    { icon: <span className="font-bold text-xs border rounded-full px-1">D</span>, count: "30 k+", label: "Followers", color: "text-[#ea4c89]" }, 
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20 grid lg:grid-cols-12 gap-10">
      {/* Left Feed Section (Second Trending Stories) */}
      <div className="lg:col-span-8">
        <SectionHeader 
           title="Trending Stories" 
           endSlot={
             <button className="bg-[#5c45fd] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 hover:bg-[#4a36d9] transition-colors">
               FOOD <ChevronRight className="w-3 h-3 rotate-90" />
             </button>
           } 
        />

        <div className="grid sm:grid-cols-3 gap-6">
          {leftFeed.map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 bg-black border border-[#222]">
                <img src={post.img} alt={post.title} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              </div>
              <h3 className="font-extrabold text-[15px] text-gray-200 mt-2 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Social Widget Section */}
      <div className="lg:col-span-4">
         <SectionHeader title="Trending Stories" />

        <div className="grid grid-cols-4 gap-[2px] bg-[#222]">
          {socialStats.map((stat, idx) => (
            <div key={idx} className="bg-[#151515] p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[#1a1a1a] transition-all">
              <div className={`mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-[13px] font-extrabold text-white leading-none mb-1">{stat.count}</span>
              <span className="text-[10px] text-gray-500 font-bold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Plan",
      desc: "Select the package that fits your content volume and business goals. Upgrade anytime as you grow."
    },
    {
      step: "02",
      title: "Send Your Raw Footage",
      desc: "Upload your raw videos, brand guidelines, and any special requests. We handle the rest."
    },
    {
      step: "03",
      title: "We Edit & Optimize",
      desc: "Our team transforms your footage into scroll-stopping content optimized for each platform."
    },
    {
      step: "04",
      title: "Publish & Profit",
      desc: "Receive your polished videos ready to upload. Watch your engagement and sales grow."
    }
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
          From raw footage to viral content in four simple steps. Our streamlined process ensures
          quick turnaround without sacrificing quality.
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
      name: "Startup",
      desc: "Perfect for small brands getting started with video content.",
      price: isYearly ? 39 : 49,
      features: [
        "Up to 4 Edited Videos",
        "Royalty-Free Background Music",
        "Advanced Color Grading",
        "Noise Reduction & Audio Leveling",
        "2 Revisions per Video",
        "Custom Thumbnail (1 per video)",
        "3% Sales Commission Agreement"
      ],
      popular: false
    },
    {
      name: "Essential",
      desc: "For growing brands ready to scale their content output.",
      price: isYearly ? 79 : 99,
      features: [
        "Up to 5 Edited Videos",
        "Dynamic Motion Graphics",
        "Advanced Color Correction",
        "A/B Testing Thumbnail Variations",
        "3 Revisions per Video",
        "Dedicated Project Manager",
        "Multi-Platform Exports (TikTok/YT/IG)",
        "3% Sales Commission Agreement"
      ],
      popular: true
    },
    {
      name: "Growth Pro",
      desc: "Full-service for brands serious about dominating social commerce.",
      price: isYearly ? 159 : 199,
      features: [
        "Up to 8 Edited Videos",
        "High-End 2D/3D Animations",
        "Custom Brand Identity Kit",
        "Premium Stock Footage Access",
        "Performance Analytics Consulting",
        "Unlimited Revisions",
        "Dedicated Project Manager",
        "Postpidia Asset Library Access",
        "24-Hour Priority Support",
        "Professional Voiceover Integration",
        "SEO & Keyword Strategy for Video",
        "3% Sales Commission Agreement"
      ],
      popular: false
    }
  ];

  return (
    <section className="bg-[#0b0b0b] py-20 text-center">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="inline-block border border-[#df9a28]/40 text-[#df9a28] bg-[#df9a28]/5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest mb-4">
          Pricing
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
          Choose the plan that matches your content needs. All plans include a low 3% performance-based commission on generated sales.
        </p>

        {/* Dynamic State Switcher */}
        <div className="flex justify-center items-center mb-16">
          <div className="bg-[#151515] p-1 rounded-full flex items-center border border-[#222]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !isYearly ? "bg-[#df9a28] text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                isYearly ? "bg-[#df9a28] text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${isYearly ? "bg-black/10 text-black" : "bg-[#df9a28]/10 text-[#df9a28]"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers Container */}
        <div className="grid lg:grid-cols-3 gap-8 items-start text-left">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={`flex flex-col border rounded-xl p-8 bg-[#111111] relative min-h-[640px] transition-all ${
                tier.popular ? "border-[#df9a28] shadow-lg shadow-[#df9a28]/5" : "border-[#222]"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111111] border border-[#df9a28] text-[#df9a28] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  <span>☆</span> Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">{tier.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6 min-h-[32px]">{tier.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white tracking-tight">${tier.price}</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">/month</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-xs font-semibold text-gray-300">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#df9a28]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all border flex items-center justify-center gap-1.5 ${
                  tier.popular 
                    ? "bg-[#df9a28] text-black border-[#df9a28] hover:bg-[#cb8b1f]" 
                    : "bg-transparent text-white border-[#2c2c2c] hover:bg-[#1a1a1a]"
                }`}
              >
                <span>Subscribe Now</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-[#0b0b0b] py-24 text-left border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-block border border-[#df9a28]/40 text-[#df9a28] bg-[#df9a28]/5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest mb-4 w-max">
            Contact
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Scale Your Content?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
            Get in touch with our team to discuss your video editing needs. We'll get back to you within 24 hours with a customized plan tailored exactly for your platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-300">
              <Phone className="w-4 h-4 text-[#df9a28]" />
              <span>+1 (555) 234-5678</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-300">
              <Mail className="w-4 h-4 text-[#df9a28]" />
              <span>support@postpidia.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-300">
              <MapPin className="w-4 h-4 text-[#df9a28]" />
              <span>San Francisco, CA 94107</span>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#222] p-8 rounded-xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">First Name</label>
                <input type="text" className="w-full bg-[#161616] border border-[#262626] rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#df9a28] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Last Name</label>
                <input type="text" className="w-full bg-[#161616] border border-[#262626] rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#df9a28] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email Address</label>
              <input type="email" className="w-full bg-[#161616] border border-[#262626] rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#df9a28] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Your Message</label>
              <textarea rows={4} className="w-full bg-[#161616] border border-[#262626] rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#df9a28] transition-colors resize-none"></textarea>
            </div>
            <button className="bg-[#df9a28] text-black font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded flex items-center gap-2 hover:bg-[#cb8b1f] transition-all">
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-r from-[#ff007b] to-[#5c45fd] py-20 text-center text-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Unlock Ultimate Performance Today</h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm mb-8 font-medium leading-relaxed">
          Join thousands of global brands utilizing our high-retention video pipelines to scale cross-platform views.
        </p>
        <button className="bg-white text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-lg shadow-xl hover:bg-gray-100 transition-colors">
          Get Started For Free
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-[#222] py-12 text-center text-xs text-gray-500 font-bold uppercase tracking-wider">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>© {new Date().getFullYear()} Postpidia. All Rights Reserved.</div>
        <div className="flex gap-6 normal-case text-gray-400 font-semibold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}