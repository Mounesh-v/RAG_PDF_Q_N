import { useCallback, useState } from "react";
import { askQuestion } from "../api/ragApi";

let idCounter = 0;
const nextId = () => ++idCounter;

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || isLoading) return;

      setError(null);
      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content },
      ]);

      try {
        const { answer, sources } = await askQuestion(content);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", content: answer, sources },
        ]);
      } catch (err) {
        setError(err.message || "Something went wrong while generating the answer.");
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "user", content, failed: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const retry = useCallback(async (text) => {
    setError(null);
    setIsLoading(true);
    try {
      const { answer, sources } = await askQuestion(text);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "assistant", content: answer, sources },
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong while generating the answer.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendMessage, retry, clearChat };
};
