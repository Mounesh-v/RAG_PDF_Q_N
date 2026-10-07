import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, X } from "lucide-react";
import ChatWindow from "../components/ChatWindow.jsx";
import DocumentList from "../components/DocumentList.jsx";
import { getDocuments } from "../api/ragApi.js";
import { useChat } from "../hooks/useChat.js";

const SidebarPanel = ({
  documents,
  activeId,
  onSelect,
  onAdd,
  onClose,
}) => (
  <div className="flex h-full flex-col gap-5">
    <div className="flex items-center justify-between gap-2">
      <h3 className="font-serif text-[17px] font-semibold text-ink">
        Knowledge Base
      </h3>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add document"
          title="Add document"
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-ink/15 bg-cream-soft text-ink-soft transition-all duration-200 hover:border-mauve/50 hover:bg-lavender-light hover:text-mauve-deep"
        >
          <Plus className="h-4 w-4" />
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-ink-muted transition-colors duration-200 hover:bg-lavender-light hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
    <DocumentList
      documents={documents}
      activeId={activeId}
      onSelect={onSelect}
      isLoading={false}
    />
  </div>
);

export default function Chat() {
  const { messages, isLoading, error, sendMessage, retry, clearChat } = useChat();
  const navigate = useNavigate();
  const [documents] = useState(() => getDocuments());
  const [activeId, setActiveId] = useState(() => getDocuments()[0]?.id ?? null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (document) => {
    setActiveId(document.id);
    setDrawerOpen(false);
  };

  const sidebarProps = {
    documents,
    activeId,
    onSelect: handleSelect,
    onAdd: () => navigate("/"),
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-[1500px]">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-ink/10 bg-cream-soft/70 p-5 lg:flex xl:w-80">
        <SidebarPanel {...sidebarProps} />
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open sidebar"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/15 bg-cream-soft text-ink-soft transition-colors duration-200 hover:bg-lavender-light lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <h1 className="font-serif text-lg font-semibold text-ink sm:text-xl">
              Chat with your notes
            </h1>
          </div>
          <button
            type="button"
            onClick={clearChat}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream-soft px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:border-mauve/50 hover:bg-lavender-light hover:text-mauve-deep"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSend={sendMessage}
            onRetry={retry}
          />
        </div>
      </main>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-ink/10 bg-cream-soft p-5 lg:hidden"
            >
              <SidebarPanel
                {...sidebarProps}
                onClose={() => setDrawerOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
