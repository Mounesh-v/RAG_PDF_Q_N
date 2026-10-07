import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";

const LavenderSprig = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 220"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M60 214C58 168 63 128 58 88C55 62 60 36 57 12"
      stroke="#7D8050"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M58 142C42 138 30 124 31 108C48 110 57 124 58 142Z"
      fill="#BDB96A"
      fillOpacity="0.5"
      stroke="#7D8050"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M58 176C74 172 86 158 85 142C68 144 59 158 58 176Z"
      fill="#BDB96A"
      fillOpacity="0.35"
      stroke="#7D8050"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {[
      [57, 16],
      [53, 34],
      [60, 50],
      [54, 66],
      [61, 82],
    ].map(([cx, cy], i) => (
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx="7"
        ry="10"
        fill="#C1BFFF"
        stroke="#A5A1F8"
        strokeWidth="1.5"
        transform={`rotate(${i % 2 ? 14 : -12} ${cx} ${cy})`}
      />
    ))}
  </svg>
);

const Background = () => (
  <div
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <div className="absolute -top-52 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-lavender-light blur-[130px]" />
    <div className="absolute -bottom-56 -left-44 h-[500px] w-[600px] rounded-full bg-olive/25 blur-[120px]" />
    <div className="absolute -right-40 top-1/4 h-[440px] w-[540px] rounded-full bg-lavender/30 blur-[130px]" />
    <div className="bg-dots absolute inset-0 opacity-40" />
    <LavenderSprig className="absolute -left-4 top-28 hidden w-32 -rotate-12 opacity-70 lg:block" />
    <LavenderSprig className="absolute -right-2 bottom-16 hidden w-36 rotate-[168deg] opacity-60 xl:block" />
  </div>
);

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-cream text-ink-soft">
      <Background />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
