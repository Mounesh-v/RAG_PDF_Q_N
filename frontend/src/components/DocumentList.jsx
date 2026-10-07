import { Loader2, FileText } from "lucide-react";
import DocumentCard from "./DocumentCard.jsx";

export default function DocumentList({ documents, activeId, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-1 py-4 text-sm text-ink-faint">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading documents…
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-lavender-line bg-lavender-light/40 px-4 py-8 text-center">
        <FileText className="h-8 w-8 text-lavender-mid" />
        <p className="text-sm font-medium text-ink-soft">No documents yet</p>
        <p className="text-xs text-ink-faint">
          Upload a PDF to start asking questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        Documents
      </p>
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          isActive={activeId === document.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
