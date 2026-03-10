"use client";

interface TextBubbleProps {
  type: "sent" | "received";
  text: string;
  time: string;
  read?: boolean;
}

interface VoiceBubbleProps {
  type: "sent" | "received";
  duration: string;
  time: string;
  read?: boolean;
}

interface PhotoBubbleProps {
  type: "sent" | "received";
  caption?: string;
  time: string;
  read?: boolean;
}

function ReadReceipt({ read }: { read?: boolean }) {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      className="ml-1 inline-block flex-shrink-0"
    >
      <path
        d="M11.071 0.653l-5.657 5.657-1.414-1.414L2.586 6.31l2.828 2.829 7.071-7.071-1.414-1.415z"
        fill={read ? "#53BDEB" : "#8696A0"}
      />
      <path
        d="M14.071 0.653l-5.657 5.657-0.707-0.707-1.414 1.414 2.121 2.122 7.071-7.071-1.414-1.415z"
        fill={read ? "#53BDEB" : "#8696A0"}
      />
    </svg>
  );
}

export function TextBubble({ type, text, time, read }: TextBubbleProps) {
  const isSent = type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-1.5`}>
      <div
        className={`relative max-w-[80%] px-3 py-1.5 text-[13px] leading-[18px] ${
          isSent
            ? "wa-bubble-sent bg-wa-sent text-gamo-dark"
            : "wa-bubble-received bg-white text-gamo-dark"
        }`}
        style={{ boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}
      >
        <span>{text}</span>
        <span className="ml-2 inline-flex items-end gap-0.5 align-bottom text-[10px] text-gamo-muted/70 float-right mt-1">
          {time}
          {isSent && <ReadReceipt read={read} />}
        </span>
      </div>
    </div>
  );
}

export function VoiceBubble({ type, duration, time, read }: VoiceBubbleProps) {
  const isSent = type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-1.5`}>
      <div
        className={`relative max-w-[80%] px-3 py-2 ${
          isSent
            ? "wa-bubble-sent bg-wa-sent"
            : "wa-bubble-received bg-white"
        }`}
        style={{ boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}
      >
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gamo-accent">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <path d="M1 0.5v13l10.5-6.5L1 0.5z" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="voice-wave h-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  style={{ height: `${Math.random() * 14 + 4}px` }}
                />
              ))}
            </div>
          </div>
          <span className="text-[10px] text-gamo-muted/70">{duration}</span>
        </div>
        <div className="mt-0.5 text-right">
          <span className="inline-flex items-center gap-0.5 text-[10px] text-gamo-muted/70">
            {time}
            {isSent && <ReadReceipt read={read} />}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PhotoBubble({ type, caption, time, read }: PhotoBubbleProps) {
  const isSent = type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} mb-1.5`}>
      <div
        className={`relative max-w-[75%] overflow-hidden p-1 ${
          isSent
            ? "wa-bubble-sent bg-wa-sent"
            : "wa-bubble-received bg-white"
        }`}
        style={{ boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}
      >
        {/* Fake letter/document image */}
        <div className="flex h-36 w-full items-center justify-center rounded-md bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="w-4/5 space-y-1.5 rounded bg-white p-3 shadow-sm">
            <div className="h-2 w-3/4 rounded bg-gray-300" />
            <div className="h-2 w-full rounded bg-gray-200" />
            <div className="h-2 w-5/6 rounded bg-gray-200" />
            <div className="mt-2 h-2 w-1/2 rounded bg-gray-300" />
            <div className="h-2 w-2/3 rounded bg-gray-200" />
          </div>
        </div>
        {caption && (
          <p className="mt-1 px-1.5 text-[13px] leading-[18px] text-gamo-dark">
            {caption}
          </p>
        )}
        <div className="mt-0.5 px-1.5 text-right">
          <span className="inline-flex items-center gap-0.5 text-[10px] text-gamo-muted/70">
            {time}
            {isSent && <ReadReceipt read={read} />}
          </span>
        </div>
      </div>
    </div>
  );
}
