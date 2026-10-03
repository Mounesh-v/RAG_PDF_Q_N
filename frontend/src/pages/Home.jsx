import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ArrowRight, AlertCircle, RotateCcw, CheckCircle2 } from "lucide-react";
import UploadZone from "../components/UploadZone.jsx";
import FilePreview from "../components/FilePreview.jsx";
import ProcessingState from "../components/ProcessingState.jsx";
import { uploadDocument } from "../api/ragApi.js";

export default function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [processError, setProcessError] = useState(null);

  const handleFileSelected = (selectedFile, error) => {
    setUploadError(error || null);
    if (error) {
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setStatus("idle");
    setProcessError(null);
  };

  const handleReplace = () => {
    setFile(null);
    setStatus("idle");
    setUploadError(null);
    setProcessError(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    setStatus("uploading");
    setProcessError(null);
    try {
      await uploadDocument(file);
      setStatus("success");
    } catch (err) {
      setProcessError(err.message || "We couldn't process your document.");
      setStatus("error");
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setProcessError(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-14 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 text-center"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3.5 py-1.5 text-xs font-medium text-accent-300">
          <BadgeCheck className="h-3.5 w-3.5" />
          AI-Powered Study Assistant
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Turn your notes into an{" "}
          <span className="text-gradient">AI tutor.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-mist-400">
          Upload your study notes and ask questions. StudyRAG explains concepts
          using the information from your own notes.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === "uploading" ? (
          <ProcessingState key="processing" isComplete={false} fileName={file?.name} />
        ) : status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="glass card-border rounded-2xl p-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Your notes are ready</h2>
            <p className="mt-1 text-sm font-medium text-mist-300">{file?.name}</p>
            <p className="mx-auto mt-3 max-w-sm text-sm text-mist-400">
              Your document has been added to your AI knowledge base.
            </p>
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-accent-500/40"
            >
              Start Asking Questions
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass card-border rounded-2xl p-8 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              We couldn&apos;t process your document.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-mist-400">
              {processError}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-mist-200 transition-colors hover:bg-white/5"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          </motion.div>
        ) : (
          <motion.div key="upload" className="space-y-5">
            {!file ? (
              <UploadZone onFileSelected={handleFileSelected} error={uploadError} />
            ) : (
              <FilePreview
                file={file}
                onReplace={handleReplace}
                onProcess={handleProcess}
                isProcessing={status === "uploading"}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
