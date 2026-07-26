import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Users,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";

type PreviewVideo = {
  id: string;
  title: string;
  videoId: string;
};

const previewVideos: PreviewVideo[] = [
  { id: "preview-1", title: "Postpidia", videoId: "P3sQhWer6fg" },
  { id: "preview-2", title: "Postpidia", videoId: "1EXZoROfTn8" },
  { id: "preview-3", title: "Postpidia", videoId: "Zia6E6Pst_o" },
  { id: "preview-4", title: "Postpidia", videoId: "x1C3_jST8vA" },
  { id: "preview-5", title: "Postpidia", videoId: "z7Z0HIb3W0o" },
  { id: "preview-6", title: "Postpidia", videoId: "XNr1NsN1Nig" },
  { id: "preview-7", title: "Postpidia", videoId: "BYMqQ7rYNe4" },
  { id: "preview-8", title: "Postpidia", videoId: "GscOOnWP9uk" },
];

const logoVideos: PreviewVideo[] = [
  { id: "logo-1", title: "Postpidia", videoId: "LtUjg7NM52A" },
  { id: "logo-2", title: "Postpidia", videoId: "_4Ksf75uCx4" },
];

const previewChips = [
  {
    id: "chip-videos",
    text: "10 Videos",
    className: "rounded-full bg-[#111827] px-3 py-1 text-white",
  },
  {
    id: "chip-mix",
    text: "Ad + Talking Head Mix",
    className: "rounded-full bg-[#6d28d9] px-3 py-1 text-white",
  },
  {
    id: "chip-editing",
    text: "Conversion-Focused Editing",
    className:
      "rounded-full border border-[#111827]/30 bg-white px-3 py-1 text-[#111827]",
  },
];

const metrics = [
  {
    value: "7,543+",
    label: "Videos Delivered",
    icon: <CheckCircle2 size={24} strokeWidth={2} />,
    cardBg: "bg-[#edf0f4]",
    iconBg: "bg-[#3b6cf7]",
    iconColor: "text-white",
    valueColor: "text-[#141824]",
    labelColor: "text-[#6b7280]",
  },
  {
    value: "Fast",
    label: "Turnaround",
    url: "https://www.tiktok.com/@shevify",
    cardBg: "bg-[#f7a531]",
    iconBg: "bg-[#ff8c00]",
    iconColor: "text-white",
    valueColor: "text-[#1f2937]",
    labelColor: "text-[#374151]",
  },
  {
    value: "Low",
    label: "Revision Rates",
    url: "https://www.linkedin.com/login/?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F110777019%2Fadmin",
    cardBg: "bg-[#25c7af]",
    iconBg: "bg-[#16a892]",
    iconColor: "text-white",
    valueColor: "text-[#0f172a]",
    labelColor: "text-[#155e56]",
  },
  {
    value: "High",
    label: "Client Retention",
    icon: <Users size={24} strokeWidth={2} />,
    cardBg: "bg-gradient-to-br from-[#8e4bff] to-[#e24cb6]",
    iconBg: "bg-[#7f3dff]",
    iconColor: "text-white",
    valueColor: "text-[#111827]",
    labelColor: "text-[#312e81]",
  },
];



const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
      mass: 0.85,
      delay: index * 0.03,
    },
  }),
};

const bottomVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const metricCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: 0.2 + index * 0.1,
    },
  }),
};

