import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertCircle, CheckCircle2, Info, Sparkles } from "lucide-react";
import { MacWindow } from "../MacWindow";
import { CodeBlock, CodeLineCustomStyle } from "../CodeBlock";
import { THEME } from "../theme";

export type FocusVariant = "bad" | "good" | "info" | "tip" | "cyan" | "rose" | "emerald" | "amber";

export interface FocusTarget {
  /** 1-indexed line numbers to focus on */
  lines: number[];
  /** Frame at which focus transitions to this target */
  startFrame: number;
  /** Frame at which focus ends (optional, defaults to next target startFrame or infinity) */
  endFrame?: number;
  /** Focus visual variant (default: "cyan") */
  variant?: FocusVariant;
  /** Inline annotation chip on the right edge */
  label?: string;
  /** Callout note displayed below the code window */
  note?: string;
}

export interface CodeFocusProps {
  /** Source code snippet to display */
  code: string;
  /** Syntax highlighting language (default: "tsx") */
  language?: string;
  /** Filename for MacWindow title bar */
  filename?: string;
  /** Static tag in MacWindow title bar */
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
  /** MacWindow border glow. If "auto", syncs with active focus target */
  glow?: "bad" | "good" | "default" | "auto";
  /** Single focus target or timeline sequence of focus targets */
  focus: FocusTarget | FocusTarget[];
  /** Opacity for unfocused lines (default: 0.28 for high contrast on dark bg) */
  dimOpacity?: number;
  /** Duration in frames for focus transition between lines (default: 8) */
  transitionDuration?: number;
  /** Marker indicator style next to focused lines: "caret" | "line" | "none" (default: "caret") */
  marker?: "caret" | "line" | "none";
  /** Display the synchronized explanation note callout below code block (default: true) */
  showNoteCallout?: boolean;
  /** Font size in pixels (default: 28, enforced minimum: 24) */
  fontSize?: number;
  /** Line height multiplier (default: 1.65) */
  lineHeight?: number;
  /** Animate panel entrance (default: true) */
  animatePanel?: boolean;
  /** Panel entrance start frame (default: 0) */
  startFrame?: number;
  /** Optional container style override */
  style?: React.CSSProperties;
}

