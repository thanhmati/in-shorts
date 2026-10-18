import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { MacWindow } from "../MacWindow";
import { THEME } from "../theme";

export type TerminalLineType =
  | "command"
  | "stdout"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "dim";

export interface TerminalOutputLine {
  text: string;
  type?: TerminalLineType;
  /** Frame at which this specific line appears */
  atFrame?: number;
  /** Optional inline prefix symbol (e.g. "✔", "✖", "ℹ", "📦") */
  prefix?: string;
  /** Optional custom line color override */
  color?: string;
}

export interface TerminalStep {
  /** The command string to type */
  command: string;
  /** Custom prompt (default: "➜ ~") */
  prompt?: string;
  /** Working directory string (e.g. "~/projects/in-shorts") */
  cwd?: string;
  /** Frame when typing begins */
  typeStartFrame: number;
  /** Typing duration in frames (default: 20) */
  typeDurationFrames?: number;
  /** Output lines generated after command runs */
  outputLines?: TerminalOutputLine[];
  /** Frame when output begins streaming (default: typeStartFrame + typeDurationFrames + 6) */
  outputStartFrame?: number;
  /** Delay in frames between subsequent output lines (default: 4) */
  outputLineDelay?: number;
  /** Status badge shown in header upon completion */
  status?: {
    label: string;
    variant: "good" | "bad" | "info" | "tip";
    atFrame?: number;
  };
}

export interface TerminalSequenceProps {
  /** Terminal window title (default: "zsh — 80×24") */
  title?: string;
  /** Command execution step or sequence of steps */
  steps: TerminalStep | TerminalStep[];
  /** Overall entrance start frame (default: 0) */
  startFrame?: number;
  /** Font size in px (default: 26, enforced minimum: 24) */
  fontSize?: number;
  /** Line height multiplier (default: 1.6) */
  lineHeight?: number;
  /** Border glow of the terminal panel */
  glow?: "default" | "good" | "bad" | "auto";
  /** Optional takeaway callout below the terminal */
  takeawayNote?: {
    text: string;
    variant?: "good" | "bad" | "info";
    atFrame?: number;
  };
  style?: React.CSSProperties;
}

