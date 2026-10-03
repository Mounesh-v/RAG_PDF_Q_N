import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, RotateCcw, User } from "lucide-react";
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
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-cyan-400">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={`max-w-[82%] sm:max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-br-md bg-gradient-to-br from-accent-500 to-accent-400 text-white"
              : "rounded-bl-md border border-white/10 bg-white/[0.04] text-mist-200"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <>
              <div className="markdown-body">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
              <SourceList sources={message.sources} />
            </>
          )}
        </div>

        {message.failed && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-red-300">Message failed to send</span>
            {onRetry && (
              <button
                type="button"
                onClick={() => onRetry(message.content)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-medium text-mist-300 transition-colors hover:bg-white/5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
          <User className="h-4 w-4 text-mist-300" />
        </div>
      )}
    </motion.div>
  );
}
