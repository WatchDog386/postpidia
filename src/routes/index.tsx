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
      { title: "Benqu — WordPress Blog & Magazine" },
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
  if (cat.includes("fashion")) return "bg-[#ff007b] text-white"; 
  if (cat.includes("food")) return "bg-[#ff6a00] text-white"; 
  if (cat.includes("travel")) return "bg-[#00c3ff] text-white"; 
  if (cat.includes("tech")) return "bg-[#006aff] text-white"; 
  if (cat.includes("creative")) return "bg-[#ffb300] text-black"; 
  if (cat.includes("sports")) return "bg-[#4caf50] text-white"; 
  if (cat.includes("racing")) return "bg-[#ff5722] text-white"; 
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
        <TrendingGrid />
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

  const navLinks = ["Home", "Features", "Categories", "Shop", "Pages", "Tags"];

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
                B
              </div>
              <div className="text-2xl font-bold tracking-tight text-white leading-none">
                Benqu
              </div>
            </a>
          </div>

          {/* Ad Banner */}
          <div className="hidden lg:flex flex-1 max-w-[700px] ml-8 bg-white h-[70px] relative overflow-hidden items-center justify-between px-6">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 opacity-20 [clip-path:polygon(0_0,100%_0,80%_100%,0%_100%)]"></div>
            <div className="absolute left-0 bottom-0 w-12 h-12 bg-blue-500 [clip-path:polygon(0_100%,100%_100%,0_0)]"></div>
            <div className="absolute left-8 top-0 w-16 h-16 bg-yellow-400 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"></div>
            
            <h2 className="text-black font-black text-xl z-10 ml-16">
              WordPress Blog & Magazine Themes
            </h2>
            
            <button className="bg-[#00d084] text-white font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 z-10 hover:bg-[#00b371] transition-colors">
              SHOP NOW
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
            <a href="#" className="text-[13px] font-bold text-gray-200 hover:text-[#ff007b] transition-colors">
              Contact Us
            </a>
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
              <a href="#" className="block py-3 text-sm font-bold text-gray-300 hover:text-[#ff007b]">
                Contact Us
              </a>
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
              Fasion Trends and Li Edelkoort the Culture Shock Special Report
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

