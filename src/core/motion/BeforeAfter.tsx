import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ArrowDown,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { MacWindow } from "../MacWindow";
import { CodeBlock } from "../CodeBlock";
import { CodeHighlightLine } from "../types";
import { THEME } from "../theme";

export type BeforeAfterMode = "sequential" | "stacked" | "wipe";
export type TransitionEffect = "wipe-down" | "slide-left" | "flip" | "crossfade";

export interface BeforeAfterState {
  /** Title or filename */
  filename?: string;
  /** Status tag badge */
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
  /** If comparing code, pass code and optional language */
  code?: string;
  language?: string;
  highlightLines?: CodeHighlightLine[];
  fontSize?: number;
  /** If comparing visual diagrams or non-code concepts, pass custom content */
  content?: React.ReactNode;
  /** Contextual note or explanation */
  note?: string;
}

export interface BeforeAfterProps {
  /** Initial / Before state configuration */
  before: BeforeAfterState;
  /** Improved / After state configuration */
  after: BeforeAfterState;
  /** Display mode:
   * - "sequential": Mobile-first single-focus panel that transforms from Before to After
   * - "stacked": Vertical comparison showing Before on top, connector arrow, and After below
   * - "wipe": Vertical wipe line revealing After over Before in-place
   */
  mode?: BeforeAfterMode;
  /** Frame at which the transition begins (default: 45) */
  switchFrame?: number;
  /** Duration in frames for the transition animation (default: 14) */
  transitionDuration?: number;
  /** Visual transition effect for sequential mode (default: "wipe-down") */
  transitionEffect?: TransitionEffect;
  /** Component entrance frame (default: 0) */
  startFrame?: number;
  /** Default font size for code blocks (default: 28, enforced min: 24) */
  fontSize?: number;
  /** Emphasize the final takeaway lesson in After phase (default: true) */
  showLessonTakeaway?: boolean;
  /** Optional overall lesson takeaway text displayed at bottom */
  lessonTakeaway?: string;
  /** Optional container style override */
  style?: React.CSSProperties;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  before,
  after,
  mode = "sequential",
  switchFrame = 45,
  transitionDuration = 14,
  transitionEffect = "wipe-down",
  startFrame = 0,
  fontSize = 28,
  showLessonTakeaway = true,
  lessonTakeaway,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectiveFontSize = Math.max(24, fontSize);

  // Global panel entrance
  const relativeStart = frame - startFrame;
  const isStarted = relativeStart >= 0;
  const entrance = isStarted
    ? spring({
        frame: relativeStart,
        fps,
        config: { damping: 13, stiffness: 110 },
      })
    : 0;

  // Transition progress (0 -> 1)
  const relativeSwitch = frame - switchFrame;
  const isSwitched = relativeSwitch >= 0;

  const transitionProgress = isSwitched
    ? spring({
        frame: relativeSwitch,
        fps,
        durationInFrames: transitionDuration,
        config: { damping: 14, stiffness: 100 },
      })
    : 0;

  // Render a state panel (either code block or custom content inside MacWindow)
  const renderPanel = (
    state: BeforeAfterState,
    isAfter: boolean,
    customGlow?: "bad" | "good" | "default"
  ) => {
    const defaultTag = isAfter
      ? { text: "CLEAN CODE ✅", variant: "good" as const }
      : { text: "BAD CODE ❌", variant: "bad" as const };

    const tagToUse = state.tag || defaultTag;
    const glowToUse =
      customGlow || (isAfter ? "good" : "bad");

    const content = state.code ? (
      <CodeBlock
        code={state.code}
        language={state.language || "tsx"}
        highlightLines={state.highlightLines}
        fontSize={state.fontSize || effectiveFontSize}
      />
    ) : (
      state.content
    );

    return (
      <MacWindow
        filename={state.filename || (isAfter ? "CleanSolution.tsx" : "ProblematicCode.tsx")}
        tag={tagToUse}
        glow={glowToUse}
      >
        {content}
      </MacWindow>
    );
  };

