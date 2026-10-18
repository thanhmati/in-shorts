import React from "react";
import { Highlight } from "prism-react-renderer";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacWindow } from "../MacWindow";
import { THEME } from "../theme";
import { darkHighContrastTheme } from "../syntaxTheme";
import { CodeHighlightLine } from "../types";

export interface RevealStep {
  /** 1-indexed line numbers to reveal together in this step */
  lines: number[];
  /** Frame (relative to startFrame) when this step reveals */
  atFrame: number;
  /** Optional highlight to apply automatically when revealed */
  highlight?: {
    type?: "bad" | "good" | "highlight";
    label?: string;
  };
}

export interface TimedHighlightRange {
  /** 1-indexed line numbers to highlight */
  lines: number[];
  /** Frame when highlight activates */
  startFrame: number;
  /** Frame when highlight deactivates (optional, defaults to end of scene) */
  endFrame?: number;
  /** Highlight category (bad, good, or general highlight) */
  type?: "bad" | "good" | "highlight";
  /** Optional label annotation displayed on the right edge */
  label?: string;
}

export interface CodeRevealProps {
  /** Source code snippet to display */
  code: string;
  /** Syntax highlighting language (default: "tsx") */
  language?: string;
  /** Filename for the MacWindow header bar (default: "Component.tsx") */
  filename?: string;
  /** Optional status badge in the MacWindow header bar */
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
  /** Border glow style for MacWindow */
  glow?: "bad" | "good" | "default";
  /** Starting frame for the reveal animation (default: 0) */
  startFrame?: number;
  /** Reveal mode:
   * - "line-by-line": reveals lines sequentially with framesPerLine
   * - "steps": reveals logical groups of lines according to steps configuration
   * - "all-at-once": all lines are visible immediately when panel opens
   */
  mode?: "line-by-line" | "steps" | "all-at-once";
  /** Duration in frames between lines when mode is "line-by-line" (default: 8) */
  framesPerLine?: number;
  /** Initial delay before the first line begins revealing (default: 8) */
  initialDelay?: number;
  /** Step definitions for "steps" mode */
  steps?: RevealStep[];
  /** Static highlighted lines */
  highlightLines?: CodeHighlightLine[];
  /** Dynamic time-based highlights synchronized with narration */
  timedHighlights?: TimedHighlightRange[];
  /** Show glowing line marker on the active or most recently revealed line (default: true) */
  showLineMarker?: boolean;
  /** Font size in pixels (default: 28, enforced minimum: 24 for mobile readability) */
  fontSize?: number;
  /** Line height multiplier (default: 1.65) */
  lineHeight?: number;
  /** Preserve unrevealed line space to prevent layout shifts (default: true) */
  keepLayoutStable?: boolean;
  /** Animate panel entrance (default: true) */
  animatePanel?: boolean;
  /** Optional outer container style override */
  style?: React.CSSProperties;
}

