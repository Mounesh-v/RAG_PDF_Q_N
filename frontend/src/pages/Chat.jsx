import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, X } from "lucide-react";
import ChatWindow from "../components/ChatWindow.jsx";
import DocumentList from "../components/DocumentList.jsx";
import { getDocuments } from "../api/ragApi.js";
import { useChat } from "../hooks/useChat.js";

export default function Chat() {
  const { messages, isLoading, error, sendMessage, retry, clearChat } = useChat();
  const [documents] = useState(() => getDocuments());
  const [activeId, setActiveId] = useState(() => getDocuments()[0]?.id ?? null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (document) => {
    setActiveId(document.id);
    setDrawerOpen(false);
  };

  const SidebarContent = (
    <DocumentList
      documents={documents}
      activeId={activeId}
      onSelect={handleSelect}
      isLoading={false}
    />
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-white/5 p-4 lg:flex">
        <h3 className="mb-4 px-1 text-xs font-semibold uppercase tracking-wider text-mist-500">
          Knowledge Base
        </h3>
        {SidebarContent}
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-mist-300 transition-colors hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <h1 className="text-base font-semibold text-white">
              Chat with your notes
            </h1>
          </div>
          <button
            type="button"
            onClick={clearChat}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm font-medium text-mist-300 transition-colors hover:bg-white/5"
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/10 bg-ink-900 p-4 lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-mist-500">
                  Knowledge Base
                </h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-300 hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
