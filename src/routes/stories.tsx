import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/stories")({
  component: StoriesPage,
});

const stories = [
  {
    category: "SALES INTELLIGENCE",
    title: "How Postpidia Helps Brands Decode TikTok Shop Trends Before They Peak",
    subtitle: "Real-time analytics that turned a skincare brand's slow quarter into their best ever",
    tag: "Trending",
    img: "https://i.pinimg.com/736x/4f/93/95/4f9395967943801e1ac0bba5f718e516.jpg",
    body: [
      "When GlowRoot Skincare noticed their TikTok Shop sales plateauing in Q2, they turned to Postpidia's sales intelligence dashboard for answers. Within minutes, the platform's trending product tracker revealed that niacinamide serums were surging across Southeast Asian markets — a signal their team had completely missed by relying on manual spreadsheet tracking.",
      "Postpidia's real-time data pipeline aggregates millions of transactions daily across TikTok Shop, giving brands a window into what's selling, who's buying, and which creators are driving the most conversions. For GlowRoot, the insight was immediate and actionable: they repositioned their niacinamide product line, partnered with three mid-tier creators that Postpidia's influencer analytics flagged as high-conversion, and adjusted their pricing to match the competitive sweet spot the platform identified.",
      "The result? A 217% increase in monthly revenue and a top-10 ranking in their product category within six weeks. GlowRoot's founder now checks Postpidia before making any inventory decision. As she put it: 'Before Postpidia, we were guessing. Now we know.'",
    ],
  },
  {
    category: "CREATOR ECONOMICS",
    title: "The Creator ROI Playbook: Measuring What Actually Matters on TikTok Shop",
    subtitle: "Why follower counts mislead and how Postpidia's engagement-to-revenue metrics changed the game",
    tag: "New",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop",
    body: [
      "For months, fitness apparel brand KinetikFit was pouring budget into creator partnerships based on one metric: follower count. They booked creators with 500K+ followers and watched their cost-per-acquisition climb while conversion rates flatlined. The disconnect was obvious — reach doesn't equal revenue.",
      "Postpidia's creator analytics module gave KinetikFit a completely different lens. Instead of surface-level metrics, the platform tracks engagement-to-revenue ratios: how many viewers actually click through, add to cart, and complete a purchase after watching a creator's content. The data revealed that creators in the 15K-80K follower range consistently outperformed mega-influencers on TikTok Shop, with conversion rates 3.4x higher on average.",
      "Armed with this insight, KinetikFit rebuilt their creator roster from scratch. They replaced three high-cost mega-influencer deals with twelve micro and mid-tier creators selected through Postpidia's performance rankings. Campaign costs dropped 62%, while total attributed revenue increased 89%. The lesson was clear: on TikTok Shop, authenticity and niche audience alignment beat raw reach every time — and Postpidia makes that data impossible to ignore.",
    ],
  },
  {
    category: "MARKET ANALYTICS",
    title: "Why Your Competitor's Best-Seller Is Your Next Opportunity",
    subtitle: "How competitive gap analysis on Postpidia reveals untapped product categories",
    tag: "Hot",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop",
    body: [
      "Every TikTok Shop seller knows the feeling: you spot a competitor's product climbing the best-seller list, and your first instinct is to replicate it. But Postpidia's competitive analytics engine suggests a smarter move — look at the gaps around that product, not the product itself.",
      "When home goods brand NestaLiving analyzed a competitor's viral bamboo utensil set through Postpidia, they noticed something the competitor missed. While the utensil set dominated the 'eco kitchen' category, related searches for 'travel-friendly eco cutlery' were growing 340% month-over-month with almost zero inventory supply. Postpidia's demand-supply gap indicator flagged it as a high-opportunity zone — strong demand, minimal competition, and a clear adjacent positioning to an already-validated market.",
      "NestaLiving launched a compact travel cutlery kit within three weeks. Postpidia's pricing intelligence helped them undercut the competitor's price point by 12% while maintaining healthy margins, and their product launch was featured in Postpidia's 'Rising Products' feed — driving organic discovery. Within two months, the travel kit outsold the original bamboo set in its category. Competitive intelligence isn't about copying; it's about seeing what the competition can't.",
    ],
  },
  {
    category: "PRICING STRATEGY",
    title: "The Price Is Right: How Dynamic Pricing Outperforms Static Models on TikTok Shop",
    subtitle: "Postpidia's pricing intelligence helped one brand find the exact price that maximized both volume and margin",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=350&fit=crop",
    body: [
      "Pricing on TikTok Shop is a constant balancing act. Price too high and you lose the impulse-buy audience that fuels the platform. Price too low and you erode margins to the point where creator commissions and TikTok's fees leave you underwater. Most sellers pick a price and hope. Postpidia users don't have to.",
      "When nutritional supplement brand VitaEdge launched their protein snack bars, they priced at $24.99 for a 12-pack — a number they arrived at by matching the category average shown on TikTok Shop search results. Sales were steady but unspectacular. Using Postpidia's pricing analytics, they discovered that the $19.99 price point had 4x the conversion rate with only a 15% drop in per-unit margin, while the $27.99 tier captured a premium audience segment that valued 'clean label' positioning and was virtually price-insensitive.",
      "VitaEdge implemented a two-tier strategy: a $19.99 standard pack for volume sales and a $27.99 premium bundle with bonus samples. Postpidia's real-time margin calculator confirmed that the blended average margin actually improved by 8% despite the lower entry price. Revenue across both tiers grew 156% in the first quarter. The key insight: on TikTok Shop, there's no single right price — but there is a right pricing strategy, and Postpidia helps you find it.",
    ],
  },
  {
    category: "GROWTH PLAYBOOKS",
    title: "From Zero to Top 50: A Brand's 90-Day Journey on TikTok Shop",
    subtitle: "The step-by-step playbook that took FreshBite Foods from launch to category leader",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
    body: [
      "FreshBite Foods had no TikTok Shop presence, no creator relationships, and no social commerce experience when they signed up for Postpidia in January. Within 90 days, they ranked in the Top 50 for their food category. Their playbook was built almost entirely from Postpidia's Growth Signals — the platform's curated insights that identify which levers matter most for new sellers at each stage of their journey.",
      "Weeks 1-2 were about category selection. Postpidia's market overview showed that the 'healthy snacks' subcategory had 2.3x the growth rate of 'organic foods' with half the seller density. FreshBite positioned three hero SKUs there. Weeks 3-4 focused on creator seeding. Postpidia's creator matching tool identified eight micro-creators whose audiences overlapped with FreshBite's target demographic. They sent sample boxes with a custom promo code trackable through Postpidia's attribution dashboard.",
      "By week six, two creator videos had gone semi-viral, driving 12,000 units sold. Postpidia's inventory alerts warned of a stockout risk, and FreshBite expedited a reorder. Weeks 7-12 were optimization: A/B testing thumbnails, adjusting prices based on Postpidia's competitive tracker, and doubling down on the two top-performing creator partnerships. The final month alone generated more revenue than FreshBite's entire previous quarter across all channels. It wasn't luck — it was data, applied systematically, with Postpidia as the engine.",
    ],
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
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4 leading-tight hover:text-[#f0514e] transition-colors">{story.title}</h2>
                </Link>
                <p className="text-gray-400 text-lg mb-6">{story.subtitle}</p>
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 text-white text-[9px] font-medium px-2.5 py-1 rounded-sm tracking-widest">{story.tag}</span>
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
