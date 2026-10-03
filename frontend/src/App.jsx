import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";

const Background = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="bg-grid absolute inset-0 opacity-60" />
    <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent-500/15 blur-[120px]" />
    <div className="absolute -bottom-40 -left-40 h-[400px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />
    <div className="absolute right-0 top-1/3 h-[300px] w-[400px] rounded-full bg-accent-500/10 blur-[120px]" />
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
    <div className="relative min-h-screen bg-ink-950 text-mist-300">
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
