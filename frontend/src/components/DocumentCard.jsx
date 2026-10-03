import { FileText } from "lucide-react";
import { formatBytes } from "../utils/format";

export default function DocumentCard({ document, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(document)}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
        isActive
          ? "border-accent-500/40 bg-accent-500/10"
          : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isActive ? "bg-accent-500/20 text-accent-300" : "bg-white/5 text-mist-400"
        }`}
      >
        <FileText className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{document.name}</p>
        <p className="text-xs text-mist-500">{formatBytes(document.size)}</p>
      </div>
    </button>
  );
}
