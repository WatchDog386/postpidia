import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { STORIES } from "@/lib/stories";

export const Route = createFileRoute("/stories")({
  component: StoriesPage,
});

const stories = STORIES;

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
        <p className="text-gray-400 text-sm mb-12">
          Editing case studies, techniques and behind-the-scenes from the Postpidia edit bay.
        </p>

        <div className="space-y-16">
          {stories.map((story, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-8">
                <span className="text-[#00d084] text-[10px] font-medium tracking-widest uppercase">
                  {story.category}
                </span>
                <Link
                  to="/story"
                  search={{
                    title: story.title,
                    category: story.category,
                    subtitle: story.subtitle,
                    img: story.img,
                    tag: story.tag,
                    body: story.body.join("\n"),
                  }}
                  className="block"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4 leading-tight hover:text-[#f0514e] transition-colors">
                    {story.title}
                  </h2>
                </Link>
                <p className="text-gray-400 text-lg mb-6">{story.subtitle}</p>
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm tracking-widest">
                    {story.tag}
                  </span>
                </div>
              </div>

              <div className="h-[400px] rounded-[2px] overflow-hidden mb-10">
                <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-gray-300 text-[15px] leading-relaxed space-y-4">
                {story.body.slice(0, 2).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                <Link
                  to="/story"
                  search={{
                    title: story.title,
                    category: story.category,
                    subtitle: story.subtitle,
                    img: story.img,
                    tag: story.tag,
                    body: story.body.join("\n"),
                  }}
                  className="inline-block text-[#f0514e] text-sm font-medium hover:underline mt-2"
                >
                  Read full story →
                </Link>
              </div>

              {i < stories.length - 1 && <div className="mt-12 pt-8 border-t border-[#222]" />}
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
