import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useAiChat } from "../../hooks/useAIChat";
import image from "../../assets/images";

const GREETING =
  "Hi, I'm the LUAC assistant. Ask me about events, projects, or your account.";

const SUGGESTIONS = [
  "What events are coming up this week?",
  "How do I post a project?",
  "How do I update my profile?",
];

export default function AiChatPage() {
  const { messages, sendMessage, isSending, error, reset } = useAiChat({
    greeting: GREETING,
  });
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  const submitText = (text) => {
    if (!text.trim() || isSending) return;
    sendMessage(text);
    setDraft("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitText(draft);
  };

  const hasStartedChatting = messages.length > 1;

  return (
    <div className="font-Inter relative flex h-screen flex-col bg-pagebg">
      {/* Logo watermark*/}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image.logo})`,
          backgroundSize: "min(70%, 32rem)",
          opacity: 0.06,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-pagebg/10"
      />

      
      <div className="relative flex h-full flex-col">
        {/* Page header */}
        <header className="flex shrink-0 items-center justify-evenly gap-3 border-b border-line/30 bg-surfaceHeader/80 px-4 py-3 backdrop-blur-sm sm:px-8 sm:py-5">
          <div className="min-w-0">
            <h1 className=" text-base tracking-tight text-primary sm:text-xl">
              LUAC Assistant
            </h1>
            <p className="mt-0.5 truncate text-[11px] text-muted sm:text-xs">
              {isSending ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-karki" />
                  Thinking...
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">
                    Ask about events, projects, or your account
                  </span>
                  <span className="sm:hidden">Events, projects, account</span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 rounded-full border border-line/50 px-3 py-1.5 text-xs font-medium text-navlink shadow-sm transition hover:border-primary/40 hover:bg-hoverBg hover:text-primary sm:px-4 sm:py-2"
          >
            New chat
          </button>
        </header>

        {/* Message column */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-10">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[80%] sm:px-4 sm:py-3 ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-cream"
                      : "rounded-bl-sm border border-line/20 bg-surfaceHeader text-dark"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-line/20 bg-surfaceHeader px-4 py-3 text-sm text-muted shadow-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-line [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-line" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-line [animation-delay:0.2s]" />
                  </span>
                </div>
              </div>
            )}

            {!hasStartedChatting && !isSending && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submitText(s)}
                    className="rounded-full border border-line/40 bg-surfaceHeader/90 px-3.5 py-2 text-xs text-navlink shadow-sm backdrop-blur-sm transition hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mx-auto w-full max-w-2xl px-4 pb-1 text-xs text-danger sm:px-6">
            {error}
          </p>
        )}

        {/* Composer */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-5"
        >
          <div className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full border border-line/40 bg-body px-2 py-1.5 shadow-sm focus-within:border-primary/50 sm:gap-3 sm:py-2">
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about events, projects, your account..."
              disabled={isSending}
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-dark placeholder:text-navlink focus:outline-none disabled:opacity-50 sm:px-3"
            />
            <button
              type="submit"
              disabled={isSending || !draft.trim()}
              aria-label="Send message"
              className="flex shrink-0 items-center justify-center rounded-full bg-primary p-2.5 text-cream shadow-sm transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}