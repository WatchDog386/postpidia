import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/story")({
  component: StoryPage,
  validateSearch: (search: Record<string, string>) => ({
    title: search.title ?? "",
    category: search.category ?? "",
    subtitle: search.subtitle ?? "",
    img: search.img ?? "",
    tag: search.tag ?? "",
    body: search.body ?? "",
  }),
});

function StoryPage() {
  const { title, category, subtitle, img, tag, body } = Route.useSearch();

  if (!title) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white font-semibold mb-4">Story not found</h1>
          <Link to="/" className="text-[#f0514e] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const paragraphs = body ? body.split("\n") : [];

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-12">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Stories
        </Link>

        <div className="mb-8">
          <span className="text-[#00d084] text-[10px] font-medium tracking-widest uppercase">{category}</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4 leading-tight">{title}</h1>
          <p className="text-gray-400 text-lg mb-6">{subtitle}</p>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm tracking-widest">{tag}</span>
          </div>
        </div>

        <div className="h-[400px] rounded-[2px] overflow-hidden mb-10">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="text-gray-300 text-[15px] leading-relaxed space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#222]">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-white text-[11px] font-medium uppercase tracking-wider hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> View All Stories
          </Link>
        </div>
      </div>
    </div>
  );
}
