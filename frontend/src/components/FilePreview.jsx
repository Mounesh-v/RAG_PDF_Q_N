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
      className="glass card-border rounded-2xl p-5"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <FileText className="h-6 w-6 text-accent-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{file.name}</p>
          <p className="mt-0.5 text-xs text-mist-400">{formatBytes(file.size)}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ready to process
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onReplace}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-mist-300 transition-colors hover:bg-white/5 disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" />
          Replace
        </button>
        <button
          type="button"
          onClick={onProcess}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-accent-500/40 disabled:opacity-60"
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
