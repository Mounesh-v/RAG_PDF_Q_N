import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Quote } from "lucide-react";

export default function SourceList({ sources }) {
  const [open, setOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  const toggle = () => setOpen((o) => !o);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 border-t border-white/5 pt-3"
    >
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-xs font-medium text-mist-400 transition-colors hover:text-mist-200"
      >
        <FileText className="h-3.5 w-3.5" />
        Sources
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
        <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-mist-500">
          {sources.length}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 space-y-1.5 overflow-hidden"
          >
            {sources.map((source, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
              >
                <div className="flex items-center gap-2 text-xs text-mist-300">
                  <FileText className="h-3.5 w-3.5 text-accent-400" />
                  <span className="truncate font-medium">
                    {source.title || source.file || "Document"}
                  </span>
                  {source.page && (
                    <span className="ml-auto shrink-0 text-[10px] text-mist-500">
                      Page {source.page}
                    </span>
                  )}
                </div>
                {source.content && (
                  <p className="mt-1.5 flex gap-1.5 text-xs leading-relaxed text-mist-500">
                    <Quote className="mt-0.5 h-3 w-3 shrink-0" />
                    <span className="line-clamp-3">{source.content}</span>
                  </p>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
