import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme";

export type TypographyMode = "phrase" | "words" | "lines" | "mask";

export type BadgeVariant = "rose" | "emerald" | "cyan" | "amber" | "purple";

export type HighlightStyle = "neon" | "pill" | "gradient" | "underline";

export interface KineticBadgeProps {
  text: string;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
}

export interface KineticTypographyProps {
  /** Main text content. Can be a single string or an array of lines. */
  text: string | string[];
  /** Animation reveal mode: phrase (all at once), words (staggered), lines (line-by-line), mask (slide up from clip box) */
  mode?: TypographyMode;
  /** Frame at which the animation starts (defaults to 0) */
  startFrame?: number;
  /** Duration in frames for the reveal transition (defaults to 20) */
  durationInFrames?: number;
  /** Delay between staggered words/lines in frames (defaults to 3) */
  staggerDelay?: number;
  /** Specific words to apply accent styling to */
  highlightWords?: string[];
  /** Highlight visual style (defaults to "neon") */
  highlightStyle?: HighlightStyle;
  /** Custom highlight color (defaults to THEME.colors.accentAmber) */
  highlightColor?: string;
  /** Top badge/tag for the headline */
  badge?: KineticBadgeProps;
  /** Optional secondary subtitle */
  subtitle?: string;
  /** Subtitle delay in frames after startFrame (defaults to 10) */
  subtitleDelay?: number;
  /** Font size in pixels (defaults to 58 for mobile high impact) */
  fontSize?: number;
  /** Font weight (defaults to 900) */
  fontWeight?: number | string;
  /** Text color (defaults to THEME.colors.textPrimary) */
  color?: string;
  /** Text alignment (defaults to "center") */
  align?: "center" | "left" | "right";
  /** Maximum width constraint (defaults to "100%") */
  maxWidth?: number | string;
  /** Line height multiplier (defaults to 1.22) */
  lineHeight?: number;
  /** Letter spacing (defaults to "-0.02em") */
  letterSpacing?: string;
  /** Scale animation emphasis (defaults to true) */
  enableScale?: boolean;
  /** Spring physics config damping (defaults to 14) */
  damping?: number;
  /** Spring physics config stiffness (defaults to 110) */
  stiffness?: number;
  /** Optional style override for outer container */
  style?: React.CSSProperties;
}

/**
 * Strips common punctuation from a word for case-insensitive matching.
 */
const cleanWord = (w: string): string =>
  w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'❌✅!]/g, "").trim().toLowerCase();

/**
 * Checks if a word matches any target in highlightWords.
 */