  // -------------------------------------------------------------
  // MODE 1: SEQUENTIAL TRANSFORMATION (Single-Focus Mobile First)
  // -------------------------------------------------------------
  if (mode === "sequential") {
    const isPastTransition = transitionProgress >= 1;

    // Transition styles
    let beforeTransform = "none";
    let afterTransform = "none";
    let beforeOpacity = 1;
    let afterOpacity = 0;

    switch (transitionEffect) {
      case "slide-left": {
        const slideOffset = transitionProgress * 100;
        beforeTransform = `translateX(-${slideOffset}%)`;
        beforeOpacity = 1 - transitionProgress;
        afterTransform = `translateX(${100 - slideOffset}%)`;
        afterOpacity = transitionProgress;
        break;
      }
      case "flip": {
        const rotate = transitionProgress * 180;
        beforeTransform = `perspective(1000px) rotateY(${rotate * 0.5}deg)`;
        beforeOpacity = transitionProgress < 0.5 ? 1 : 0;
        afterTransform = `perspective(1000px) rotateY(${-90 + rotate * 0.5}deg)`;
        afterOpacity = transitionProgress >= 0.5 ? 1 : 0;
        break;
      }
      case "crossfade": {
        beforeOpacity = 1 - transitionProgress;
        afterOpacity = transitionProgress;
        afterTransform = `scale(${0.96 + 0.04 * transitionProgress})`;
        break;
      }
      case "wipe-down":
      default: {
        beforeOpacity = 1 - transitionProgress;
        afterOpacity = transitionProgress;
        afterTransform = `translateY(${(1 - transitionProgress) * 24}px)`;
        break;
      }
    }

    const lessonText = lessonTakeaway || after.note;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          transform: `scale(${entrance}) translateY(${(1 - entrance) * 20}px)`,
          opacity: entrance,
          position: "relative",
          ...style,
        }}
      >
        {/* Animated Single Focus Container */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Before Layer */}
          {!isPastTransition && (
            <div
              style={{
                width: "100%",
                transform: beforeTransform,
                opacity: beforeOpacity,
                position: isSwitched ? "absolute" : "relative",
                top: 0,
                left: 0,
                zIndex: isSwitched ? 1 : 2,
              }}
            >
              {renderPanel(before, false)}
            </div>
          )}

          {/* After Layer */}
          {isSwitched && (
            <div
              style={{
                width: "100%",
                transform: afterTransform,
                opacity: afterOpacity,
                position: isPastTransition ? "relative" : "relative",
                zIndex: 2,
              }}
            >
              {renderPanel(after, true)}
            </div>
          )}

          {/* Scanline Sweep during Wipe Down */}
          {isSwitched && !isPastTransition && transitionEffect === "wipe-down" && (
            <div
              style={{
                position: "absolute",
                top: `${transitionProgress * 100}%`,
                left: 0,
                width: "100%",
                height: "6px",
                backgroundColor: THEME.colors.accentEmerald,
                boxShadow: `0 0 24px ${THEME.colors.accentEmerald}, 0 0 40px ${THEME.colors.accentCyan}`,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* Phase Note or Lesson Callout */}
        {showLessonTakeaway && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px 20px",
              borderRadius: "16px",
              backgroundColor: isPastTransition
                ? "rgba(16, 185, 129, 0.12)"
                : "rgba(244, 63, 94, 0.12)",
              border: `1.5px solid ${
                isPastTransition
                  ? "rgba(16, 185, 129, 0.35)"
                  : "rgba(244, 63, 94, 0.35)"
              }`,
              boxShadow: isPastTransition
                ? THEME.shadows.goodGlow
                : THEME.shadows.badGlow,
              display: "flex",
              alignItems: "center",
              gap: "14px",
              backdropFilter: "blur(12px)",
            }}
          >
            {isPastTransition ? (
              <CheckCircle2
                size={26}
                color={THEME.colors.accentEmerald}
                style={{ flexShrink: 0 }}
              />
            ) : (
              <ShieldAlert
                size={26}
                color={THEME.colors.accentRose}
                style={{ flexShrink: 0 }}
              />
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
              {isPastTransition
                ? lessonText || "Giải pháp tối ưu: Tham chiếu giữ nguyên, component không re-render thừa!"
                : before.note || "Vấn đề: Mỗi lần re-render, cấp phát lại vùng nhớ mới hoàn toàn!"}
            </span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // MODE 2: STACKED (Vertical 2-Panel Comparison)
  // -------------------------------------------------------------
  if (mode === "stacked") {
    const afterEntrance = isSwitched
      ? spring({
          frame: relativeSwitch,
          fps,
          config: { damping: 14, stiffness: 100 },
        })
      : 0;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          transform: `scale(${entrance})`,
          opacity: entrance,
          ...style,
        }}
      >
        {/* Top: Before Panel */}
        <div style={{ width: "100%" }}>{renderPanel(before, false)}</div>

        {/* Transition Bridge Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            margin: "2px 0",
            opacity: isSwitched ? afterEntrance : 0.6,
            transform: `scale(${isSwitched ? 0.95 + 0.05 * afterEntrance : 0.95})`,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(16, 185, 129, 0.18)",
              border: `1.5px solid ${THEME.colors.accentEmerald}`,
              color: THEME.colors.accentEmerald,
              fontSize: "19px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: `0 0 20px rgba(16, 185, 129, 0.3)`,
            }}
          >
            <ArrowDown size={20} />
            <span>TỐI ƯU THÀNH</span>
            <Sparkles size={18} />
          </div>
        </div>

        {/* Bottom: After Panel (Reveals at switchFrame) */}
        {isSwitched && (
          <div
            style={{
              width: "100%",
              transform: `translateY(${(1 - afterEntrance) * 20}px)`,
              opacity: afterEntrance,
            }}
          >
            {renderPanel(after, true)}
          </div>
        )}

        {/* Lesson Takeaway Card */}
        {showLessonTakeaway && lessonTakeaway && isSwitched && (
          <div
            style={{
              marginTop: "4px",
              padding: "14px 18px",
              borderRadius: "14px",
              backgroundColor: "rgba(16, 185, 129, 0.14)",
              border: `1.5px solid ${THEME.colors.accentEmerald}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: afterEntrance,
            }}
          >
            <CheckCircle2
              size={24}
              color={THEME.colors.accentEmerald}
              style={{ flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "20px",
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                lineHeight: 1.35,
              }}
            >
              {lessonTakeaway}
            </span>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // MODE 3: WIPE (Direct In-Place Clip Wipe)
  // -------------------------------------------------------------
  const wipeClipY = interpolate(transitionProgress, [0, 1], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        transform: `scale(${entrance})`,
        opacity: entrance,
        position: "relative",
        ...style,
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        {/* Base Layer: Before Panel */}
        <div style={{ width: "100%" }}>{renderPanel(before, false)}</div>

        {/* Overlay Layer: After Panel with clip-path wipe */}
        {isSwitched && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              clipPath: `inset(${wipeClipY}% 0 0 0)`,
              zIndex: 5,
            }}
          >
            {renderPanel(after, true)}
          </div>
        )}

        {/* Wipe Line */}
        {isSwitched && transitionProgress < 1 && (
          <div
            style={{
              position: "absolute",
              top: `${100 - wipeClipY}%`,
              left: 0,
              width: "100%",
              height: "4px",
              backgroundColor: THEME.colors.accentEmerald,
              boxShadow: `0 0 25px ${THEME.colors.accentEmerald}`,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {showLessonTakeaway && lessonTakeaway && (
        <div
          style={{
            marginTop: "18px",
            padding: "16px 20px",
            borderRadius: "16px",
            backgroundColor: isSwitched
              ? "rgba(16, 185, 129, 0.12)"
              : "rgba(244, 63, 94, 0.12)",
            border: `1.5px solid ${
              isSwitched
                ? "rgba(16, 185, 129, 0.35)"
                : "rgba(244, 63, 94, 0.35)"
            }`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <CheckCircle2
            size={24}
            color={isSwitched ? THEME.colors.accentEmerald : THEME.colors.accentRose}
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.35,
            }}
          >
            {lessonTakeaway}
          </span>
        </div>
      )}
    </div>
  );
};
