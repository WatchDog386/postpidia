import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

const plans = [
  {
    name: "Basic",
    desc: "Perfect for small brands getting started with video content",
    monthly: 99,
    yearly: 79,
    popular: false,
    features: [
      "Up to 4 Edited Videos",
      "Royalty-Free Background Music",
      "Advanced Color Grading",
      "Noise Reduction & Audio Leveling",
      "Custom Thumbnail (1 per video)",
      "3% Sales Commission Agreement",
    ],
  },
  {
    name: "Essential",
    desc: "Best value for growing brands ready to scale their content output",
    monthly: 149,
    yearly: 119,
    popular: true,
    features: [
      "Up to 5 Edited Videos",
      "Dynamic Motion Graphics",
      "Advanced Color Correction",
      "A/B Testing Thumbnail Variations",
      "Dedicated Project Manager",
      "Multi-Platform Exports (TikTok/YT/IG)",
      "3% Sales Commission Agreement",
    ],
  },
  {
    name: "Professional",
    desc: "Full-service for brands serious about dominating social commerce",
    monthly: 189,
    yearly: 149,
    popular: false,
    features: [
      "Up to 8 Edited Videos",
      "High-End 2D/3D Animations",
      "Custom Brand Identity Kit",
      "Premium Stock Footage Access",
      "Performance Analytics Consulting",
      "Dedicated Project Manager",
      "Postpidia Asset Library Access",
      "24-Hour Priority Support",
      "Professional Voiceover Integration",
      "SEO & Keyword Strategy for Video",
      "3% Sales Commission Agreement",
    ],
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Enterprise Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nBudget: ${formData.budget || "Not specified"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:support@postpidia.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setDialogOpen(false);
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-[44px] font-light text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-[15px] text-gray-300 mb-6">
            Choose the plan that fits your project needs
          </p>

          <div className="inline-flex items-center gap-3 bg-[#27272a] rounded-xl px-4 py-2">
            <button
              onClick={() => setYearly(false)}
              className={`text-sm font-bold px-4 py-1.5 rounded-lg transition-all duration-200 ${
                !yearly
                  ? "bg-[#f0514e] text-white shadow-md shadow-[#f0514e]/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`text-sm font-bold px-4 py-1.5 rounded-lg transition-all duration-200 ${
                yearly
                  ? "bg-[#f0514e] text-white shadow-md shadow-[#f0514e]/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Yearly
            </button>
            <span className="bg-[#f0514e]/20 text-[#f0514e] text-[10px] font-bold px-2 py-0.5 rounded-md leading-none">
              Save 20%
            </span>
          </div>
        </div>

        <div className="mb-8 bg-[#1a1a1a] border border-[#f0514e]/20 rounded-xl p-5 md:p-6 text-center max-w-2xl mx-auto">
          <p className="text-white text-sm md:text-base font-light leading-relaxed">
            <span className="text-[#f0514e] font-semibold text-lg md:text-xl">3%</span> commission{" "}
            <span className="font-medium">only on videos that generate sales</span>.
            <span className="text-gray-400 block sm:inline sm:ml-1"> No sale? No commission.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#27272a] shadow-2xl rounded-2xl flex flex-col border ${
                  activeIndex === i
                    ? "shadow-xl scale-[1.02] border-[#f0514e]/40"
                    : "cursor-pointer hover:border-[#444] border-[#333]"
                }`}
                onClick={activeIndex !== i ? () => setActiveIndex(i) : undefined}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-[#f0514e] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg leading-none">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[44px] text-[#f97316] font-light leading-none">${price}</span>
                      <span className="text-base text-gray-300">/mo</span>
                    </div>
                    {yearly && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[12px] text-gray-400 line-through">${plan.monthly}/mo</span>
                        <span className="bg-[#f0514e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">Save 20%</span>
                      </div>
                    )}
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {yearly ? "billed annually" : "billed monthly"}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-5 flex-1">
                    {plan.features.slice(0, activeIndex === i ? plan.features.length : 4).map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#f0514e] shrink-0" />
                        <span className="text-[13px] text-gray-200">{feature}</span>
                      </li>
                    ))}
                    {activeIndex !== i && plan.features.length > 4 && (
                      <li className="text-[12px] text-gray-400 pl-3">+{plan.features.length - 4} more features</li>
                    )}
                  </ul>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.navigate({
                        to: "/payment",
                        search: {
                          plan: plan.name,
                          price: String(price),
                          billing: yearly ? "yearly" : "monthly",
                        },
                      });
                    }}
                    className={`w-full bg-[#00d084] text-white text-[11px] font-medium lowercase tracking-wider px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-200 ${
                      activeIndex === i ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    subscribe now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-gradient-to-r from-[#27272a] to-[#1e1e22] rounded-none border border-transparent hover:border-[#f0514e]/20 transition-all duration-300 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white">Enterprise</h3>
              <span className="bg-[#f0514e] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg leading-none">
                Custom
              </span>
            </div>
            <p className="text-[15px] text-gray-300 mb-4">
              Need a tailored solution for your business? Get a custom plan with dedicated support, personalized onboarding, and enterprise-grade features.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
              {[
                "Custom Video Volume & Pricing",
                "Dedicated Account Manager",
                "Priority 24/7 Support",
                "Custom Integrations & API Access",
                "Team Collaboration Tools",
                "Custom Brand Identity Kit",
                "Performance Analytics Dashboard",
                "SLA Guarantees",
              ].map((feature, j) => (
                <li key={j} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#f0514e] shrink-0" />
                  <span className="text-[13px] text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => setDialogOpen(true)}
            className="shrink-0 bg-[#f0514e] text-white text-[13px] font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-lg shadow-[#f0514e]/30"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1e1e22] border border-[#333] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Contact Sales</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Fill in your details and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Input
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm"
            />
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger className="bg-[#27272a] border-[#444] text-white text-sm">
                <SelectValue placeholder="Select your budget" />
              </SelectTrigger>
              <SelectContent className="bg-[#27272a] border-[#444] text-white">
                <SelectItem value="1k-10k">1k-10k</SelectItem>
                <SelectItem value="10k-100k">10k-100k</SelectItem>
                <SelectItem value="100k+">100k+</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              className="bg-[#27272a] border-[#444] text-white placeholder:text-gray-500 text-sm resize-none"
            />
            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-[#f0514e] hover:bg-[#d94441] text-white text-sm font-medium py-2.5 rounded-full cursor-pointer"
            >
              {sending ? "Opening Email..." : "Send Inquiry"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