const VideoShowcasePreview = () => {
  const [showAllMobileVideos, setShowAllMobileVideos] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Set<string>>(new Set());

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 768
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  const mobileVisibleVideos = showAllMobileVideos
    ? previewVideos
    : previewVideos.slice(0, 4);

  const visibleVideos = isDesktop ? previewVideos : mobileVisibleVideos;

  return (
    <div className="flex flex-col">
      {/* TOP SECTION */}
      <section
        className="relative bg-[#111111] overflow-hidden py-2 md:py-4 lg:py-8"
        id="portfolio-preview"
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.5) 121px)",
          }}
        />

        <div className="relative z-20 mx-auto w-full max-w-[1460px] px-4 sm:px-6">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-6 md:mb-8 lg:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-[760px]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white/30 text-xs font-semibold uppercase tracking-[2px]">Featured</span>
                <span className="h-px w-8 bg-[#DF8885]/50" />
                <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-white text-xs font-bold">Postpidia</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                Postpidia Edits
              </h2>

              <p className="mt-2 text-[8px] sm:text-sm leading-relaxed text-white/90">
                Real campaigns edited and optimized by Postpidia — 
                scroll-stopping shorts that drive conversions.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider">
                {previewChips.map((chip, index) => (
                  <motion.span
                    key={chip.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.34,
                      delay: 0.2 + index * 0.06,
                    }}
                    className={chip.className}
                  >
                    {chip.text}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* LOGO VIDEOS - Landscape */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8 mb-6 md:mb-8 lg:mb-10"
          >
            {logoVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -8, scale: 1.025 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="col-span-12 sm:col-span-6 group flex flex-col gap-2 will-change-transform"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 transition-transform duration-300 group-hover:scale-[1.015]">
                  {!failedVideos.has(video.videoId) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; autoplay"
                      allowFullScreen
                      onLoad={() => {
                        setFailedVideos((prev) => {
                          if (!prev.has(video.videoId)) return prev;
                          const next = new Set(prev);
                          next.delete(video.videoId);
                          return next;
                        });
                      }}
                      onError={() => {
                        setFailedVideos((prev) => {
                          if (prev.has(video.videoId)) return prev;
                          const next = new Set(prev);
                          next.add(video.videoId);
                          return next;
                        });
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-semibold text-black">
                        Unavailable
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex items-start justify-between px-1">
                  <h3 className="text-[11px] sm:text-sm font-medium leading-tight text-white line-clamp-2">
                    {video.title}
                  </h3>

                  <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-1 -mt-1 hover:bg-white/10 rounded-full">
                    <MoreVertical size={18} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* VIDEO GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8"
          >
            {visibleVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -8, scale: 1.025 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
                className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 group flex flex-col gap-2 will-change-transform"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 transition-transform duration-300 group-hover:scale-[1.015]">
                  {!failedVideos.has(video.videoId) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; autoplay"
                      allowFullScreen
                      onLoad={() => {
                        setFailedVideos((prev) => {
                          if (!prev.has(video.videoId)) return prev;
                          const next = new Set(prev);
                          next.delete(video.videoId);
                          return next;
                        });
                      }}
                      onError={() => {
                        setFailedVideos((prev) => {
                          if (prev.has(video.videoId)) return prev;
                          const next = new Set(prev);
                          next.add(video.videoId);
                          return next;
                        });
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-semibold text-black">
                          Unavailable
                        </span>
                      </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex items-start justify-between px-1">
                  <h3 className="text-[11px] sm:text-sm font-medium leading-tight text-white line-clamp-2">
                    {video.title}
                  </h3>

                  <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 -mr-1 -mt-1 hover:bg-white/10 rounded-full">
                    <MoreVertical size={18} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* MOBILE BUTTON */}
          <div className="mt-6 flex justify-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobileVideos((current) => !current)}
              className="inline-flex items-center justify-center rounded-full border border-green-600/20 bg-[#16a34a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#15803d]"
            >
              {showAllMobileVideos ? "View Less" : "View All"}
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION - METRICS */}
      <section className="relative bg-[#111111] overflow-hidden py-6 md:py-12 lg:py-16">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.5) 121px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-3 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 w-full"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={metricCardVariants}
                custom={i}
                whileHover={{ y: -10, scale: 1.03, rotate: 0.5 }}
                className={`group relative flex flex-col justify-between items-center text-center min-h-[60px] sm:min-h-[120px] md:min-h-[150px] overflow-hidden rounded-[12px] md:rounded-[20px] p-1 sm:p-3 md:p-6 border border-white/80 shadow-[0_10px_22px_rgba(15,23,42,0.14)] transition-all duration-300 hover:shadow-[0_16px_30px_rgba(15,23,42,0.18)] ${metric.cardBg}`}
                style={{ boxShadow: undefined }}
              >
                <div className="relative z-10">
                  <div className={`mb-1 sm:mb-2 md:mb-4 inline-flex rounded-[8px] md:rounded-[12px] p-0.5 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${metric.iconBg} ${metric.iconColor}`}>
                    <div className="flex h-3 w-3 items-center justify-center sm:h-4 sm:w-4 md:h-5 md:w-5">
                      {metric.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-[10px] sm:text-lg md:text-3xl font-light tracking-tight ${metric.valueColor}`}>
                      {metric.value}
                    </h3>
                    <p className={`mt-0.5 text-[7px] sm:text-[10px] md:text-xs font-medium uppercase tracking-[0.22em] line-clamp-2 ${metric.labelColor}`}>
                      {metric.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VideoShowcasePreview;
