import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as Outlet, f as createFileRoute, g as useRouter, m as Link, p as createRootRouteWithContext, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { _ as ArrowUpRight, a as TrendingUp, c as MessageCircle, d as Instagram, f as Facebook, g as Calendar, h as Check, i as Twitter, l as Menu, m as ChevronRight, n as X, o as Send, p as Eye, r as User, s as Search, t as Youtube, u as Linkedin } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C1qMGDgN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DVT2Kf19.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Postpidia — Your AI Social Media Team on Autopilot" },
			{
				name: "description",
				content: "Create, schedule, publish, and grow across every social platform from one intelligent AI dashboard."
			},
			{
				property: "og:title",
				content: "Postpidia — AI Social Media on Autopilot"
			},
			{
				property: "og:description",
				content: "The AI-native command center for modern social teams."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var why_default = "/assets/why-CAwx8ZRK.png";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: "Postpidia — Sales Tracking Software" }, {
			name: "description",
			content: "Track, analyze, and close more deals with Postpidia"
		}],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: Landing
});
var getCategoryStyles = (category) => {
	const cat = category.toLowerCase();
	if (cat.includes("fashion") || cat.includes("design") || cat.includes("leads") || cat.includes("lead")) return "bg-[#ff007b] text-white";
	if (cat.includes("food") || cat.includes("grading") || cat.includes("pipeline") || cat.includes("dashboard")) return "bg-[#ff6a00] text-white";
	if (cat.includes("travel") || cat.includes("graphics") || cat.includes("forecast") || cat.includes("reports")) return "bg-[#00c3ff] text-white";
	if (cat.includes("tech") || cat.includes("editing") || cat.includes("crm") || cat.includes("integrate") || cat.includes("reporting") || cat.includes("integrations")) return "bg-[#006aff] text-white";
	if (cat.includes("creative") || cat.includes("analytics") || cat.includes("sales")) return "bg-[#ffb300] text-black";
	if (cat.includes("sports")) return "bg-[#4caf50] text-white";
	if (cat.includes("racing") || cat.includes("production")) return "bg-[#ff5722] text-white";
	if (cat.includes("music") || cat.includes("team")) return "bg-[#f44336] text-white";
	return "bg-indigo-600 text-white";
};
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#111111] text-gray-200 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] antialiased",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingThemeToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorksSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTASection, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navLinks = [
		"Features",
		"Pricing",
		"How It Works",
		"Contact"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "bg-[#111111]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[#111111] border-b border-[#222]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-[11px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-[#5c45fd] text-white px-2.5 py-1 tracking-wider",
							children: "JANUARY 17, 2023"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-[#ff5722]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-300",
									children: "Trending News:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hover:text-white cursor-pointer transition-colors hidden sm:block",
									children: "We Believe Announce Will the iPhone this Day..."
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex items-center gap-4 text-gray-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Follow Us" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 hover:text-white cursor-pointer ml-2" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[#1a1a1a] border-b border-[#222]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(!open),
							className: "text-gray-300 hover:text-white p-1 lg:hidden border border-gray-700",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-gradient-to-tr from-[#ff007b] to-[#ff5722] text-white w-10 h-10 flex items-center justify-center font-bold text-xl",
								children: "P"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold tracking-tight text-white leading-none",
								children: "Postpidia"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex flex-1 max-w-[700px] ml-8 bg-white h-[70px] relative overflow-hidden items-center justify-between px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 opacity-20 [clip-path:polygon(0_0,100%_0,80%_100%,0%_100%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 bottom-0 w-12 h-12 bg-blue-500 [clip-path:polygon(0_100%,100%_100%,0_0)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-8 top-0 w-16 h-16 bg-yellow-400 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-black font-black text-xl z-10 ml-16",
								children: "Postpidia Sales Tracking — Close More Deals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileHover: { y: -2 },
								whileTap: { y: 0 },
								className: "relative bg-[#00d084] text-white font-bold text-[11px] uppercase tracking-wider px-6 py-2.5 z-10 shadow-[0_4px_0_0_#009c63] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded",
								children: "GET STARTED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 bottom-0 w-32 bg-[#ff007b] [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-8 top-0 bottom-0 w-16 bg-white opacity-20 [clip-path:polygon(30%_0,100%_0,70%_100%,0%_100%)]" })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[#111111]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1400px] mx-auto px-4 lg:px-8 h-12 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden lg:flex items-center gap-6",
						children: navLinks.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#",
							className: "text-[13px] font-bold text-gray-200 hover:text-[#ff007b] transition-colors flex items-center gap-1.5 group",
							children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-gray-500 group-hover:text-[#ff007b] transition-colors" })]
						}, label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 w-full lg:w-auto justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative hidden sm:flex items-center w-64 border border-[#333] focus-within:border-[#ff007b] transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search ...",
								className: "bg-transparent text-xs text-gray-200 placeholder:text-gray-600 pl-3 pr-10 py-2 w-full focus:outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 text-gray-400 absolute right-3 pointer-events-none" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileHover: { y: -2 },
							whileTap: { y: 0 },
							className: "relative bg-[#5c45fd] text-white font-bold px-6 py-2 text-[11px] tracking-wider uppercase shadow-[0_4px_0_0_#4430ca] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded",
							children: "LOGIN"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				className: "lg:hidden bg-[#1a1a1a] border-t border-[#333] px-4 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-0",
					children: navLinks.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "block py-3 text-sm font-bold text-gray-300 hover:text-[#ff007b] border-b border-[#333] flex justify-between items-center",
						children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					}, label))
				})
			}) })
		]
	});
}
function FloatingThemeToggle() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed right-0 top-1/3 bg-white text-black p-2 shadow-lg z-40 border border-gray-200 cursor-pointer rounded-l hidden lg:flex flex-col items-center gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-4 h-4 bg-gray-200 rounded-full border border-gray-400 relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 bottom-0 w-1/2 bg-gray-800" })
		})
	});
}
function HeroSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-[1400px] mx-auto px-4 lg:px-8 mt-8 grid lg:grid-cols-12 gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-8 grid gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative group overflow-hidden bg-[#1a1a1a] cursor-pointer block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop",
						alt: "Hero Banner",
						className: "w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/9] object-cover object-top transition-transform duration-700 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent z-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-2 py-1 text-[10px] font-bold tracking-widest ${getCategoryStyles("SALES")}`,
								children: "SALES TRACKING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 leading-tight tracking-tight group-hover:text-[#ff007b] transition-colors",
								children: "Turn Your Data Into Revenue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-4 text-gray-300 text-[11px] font-bold tracking-wider mt-5 uppercase",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BY POSTPIDIA" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), " JUN 18, 2026"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " 12K+ DEALS"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " 95% ACCURACY"]
									})
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=380&fit=crop",
								alt: "Why Choose Us",
								className: "w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("ANALYTICS")}`,
								children: "WHY US"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors",
							children: "Built for Sales Teams That Want to Close More"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BY POSTPIDIA" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), " JUN 18, 2026"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " +47% CONVERSION"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group cursor-pointer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=380&fit=crop",
								alt: "Trusted Platform",
								className: "w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles("SALES")}`,
								children: "TRUSTED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-[17px] text-gray-100 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors",
							children: "Trusted by 10,000+ Sales Professionals Worldwide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-gray-500 text-[10px] font-bold mt-3 uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BY POSTPIDIA" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), " JUN 18, 2026"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " 4.9/5 RATING"]
								})
							]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:col-span-4 flex flex-col space-y-6",
			children: [
				{
					category: "LEADS",
					title: "Capture & qualify leads from every channel automatically",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=150&h=150&fit=crop"
				},
				{
					category: "PIPELINE",
					title: "Visual pipeline management with drag-and-drop deal stages",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop"
				},
				{
					category: "FORECAST",
					title: "AI-powered revenue forecasting with 95% accuracy",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=150&h=150&fit=crop"
				},
				{
					category: "REPORTS",
					title: "Real-time sales dashboards and custom performance reports",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=150&h=150&fit=crop"
				},
				{
					category: "TEAM",
					title: "Team performance tracking with gamification & leaderboards",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop"
				},
				{
					category: "INTEGRATE",
					title: "Seamless integration with CRM, email, and payment tools",
					date: "JUL 07, 2022",
					img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop"
				}
			].map((story, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 items-start group cursor-pointer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative shrink-0 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: story.img,
						alt: story.title,
						className: "w-[100px] h-[100px] object-cover transition-transform duration-500 group-hover:scale-105"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center min-h-[100px] py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest ${getCategoryStyles(story.category)}`,
								children: story.category
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-extrabold text-[15px] text-gray-200 line-clamp-2 leading-snug group-hover:text-[#ff007b] transition-colors",
							children: story.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[10px] text-gray-500 mt-2 font-bold flex items-center gap-1.5 uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
								" ",
								story.date
							]
						})
					]
				})]
			}, idx))
		})]
	});
}
function SectionHeader({ title, endSlot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col sm:flex-row sm:items-center justify-between mb-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[22px] font-extrabold text-white whitespace-nowrap pr-6",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[1px] bg-[#333] flex-grow" }),
				endSlot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pl-6",
					children: endSlot
				})
			]
		})
	});
}
function ServicesSection() {
	const [sliderPage, setSliderPage] = (0, import_react.useState)(0);
	const services = [
		{
			category: "LEAD TRACKING",
			title: "Lead Management",
			desc: "Capture, organize, and score leads from every channel. Automated follow-ups ensure no opportunity slips through the cracks.",
			img: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=350&fit=crop"
		},
		{
			category: "PIPELINE",
			title: "Pipeline Analytics",
			desc: "Visual deal stages with drag-and-drop management. See exactly where every deal stands and what needs attention.",
			img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop"
		},
		{
			category: "FORECASTING",
			title: "Revenue Forecasting",
			desc: "AI-powered predictions with 95% accuracy. Know your future revenue and make data-driven business decisions confidently.",
			img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&h=350&fit=crop"
		},
		{
			category: "DASHBOARDS",
			title: "Custom Dashboards",
			desc: "Real-time sales KPIs, conversion funnels, and team performance metrics all in one customizable view.",
			img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop"
		},
		{
			category: "INTEGRATIONS",
			title: "Seamless Integrations",
			desc: "Connect with your CRM, email marketing, Stripe, Slack, and 200+ tools. Your data syncs automatically.",
			img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop"
		},
		{
			category: "REPORTING",
			title: "Automated Reporting",
			desc: "Generate and schedule custom sales reports. Share insights with your team automatically via email or Slack.",
			img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&h=350&fit=crop"
		}
	];
	const visibleServices = sliderPage === 0 ? services.slice(0, 4) : services.slice(2, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-[1400px] mx-auto px-4 lg:px-8 mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Sales Tracking Features" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
				children: visibleServices.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#1a1a1a] group cursor-pointer flex flex-col h-full border border border-[#222] hover:border-[#333] transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden bg-black shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.img,
							alt: item.title,
							className: "w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `absolute top-4 left-4 px-2 py-1 text-[9px] font-bold tracking-widest ${getCategoryStyles(item.category)}`,
							children: item.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 flex flex-col flex-grow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-[15px] text-gray-200 line-clamp-1 leading-snug group-hover:text-[#ff007b] transition-colors",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed font-medium",
								children: item.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mt-auto pt-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FEATURES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-[#5c45fd]" }), " READY"]
								})]
							})
						]
					})]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-2 mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSliderPage(0),
					className: `h-1.5 transition-all duration-300 ${sliderPage === 0 ? "w-6 bg-[#5c45fd]" : "w-1.5 bg-gray-500"}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSliderPage(1),
					className: `h-1.5 transition-all duration-300 ${sliderPage === 1 ? "w-6 bg-[#5c45fd]" : "w-1.5 bg-gray-500"}`
				})]
			})
		]
	});
}
function BottomSection() {
	const stories = [
		{
			category: "SALES",
			title: "How Top Sales Teams Close 3X More Deals With Data",
			subtitle: "Data-driven selling strategies that work",
			tag: "Trending",
			img: "https://images.unsplash.com/photo-1553729459-afe8f2e7afb8?w=500&h=350&fit=crop"
		},
		{
			category: "SALES",
			title: "AI-Powered Forecasting: The Future of Revenue Prediction",
			subtitle: "Machine learning in sales",
			tag: "New",
			img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop"
		},
		{
			category: "SALES",
			title: "Pipeline Management Secrets From Million-Dollar Reps",
			subtitle: "Proven pipeline tactics",
			tag: "Hot",
			img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 overflow-hidden mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				title: "Trending Stories",
				endSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: { y: -2 },
					whileTap: { y: 0 },
					className: "relative bg-[#5c45fd] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 shadow-[0_4px_0_0_#4430ca] active:translate-y-[4px] active:shadow-none transition-all duration-150 rounded",
					children: ["ALL STORIES ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-[1fr_1fr] gap-6 md:h-[420px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#1a1a1a] p-8 flex flex-col justify-center relative overflow-hidden rounded-[2px] h-[400px] md:h-full group border border-[#222]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 w-[60%] ml-auto text-right flex flex-col items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#ff007b] text-[11px] font-bold uppercase tracking-[0.2em] mb-2",
								children: "FEATURED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-white text-[22px] lg:text-[28px] font-black leading-tight mb-3",
								children: stories[0].title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-gray-400 text-[12px] mb-6 font-medium",
								children: stories[0].subtitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "bg-transparent border-[1.5px] border-white text-white hover:bg-white hover:text-[#111] rounded-full px-6 py-2.5 h-10 w-fit text-[11px] font-bold uppercase tracking-wider transition-all duration-300",
								children: "Read Story"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[-5%] bottom-0 w-[70%] h-[95%] pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: stories[0].img,
							alt: stories[0].title,
							className: "w-full h-full object-cover object-bottom opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 h-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-6 h-[200px] md:h-[calc(50%-12px)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#5c45fd] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#6b56ff]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-white/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px] w-fit mb-2 relative z-10 tracking-widest",
									children: stories[1].tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-white text-[15px] font-bold mb-1 relative z-10 leading-tight",
									children: stories[1].title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/70 text-[11px] relative z-10 mb-auto font-medium",
									children: stories[1].subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "text-white text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link",
									children: ["Read More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -right-4 bottom-[-10%] w-[80%] h-[90%] pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: stories[1].img,
										alt: stories[1].title,
										className: "w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#ff007b] p-5 relative overflow-hidden rounded-[2px] flex flex-col justify-start group border border-[#ff1a8a]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-white/20 text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px] w-fit mb-2 relative z-10 tracking-widest",
									children: stories[2].tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-white text-[15px] font-bold mb-1 relative z-10 leading-tight",
									children: stories[2].title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/70 text-[11px] relative z-10 mb-auto font-medium",
									children: stories[2].subtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "text-white text-[11px] font-bold flex items-center gap-1 hover:gap-2 transition-all relative z-10 mt-2 group/link",
									children: ["Read More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -right-6 top-1/2 -translate-y-1/2 w-[85%] h-[120%] pointer-events-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: stories[2].img,
										alt: stories[2].title,
										className: "w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
									})
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#1a1a1a] p-6 relative overflow-hidden rounded-[2px] h-[200px] md:h-[calc(50%-12px)] flex flex-col justify-center group border border-[#222]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[#ff007b] text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5",
									children: "FEATURES"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-white text-[20px] lg:text-[24px] font-bold mb-1",
									children: "Sales Tracking Platform"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-3",
									children: "ALL FEATURES THIS WEEK"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "inline-flex items-center gap-2 bg-transparent border border-white text-white hover:bg-white hover:text-[#111] text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 transition-all duration-300",
									children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3.5 h-3.5" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute right-[-5%] top-1/2 -translate-y-1/2 w-[55%] h-[120%] pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: stories[0].img,
								alt: "Food lifestyle",
								className: "w-full h-full object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105"
							})
						})]
					})]
				})]
			})]
		})
	});
}
function HowItWorksSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-[#0b0b0b] py-24 text-center mt-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-block border border-[#df9a28]/40 text-[#df9a28] bg-[#df9a28]/5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest mb-4",
					children: "Process"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight",
					children: "How It Works"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-400 text-sm max-w-2xl mx-auto mb-20 leading-relaxed font-medium",
					children: "From first touch to closed deal in four simple steps. Our platform streamlines your sales process so you can focus on what matters — closing more revenue."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left",
					children: [
						{
							step: "01",
							title: "Connect Your Tools",
							desc: "Integrate your CRM, email, calendar, and payment platforms. Postpidia syncs all your sales data automatically."
						},
						{
							step: "02",
							title: "Track Every Deal",
							desc: "Log deals, set stages, and update progress with a simple drag-and-drop interface. Never lose sight of an opportunity."
						},
						{
							step: "03",
							title: "Analyze & Forecast",
							desc: "Get AI-powered insights on your pipeline health, conversion rates, and revenue forecasts with 95% accuracy."
						},
						{
							step: "04",
							title: "Close & Scale",
							desc: "Automate follow-ups, generate reports, and replicate your winning sales playbook across the entire team."
						}
					].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 mb-4 select-none",
								children: [index > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#3b2d18] font-bold text-xl mr-1",
									children: "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-4xl font-black text-[#2e2415] tracking-tight",
									children: item.step
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-[17px] font-bold text-white mb-2 tracking-tight",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 leading-relaxed font-medium",
								children: item.desc
							})
						]
					}, index))
				})
			]
		})
	});
}
function PricingSection() {
	const [isYearly, setIsYearly] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-[#111111] py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight",
						children: "Choose your plan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed font-medium",
						children: "Scale your sales tracking from solo to enterprise. All plans include a 14-day free trial."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center items-center mb-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#1a1a1a] p-1 rounded-full flex items-center border border-[#333]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsYearly(false),
							className: `px-6 py-2 rounded-full text-xs font-bold transition-all ${!isYearly ? "bg-[#5c45fd] text-white" : "text-gray-400 hover:text-white"}`,
							children: "Monthly"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsYearly(true),
							className: `px-6 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${isYearly ? "bg-[#5c45fd] text-white" : "text-gray-400 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yearly" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[9px] px-1.5 py-0.5 rounded font-black ${isYearly ? "bg-white/20 text-white" : "bg-[#5c45fd]/20 text-[#5c45fd]"}`,
								children: "Save 20%"
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid lg:grid-cols-3 gap-8 items-stretch",
					children: [
						{
							name: "Starter",
							price: isYearly ? 39 : 49,
							gradient: "from-blue-600 via-purple-600 to-purple-700",
							features: [
								"Up to 500 deals tracked",
								"3 team members",
								"Pipeline management",
								"Email integration",
								"Basic dashboards",
								"Lead capture forms",
								"Mobile app access",
								"Email support"
							]
						},
						{
							name: "Professional",
							price: isYearly ? 69 : 89,
							gradient: "from-orange-500 via-red-500 to-pink-600",
							features: [
								"Unlimited deals tracked",
								"10 team members",
								"AI revenue forecasting",
								"Custom pipeline stages",
								"Advanced analytics",
								"Automated workflows",
								"Slack & Stripe integration",
								"Priority support"
							]
						},
						{
							name: "Enterprise",
							price: isYearly ? 99 : 129,
							gradient: "from-blue-500 via-cyan-500 to-teal-500",
							features: [
								"Unlimited everything",
								"Unlimited team members",
								"Custom integrations",
								"Dedicated account manager",
								"White-label reporting",
								"API access",
								"SSO & RBAC",
								"24/7 phone support"
							]
						}
					].map((tier, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative rounded-2xl overflow-hidden flex flex-col min-h-[600px] transition-transform hover:scale-105 duration-300`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-90` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex flex-col h-full p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-bold text-white mb-8 tracking-tight",
									children: tier.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-4 mb-auto",
									children: tier.features.map((feature, fIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 text-sm font-medium text-white/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 shrink-0 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feature })]
									}, fIdx))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-1 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-5xl font-black text-white tracking-tight",
											children: ["$", tier.price]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-white/80 font-medium",
											children: "per month"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { y: -2 },
										whileTap: { y: 0 },
										className: `w-full font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 ${index === 1 ? "bg-[#111111] text-white shadow-lg" : "bg-[#111111]/80 text-white backdrop-blur-sm hover:bg-[#111111]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign up" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
									})]
								})
							]
						})]
					}, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-500 text-xs font-medium",
						children: "© 2020 BooStock. Designed by Harry Boo"
					})
				})
			]
		})
	});
}
function ContactSection() {
	const [branch, setBranch] = (0, import_react.useState)("");
	const onSubmit = (e) => {
		e.preventDefault();
		toast.success("Message received — we'll get back to you within one business day.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-[#111111] pt-0 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1100px] mx-auto px-4 lg:px-8 relative flex flex-col lg:flex-row items-end gap-16 lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-[45%] relative flex items-end justify-center lg:justify-end pt-32 lg:pt-0 -mb-3 lg:-mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-10 lg:-top-10 left-0 lg:left-0 xl:left-[-20px] z-10 bg-[#ff007b] rounded-[24px] text-white p-8 w-[240px] sm:w-[280px] shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white text-[#ff007b] w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-6 h-6 fill-current" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-center font-bold text-[18px] mb-3",
							children: "Chat With Live !"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-[11px] leading-relaxed text-white/90 mb-8 pt-2",
							children: "Have questions? Our support team is ready to help you with any enquiry."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "bg-white text-[#ff007b] hover:bg-gray-100 rounded-full px-6 py-2 h-9 text-[10px] font-extrabold uppercase tracking-widest",
								children: "LET'S CHAT"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-20 w-[260px] md:w-[320px] max-w-[380px] lg:mr-8 xl:mr-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: why_default,
						alt: "Customer Service",
						className: "w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] block"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-[55%] flex flex-col justify-center pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 text-[#ff007b] text-[10px] font-bold uppercase tracking-wider mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-[#ff007b]" }),
						"CONTACT US",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-[#ff007b]" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-white font-display font-[900] text-[32px] md:text-[42px] leading-[1.1] mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#ff007b]",
							children: "Reach"
						}),
						" & Get In Touch",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"With Us !"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Your name*",
								className: "bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]",
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Your Email*",
								type: "email",
								className: "bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Your number*",
								className: "bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Your Subject*",
								className: "bg-[#1a1a1a] border border-[#333] rounded-full h-12 px-6 text-[13px] text-gray-200 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#ff007b]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Enter message",
							rows: 5,
							className: "bg-[#1a1a1a] border border-[#333] rounded-[20px] p-6 text-[13px] text-gray-200 placeholder:text-gray-500 resize-none focus-visible:ring-1 focus-visible:ring-[#ff007b]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-[#ff007b] hover:bg-[#e0006b] text-white rounded-full px-8 py-6 h-12 text-[11px] font-extrabold uppercase tracking-widest shadow-md transition-transform hover:-translate-y-0.5 w-[200px]",
								children: "SEND MESSAGE"
							})
						})
					]
				})]
			})]
		})
	});
}
function CTASection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "max-w-[1400px] mx-auto px-4 lg:px-8 mb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden bg-gradient-to-br from-[#1c144e] to-[#0b0b0b] border border-[#33259e]/50 px-8 py-16 sm:p-16 text-center rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-[#5c45fd]/10 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff007b]/5 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-3xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight",
							children: "Ready to Close More Deals?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-300 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-medium",
							children: "Join thousands of sales teams using Postpidia to track, analyze, and close deals faster than ever before."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileHover: { y: -3 },
								whileTap: { y: 0 },
								className: "bg-[#5c45fd] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 shadow-[0_5px_0_0_#4430ca] active:translate-y-[5px] active:shadow-none transition-all duration-150 rounded",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Get Started Now" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileHover: { y: -3 },
								whileTap: { y: 0 },
								className: "bg-transparent text-white border border-gray-700 font-bold text-xs uppercase tracking-widest px-8 py-3.5 shadow-[0_5px_0_0_#222] active:translate-y-[5px] active:shadow-none transition-all duration-150 rounded hover:bg-white/5",
								children: "View Case Studies"
							})]
						})
					]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[#161616] border-t border-[#222] pt-16 pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 mb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 lg:col-span-4 flex flex-col space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-gradient-to-tr from-[#ff007b] to-[#ff5722] text-white w-9 h-9 flex items-center justify-center font-bold text-lg",
								children: "P"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-bold tracking-tight text-white leading-none",
								children: "Postpidia"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-400 text-xs leading-relaxed max-w-sm font-medium",
							children: "Sales tracking platform designed for modern teams. Track deals, forecast revenue, and close more with data-driven insights and automation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-gray-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4 hover:text-white cursor-pointer transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, { className: "h-4 w-4 hover:text-white cursor-pointer transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-4 w-4 hover:text-white cursor-pointer transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4 hover:text-white cursor-pointer transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-4 w-4 hover:text-white cursor-pointer transition-colors" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-1 lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[11px] font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#ff007b] pl-3",
						children: "Categories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-xs font-semibold text-gray-400",
						children: [
							"Lead Management",
							"Pipeline",
							"Forecasting",
							"Reports",
							"Integrations",
							"Dashboard",
							"Mobile"
						].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "hover:text-[#ff007b] cursor-pointer transition-colors flex items-center gap-1.5 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 bg-gray-600 rounded-full group-hover:bg-[#ff007b]" }), cat]
						}, cat))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-1 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[11px] font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#5c45fd] pl-3",
						children: "Company"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-xs font-semibold text-gray-400",
						children: [
							"About Us",
							"Features",
							"Pricing",
							"Contact Info",
							"Careers"
						].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "hover:text-white cursor-pointer transition-colors",
							children: link
						}, link))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 lg:col-span-3 flex flex-col space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[11px] font-bold text-white uppercase tracking-wider border-l-2 border-[#df9a28] pl-3",
							children: "Newsletter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-400 text-xs font-medium leading-relaxed",
							children: "Subscribe for sales tips, product updates, and exclusive offers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center border border-[#333] focus-within:border-[#df9a28] bg-[#111] transition-colors rounded overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "Your Email...",
								className: "bg-transparent text-xs text-gray-200 placeholder:text-gray-600 pl-3 pr-12 py-2.5 w-full focus:outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "bg-[#df9a28] text-black h-full px-3 absolute right-0 flex items-center justify-center hover:bg-[#c9861f] transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-3.5 h-3.5" })
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-[1400px] mx-auto px-4 lg:px-8 pt-8 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-gray-500",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" POSTPIDIA. ALL RIGHTS RESERVED."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-x-6 gap-y-2",
				children: [
					"Terms of Service",
					"Privacy Policy",
					"Content Guidelines",
					"Cookie Settings"
				].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: "hover:text-gray-300 transition-colors",
					children: link
				}, link))
			})]
		})]
	});
}
var rootRouteChildren = { IndexRoute: Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
