import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const PROMPTS = [
  "Explain binary search in simple terms",
  "Summarize Module 3",
  "What is recursion?",
  "Give me important points about linked lists",
];

export default function EmptyChat({ onPromptClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-14 text-center sm:py-16"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-lavender-line bg-lavender-light">
        <Sparkles className="h-7 w-7 text-mauve-deep" />
      </div>

      <h2 className="font-serif text-2xl font-semibold text-ink">
        Ask anything about your notes
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Try one of these prompts, or ask your own question below.
      </p>

      <div className="mt-7 grid w-full gap-2.5 sm:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptClick(prompt)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-lavender-line bg-lavender-light/70 px-4 py-3.5 text-left text-sm font-medium text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-mauve/50 hover:bg-lavender-light hover:text-ink"
          >
            <span className="min-w-0">“{prompt}”</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-mauve opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
