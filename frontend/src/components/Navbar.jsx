import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenText, Sparkles, FileText, MessageSquare } from "lucide-react";

const navItems = [
  { to: "/", label: "Documents", icon: FileText },
  { to: "/chat", label: "Chat", icon: MessageSquare },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-cyan-400 shadow-lg shadow-accent-500/30">
                <BookOpenText className="h-5 w-5 text-white" />
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400">
                  <Sparkles className="h-2 w-2 text-ink-950" />
                </span>
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                Study<span className="text-gradient">RAG</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => {
                const active = location.pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-white"
                        : "text-mist-400 hover:text-mist-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-white/5"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-mist-300">Status: Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}