function TrendingStoriesHeader({ title, endSlot }: { title: string, endSlot?: React.ReactNode }) {
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

function TrendingGrid() {
  const items = [
    { category: "CREATIVE", title: "African Nations Are Struggling To Save Ready Their Wildlife", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=500&h=350&fit=crop" },
    { category: "RACING", title: "Emirates Palace Spends that a Hefty Sum For...", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&h=350&fit=crop" },
    { category: "TECH", title: "Nintendo Labo VR hands This virtual Reality Gets Weird", img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&h=350&fit=crop" },
    { category: "FOOD", title: "Boxed Water Partners With To Consumer Creativity.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=350&fit=crop" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20">
      <TrendingStoriesHeader title="Trending Stories" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
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
              <h3 className="font-extrabold text-[15px] text-gray-200 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 mt-auto pt-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span>BY DAVID</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="h-3 w-3" /> 0 COMMENTS</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots beneath Trending Grid */}
      <div className="flex items-center justify-center gap-2 mt-8">
         <div className="w-6 h-1.5 bg-[#5c45fd]"></div>
         <div className="w-1.5 h-1.5 bg-gray-500"></div>
         <div className="w-1.5 h-1.5 bg-gray-500"></div>
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
        <TrendingStoriesHeader 
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
         <TrendingStoriesHeader title="Trending Stories" />

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
      icon: <UserPlus className="w-6 h-6 text-[#ff007b]" />,
      title: "Create Account",
      desc: "Sign up instantly and establish your tailored premium reader profile dashboard."
    },
    {
      step: "02",
      icon: <Sliders className="w-6 h-6 text-[#5c45fd]" />,
      title: "Tailor Preferences",
      desc: "Select specific global categories, trend trackers, and expert columnists."
    },
    {
      step: "03",
      icon: <BookOpen className="w-6 h-6 text-[#00d084]" />,
      title: "Immersive Reading",
      desc: "Gain deep access to highly visual, non-cluttered exclusive custom content."
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24">
      <TrendingStoriesHeader title="How It Works" />
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="bg-[#1a1a1a] border border-[#222] p-8 relative group transition-colors hover:border-[#333]">
            <div className="absolute top-4 right-6 text-4xl font-black text-[#262626] group-hover:text-[#ff007b]/10 transition-colors select-none">
              {item.step}
            </div>
            <div className="bg-[#111111] w-12 h-12 flex items-center justify-center border border-[#333] mb-6">
              {item.icon}
            </div>
            <h3 className="text-lg font-extrabold text-white mb-2 tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Basic Access",
      price: "0",
      desc: "Perfect for testing our premium framework tools.",
      features: ["Standard global articles feed", "Basic category filtering matrices", "Community comments reading", "Weekly curated brief newsletter"],
      cta: "Get Started Now",
      popular: false
    },
    {
      name: "Premium Pro",
      price: "19",
      desc: "Tailored directly for consistent trends investigators.",
      features: ["Unlimited complete premium posts", "Advanced layout dark filters", "Real-time global breaking tickers", "Zero external ad network tracking", "Priority system customer support"],
      cta: "Unlock Premium Access",
      popular: true
    },
    {
      name: "Elite Enterprise",
      price: "49",
      desc: "Designed comprehensively for corporate media teams.",
      features: ["Multi-user enterprise credentials", "Dedicated industry raw metrics exports", "Custom tag tracking triggers", "Direct custom content api hookups", "24/7 dedicated account engineers"],
      cta: "Deploy Elite Infrastructure",
      popular: false
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24">
      <TrendingStoriesHeader title="Premium Membership Plans" />
      <div className="grid lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, index) => (
          <div 
            key={index} 
            className={`flex flex-col border p-8 bg-[#1a1a1a] relative ${
              tier.popular ? "border-[#ff007b]" : "border-[#222]"
            }`}
          >
            {tier.popular && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#ff007b] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1">
                MOST POPULAR
              </span>
            )}
            
            <h3 className="text-lg font-extrabold text-white uppercase tracking-tight">{tier.name}</h3>
            <p className="text-xs text-gray-400 mt-2 mb-6 font-medium">{tier.desc}</p>
            
            <div className="flex items-baseline gap-1 mb-6 border-b border-[#222] pb-6">
              <span className="text-4xl font-black text-white tracking-tight">${tier.price}</span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">/ Month</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-xs font-semibold text-gray-300">
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? "text-[#ff007b]" : "text-[#5c45fd]"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full font-bold text-xs uppercase tracking-widest py-3.5 transition-colors ${
                tier.popular 
                  ? "bg-[#ff007b] text-white hover:bg-[#d80068]" 
                  : "bg-[#111111] text-white border border-[#333] hover:bg-[#222]"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24">
      <TrendingStoriesHeader title="Get In Touch" />
      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Info Column */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#1a1a1a] border border-[#222] p-8">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight mb-4">Contact Information</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-8 font-medium">
              Have inquiries regarding news submissions, commercial display partnerships, technical glitches, or custom membership arrangements? Reach out to our operators instantly.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#111111] border border-[#333] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#ff007b]" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">EMAIL ADDRESS</span>
                  <a href="mailto:support@benqu.news" className="text-sm font-bold text-white hover:text-[#ff007b] transition-colors">support@benqu.news</a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#111111] border border-[#333] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#5c45fd]" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">PHONE SYSTEM</span>
                  <a href="tel:+15558920192" className="text-sm font-bold text-white hover:text-[#5c45fd] transition-colors">+1 (555) 892-0192</a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#111111] border border-[#333] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#00d084]" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">HQ LOCATION</span>
                  <span className="text-sm font-bold text-white">789 Media Grid Row, NY 10011</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#222]">
             <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-3">FOLLOW CONSTANT STREAMS</span>
             <div className="flex items-center gap-4 text-gray-400">
               <Facebook className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
               <Twitter className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
               <Instagram className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
               <Youtube className="h-4 w-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-8 bg-[#1a1a1a] border border-[#222] p-8">
           <form onSubmit={(e) => e.preventDefault()} className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. David Miller" 
                  className="bg-[#111111] border border-[#333] focus:border-[#ff007b] text-gray-200 text-xs p-3 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. david@domain.com" 
                  className="bg-[#111111] border border-[#333] focus:border-[#ff007b] text-gray-200 text-xs p-3 outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Subject Matter *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Commercial Advertisement Space Inquiry" 
                  className="bg-[#111111] border border-[#333] focus:border-[#ff007b] text-gray-200 text-xs p-3 outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Detailed Narrative Message *</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Draft your operational request parameters here..." 
                  className="bg-[#111111] border border-[#333] focus:border-[#ff007b] text-gray-200 text-xs p-3 outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button 
                  type="submit" 
                  className="bg-[#5c45fd] hover:bg-[#4a36d9] text-white text-xs font-black uppercase tracking-widest px-8 py-4 flex items-center gap-2.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Transmission
                </button>
              </div>
           </form>
        </div>

      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24 mb-16">
      <div className="bg-[#5c45fd] relative overflow-hidden py-16 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between shadow-2xl">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="z-10 text-center md:text-left mb-8 md:mb-0 md:max-w-xl">
          <h2 className="text-3xl font-extrabold text-white mb-3">Get The Best News Directly in Your Inbox</h2>
          <p className="text-indigo-100 text-sm">Subscribe to our newsletter and stay updated on the latest trends, news, and special offers.</p>
        </div>

        <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-72">
             <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Mail className="w-4 h-4 text-gray-400" />
             </div>
             <input 
               type="email" 
               placeholder="Your email address" 
               className="w-full bg-[#111111] text-white placeholder:text-gray-500 text-sm px-4 py-3.5 pl-10 border-none focus:ring-2 focus:ring-[#ff007b] outline-none transition-all shadow-inner"
             />
          </div>
          <button className="bg-[#ff007b] hover:bg-[#d80068] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 border-t border-[#222]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Brand */}
        <div>
          <a href="#" className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-tr from-[#ff007b] to-[#ff5722] text-white w-10 h-10 flex items-center justify-center font-bold text-xl">
              B
            </div>
            <div className="text-2xl font-bold tracking-tight text-white leading-none">
              Benqu
            </div>
          </a>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Benqu is a premium WordPress blog and magazine theme designed for creators who want sharp aesthetics and high-performance layouts.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
             <Facebook className="h-4 w-4 hover:text-[#ff007b] cursor-pointer transition-colors" />
             <Twitter className="h-4 w-4 hover:text-[#ff007b] cursor-pointer transition-colors" />
             <Instagram className="h-4 w-4 hover:text-[#ff007b] cursor-pointer transition-colors" />
             <Youtube className="h-4 w-4 hover:text-[#ff007b] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h4 className="text-white font-extrabold text-lg mb-6 tracking-tight">Top Categories</h4>
          <ul className="space-y-3">
            {["Technology", "Fashion & Beauty", "Travel & Leisure", "Food & Drink", "Sports News"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-400 hover:text-[#ff007b] transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#ff007b] transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div>
          <h4 className="text-white font-extrabold text-lg mb-6 tracking-tight">Useful Links</h4>
          <ul className="space-y-3">
            {["About Us", "Contact Us", "Terms & Conditions", "Privacy Policy", "Advertise With Us"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-400 hover:text-[#ff007b] transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-[#ff007b] transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Recent Posts */}
        <div>
           <h4 className="text-white font-extrabold text-lg mb-6 tracking-tight">Recent Posts</h4>
           <div className="space-y-4">
              <div className="flex gap-4 group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop" alt="thumb" className="w-16 h-16 object-cover border border-[#222]" />
                 <div>
                    <h5 className="text-sm text-gray-200 font-bold leading-tight group-hover:text-[#ff007b] transition-colors line-clamp-2">Sony Laptops Are Still Part Of The Sony Family</h5>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 block">Jul 07, 2022</span>
                 </div>
              </div>
              <div className="flex gap-4 group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop" alt="thumb" className="w-16 h-16 object-cover border border-[#222]" />
                 <div>
                    <h5 className="text-sm text-gray-200 font-bold leading-tight group-hover:text-[#ff007b] transition-colors line-clamp-2">We believe Apple Will announce iPhone.</h5>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 block">Jul 07, 2022</span>
                 </div>
              </div>
           </div>
        </div>
        
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#111111] border-t border-[#222] py-6">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-500">
            &copy; 2023 <span className="text-gray-300">Benqu</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}