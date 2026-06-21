import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/software")({
  component: SoftwarePage,
  validateSearch: (search: Record<string, string>) => ({
    name: search.name ?? "",
    role: search.role ?? "",
    description: search.description ?? "",
    image: search.image ?? "",
  }),
});

function SoftwarePage() {
  const { name, role, description, image } = Route.useSearch();

  if (!name) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white font-semibold mb-4">Software not found</h1>
          <Link to="/" className="text-[#f0514e] hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-[800px] mx-auto px-4 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 shrink-0">
              <img src={image} alt={name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{name}</h1>
              <span className="text-[#f05847] text-[12px] font-medium uppercase tracking-wider">{role}</span>
            </div>
          </div>

          <div className="h-[2px] w-full bg-[#222] mb-8" />

          <div className="text-gray-300 text-[15px] leading-relaxed space-y-6">
            <h2 className="text-white text-xl font-semibold mb-4">How We Use {name} for Sales Tracking</h2>
            <p>{description}</p>

            <div className="bg-[#1a1a1a] p-6 mt-8 border border-[#222]">
              <h3 className="text-[#f05847] text-[14px] font-medium mb-3">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-300 text-[13px]">
                  <span className="text-[#f05847] mt-1 shrink-0">&#8226;</span>
                  Real-time sales performance tracking
                </li>
                <li className="flex items-start gap-2 text-gray-300 text-[13px]">
                  <span className="text-[#f05847] mt-1 shrink-0">&#8226;</span>
                  Video content attribution and conversion analytics
                </li>
                <li className="flex items-start gap-2 text-gray-300 text-[13px]">
                  <span className="text-[#f05847] mt-1 shrink-0">&#8226;</span>
                  Data-driven content optimization strategies
                </li>
                <li className="flex items-start gap-2 text-gray-300 text-[13px]">
                  <span className="text-[#f05847] mt-1 shrink-0">&#8226;</span>
                  Competitive benchmarking and market insights
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#222]">
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