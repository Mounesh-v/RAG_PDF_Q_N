import { motion } from "framer-motion";
import { Bot, RotateCcw, User } from "lucide-react";
import AIResponse from "./AIResponse.jsx";
import SourceList from "./SourceList.jsx";

export default function ChatMessage({ message, onRetry }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-lavender-line bg-lavender-light">
          <Bot className="h-4 w-4 text-mauve-deep" />
        </div>
      )}

      <div className={`max-w-[82%] sm:max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-br-md bg-ink text-cream-soft"
              : "rounded-bl-md border border-lavender-line bg-cream-soft text-ink"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <>
              <AIResponse content={message.content} />
              <SourceList sources={message.sources} />
            </>
          )}
        </div>

        {message.failed && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-medium text-red-600">
              Message failed to send
            </span>
            {onRetry && (
              <button
                type="button"
                onClick={() => onRetry(message.content)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream-soft px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-lavender-line hover:bg-lavender-light hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink">
          <User className="h-4 w-4 text-cream-soft" />
        </div>
      )}
    </motion.div>
  );
}