export const TerminalSequence: React.FC<TerminalSequenceProps> = ({
  title = "zsh — 80×24",
  steps,
  startFrame = 0,
  fontSize = 26,
  lineHeight = 1.6,
  glow = "auto",
  takeawayNote,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectiveFontSize = Math.max(24, fontSize);

  // Normalize steps
  const stepsList = Array.isArray(steps) ? steps : [steps];

  // Panel entrance spring
  const relativeStart = frame - startFrame;
  const isStarted = relativeStart >= 0;
  const panelEntrance = isStarted
    ? spring({
        frame: relativeStart,
        fps,
        config: { damping: 13, stiffness: 110 },
      })
    : 0;

  // Determine active status tag for MacWindow title bar
  const activeStatus = stepsList
    .slice()
    .reverse()
    .find((s) => s.status && (s.status.atFrame ?? s.outputStartFrame ?? 0) <= frame)
    ?.status;

  // Resolve glow
  const resolvedGlow: "bad" | "good" | "default" =
    glow === "auto"
      ? activeStatus?.variant === "good"
        ? "good"
        : activeStatus?.variant === "bad"
        ? "bad"
        : "default"
      : glow;

  // Output line color resolver
  const getLineStyle = (type: TerminalLineType = "stdout", customColor?: string) => {
    if (customColor) return { color: customColor, prefix: "" };
    switch (type) {
      case "success":
        return { color: THEME.colors.accentEmerald, prefix: "✔ " };
      case "error":
        return { color: THEME.colors.accentRose, prefix: "✖ " };
      case "warning":
        return { color: THEME.colors.accentAmber, prefix: "▲ " };
      case "info":
        return { color: THEME.colors.accentCyan, prefix: "ℹ " };
      case "dim":
        return { color: "#64748B", prefix: "" };
      case "command":
        return { color: THEME.colors.textPrimary, prefix: "" };
      case "stdout":
      default:
        return { color: "#E2E8F0", prefix: "" };
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transform: `scale(${panelEntrance}) translateY(${(1 - panelEntrance) * 20}px)`,
        opacity: panelEntrance,
        ...style,
      }}
    >
      <MacWindow
        filename={title}
        tag={
          activeStatus
            ? { text: activeStatus.label, variant: activeStatus.variant }
            : undefined
        }
        glow={resolvedGlow}
      >
        <div
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: `${effectiveFontSize}px`,
            lineHeight,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            minHeight: "260px",
            color: THEME.colors.textPrimary,
          }}
        >
          {stepsList.map((step, stepIdx) => {
            // Typing calculations
            const typeStart = step.typeStartFrame;
            const typeDur = step.typeDurationFrames || 20;
            const typeAge = frame - typeStart;
            const isTypingStarted = typeAge >= 0;

            if (!isTypingStarted) return null;

            const isTypingDone = typeAge >= typeDur;
            const charsCount = isTypingDone
              ? step.command.length
              : Math.min(
                  step.command.length,
                  Math.floor((typeAge / typeDur) * step.command.length)
                );

            const displayedCommand = step.command.slice(0, charsCount);

            // Blinking cursor: blinks while waiting or typing
            const isCursorVisible =
              !isTypingDone ||
              frame < (step.outputStartFrame ?? typeStart + typeDur + 6);

            // Output streaming
            const outputStart =
              step.outputStartFrame ?? typeStart + typeDur + 6;
            const outputDelay = step.outputLineDelay || 4;
            const outputLines = step.outputLines || [];

            return (
              <div key={stepIdx} style={{ marginBottom: "16px" }}>
                {/* Command Line with Prompt */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "10px",
                    color: THEME.colors.textPrimary,
                    fontWeight: 700,
                  }}
                >
                  {/* Prompt Symbol */}
                  <span
                    style={{
                      color: THEME.colors.accentEmerald,
                      fontWeight: 900,
                      userSelect: "none",
                    }}
                  >
                    {step.prompt || "➜"}
                  </span>

                  {/* CWD Path */}
                  {step.cwd && (
                    <span
                      style={{
                        color: THEME.colors.accentCyan,
                        fontWeight: 600,
                        userSelect: "none",
                      }}
                    >
                      {step.cwd}
                    </span>
                  )}

                  {/* Typed Command Text */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#F8FAFC" }}>{displayedCommand}</span>
                    {isCursorVisible && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: `${effectiveFontSize}px`,
                          backgroundColor: THEME.colors.accentEmerald,
                          marginLeft: "4px",
                          opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0.2,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Streamed Output Lines */}
                {outputLines.map((line, lineIdx) => {
                  const lineAppearFrame =
                    line.atFrame ?? outputStart + lineIdx * outputDelay;
                  const isLineRevealed = frame >= lineAppearFrame;

                  if (!isLineRevealed) return null;

                  const lineStyle = getLineStyle(line.type, line.color);
                  const prefixToUse = line.prefix ?? lineStyle.prefix;

                  return (
                    <div
                      key={lineIdx}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "6px",
                        color: lineStyle.color,
                        paddingLeft: "18px",
                        marginTop: "2px",
                        opacity: 1,
                      }}
                    >
                      {prefixToUse && (
                        <span style={{ fontWeight: 800, userSelect: "none" }}>
                          {prefixToUse}
                        </span>
                      )}
                      <span>{line.text}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </MacWindow>

      {/* Optional Takeaway Callout */}
      {takeawayNote && (takeawayNote.atFrame === undefined || frame >= takeawayNote.atFrame) && (
        <div
          style={{
            marginTop: "18px",
            padding: "16px 20px",
            borderRadius: "16px",
            backgroundColor:
              takeawayNote.variant === "good"
                ? "rgba(16, 185, 129, 0.12)"
                : takeawayNote.variant === "bad"
                ? "rgba(244, 63, 94, 0.12)"
                : "rgba(56, 189, 248, 0.12)",
            border: `1.5px solid ${
              takeawayNote.variant === "good"
                ? "rgba(16, 185, 129, 0.35)"
                : takeawayNote.variant === "bad"
                ? "rgba(244, 63, 94, 0.35)"
                : "rgba(56, 189, 248, 0.35)"
            }`,
            boxShadow:
              takeawayNote.variant === "good"
                ? THEME.shadows.goodGlow
                : takeawayNote.variant === "bad"
                ? THEME.shadows.badGlow
                : THEME.shadows.windowGlow,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            backdropFilter: "blur(12px)",
          }}
        >
          {takeawayNote.variant === "good" ? (
            <CheckCircle2 size={26} color={THEME.colors.accentEmerald} style={{ flexShrink: 0 }} />
          ) : takeawayNote.variant === "bad" ? (
            <AlertCircle size={26} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
          ) : (
            <Sparkles size={26} color={THEME.colors.accentCyan} style={{ flexShrink: 0 }} />
          )}
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.35,
            }}
          >
            {takeawayNote.text}
          </span>
        </div>
      )}
    </div>
  );
};
