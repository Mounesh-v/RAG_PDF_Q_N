import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import ChatMessage from "./ChatMessage.jsx";
import ChatInput from "./ChatInput.jsx";
import EmptyChat from "./EmptyChat.jsx";

const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-cyan-400">
      <span className="text-white">🤖</span>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-typing h-2 w-2 rounded-full bg-accent-400"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default function ChatWindow({ messages, isLoading, error, onSend, onRetry }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6"
      >
        {messages.length === 0 && !isLoading ? (
          <EmptyChat onPromptClick={onSend} />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRetry={onRetry}
              />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-3 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-200 sm:mx-6"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-300" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="shrink-0 text-xs font-medium text-red-300 underline-offset-2 hover:underline"
          >
            Retry
          </button>
        </motion.div>
      )}

      <div className="border-t border-white/5 p-4 sm:px-6">
        <ChatInput onSend={onSend} isDisabled={isLoading} />
        <p className="mt-2 text-center text-[11px] text-mist-500">
          Enter to send • Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
