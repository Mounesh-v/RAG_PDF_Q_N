import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, MessageSquare } from "lucide-react";

const navItems = [
  { to: "/", label: "Documents", icon: FileText },
  { to: "/chat", label: "Chat", icon: MessageSquare },
];

const Logo = () => (
  <span className="flex items-center gap-2.5">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-lavender-line bg-lavender-light">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 6.9C10.6 5.5 8.85 4.8 6.6 4.8H3.6v12.6h3c2.25 0 4.05.65 5.4 1.95"
          stroke="#7D8050"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.9c1.4-1.4 3.15-2.1 5.4-2.1h3v12.6h-3c-2.25 0-4.05.65-5.4 1.95"
          stroke="#A5A1F8"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.9v12.45"
          stroke="#CF6DFC"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
    <span className="font-serif text-lg font-semibold tracking-tight text-ink">
      Study<span className="text-mauve-deep">RAG</span>
    </span>
  </span>
);

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 h-16 w-full">
      <div className="mx-auto my-1 flex h-14 max-w-[1500px] items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-cream-soft/90 px-4 shadow-[0_20px_45px_-35px_rgba(37,35,41,0.7)] backdrop-blur-md sm:px-5">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-mauve-deep"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-lavender-light"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-olive/40 bg-olive/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive-deep opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-olive-deep" />
          </span>
          <span className="text-xs font-medium text-olive-deep">
            Status: Connected
          </span>
        </div>
      </div>
    </header>
  );
}
