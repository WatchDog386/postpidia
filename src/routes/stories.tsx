import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories")({
  component: StoriesPage,
});

const stories = [
  {
    category: "SALES",
    title: "How Top Sales Teams Close 3X More Deals With Data",
    subtitle: "Data-driven selling strategies that work",
    tag: "Trending",
    img: "https://i.pinimg.com/736x/4f/93/95/4f9395967943801e1ac0bba5f718e516.jpg",
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
  {
    category: "SALES",
    title: "The Psychology of B2B Buying Decisions",
    subtitle: "Understanding buyer behavior",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=350&fit=crop",
  },
  {
    category: "SALES",
    title: "Social Selling Techniques That Convert",
    subtitle: "Leverage social platforms",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
  },
];

function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">All Stories</h1>
        <p className="text-gray-400 text-sm mb-12">Discover insights, strategies, and trends from industry experts.</p>

        <div className="space-y-16">
          {stories.map((story, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-8">
                <span className="text-[#00d084] text-[10px] font-medium tracking-widest uppercase">{story.category}</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4 leading-tight">{story.title}</h2>
                <p className="text-gray-400 text-lg mb-6">{story.subtitle}</p>
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm tracking-widest">{story.tag}</span>
                </div>
              </div>

              <div className="h-[400px] rounded-[2px] overflow-hidden mb-10">
                <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-gray-300 text-[15px] leading-relaxed space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              {i < stories.length - 1 && (
                <div className="mt-12 pt-8 border-t border-[#222]" />
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#222]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
