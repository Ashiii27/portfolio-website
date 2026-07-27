"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalTextProps {
  /** Lines to display in sequence. Each string is one output line. */
  lines: string[];
  /** Typing speed in ms per character (default: 30) */
  speed?: number;
  /** Delay before starting the next line in ms (default: 200) */
  lineDelay?: number;
  className?: string;
}

export default function TerminalText({
  lines,
  speed = 30,
  lineDelay = 200,
  className = "",
}: TerminalTextProps) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (currentChar < line.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] ?? "") + line[currentChar];
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
    } else {
      // Line finished — move to next after delay
      timeoutRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return (
    <div className={`font-terminal text-sm space-y-1 ${className}`}>
      {lines.map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-cyber-cyan select-none shrink-0">$</span>
          <span className="text-foreground">
            {displayed[i] ?? ""}
            {i === currentLine && currentLine < lines.length && (
              <span className="animate-pulse text-cyber-cyan">▋</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
