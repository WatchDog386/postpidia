import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, User, MessageCircle, ChevronLeft, ArrowLeft } from "lucide-react";

const testimonials = [
  {
    name: "Vandale Gama",
    role: "Marketing Director",
    text: "Postpidia completely transformed our social presence. Our TikTok and Reels engagement skyrocketed in just the first month.",
  },
  {
    name: "Sarah Chen",
    role: "CEO, BrightMedia",
    text: "The quality and speed of Postpidia's editing is unmatched. Our conversion rates have never been higher.",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Content, ShopFlow",
    text: "We've tried dozens of editing services. Postpidia is the only one that truly understands social commerce.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Postpidia" },
      {
        name: "description",
        content:
          "Learn about Postpidia, a premium video editing agency focused on high-conversion social commerce content.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const navigate = useNavigate();
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToContact = () => {
    navigate({ to: "/" });
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const t = testimonials[testimonialIndex];

  return (
    <div className="min-h-screen antialiased font-sans overflow-hidden relative">
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-1.5 sm:gap-2 bg-[#1a1a1a]/80 backdrop-blur-md text-gray-300 border border-white/10 rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 text-[10px] sm:text-sm font-semibold hover:bg-[#222] shadow-lg transition-all"
      >
        <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4" /> Back to Home
      </Link>

      <section className="hero-pattern hero-diagonal relative w-full pt-16 sm:pt-20 pb-24 sm:pb-32 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 gap-8 sm:gap-12 items-center z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 sm:px-4 py-1 mb-6 shadow-sm">
            <span className="text-red-500 text-[10px] sm:text-xs font-bold">✨</span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400">
              Premium Video Editing
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-6xl font-normal text-white leading-[1.1] mb-4 sm:mb-6 tracking-tight">
            Postpidia: Premium
            <br />
            Video Editing
          </h1>

          <p className="text-gray-400 text-[11px] sm:text-sm lg:text-base leading-relaxed mb-5 sm:mb-8 max-w-sm">
            A premium video editing service that creates high-conversion video content.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#services"
              onClick={scrollToServices}
              className="bg-white text-[#111] rounded-full px-5 sm:px-8 py-2 sm:py-3.5 text-[11px] sm:text-sm font-semibold hover:bg-gray-200 shadow-xl cursor-pointer inline-block"
            >
              View Services
            </a>
            <button
              onClick={goToContact}
              className="bg-white/10 backdrop-blur-md text-gray-300 border border-white/10 rounded-full px-5 sm:px-8 py-2 sm:py-3.5 text-[11px] sm:text-sm font-medium hover:bg-white/20 transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex justify-center lg:justify-end h-[220px] sm:h-[300px] lg:h-[450px]">
          {/* Decorative concentric circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] sm:w-[240px] lg:w-[340px] h-[160px] sm:h-[240px] lg:h-[340px] rounded-full border-2 border-white/5 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[340px] lg:w-[480px] h-[220px] sm:h-[340px] lg:h-[480px] rounded-full border-2 border-white/5 pointer-events-none"></div>

          {/* Center image */}
          <div className="relative z-10 w-[160px] sm:w-[240px] lg:w-[350px] shrink-0 self-center">
            <img
              src="/availble.png"
              alt="Available"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating elements */}
          <div className="absolute top-[10%] left-[-10px] sm:left-[-20px] bg-[#1a1a1a]/80 backdrop-blur-xl rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-xl border border-white/10 flex items-center gap-1.5 sm:gap-3">
            <div className="bg-[#222] p-1 sm:p-2 rounded-lg text-red-500">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] text-gray-500 font-medium leading-none">Earn point</p>
              <p className="text-[11px] sm:text-sm font-bold text-white leading-none mt-1">$21.00</p>
            </div>
          </div>

          {/* Play button float */}
          <button
            onClick={() => navigate({ to: "/" })}
            className="absolute top-[15%] right-[10px] sm:right-[20px] w-6 sm:w-10 h-6 sm:h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg border border-white/10 z-20 cursor-pointer"
          >
            <div className="w-0 h-0 border-t-[3px] sm:border-t-[5px] border-b-[3px] sm:border-b-[5px] border-l-[5px] sm:border-l-[8px] border-t-transparent border-b-transparent border-l-white ml-0.5 sm:ml-1"></div>
          </button>

          <div className="absolute bottom-10 sm:bottom-20 right-[-5px] sm:right-[-10px] bg-[#1a1a1a]/80 backdrop-blur-xl rounded-lg sm:rounded-xl p-1.5 sm:p-3 shadow-xl border border-white/10 flex items-center gap-1.5 sm:gap-3">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              <img
                className="w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 border-white/20 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="avatar"
              />
              <img
                className="w-4 sm:w-6 h-4 sm:h-6 rounded-full border-2 border-white/20 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="avatar"
              />
            </div>
            <div>
              <p className="text-[11px] sm:text-sm font-bold text-white leading-none">+100k</p>
              <p className="text-[8px] sm:text-[10px] text-gray-500 font-medium leading-none mt-1">
                Students joined
              </p>
            </div>
          </div>

          {/* Small floating avatars */}
          <img
            className="absolute top-1/3 -left-3 sm:-left-6 w-5 sm:w-9 h-5 sm:h-9 rounded-full border-[3px] border-white/20 object-cover shadow-lg"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
            alt="avatar"
          />
          <img
            className="absolute bottom-8 sm:bottom-16 left-3 sm:left-8 w-4 sm:w-8 h-4 sm:h-8 rounded-full border-[3px] border-white/20 object-cover shadow-lg"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
            alt="avatar"
          />
          <img
            className="absolute bottom-0 right-8 sm:right-16 w-6 sm:w-11 h-6 sm:h-11 rounded-full border-[3px] border-white/20 object-cover shadow-lg"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="avatar"
          />

          {/* Apple Logo minimal float */}
          <div className="absolute bottom-12 sm:bottom-24 left-1/4 w-5 sm:w-8 h-5 sm:h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-md">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.61 1.54-1.43 2.96-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-12 sm:py-24 relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-xl sm:text-3xl font-light text-white tracking-tight">Our Services</h2>
        </div>

        {/* Backdrop blob for Services */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-500/10 rounded-full blur-[80px] -z-10"></div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 relative z-10">
          {/* Active/Highlighted Card */}
          <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-[16px] sm:rounded-[28px] p-3 sm:p-8 shadow-sm flex gap-2 sm:gap-5 border border-white/10">
            <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 shadow-sm text-red-500">
              <User className="w-3 sm:w-5 h-3 sm:h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-[11px] sm:text-lg mb-1 sm:mb-2">Social Commerce Ads</h3>
              <p className="text-gray-400 text-[8px] sm:text-xs leading-relaxed font-medium">
                High-conversion video content designed specifically for platforms like TikTok, Instagram Reels, and YouTube Shorts.
              </p>
            </div>
          </div>

          {/* Inactive Cards */}
          <div className="bg-[#1a1a1a] rounded-[16px] sm:rounded-[28px] p-3 sm:p-8 shadow-sm flex gap-2 sm:gap-5 border border-white/5">
            <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
              <Menu className="w-3 sm:w-5 h-3 sm:h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-[11px] sm:text-lg mb-1 sm:mb-2">Platform Optimization</h3>
              <p className="text-gray-500 text-[8px] sm:text-xs leading-relaxed font-medium">
                We optimize your video content to ensure it performs at its best on your target platforms.
              </p>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-[16px] sm:rounded-[28px] p-3 sm:p-8 shadow-sm flex gap-2 sm:gap-5 border border-white/5">
            <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
              <MessageCircle className="w-3 sm:w-5 h-3 sm:h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-[11px] sm:text-lg mb-1 sm:mb-2">Expert Production</h3>
              <p className="text-gray-500 text-[8px] sm:text-xs leading-relaxed font-medium">
                Professional editing services that elevate your brand and drive results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 sm:py-24 relative w-full max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 gap-8 sm:gap-16 items-center">
        <div className="relative h-[180px] sm:h-[300px] lg:h-[450px] w-full flex justify-center items-center">
          {/* Background Blob for the Avatar composition */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] sm:w-[260px] lg:w-[380px] h-[160px] sm:h-[260px] lg:h-[380px] bg-red-500/10 rounded-full z-0"></div>

          {/* Main Hero Image */}
          <div className="relative z-20 w-full h-full flex items-center justify-center">
            <img
              src="/hero1.png"
              className="w-full h-auto max-h-full object-contain drop-shadow-2xl"
              alt="Why Choose Postpidia"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-3xl lg:text-5xl font-light text-white leading-[1.1] mb-6 sm:mb-12 tracking-tight">
            Why Choose
            <br />
            Postpidia?
          </h2>

          <div className="space-y-4 sm:space-y-8">
            <div className="flex gap-2 sm:gap-4 items-start">
              <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white mt-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-[11px] sm:text-lg mb-1">Tailored for Social</h3>
                <p className="text-gray-400 text-[8px] sm:text-sm leading-relaxed max-w-sm">
                  We don't just edit videos; we craft them specifically for the platform they will live on.
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-4 items-start">
              <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-red-400 mt-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-[11px] sm:text-lg mb-1">Proven ROI</h3>
                <p className="text-gray-400 text-[8px] sm:text-sm leading-relaxed max-w-sm">
                  Our video strategies are designed to maximize engagement and conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programs / Corporate */}
      <section className="relative w-full py-16 sm:py-32 mt-5 sm:mt-10 overflow-hidden">
        {/* Huge wavy background shapes */}
        <div className="absolute left-[-10%] top-[20%] w-[60%] h-[80%] bg-red-500/5 rounded-r-[100px] border-r-8 border-white/5 -z-10 transform -rotate-6"></div>
        <div className="absolute right-0 bottom-0 w-[40%] h-[60%] bg-red-500/5 rounded-tl-full blur-3xl -z-10 opacity-70"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="max-w-md z-10 pl-3 sm:pl-6">
            <h2 className="text-xl sm:text-4xl font-light text-white mb-3 sm:mb-6 tracking-tight leading-tight">
              Our
              <br />
              Platforms
            </h2>
            <p className="text-gray-400 font-medium text-[9px] sm:text-sm leading-relaxed">
              Postpidia provides video editing tailored
              <br />
              for the specific requirements and algorithms
              <br />
              of today's most popular platforms.
            </p>
          </div>

          <div className="relative flex flex-row gap-2 sm:gap-6 z-10 justify-center items-center">
            {/* Corporate Full Card */}
            <div className="w-full sm:w-[280px] bg-gradient-to-b from-red-500/20 to-red-500/5 rounded-[16px] sm:rounded-[32px] p-2 sm:p-8 pb-3 sm:pb-10 text-center shadow-2xl border border-white/10 transform sm:-translate-y-8 z-20">
              <h3 className="text-white font-semibold mb-2 sm:mb-6 text-[7px] sm:text-[15px]">TikTok & Shorts</h3>
              <div className="w-6 sm:w-14 h-6 sm:h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 shadow-md text-red-500">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <p className="text-gray-300 text-[6px] sm:text-xs leading-relaxed font-semibold mb-2 sm:mb-10 px-1 sm:px-4">
                Fast-paced, highly engaging vertical content designed for the swipe generation.
              </p>
              <Link
                to="/"
                className="bg-white text-[#111] font-semibold text-[6px] sm:text-xs rounded-full px-2 sm:px-8 py-1 sm:py-3.5 w-full hover:bg-gray-200 transition-colors shadow-sm inline-block text-center"
              >
                See Details
              </Link>
            </div>

            {/* Abroad Half Card (layered behind nicely on desktop) */}
            <div className="w-full sm:w-[260px] bg-[#1a1a1a] rounded-[16px] sm:rounded-[32px] p-2 sm:p-8 pb-3 sm:pb-10 text-center shadow-sm border border-white/5 z-10 sm:-ml-12 pt-3 sm:pt-10 sm:mt-16">
              <h3 className="text-white font-semibold mb-2 sm:mb-6 text-[7px] sm:text-[15px]">YouTube & Meta</h3>
              <div className="w-5 sm:w-12 h-5 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-6 shadow-md text-white">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8l6.5 4.5L5.5 16 3 15.5 1.5 17l4 3.5 3.5 4 1.5-1.5-.5-2.5 3.5-3.5 8.2 6.5c.4.2.8.2 1.1-.1l1.2-1.2c.4-.4.1-.8-.1-1.1z" />
                </svg>
              </div>
              <p className="text-gray-500 text-[6px] sm:text-xs leading-relaxed font-medium mb-2 sm:mb-10 px-1 sm:px-4">
                Long-form content, ads, and stories that build deep brand connections.
              </p>
              <Link
                to="/"
                className="bg-white text-[#111] font-semibold text-[6px] sm:text-xs rounded-full px-2 sm:px-8 py-1 sm:py-3.5 w-full hover:bg-gray-200 transition-colors inline-block text-center"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute right-1/4 top-[20%] flex flex-col gap-8 opacity-20">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-red-400 ml-12"></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-24 w-full max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10">
        <h2 className="text-xl sm:text-3xl font-light text-white mb-2 sm:mb-4 tracking-tight">
          What our clients are saying
        </h2>
        <p className="text-[10px] sm:text-sm font-medium text-gray-500 mb-8 sm:mb-16 max-w-lg mx-auto leading-relaxed">
          We continually strive to elevate brand presence and drive real conversion through expert video production.
        </p>

        <div className="bg-[#1a1a1a] rounded-3xl shadow-sm border border-white/5 flex flex-row items-center overflow-visible relative max-w-3xl mx-auto mt-8 sm:mt-16 p-1.5 sm:p-3">
          {/* Image side */}
          <div className="w-5/12 h-[120px] sm:h-[180px] lg:h-[280px] shrink-0 relative flex items-center justify-center">
            <img
              src="/hero.png"
              alt="Client"
              className="w-full h-auto max-h-full object-contain drop-shadow-2xl"
            />
            {/* Prev Button overlapping left */}
            <button
              onClick={prevTestimonial}
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-4 sm:w-8 h-4 sm:h-8 bg-[#111] rounded-full flex items-center justify-center shadow-md border border-white/10 text-gray-500 hover:text-red-500 z-20 cursor-pointer"
            >
              <ChevronLeft className="w-2 sm:w-4 h-2 sm:h-4" />
            </button>
          </div>

          {/* Text side */}
          <div className="p-3 sm:p-8 lg:p-12 text-left flex-1 relative flex flex-col justify-center min-h-[120px] sm:min-h-[180px] lg:min-h-[250px]">
            <div className="text-red-500 mb-2 sm:mb-6">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <p className="text-gray-300 text-[9px] sm:text-sm font-medium leading-relaxed sm:leading-loose relative z-10 mb-2 sm:mb-8 pr-2 sm:pr-6">
              {t.text}
            </p>

            <div className="flex flex-col text-left border-l-2 border-red-500 pl-2 sm:pl-4 mt-auto">
              <p className="font-semibold text-white text-[9px] sm:text-sm">{t.name}</p>
              <p className="text-gray-500 text-[8px] sm:text-xs font-medium mt-0.5">{t.role}</p>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-1.5 mt-3 sm:mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                    i === testimonialIndex ? "bg-red-500 w-3 sm:w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Next Button overlapping right */}
            <button
              onClick={nextTestimonial}
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-6 sm:w-12 h-6 sm:h-12 bg-red-600 rounded-full flex items-center justify-center shadow-xl text-white hover:bg-red-700 z-20 cursor-pointer"
            >
              <span className="font-bold leading-none transform rotate-180 flex items-center justify-center pt-0.5">
                <ChevronLeft className="w-2 sm:w-5 h-2 sm:h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Dark Footer Arc */}
      <div className="relative w-full overflow-hidden h-16 sm:h-32 mt-8 sm:mt-20">
        <div className="absolute bottom-[-80px] sm:bottom-[-150px] left-1/2 -translate-x-1/2 w-[150%] h-[160px] sm:h-[300px] bg-[#1a1a1a] rounded-t-[100%] border-t-[4px] sm:border-t-[8px] border-white/5"></div>
      </div>
    </div>
  );
}
