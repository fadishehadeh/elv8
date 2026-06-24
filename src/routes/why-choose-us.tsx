import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us — ELEV8 Developments" },
      {
        name: "description",
        content:
          "Restraint, privacy, and architectural thinking — the principles behind every ELEV8 development.",
      },
    ],
  }),
  component: WhyChooseUsPage,
});

function WhyChooseUsPage() {
  return (
    <PagePlaceholder
      eyebrow="Why Choose Us"
      title="A few principles. Held closely."
    />
  );
}
