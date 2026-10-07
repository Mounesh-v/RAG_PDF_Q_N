import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import UploadZone from "../components/UploadZone.jsx";
import FilePreview from "../components/FilePreview.jsx";
import ProcessingState from "../components/ProcessingState.jsx";
import { NotesStack, DeskScene } from "../components/HeroIllustrations.jsx";
import { uploadDocument } from "../api/ragApi.js";

/* -------------------------------------------------------
   Handwritten font
   Add this to index.html:

   <link
     href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
     rel="stylesheet"
   />
------------------------------------------------------- */

const handFont = {
  fontFamily: "'Caveat', cursive",
};

/* -------------------------------------------------------
   Curved arrow
------------------------------------------------------- */

const CurvedArrow = () => (
  <svg
    viewBox="0 0 60 40"
    fill="none"
    aria-hidden="true"
    className="h-7 w-10 text-[#7D8050]"
  >
    <path
      d="M6 6C8 26 28 34 52 30"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    <path
      d="M44 22L53 30L42 36"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -------------------------------------------------------
   Sparkle
------------------------------------------------------- */

const Sparkle = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`pointer-events-none absolute text-[#CF6DFC]/60 ${className}`}
  >
    <path
      d="M12 0C12.6 6.5 17.5 11.4 24 12C17.5 12.6 12.6 17.5 12 24C11.4 17.5 6.5 12 0 12C6.5 11.4 11.4 6.5 12 0Z"
      fill="currentColor"
    />
  </svg>
);

/* -------------------------------------------------------
   Headline flourish
------------------------------------------------------- */

