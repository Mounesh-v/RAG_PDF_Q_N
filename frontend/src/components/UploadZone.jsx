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
        className={`group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          dragActive
            ? "drop-zone-glow border-accent-500/80 bg-accent-500/10"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
      >
        {dragActive ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-cyan-400 shadow-lg shadow-accent-500/40">
              <UploadCloud className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-white">Drop your notes here</p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <FileUp className="h-8 w-8 text-accent-400" />
            </motion.div>
            <div>
              <p className="text-lg font-semibold text-white">Upload your study notes</p>
              <p className="mt-1 text-sm text-mist-400">
                Drag &amp; drop your PDF here <span className="text-mist-300">or</span>
              </p>
              <p className="mt-1 text-sm font-medium text-accent-300">Browse files</p>
            </div>
          </div>
        )}

        <p className="mt-2 text-xs text-mist-500">PDF files only • Maximum 20 MB</p>

        {error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-red-500/15 px-3 py-1.5 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>
    </motion.div>
  );
}
