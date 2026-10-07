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
      className="card-border rounded-3xl bg-cream-soft p-6 shadow-[0_36px_70px_-58px_rgba(37,35,41,0.9)] sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-lavender-line bg-lavender-light">
          <Loader2 className="h-5 w-5 animate-spin text-mauve-deep" />
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-ink">
            Analyzing your notes…
          </p>
          <p className="text-xs text-ink-faint">
            {fileName ? `${fileName} is being indexed` : "Preparing your document"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {STEPS.map((step, i) => {
          const done = isComplete || i < activeStep;
          const active = !isComplete && i === activeStep;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 ${
                active ? "bg-lavender-light" : ""
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                  done
                    ? "border-olive/40 bg-olive/20 text-olive-deep"
                    : active
                      ? "border-lavender-line bg-white text-mauve-deep"
                      : "border-ink/10 bg-cream text-ink-faint"
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
                  active
                    ? "font-medium text-ink"
                    : done
                      ? "text-ink-soft"
                      : "text-ink-faint"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-ink-faint">
        This can take a moment while your document is indexed into the knowledge base.
      </p>
    </motion.div>
  );
}
