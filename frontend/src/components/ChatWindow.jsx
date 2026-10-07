import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import ChatMessage from "./ChatMessage.jsx";
import ChatInput from "./ChatInput.jsx";
import EmptyChat from "./EmptyChat.jsx";

const TypingIndicator = () => (
  <div className="flex gap-3">
    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-lavender-line bg-lavender-light">
      <span className="text-sm">📖</span>
    </div>
    <div className="rounded-2xl rounded-bl-md border border-lavender-line bg-cream-soft px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-typing h-2 w-2 rounded-full bg-mauve"
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
          className="mx-4 mb-3 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700 sm:mx-6"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="shrink-0 text-xs font-semibold text-red-700 underline-offset-2 hover:underline"
          >
            Retry
          </button>
        </motion.div>
      )}

      <div className="border-t border-ink/10 p-4 sm:px-6">
        <ChatInput onSend={onSend} isDisabled={isLoading} />
        <p className="mt-2.5 text-center text-[11px] text-ink-faint">
          Enter to send • Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
