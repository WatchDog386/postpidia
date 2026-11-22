export type Story = {
  category: string;
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  body: string[];
};

/** Editing case studies shown on the homepage ("Trending Stories") and /stories. */
export const STORIES: Story[] = [
  {
    category: "HOOK EDITING",
    title: "The First Two Seconds: How a Re-Cut Hook Tripled a Skincare Brand's Watch Time",
    subtitle:
      "Same footage, new edit — why the opening frame decides whether a TikTok Shop video sells",
    tag: "Trending",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
    body: [
      "GlowRoot Skincare sent us forty minutes of raw footage: a founder talking to camera, a few product close-ups and some bathroom-shelf B-roll. Their previous ads opened on a logo and a slow pan. Average watch time was 1.8 seconds — most viewers were gone before the product even appeared.",
      "Our editors rebuilt the opening around the most visual moment in the footage: serum dropping onto skin in macro, cut on the beat, with a bold caption asking the question their customers were already searching for. The founder's best line moved from minute three to second two. We trimmed every pause, added punch-in zooms on key phrases and colour-graded the whole piece warmer so the product glowed.",
      "The re-cut ran against the original with the same budget. Watch time rose to 6.1 seconds, click-through more than doubled, and the video became the brand's best-selling TikTok Shop listing that month. Nothing new was filmed — the difference was entirely in the edit.",
    ],
  },
  {
    category: "UGC EDITING",
    title: "Turning Shaky Phone Clips into Polished UGC That Still Feels Real",
    subtitle:
      "How we edit customer-shot footage without losing the authenticity that makes it convert",
    tag: "New",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop",
    body: [
      "Fitness apparel brand KinetikFit collected dozens of try-on videos from customers — vertical, handheld, badly lit, recorded in gyms and bedrooms. Over-polishing that kind of footage kills what makes it work, but posting it raw looks careless.",
      "Our approach: stabilise and denoise, match colour across every clip so the brand reads as consistent, level the audio, then cut tight around real reactions. Captions are styled in the brand's colours, and transitions follow movement in the shot rather than flashy presets. Each video was exported in 9:16 for TikTok and Reels and 4:5 for feed ads.",
      "KinetikFit now sends a new batch of customer clips every week through their Postpidia dashboard and gets back a set of ready-to-post UGC ads within days. The content looks native to the platform — and their cost per purchase dropped by more than half.",
    ],
  },
  {
    category: "MOTION GRAPHICS",
    title: "Explaining a Product in 15 Seconds with Motion Graphics",
    subtitle: "When the footage can't show the benefit, animation can",
    tag: "Hot",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
    body: [
      "NestaLiving's travel cutlery kit is clever — it folds into a case the size of a pen. Their raw footage showed the product, but not why it mattered. Viewers scrolled past a spoon.",
      "We kept the live-action unboxing and layered in clean 2D motion graphics: an animated callout tracing the fold, a size comparison against a phone, and kinetic text for the three key benefits. Brand colours, rounded type and quick ease-in-out timing made it feel premium without slowing the pace.",
      "The 15-second cut became NestaLiving's hero ad across TikTok, Reels and Shorts. Viewers finally understood the product in one watch, and the motion-graphics version outperformed every previous live-action ad they'd run.",
    ],
  },
  {
    category: "WORKFLOW",
    title: "From Raw Upload to Ready-to-Post in 72 Hours",
    subtitle: "What actually happens after you send us your footage",
    tag: "Guide",
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop",
    body: [
      "Every Postpidia project starts with an upload. You drop raw clips into your dashboard straight from your phone or desktop, pick the platform and style, and add notes — hooks you like, captions, music, a reference video. Large shoots can be shared as a Drive or Dropbox link.",
      "An editor reviews the footage and brief, flags anything missing, and gets to work: selects, rough cut, colour, sound, captions, motion graphics and thumbnails. You can follow the status at every step and message your editor directly on the project page.",
      "When the edit is ready you'll find platform-ready exports in your dashboard. Approve them, or request a revision with notes on exactly what to change. Once you're happy, the video is yours to post — and if you loved the result, you can leave a review for other brands.",
    ],
  },
];
