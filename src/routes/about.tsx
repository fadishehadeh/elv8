import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/PagePlaceholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — ELEV8 Developments" },
      {
        name: "description",
        content:
          "ELEV8 Properties is redefining the luxury real estate landscape in Lebanon — a distinguished portfolio of iconic residential, commercial, and leisure developments.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About Us"
      title="A Lebanese house, quietly elevated."
      intro="ELEV8 Properties is redefining the luxury real estate landscape in Lebanon, offering a distinguished portfolio of iconic residential, commercial, and leisure developments."
    />
  );
}
