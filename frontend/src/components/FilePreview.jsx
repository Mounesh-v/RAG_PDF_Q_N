import { motion } from "framer-motion";
import { FileText, RefreshCw, ArrowRight, Loader2 } from "lucide-react";
import { formatBytes } from "../utils/format";

export default function FilePreview({ file, onReplace, onProcess, isProcessing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="card-border rounded-3xl bg-cream-soft p-5 shadow-[0_36px_70px_-58px_rgba(37,35,41,0.9)] sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-lavender-line bg-lavender-light">
          <FileText className="h-6 w-6 text-mauve-deep" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{formatBytes(file.size)}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-olive/40 bg-olive/15 px-2.5 py-0.5 text-xs font-medium text-olive-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-olive-deep" />
            Ready to process
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onReplace}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream-soft px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-lavender-line hover:bg-lavender-light hover:text-ink disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" />
          Replace
        </button>
        <button
          type="button"
          onClick={onProcess}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 rounded-full bg-mauve-deep px-5 py-2 text-sm font-semibold text-white shadow-[0_16px_32px_-20px_rgba(159,68,222,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-mauve-dark disabled:translate-y-0 disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              Process Notes
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