export const CodeFocus: React.FC<CodeFocusProps> = ({
  code,
  language = "tsx",
  filename = "Component.tsx",
  tag,
  glow = "auto",
  focus,
  dimOpacity = 0.28,
  transitionDuration = 8,
  marker = "caret",
  showNoteCallout = true,
  fontSize = 28,
  lineHeight = 1.65,
  animatePanel = true,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enforce mobile minimum readable size
  const effectiveFontSize = Math.max(24, fontSize);

  // Normalize focus targets into a sorted array
  const targets: FocusTarget[] = (Array.isArray(focus) ? focus : [focus]).sort(
    (a, b) => a.startFrame - b.startFrame
  );

  // Find active focus target
  const currentTargetIndex = targets.findIndex((t, idx) => {
    const next = targets[idx + 1];
    const end = t.endFrame ?? (next ? next.startFrame : Infinity);
    return frame >= t.startFrame && frame < end;
  });

  const currentTarget: FocusTarget | null =
    currentTargetIndex >= 0 ? targets[currentTargetIndex] : null;

  const previousTarget: FocusTarget | null =
    currentTargetIndex > 0 ? targets[currentTargetIndex - 1] : null;

  // Transition spring progress (0 -> 1)
  const transitionFrame = currentTarget ? frame - currentTarget.startFrame : 0;
  const isTargetActive = currentTarget !== null;

  const transitionProgress = isTargetActive
    ? spring({
        frame: Math.max(0, transitionFrame),
        fps,
        durationInFrames: transitionDuration,
        config: { damping: 15, stiffness: 120 },
      })
    : 0;

  // Panel entrance spring
  const panelAge = frame - startFrame;
  const panelEntrance =
    animatePanel && panelAge >= 0
      ? spring({
          frame: panelAge,
          fps,
          config: { damping: 13, stiffness: 110 },
        })
      : 1;

  // Variant color mapping helper
  const getVariantStyles = (v: FocusVariant = "cyan") => {
    switch (v) {
      case "bad":
      case "rose":
        return {
          color: THEME.colors.accentRose,
          border: THEME.colors.accentRose,
          bg: "rgba(244, 63, 94, 0.18)",
          glow: "rgba(244, 63, 94, 0.22)",
          chipBg: "rgba(244, 63, 94, 0.25)",
          text: THEME.colors.badText,
          glowType: "bad" as const,
        };
      case "good":
      case "emerald":
        return {
          color: THEME.colors.accentEmerald,
          border: THEME.colors.accentEmerald,
          bg: "rgba(16, 185, 129, 0.18)",
          glow: "rgba(16, 185, 129, 0.22)",
          chipBg: "rgba(16, 185, 129, 0.25)",
          text: THEME.colors.goodText,
          glowType: "good" as const,
        };
      case "amber":
        return {
          color: THEME.colors.accentAmber,
          border: THEME.colors.accentAmber,
          bg: "rgba(251, 191, 36, 0.16)",
          glow: "rgba(251, 191, 36, 0.2)",
          chipBg: "rgba(251, 191, 36, 0.25)",
          text: THEME.colors.accentAmber,
          glowType: "default" as const,
        };
      case "tip":
      case "info":
      case "cyan":
      default:
        return {
          color: THEME.colors.accentCyan,
          border: THEME.colors.accentCyan,
          bg: "rgba(56, 189, 248, 0.16)",
          glow: "rgba(56, 189, 248, 0.2)",
          chipBg: "rgba(56, 189, 248, 0.25)",
          text: THEME.colors.tipText,
          glowType: "default" as const,
        };
    }
  };

  const currentStyles = getVariantStyles(currentTarget?.variant);

  // Compute resolved window glow
  const resolvedGlow: "bad" | "good" | "default" =
    glow === "auto"
      ? isTargetActive
        ? currentStyles.glowType
        : "default"
      : glow;

  // Custom line generator passed directly into CodeBlock
  const getLineCustomStyle = (lineNumber: number): CodeLineCustomStyle | undefined => {
    // If no target has started yet, render normal full opacity without focus styling
    if (!isTargetActive) {
      return { opacity: 1 };
    }

    const wasFocused = previousTarget
      ? previousTarget.lines.includes(lineNumber)
      : true; // prior to any focus, all were 1.0
    const nowFocused = currentTarget.lines.includes(lineNumber);

    // Smoothly interpolate opacity between states
    const startOpacity = wasFocused ? 1 : dimOpacity;
    const endOpacity = nowFocused ? 1 : dimOpacity;
    const lineOpacity = interpolate(
      transitionProgress,
      [0, 1],
      [startOpacity, endOpacity],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // If not focused, return dim styling
    if (!nowFocused) {
      return {
        opacity: lineOpacity,
        backgroundColor: "transparent",
        borderLeft: "4px solid transparent",
        boxShadow: "none",
      };
    }

    // Line is focused! Compute breathing pulse for border and subtle glow
    const pulse = 0.8 + 0.2 * Math.sin((frame + lineNumber * 8) / 8);

    const bgAlpha = interpolate(transitionProgress, [0, 1], [0, 0.18]);
    const borderLeft = `4px solid ${currentStyles.border}`;
    const boxShadow = `inset 0 0 16px ${currentStyles.glow}`;

    // Marker styling
    let markerNode: React.ReactNode = null;
    if (marker === "caret") {
      markerNode = (
        <span
          style={{
            color: currentStyles.color,
            fontSize: `${effectiveFontSize - 10}px`,
            opacity: transitionProgress,
            display: "inline-block",
            transform: `scale(${transitionProgress})`,
          }}
        >
          ▶
        </span>
      );
    } else if (marker === "line") {
      markerNode = (
        <span
          style={{
            width: "3px",
            height: "16px",
            backgroundColor: currentStyles.color,
            borderRadius: "2px",
            opacity: transitionProgress,
            display: "inline-block",
          }}
        />
      );
    }

    // Label on focused line (render on first line of target)
    const isPrimaryTargetLine = lineNumber === currentTarget.lines[0];
    const labelText = isPrimaryTargetLine ? currentTarget.label : undefined;

    return {
      opacity: lineOpacity,
      backgroundColor: `rgba(${
        currentStyles.color === THEME.colors.accentRose
          ? "244, 63, 94"
          : currentStyles.color === THEME.colors.accentEmerald
          ? "16, 185, 129"
          : currentStyles.color === THEME.colors.accentAmber
          ? "251, 191, 36"
          : "56, 189, 248"
      }, ${bgAlpha * pulse})`,
      borderLeft,
      boxShadow,
      marker: markerNode,
      label: labelText,
      labelStyle: {
        backgroundColor: currentStyles.chipBg,
        border: `1px solid ${currentStyles.border}`,
        color: currentStyles.text,
        opacity: transitionProgress,
      },
    };
  };

  // Note callout icon resolver
  const renderNoteIcon = (v: FocusVariant = "cyan") => {
    switch (v) {
      case "bad":
      case "rose":
        return <AlertCircle size={24} color={currentStyles.color} style={{ flexShrink: 0 }} />;
      case "good":
      case "emerald":
        return <CheckCircle2 size={24} color={currentStyles.color} style={{ flexShrink: 0 }} />;
      case "amber":
        return <Sparkles size={24} color={currentStyles.color} style={{ flexShrink: 0 }} />;
      case "tip":
      case "info":
      case "cyan":
      default:
        return <Info size={24} color={currentStyles.color} style={{ flexShrink: 0 }} />;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transform: animatePanel
          ? `scale(${panelEntrance}) translateY(${(1 - panelEntrance) * 20}px)`
          : "none",
        opacity: animatePanel ? panelEntrance : 1,
        ...style,
      }}
    >
      <MacWindow filename={filename} tag={tag} glow={resolvedGlow}>
        <CodeBlock
          code={code}
          language={language}
          fontSize={effectiveFontSize}
          lineHeight={lineHeight}
          getLineCustomStyle={getLineCustomStyle}
        />
      </MacWindow>

      {/* Synchronized Explanation Note Callout */}
      {showNoteCallout && currentTarget?.note && (
        <div
          style={{
            marginTop: "18px",
            padding: "16px 20px",
            borderRadius: "16px",
            backgroundColor: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${currentStyles.border}`,
            boxShadow: `0 10px 30px ${currentStyles.glow}`,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            transform: `translateY(${(1 - transitionProgress) * 12}px)`,
            opacity: transitionProgress,
            backdropFilter: "blur(12px)",
          }}
        >
          {renderNoteIcon(currentTarget.variant)}
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.35,
              letterSpacing: "0.01em",
            }}
          >
            {currentTarget.note}
          </span>
        </div>
      )}
    </div>
  );
};