const HeadlineFlourish = () => (
  <svg
    viewBox="0 0 40 36"
    fill="none"
    aria-hidden="true"
    className="ml-1 inline-block h-7 w-8 align-middle text-[#CF6DFC]"
  >
    <path
      d="M6 24C10 18 14 16 18 16"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    <path
      d="M10 12C14 8 18 6 22 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    <path
      d="M22 28C26 22 30 20 34 20"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

/* -------------------------------------------------------
   HOME
------------------------------------------------------- */

export default function Home() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [processError, setProcessError] = useState(null);

  /* -----------------------------------------------------
     File selection
  ----------------------------------------------------- */

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

  /* -----------------------------------------------------
     Replace file
  ----------------------------------------------------- */

  const handleReplace = () => {
    setFile(null);
    setStatus("idle");
    setUploadError(null);
    setProcessError(null);
  };

  /* -----------------------------------------------------
     Upload document
  ----------------------------------------------------- */

  const handleProcess = async () => {
    if (!file) return;

    setStatus("uploading");
    setProcessError(null);

    try {
      await uploadDocument(file);
      setStatus("success");
    } catch (err) {
      setProcessError(
        err.message || "We couldn't process your document."
      );

      setStatus("error");
    }
  };

  /* -----------------------------------------------------
     Retry
  ----------------------------------------------------- */

  const handleRetry = () => {
    setStatus("idle");
    setProcessError(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FDFBD4] text-[#252329]">

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        {/* Top-left lavender blob */}
        <div
          className="
            absolute
            -left-28
            -top-24
            h-[330px]
            w-[330px]
            rounded-full
            bg-[#C1BFFF]/35
            blur-[2px]
          "
        />

        {/* Top-right lavender blob */}
        <div
          className="
            absolute
            -right-24
            -top-20
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#C1BFFF]/40
            blur-[3px]
          "
        />

        {/* Bottom-left lavender wash */}
        <div
          className="
            absolute
            -bottom-40
            -left-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#CF6DFC]/15
            blur-3xl
          "
        />

        {/* Bottom-right wash */}
        <div
          className="
            absolute
            -bottom-40
            -right-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#BDB96A]/20
            blur-3xl
          "
        />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          mx-auto
          flex
          min-h-[520px]
          max-w-[1600px]
          items-start
          justify-center
          overflow-hidden
          px-5
          pt-8
          sm:px-8
          lg:min-h-[555px]
          lg:px-10
          lg:pt-10
        "
      >

        {/* =================================================
            LEFT ILLUSTRATION
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            hidden
            w-[240px]
            lg:block
            xl:w-[330px]
            2xl:w-[380px]
          "
        >
          {/* handwritten annotation */}

          <div
            className="
              absolute
              -top-20
              left-8
              z-20
              rotate-[-8deg]
              text-[20px]
              leading-[1.05]
              text-[#6F7048]
              xl:left-12
            "
            style={handFont}
          >
            <p>Your</p>
            <p>Notes</p>
            <p>+</p>
            <p>AI Answers</p>

            <div className="ml-5 mt-1">
              <CurvedArrow />
            </div>
          </div>

          <Sparkle className="-top-10 left-32 h-4 w-4" />
          <Sparkle className="top-8 right-4 h-3 w-3" />

          <NotesStack className="float-soft w-full" />
        </div>

        {/* =================================================
            RIGHT ILLUSTRATION
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            hidden
            w-[240px]
            lg:block
            xl:w-[330px]
            2xl:w-[380px]
          "
        >
          {/* handwritten annotation */}

          <div
            className="
              absolute
              -top-28
              right-8
              z-20
              rotate-[-7deg]
              text-[20px]
              leading-[1.1]
              text-[#6F7048]
              xl:right-12
            "
            style={handFont}
          >
            <p>Learn</p>
            <p className="ml-2">Question</p>
            <p className="ml-4">Understand</p>
            <p className="ml-6">Grow</p>
          </div>

          <Sparkle className="-top-12 right-5 h-4 w-4" />

          <DeskScene className="float-soft-late w-full" />
        </div>

        {/* =================================================
            CENTER CONTENT
        ================================================= */}

        <div className="relative z-10 w-full max-w-[620px] text-center">

          {/* AI badge */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#CF6DFC]/35
                bg-[#C1BFFF]/45
                px-4
                py-1.5
                text-[11px]
                font-medium
                tracking-wide
                text-[#6E39A6]
                backdrop-blur-sm
              "
            >
              <Sparkles className="h-3 w-3" />

              AI-Powered Study Assistant
            </span>
          </motion.div>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: "easeOut",
            }}
          >
            <h1
              className="
                mt-4
                font-serif
                text-[39px]
                font-semibold
                leading-[0.98]
                tracking-[-0.035em]
                text-[#252329]
                sm:text-[48px]
                lg:text-[58px]
              "
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Turn your notes into an
              <br />

              <span className="text-[#8D3BD0]">
                AI tutor.
              </span>

              <HeadlineFlourish />
            </h1>
          </motion.div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              mx-auto
              mt-3
              max-w-[520px]
              text-[13px]
              leading-[1.45]
              text-[#66636A]
              sm:text-[14px]
            "
            style={{
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Upload your study notes and ask questions.
            StudyRAG explains concepts using the information
            from your own notes.
          </motion.p>

          {/* =================================================
              UPLOAD AREA
          ================================================= */}

          <div className="mt-5 text-left">

            <AnimatePresence mode="wait">

              {/* -------------------------------------------
                  PROCESSING
              ------------------------------------------- */}

              {status === "uploading" ? (
                <ProcessingState
                  key="processing"
                  isComplete={false}
                  fileName={file?.name}
                />

              ) : status === "success" ? (

                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{ duration: 0.35 }}
                  className="
                    rounded-[26px]
                    border
                    border-[#C1BFFF]
                    bg-white/65
                    p-7
                    text-center
                    shadow-[0_20px_60px_-35px_rgba(90,70,120,0.35)]
                    backdrop-blur-sm
                  "
                >

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#BDB96A]/20
                    "
                  >
                    <CheckCircle2
                      className="h-6 w-6 text-[#70733E]"
                    />
                  </div>

                  <h2
                    className="
                      font-serif
                      text-2xl
                      font-semibold
                    "
                    style={{
                      fontFamily:
                        "'Playfair Display', Georgia, serif",
                    }}
                  >
                    Your notes are ready
                  </h2>

                  <p className="mt-1 text-sm text-[#77737B]">
                    {file?.name}
                  </p>

                  <p className="mx-auto mt-3 max-w-sm text-sm text-[#66636A]">
                    Your document has been added to your AI
                    knowledge base.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/chat")}
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#8D3BD0]
                      px-6
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#7730B2]
                    "
                  >
                    Start Asking Questions

                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

              ) : status === "error" ? (

                /* -----------------------------------------
                   ERROR
                ----------------------------------------- */

                <motion.div
                  key="error"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{ duration: 0.35 }}
                  className="
                    rounded-[26px]
                    border
                    border-red-200
                    bg-red-50/70
                    p-7
                    text-center
                  "
                >

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-red-100
                    "
                  >
                    <AlertCircle
                      className="h-6 w-6 text-red-500"
                    />
                  </div>

                  <h2
                    className="
                      font-serif
                      text-2xl
                      font-semibold
                    "
                    style={{
                      fontFamily:
                        "'Playfair Display', Georgia, serif",
                    }}
                  >
                    We couldn't process your document.
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm text-red-700">
                    {processError}
                  </p>

                  <button
                    type="button"
                    onClick={handleRetry}
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-black/10
                      bg-white/70
                      px-6
                      py-2.5
                      text-sm
                      font-semibold
                      transition-colors
                      hover:bg-[#C1BFFF]/30
                    "
                  >
                    <RotateCcw className="h-4 w-4" />

                    Try Again
                  </button>
                </motion.div>

              ) : (

                /* -----------------------------------------
                   DEFAULT UPLOAD
                ----------------------------------------- */

                <motion.div
                  key="upload"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    relative
                  "
                >
                  {!file ? (

                    <div
                      className="
                        rounded-[24px]
                        border
                        border-dashed
                        border-[#C1BFFF]
                        bg-white/45
                        p-1
                        shadow-[0_20px_60px_-45px_rgba(90,70,120,0.4)]
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-[#CF6DFC]
                        hover:bg-white/60
                      "
                    >
                      <UploadZone
                        onFileSelected={handleFileSelected}
                        error={uploadError}
                      />
                    </div>

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

        </div>
      </section>
    </main>
  );
}