import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Phone, MoreVertical, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "driver" | "passenger";
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi, I'm Karim. I'm on my way to your pickup location.",
    sender: "driver",
    time: "8:31 PM",
  },
  {
    id: "2",
    text: "Great, thank you! I'll be waiting near the entrance.",
    sender: "passenger",
    time: "8:32 PM",
  },
  {
    id: "3",
    text: "I'll be there in about 4 minutes.",
    sender: "driver",
    time: "8:32 PM",
  },
];

export function DriverChatScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        text,
        sender: "passenger",
        time: timeString,
      },
    ]);
    setInput("");
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-card animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onBack}
          className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-[0.875rem] font-bold text-foreground ring-1 ring-border">
              KA
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
              Karim Adel
            </p>
            <p className="text-[0.8125rem] text-muted-foreground">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="press flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border"
            aria-label="Call driver"
          >
            <Phone className="h-4.5 w-4.5" strokeWidth={1.9} />
          </button>
          <button
            type="button"
            className="press flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border"
            aria-label="More options"
          >
            <MoreVertical className="h-4.5 w-4.5" strokeWidth={1.9} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.sender === "passenger" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[82%] rounded-2xl px-3.5 py-2.5",
                  message.sender === "passenger"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-surface text-foreground ring-1 ring-border",
                )}
              >
                <p className="text-[0.9375rem] leading-snug">{message.text}</p>
                <p
                  className={cn(
                    "mt-1 text-right text-[0.6875rem] font-medium",
                    message.sender === "passenger" ? "text-primary-foreground/65" : "text-muted-foreground",
                  )}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <div className="flex items-end gap-2.5 rounded-2xl bg-surface p-2 ring-1 ring-border">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            placeholder="Message Karim..."
            className="max-h-28 min-h-[2.75rem] flex-1 resize-none rounded-xl bg-transparent px-3 py-2.5 text-[0.9375rem] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim()}
            className="press mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-float disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="h-4.5 w-4.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
