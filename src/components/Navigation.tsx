import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import logo from "@/assets/logo.svg";

const navItems = [
  { label: "About Us", to: "/about" },
  { label: "Our Projects", to: "/projects" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
] as const;

type NavigationProps = {
  /** "hero" starts transparent and turns solid on scroll. "solid" is always solid (default). */
  variant?: "hero" | "solid";
};

export function Navigation({ variant = "solid" }: NavigationProps) {
  const [atTop, setAtTop] = useState(variant === "hero");

  useEffect(() => {
    if (variant !== "hero") return;
    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const linkColor = "text-background/75 hover:text-background";
  const activeColor = "text-background";
  const labelColor = "text-background/60";
  const barBg =
    variant === "hero" && atTop
      ? "bg-transparent"
      : "bg-foreground/95 border-b border-background/10 backdrop-blur-sm";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${barBg}`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <Link to="/" className="flex items-center" aria-label="ELEV8 Developments">
          <img src={logo} alt="ELEV8" className="h-8 w-auto brightness-0 invert md:h-10" />
        </Link>
        <ul className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`eyebrow transition-colors duration-500 ${linkColor}`}
                activeProps={{ className: `eyebrow transition-colors duration-500 ${activeColor}` }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className={`eyebrow hidden md:inline ${labelColor}`}>Beirut · Lebanon</span>
      </div>
    </motion.nav>
  );
}
