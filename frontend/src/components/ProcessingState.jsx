import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";

const STEPS = [
  { label: "Uploading document", icon: "upload" },
  { label: "Extracting content", icon: "extract" },
  { label: "Creating chunks", icon: "chunk" },
  { label: "Generating embeddings", icon: "embed" },
  { label: "Updating knowledge base", icon: "update" },
];

export default function ProcessingState({ isComplete, fileName }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isComplete) return;
    const timer = setInterval(() => {
      setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 1200);
    return () => clearInterval(timer);
  }, [isComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="glass card-border rounded-2xl p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-cyan-400 shadow-lg shadow-accent-500/30">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
        <div>
          <p className="text-base font-semibold text-white">Analyzing your notes…</p>
          <p className="text-xs text-mist-400">
            {fileName ? `${fileName} is being indexed` : "Preparing your document"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const done = isComplete || i < activeStep;
          const active = !isComplete && i === activeStep;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                active ? "bg-accent-500/10" : ""
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  done
                    ? "bg-emerald-500/20 text-emerald-300"
                    : active
                      ? "bg-accent-500/25 text-accent-300"
                      : "bg-white/5 text-mist-500"
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
              </span>
              <span
                className={`text-sm ${
                  done
                    ? "text-mist-300"
                    : active
                      ? "font-medium text-white"
                      : "text-mist-500"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-mist-500">
        This can take a moment while your document is indexed into the knowledge base.
      </p>
    </motion.div>
  );
}