const isHighlighted = (word: string, highlightWords?: string[]): boolean => {
  if (!highlightWords || highlightWords.length === 0) return false;
  const target = cleanWord(word);
  return highlightWords.some(
    (hw) => cleanWord(hw) === target || hw.toLowerCase() === word.toLowerCase()
  );
};

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  mode = "phrase",
  startFrame = 0,
  durationInFrames = 22,
  staggerDelay = 3,
  highlightWords = [],
  highlightStyle = "neon",
  highlightColor = THEME.colors.accentAmber,
  badge,
  subtitle,
  subtitleDelay = 10,
  fontSize = 58,
  fontWeight = 900,
  color = THEME.colors.textPrimary,
  align = "center",
  maxWidth = "100%",
  lineHeight = 1.22,
  letterSpacing = "-0.025em",
  enableScale = true,
  damping = 14,
  stiffness = 110,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Normalize text into lines
  const lines: string[] = Array.isArray(text)
    ? text
    : text.includes("\n")
    ? text.split("\n")
    : [text];

  // Global base entrance spring (for phrase mode or container)
  const relativeFrame = frame - startFrame;
  const isStarted = relativeFrame >= 0;

  const phraseEntrance = isStarted
    ? spring({
        frame: relativeFrame,
        fps,
        durationInFrames,
        config: { damping, stiffness },
      })
    : 0;

  // Badge entrance spring (appears slightly ahead or synchronized)
  const badgeEntrance = isStarted
    ? spring({
        frame: relativeFrame,
        fps,
        durationInFrames: Math.min(durationInFrames, 18),
        config: { damping: 12, stiffness: 130 },
      })
    : 0;

  // Subtitle entrance spring (delayed for visual hierarchy)
  const subtitleFrame = frame - (startFrame + subtitleDelay);
  const subtitleEntrance =
    subtitleFrame >= 0
      ? spring({
          frame: subtitleFrame,
          fps,
          durationInFrames,
          config: { damping: 14, stiffness: 100 },
        })
      : 0;

  // Alignment helpers
  const alignItems =
    align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
  const textAlign = align;

  // Render Highlighted Token
  const renderToken = (
    word: string,
    key: string | number,
    highlight: boolean,
    customStyle?: React.CSSProperties
  ) => {
    if (!highlight) {
      return (
        <span key={key} style={customStyle}>
          {word}
        </span>
      );
    }

    let tokenStyle: React.CSSProperties = {
      ...customStyle,
      color: highlightColor,
      fontWeight: 950,
      display: "inline-block",
    };

    switch (highlightStyle) {
      case "neon":
        tokenStyle = {
          ...tokenStyle,
          textShadow: `0 0 25px ${highlightColor}80, 0 0 50px ${highlightColor}40`,
        };
        break;
      case "pill":
        tokenStyle = {
          ...tokenStyle,
          backgroundColor: `${highlightColor}20`,
          border: `1.5px solid ${highlightColor}60`,
          padding: "2px 14px",
          margin: "0 4px",
          borderRadius: "12px",
          boxShadow: `0 0 20px ${highlightColor}33`,
        };
        break;
      case "gradient":
        tokenStyle = {
          ...tokenStyle,
          background: `linear-gradient(135deg, #FFFFFF 0%, ${highlightColor} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
        break;
      case "underline":
        tokenStyle = {
          ...tokenStyle,
          borderBottom: `4px solid ${highlightColor}`,
          paddingBottom: "2px",
        };
        break;
    }

    return (
      <span key={key} style={tokenStyle}>
        {word}
      </span>
    );
  };

  // Badge styling resolver
  const getBadgeColors = (variant: BadgeVariant = "rose") => {
    switch (variant) {
      case "emerald":
        return {
          bg: "rgba(16, 185, 129, 0.16)",
          border: THEME.colors.accentEmerald,
          glow: "rgba(16, 185, 129, 0.4)",
          text: THEME.colors.goodText,
        };
      case "cyan":
        return {
          bg: "rgba(56, 189, 248, 0.16)",
          border: THEME.colors.accentCyan,
          glow: "rgba(56, 189, 248, 0.4)",
          text: THEME.colors.tipText,
        };
      case "amber":
        return {
          bg: "rgba(251, 191, 36, 0.16)",
          border: THEME.colors.accentAmber,
          glow: "rgba(251, 191, 36, 0.4)",
          text: THEME.colors.accentAmber,
        };
      case "purple":
        return {
          bg: "rgba(168, 85, 247, 0.16)",
          border: THEME.colors.accentPurple,
          glow: "rgba(168, 85, 247, 0.4)",
          text: "#D8B4FE",
        };
      case "rose":
      default:
        return {
          bg: "rgba(244, 63, 94, 0.18)",
          border: THEME.colors.accentRose,
          glow: "rgba(244, 63, 94, 0.45)",
          text: THEME.colors.accentRose,
        };
    }
  };

  // Render Badge
  const renderBadge = () => {
    if (!badge) return null;
    const colors = getBadgeColors(badge.variant);
    const badgeScale = badgeEntrance;
    const badgeOpacity = interpolate(badgeEntrance, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
          boxShadow: `0 0 24px ${colors.glow}`,
          transform: `scale(${badgeScale})`,
          opacity: badgeOpacity,
          marginBottom: "24px",
        }}
      >
        {badge.icon}
        <span
          style={{
            color: colors.text,
            fontWeight: 900,
            fontSize: "22px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: THEME.fonts.sans,
          }}
        >
          {badge.text}
        </span>
      </div>
    );
  };

  // Render Main Content according to mode
  const renderContent = () => {
    // Mode 1: Phrase reveal (unified block entrance)
    if (mode === "phrase") {
      const translateY = (1 - phraseEntrance) * 28;
      const scale = enableScale ? 0.94 + 0.06 * phraseEntrance : 1;
      const opacity = interpolate(phraseEntrance, [0, 0.4, 1], [0, 0.8, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return (
        <div
          style={{
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems,
            width: "100%",
          }}
        >
          {lines.map((line, lineIdx) => {
            const words = line.split(" ");
            return (
              <div
                key={lineIdx}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent:
                    align === "center"
                      ? "center"
                      : align === "right"
                      ? "flex-end"
                      : "flex-start",
                  gap: "8px 14px",
                  width: "100%",
                }}
              >
                {words.map((word, wordIdx) => {
                  const highlight = isHighlighted(word, highlightWords);
                  return renderToken(word, wordIdx, highlight);
                })}
              </div>
            );
          })}
        </div>
      );
    }

    // Mode 2: Word-by-word reveal (staggered)
    if (mode === "words") {
      let wordCounter = 0;
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems,
            width: "100%",
          }}
        >
          {lines.map((line, lineIdx) => {
            const words = line.split(" ");
            return (
              <div
                key={lineIdx}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent:
                    align === "center"
                      ? "center"
                      : align === "right"
                      ? "flex-end"
                      : "flex-start",
                  gap: "8px 14px",
                  width: "100%",
                }}
              >
                {words.map((word) => {
                  const currentWordIndex = wordCounter++;
                  const wordFrame = frame - (startFrame + currentWordIndex * staggerDelay);
                  const isWordStarted = wordFrame >= 0;

                  const wordSpring = isWordStarted
                    ? spring({
                        frame: wordFrame,
                        fps,
                        config: { damping, stiffness },
                      })
                    : 0;

                  const translateY = (1 - wordSpring) * 22;
                  const scale = enableScale ? 0.92 + 0.08 * wordSpring : 1;
                  const opacity = interpolate(wordSpring, [0, 0.4, 1], [0, 0.7, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });

                  const highlight = isHighlighted(word, highlightWords);

                  return renderToken(word, currentWordIndex, highlight, {
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    display: "inline-block",
                  });
                })}
              </div>
            );
          })}
        </div>
      );
    }

    // Mode 3: Line-by-line reveal (staggered)
    if (mode === "lines") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems,
            width: "100%",
          }}
        >
          {lines.map((line, lineIdx) => {
            const lineFrame = frame - (startFrame + lineIdx * (staggerDelay * 3));
            const isLineStarted = lineFrame >= 0;

            const lineSpring = isLineStarted
              ? spring({
                  frame: lineFrame,
                  fps,
                  config: { damping, stiffness },
                })
              : 0;

            const translateY = (1 - lineSpring) * 26;
            const scale = enableScale ? 0.95 + 0.05 * lineSpring : 1;
            const opacity = interpolate(lineSpring, [0, 0.4, 1], [0, 0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const words = line.split(" ");

            return (
              <div
                key={lineIdx}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent:
                    align === "center"
                      ? "center"
                      : align === "right"
                      ? "flex-end"
                      : "flex-start",
                  gap: "8px 14px",
                  width: "100%",
                }}
              >
                {words.map((word, wordIdx) => {
                  const highlight = isHighlighted(word, highlightWords);
                  return renderToken(word, wordIdx, highlight);
                })}
              </div>
            );
          })}
        </div>
      );
    }

    // Mode 4: Mask reveal (slides up from behind an overflow-hidden boundary)
    if (mode === "mask") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems,
            width: "100%",
          }}
        >
          {lines.map((line, lineIdx) => {
            const lineFrame = frame - (startFrame + lineIdx * (staggerDelay * 2));
            const isLineStarted = lineFrame >= 0;

            const lineSpring = isLineStarted
              ? spring({
                  frame: lineFrame,
                  fps,
                  config: { damping: 15, stiffness: 100 },
                })
              : 0;

            const translateY = (1 - lineSpring) * 115; // Percent of line height
            const opacity = interpolate(lineSpring, [0, 0.2, 1], [0, 0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const words = line.split(" ");

            return (
              <div
                key={lineIdx}
                style={{
                  overflow: "hidden",
                  padding: "4px 0",
                  width: "100%",
                  display: "flex",
                  justifyContent:
                    align === "center"
                      ? "center"
                      : align === "right"
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <div
                  style={{
                    transform: `translateY(${translateY}%)`,
                    opacity,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent:
                      align === "center"
                        ? "center"
                        : align === "right"
                        ? "flex-end"
                        : "flex-start",
                    gap: "8px 14px",
                  }}
                >
                  {words.map((word, wordIdx) => {
                    const highlight = isHighlighted(word, highlightWords);
                    return renderToken(word, wordIdx, highlight);
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  // Render Subtitle
  const renderSubtitle = () => {
    if (!subtitle) return null;
    const translateY = (1 - subtitleEntrance) * 18;
    const opacity = interpolate(subtitleEntrance, [0, 0.3, 1], [0, 0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <div
        style={{
          marginTop: "26px",
          transform: `translateY(${translateY}px)`,
          opacity,
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 26px",
          borderRadius: "16px",
          backgroundColor: "rgba(17, 24, 39, 0.85)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "26px",
            fontWeight: 700,
            color: THEME.colors.textSecondary,
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            textAlign,
          }}
        >
          {subtitle}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems,
        textAlign,
        maxWidth,
        width: "100%",
        fontFamily: THEME.fonts.sans,
        fontSize: `${fontSize}px`,
        fontWeight,
        color,
        lineHeight,
        letterSpacing,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {renderBadge()}
      {renderContent()}
      {renderSubtitle()}
    </div>
  );
};
