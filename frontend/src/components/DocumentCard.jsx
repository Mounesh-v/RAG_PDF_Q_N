import { FileText } from "lucide-react";
import { formatBytes } from "../utils/format";

export default function DocumentCard({ document, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(document)}
      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${
        isActive
          ? "border-lavender-line bg-lavender-light shadow-[0_16px_34px_-30px_rgba(159,68,222,0.9)]"
          : "border-ink/10 bg-cream-soft hover:border-lavender-line hover:bg-lavender-light/50"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
          isActive
            ? "border-lavender-line bg-white text-mauve-deep"
            : "border-ink/10 bg-lavender-light text-lavender-mid"
        }`}
      >
        <FileText className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <p
          className={`truncate text-sm font-medium ${
            isActive ? "text-ink" : "text-ink-soft"
          }`}
        >
          {document.name}
        </p>
        <p className="text-xs text-ink-faint">{formatBytes(document.size)}</p>
      </div>
    </button>
  );
}
