import { useCallback, useRef, useState } from "react";
import { aiAgent } from "../Services/aiServices";


export function useAiChat({ greeting } = {}) {
  const [messages, setMessages] = useState(() =>
    greeting ? [{ role: "assistant", content: greeting }] : []
  );
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const requestId = ++requestIdRef.current;
      const historyForRequest = messages.map(({ role, content }) => ({
        role,
        content,
      }));

      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setError(null);
      setIsSending(true);

      try {
        const result = await aiAgent(trimmed, historyForRequest);
       
        const data = result?.data ?? result;

        if (requestId !== requestIdRef.current) return; // superseded

        if (!data?.success) {
          throw new Error(data?.message || "The assistant could not respond.");
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong reaching the assistant."
        );
      } finally {
        if (requestId === requestIdRef.current) setIsSending(false);
      }
    },
    [messages, isSending]
  );

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    setMessages(greeting ? [{ role: "assistant", content: greeting }] : []);
    setError(null);
    setIsSending(false);
  }, [greeting]);

  return { messages, sendMessage, isSending, error, reset };
}