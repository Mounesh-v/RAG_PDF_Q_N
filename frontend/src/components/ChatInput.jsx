import { useState } from "react";
import { SendHorizonal } from "lucide-react";

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
    <div className="glass card-border flex items-end gap-2 rounded-2xl p-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask something about your notes"
        className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-mist-500 focus:outline-none"
        style={{ fieldSizing: "content" }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={isDisabled || !value.trim()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-cyan-400 text-white shadow-lg shadow-accent-500/25 transition-all hover:shadow-accent-500/40 disabled:opacity-40"
      >
        <SendHorizonal className="h-5 w-5" />
      </button>
    </div>
  );
}
