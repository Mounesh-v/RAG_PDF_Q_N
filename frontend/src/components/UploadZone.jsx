import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, UploadCloud } from "lucide-react";

const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

const validateFile = (file) => {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return "Only PDF files are supported.";
  if (file.size > MAX_SIZE) return "File size must be less than 20 MB.";
  return null;
};

export default function UploadZone({ onFileSelected, error }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    const validationError = validateFile(file);
    if (validationError) {
      onFileSelected(null, validationError);
      return;
    }
    onFileSelected(file, null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={onDrop}
        onClick={openPicker}
        className={`group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-10 ${
          dragActive
            ? "border-mauve bg-lavender-light shadow-[0_28px_60px_-45px_rgba(159,68,222,0.95)]"
            : "border-lavender-line bg-cream-soft/80 hover:-translate-y-0.5 hover:border-mauve/60 hover:bg-lavender-light/60 hover:shadow-[0_28px_60px_-50px_rgba(37,35,41,0.9)]"
        }`}
      >
        {dragActive ? (
          <motion.div
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lavender-line bg-white">
              <UploadCloud className="h-8 w-8 text-mauve-deep" />
            </div>
            <p className="font-serif text-xl font-semibold text-ink">
              Drop your notes here
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lavender-line bg-lavender-light"
            >
              <FileUp className="h-8 w-8 text-mauve-deep" />
            </motion.div>
            <div>
              <p className="font-serif text-xl font-semibold text-ink">
                Upload your study notes
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">
                Drag &amp; drop your PDF here{" "}
                <span className="text-ink-faint">or</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-mauve-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_32px_-20px_rgba(159,68,222,0.95)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-mauve-dark">
                Browse files
              </span>
            </div>
          </div>
        )}

        <p className="text-xs text-ink-faint">PDF files only • Maximum 20 MB</p>

        {error && (
          <div className="absolute bottom-4 left-1/2 max-w-[90%] -translate-x-1/2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </motion.div>
  );
}
