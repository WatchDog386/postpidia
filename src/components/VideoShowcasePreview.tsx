import { useState } from "react";
import {
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

const shevifyGoods = [
  { id: "sweat", image: "/sweat.png" },
  { id: "sweat1", image: "/sweat1.png" },
  { id: "flask", image: "/flask.png" },
  { id: "flask1", image: "/flask1.png" },
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

const VideoShowcasePreview = () => {
  const [failedVideos, setFailedVideos] = useState<Set<string>>(new Set());

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
                className="col-span-6 group flex flex-col gap-2 will-change-transform"
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
            {previewVideos.map((video, index) => (
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
                className="col-span-3 group flex flex-col gap-2 will-change-transform"
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
        </div>
      </section>

      {/* ABOUT SHEVIFY GOODS */}
      <section className="relative bg-[#111111] overflow-hidden py-6 md:py-12 lg:py-16">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 120px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.5) 121px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-3 sm:px-6">
          <motion.div
            variants={bottomVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-3xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
                    Postpidia Goodies
                  </h3>
                  <p className="mt-2 text-[8px] sm:text-sm leading-relaxed text-white/90">
                    Premium US caps & shirts — made for creators.
                  </p>
                </div>
              </div>
              <Carousel items={shevifyGoods} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Carousel = ({ items }: { items: typeof shevifyGoods }) => {
  const marqueeGroups = [0, 1];

  return (
    <div className="relative overflow-hidden py-3 md:py-4">

      <div className="trusted-marquee-track marquee-track flex w-max items-stretch gap-0 will-change-transform">
        {marqueeGroups.map((groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 items-stretch gap-6 pr-6 md:gap-8 md:pr-8">
            {items.map((item, index) => (
              <div
                key={`${groupIndex}-${item.id}-${index}`}
                className={`flex-shrink-0 ${
                  item.id === "shirt" || item.id === "shirt1"
                    ? "w-56 sm:w-72"
                    : "w-48 sm:w-56"
                }`}
              >
                <div className="w-full flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.id}
                    className={`w-full object-contain ${
                      item.id === "shirt" || item.id === "shirt1"
                        ? "h-52 sm:h-60"
                        : "h-44 sm:h-52"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoShowcasePreview;
