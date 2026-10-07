import { useState } from "react";
import { Paperclip, SendHorizonal } from "lucide-react";

export default function ChatInput({ onSend, isDisabled }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || isDisabled) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-3xl border border-lavender-line bg-cream-soft p-2.5 shadow-[0_28px_60px_-52px_rgba(37,35,41,0.9)] transition-colors duration-200 focus-within:border-mauve/60"    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-ink-faint"
      >
        <Paperclip className="h-5 w-5" />
      </span>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask something about your notes..."
        className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-1 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
        style={{ fieldSizing: "content" }}
      />
      <button
        type="button"
        onClick={submit}
        aria-label="Send message"
        disabled={isDisabled || !value.trim()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mauve-deep text-white shadow-[0_16px_30px_-18px_rgba(159,68,222,0.95)] transition-all duration-200 hover:bg-mauve-dark disabled:translate-y-0 disabled:opacity-40"
      >
        <SendHorizonal className="h-5 w-5" />
      </button>
    </div>
  );
}