export const CodeReveal: React.FC<CodeRevealProps> = ({
  code,
  language = "tsx",
  filename = "Component.tsx",
  tag,
  glow = "default",
  startFrame = 0,
  mode = "line-by-line",
  framesPerLine = 8,
  initialDelay = 8,
  steps,
  highlightLines = [],
  timedHighlights = [],
  showLineMarker = true,
  fontSize = 28,
  lineHeight = 1.65,
  keepLayoutStable = true,
  animatePanel = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enforce mobile readability minimum (>= 24px)
  const effectiveFontSize = Math.max(24, fontSize);

  // Panel entrance spring
  const relativeFrame = frame - startFrame;
  const isStarted = relativeFrame >= 0;

  const panelEntrance =
    animatePanel && isStarted
      ? spring({
          frame: relativeFrame,
          fps,
          config: { damping: 13, stiffness: 110 },
        })
      : 1;

  // Split code to validate length constraints for mobile 1080x1920
  const rawLines = code.trim().split("\n");
  const totalLines = rawLines.length;

  // Compute reveal frame for a given line number (1-indexed)
  const getLineRevealFrame = (lineNum: number): number => {
    if (mode === "all-at-once") {
      return startFrame;
    }

    if (mode === "steps" && steps && steps.length > 0) {
      const step = steps.find((s) => s.lines.includes(lineNum));
      if (step) {
        return startFrame + step.atFrame;
      }
      return startFrame;
    }

    // Default: line-by-line
    return startFrame + initialDelay + (lineNum - 1) * framesPerLine;
  };

  // Determine active highlight for a given line at current frame
  const getLineHighlight = (
    lineNum: number
  ): { type: "bad" | "good" | "highlight"; label?: string } | null => {
    // 1. Check timed highlights first (highest priority)
    const timed = timedHighlights.find(
      (th) =>
        th.lines.includes(lineNum) &&
        frame >= th.startFrame &&
        (th.endFrame === undefined || frame <= th.endFrame)
    );
    if (timed) {
      return { type: timed.type || "highlight", label: timed.label };
    }

    // 2. Check steps highlight
    if (mode === "steps" && steps) {
      const step = steps.find(
        (s) =>
          s.lines.includes(lineNum) &&
          s.highlight &&
          frame >= startFrame + s.atFrame
      );
      if (step?.highlight) {
        return {
          type: step.highlight.type || "highlight",
          label: step.highlight.label,
        };
      }
    }

    // 3. Check static highlight
    const staticH = highlightLines.find((h) => h.line === lineNum);
    if (staticH) {
      return { type: staticH.type || "highlight" };
    }

    return null;
  };

  // Find the current active reveal line for marker indicator
  const getActiveRevealLine = (): number => {
    let activeLine = 0;
    for (let l = 1; l <= totalLines; l++) {
      const rFrame = getLineRevealFrame(l);
      if (frame >= rFrame) {
        activeLine = l;
      }
    }
    return activeLine;
  };

  const activeRevealLine = getActiveRevealLine();

  return (
    <div
      style={{
        width: "100%",
        transform: animatePanel
          ? `scale(${panelEntrance}) translateY(${(1 - panelEntrance) * 20}px)`
          : "none",
        opacity: animatePanel ? panelEntrance : 1,
        ...style,
      }}
    >
      <MacWindow filename={filename} tag={tag} glow={glow}>
        <Highlight
          theme={darkHighContrastTheme}
          code={code.trim()}
          language={language}
        >
          {({ style: prismStyle, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{
                ...prismStyle,
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
                fontFamily: THEME.fonts.code,
                fontSize: `${effectiveFontSize}px`,
                lineHeight,
                overflowX: "hidden",
                whiteSpace: "pre",
                color: THEME.colors.textPrimary,
              }}
            >
              {tokens.map((line, i) => {
                const lineNum = i + 1;
                const revealFrame = getLineRevealFrame(lineNum);
                const isRevealed = frame >= revealFrame;
                const lineAge = frame - revealFrame;

                // Line entrance spring for revealed lines
                const lineEntrance = isRevealed
                  ? spring({
                      frame: Math.max(0, lineAge),
                      fps,
                      durationInFrames: 8,
                      config: { damping: 15, stiffness: 140 },
                    })
                  : 0;

                const lineOpacity = isRevealed
                  ? interpolate(lineEntrance, [0, 1], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })
                  : keepLayoutStable
                  ? 0
                  : 0;

                const lineTranslateY = isRevealed ? (1 - lineEntrance) * 8 : 8;

                // If not keeping stable layout and not revealed, collapse
                if (!keepLayoutStable && !isRevealed) {
                  return null;
                }

                const highlight = getLineHighlight(lineNum);

                // Breathing pulse effect for highlighted lines
                const pulse = 0.75 + 0.25 * Math.sin((frame + lineNum * 8) / 8);

                let bgStyle = "transparent";
                let borderLeftStyle = "4px solid transparent";
                let boxShadowStyle = "none";

                if (highlight) {
                  if (highlight.type === "bad") {
                    bgStyle = `rgba(244, 63, 94, ${0.18 * pulse})`;
                    borderLeftStyle = `4px solid ${THEME.colors.accentRose}`;
                    boxShadowStyle = `inset 0 0 16px rgba(244, 63, 94, ${0.15 * pulse})`;
                  } else if (highlight.type === "good") {
                    bgStyle = `rgba(16, 185, 129, ${0.18 * pulse})`;
                    borderLeftStyle = `4px solid ${THEME.colors.accentEmerald}`;
                    boxShadowStyle = `inset 0 0 16px rgba(16, 185, 129, ${0.15 * pulse})`;
                  } else {
                    bgStyle = `rgba(56, 189, 248, ${0.15 * pulse})`;
                    borderLeftStyle = `4px solid ${THEME.colors.accentCyan}`;
                    boxShadowStyle = `inset 0 0 16px rgba(56, 189, 248, ${0.12 * pulse})`;
                  }
                }

                const isCurrentActiveLine =
                  showLineMarker &&
                  lineNum === activeRevealLine &&
                  lineAge < 25 &&
                  isRevealed;

                return (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: bgStyle,
                      borderLeft: borderLeftStyle,
                      boxShadow: boxShadowStyle,
                      paddingLeft: "10px",
                      paddingRight: "12px",
                      margin: "2px -12px",
                      borderRadius: "6px",
                      opacity: lineOpacity,
                      transform: `translateY(${lineTranslateY}px)`,
                      color: THEME.colors.textPrimary,
                      position: "relative",
                      minHeight: `${effectiveFontSize * lineHeight}px`,
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Active Line Marker Indicator */}
                    <span
                      style={{
                        width: "18px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: `${effectiveFontSize - 8}px`,
                        color: highlight
                          ? highlight.type === "bad"
                            ? THEME.colors.accentRose
                            : highlight.type === "good"
                            ? THEME.colors.accentEmerald
                            : THEME.colors.accentCyan
                          : THEME.colors.accentCyan,
                        opacity: isCurrentActiveLine ? 1 : 0,
                      }}
                    >
                      ▶
                    </span>

                    {/* Line number */}
                    <span
                      style={{
                        width: "36px",
                        display: "inline-block",
                        userSelect: "none",
                        color: highlight ? "#CBD5E1" : "#64748B",
                        fontSize: `${effectiveFontSize - 6}px`,
                        fontWeight: 600,
                      }}
                    >
                      {lineNum}
                    </span>

                    {/* Tokens */}
                    <div
                      style={{
                        flex: 1,
                        color: THEME.colors.textPrimary,
                        display: "flex",
                        flexWrap: "nowrap",
                      }}
                    >
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({ token });
                        return (
                          <span
                            key={key}
                            {...tokenProps}
                            style={{
                              ...tokenProps.style,
                              color: tokenProps.style?.color || "#F8FAFC",
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Optional Right Annotation Chip */}
                    {highlight?.label && (
                      <span
                        style={{
                          marginLeft: "12px",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: `${effectiveFontSize - 8}px`,
                          fontWeight: 800,
                          backgroundColor:
                            highlight.type === "bad"
                              ? "rgba(244, 63, 94, 0.25)"
                              : highlight.type === "good"
                              ? "rgba(16, 185, 129, 0.25)"
                              : "rgba(56, 189, 248, 0.25)",
                          border: `1px solid ${
                            highlight.type === "bad"
                              ? THEME.colors.accentRose
                              : highlight.type === "good"
                              ? THEME.colors.accentEmerald
                              : THEME.colors.accentCyan
                          }`,
                          color:
                            highlight.type === "bad"
                              ? THEME.colors.badText
                              : highlight.type === "good"
                              ? THEME.colors.goodText
                              : THEME.colors.tipText,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {highlight.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </MacWindow>
    </div>
  );
};
