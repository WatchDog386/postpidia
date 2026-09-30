import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Postpidia" },
      {
        name: "description",
        content:
          "Learn about Postpidia, a premium video editing agency focused on high-conversion social commerce content.",
      },
    ],
  }),
  component: AboutPage,
});
