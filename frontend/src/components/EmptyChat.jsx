import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
      className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-cyan-400 shadow-lg shadow-accent-500/30">
        <Sparkles className="h-7 w-7 text-white" />
      </div>

      <h2 className="text-xl font-semibold text-white">
        Ask anything about your notes
      </h2>
      <p className="mt-2 text-sm text-mist-400">
        Try one of these prompts, or ask your own question below.
      </p>

      <div className="mt-7 grid w-full gap-2 sm:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptClick(prompt)}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-mist-300 transition-all hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-white"
          >
            “{prompt}”
          </button>
        ))}
      </div>
    </motion.div>
  );
}
