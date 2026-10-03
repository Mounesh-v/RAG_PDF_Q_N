import { Loader2, FileText } from "lucide-react";
import DocumentCard from "./DocumentCard.jsx";

export default function DocumentList({ documents, activeId, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-1 py-4 text-sm text-mist-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading documents…
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 px-1 py-8 text-center">
        <FileText className="h-8 w-8 text-mist-500" />
        <p className="text-sm text-mist-400">No documents yet</p>
        <p className="text-xs text-mist-500">
          Upload a PDF to start asking questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="px-1 text-xs font-medium uppercase tracking-wider text-mist-500">
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
