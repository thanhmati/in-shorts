import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  CheckCircle2,
  Clock,
  AlertOctagon,
  ArrowRight,
  Zap,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { THEME } from "../theme";

export type StateVariant = "idle" | "loading" | "success" | "error" | "warning" | "info";

export interface LifecycleState {
  id: string;
  label: string; // e.g. "IDLE", "LOADING", "SUCCESS", "ERROR"
  subtitle?: string; // e.g. "Chờ tương tác", "Đang fetch API", "Đã nhận kết quả"
  description?: string; // Initial state description if no transition has occurred yet
  variant?: StateVariant;
  icon?: React.ReactNode;
}

export interface StateChangeTransition {
  fromStateId: string;
  toStateId: string;
  /** Frame at which this transition begins */
  atFrame: number;
  /** Duration of transition animation in frames (default: 10) */
  durationInFrames?: number;
  /** The action or event that caused this transition (e.g. "onClick: fetch()", "HTTP 200 OK") */
  triggerEvent?: string;
  /** Explanatory description while in this state */
  description?: string;
}

export interface StateTransitionProps {
  /** Array of defined states in the state machine */
  states: LifecycleState[];
  /** Sequence of transitions between states over time */
  transitions: StateChangeTransition[];
  /** Initial state ID before any transition occurs */
  initialStateId: string;
  /** Overall diagram title */
  title?: string;
  /** Component start frame (default: 0) */
  startFrame?: number;
  /** Layout mode: "timeline-and-card" | "card-only" | "timeline-only" (default: "timeline-and-card") */
  mode?: "timeline-and-card" | "card-only" | "timeline-only";
  style?: React.CSSProperties;
}

export const StateTransition: React.FC<StateTransitionProps> = ({
  states,
  transitions,
  initialStateId,
  title,
  startFrame = 0,
  mode = "timeline-and-card",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Technical validation of state references
  const stateMap = new Map<string, LifecycleState>();
  states.forEach((s) => stateMap.set(s.id, s));

  if (!stateMap.has(initialStateId)) {
    throw new Error(
      `[StateTransition Error]: initialStateId "${initialStateId}" not found in states list.`
    );
  }

  transitions.forEach((t, idx) => {
    if (!stateMap.has(t.fromStateId)) {
      throw new Error(
        `[StateTransition Error]: Transition #${idx} references non-existent fromStateId "${t.fromStateId}".`
      );
    }
    if (!stateMap.has(t.toStateId)) {
      throw new Error(
        `[StateTransition Error]: Transition #${idx} references non-existent toStateId "${t.toStateId}".`
      );
    }
  });

  // Sort transitions by atFrame
  const sortedTransitions = transitions.slice().sort((a, b) => a.atFrame - b.atFrame);

  // Determine current transition and active state
  const completedTransitions = sortedTransitions.filter((t) => frame >= t.atFrame);
  const currentTransition =
    completedTransitions.length > 0
      ? completedTransitions[completedTransitions.length - 1]
      : null;

  const activeStateId = currentTransition
    ? currentTransition.toStateId
    : initialStateId;

  const activeState = stateMap.get(activeStateId)!;

  // Transition spring progress (0 -> 1)
  const transitionAge = currentTransition ? frame - currentTransition.atFrame : 0;
  const transitionDuration = currentTransition?.durationInFrames || 10;
  const isTransitioning =
    currentTransition !== null && transitionAge < transitionDuration;

  const transitionProgress = currentTransition
    ? spring({
        frame: Math.max(0, transitionAge),
        fps,
        durationInFrames: transitionDuration,
        config: { damping: 14, stiffness: 120 },
      })
    : 1;

  // Panel entrance spring
  const panelAge = frame - startFrame;
  const panelEntrance =
    panelAge >= 0
      ? spring({
          frame: panelAge,
          fps,
          config: { damping: 13, stiffness: 110 },
        })
      : 0;

  // Variant color mapping helper
  const getVariantStyles = (v: StateVariant = "idle") => {
    switch (v) {
      case "loading":
        return {
          primary: THEME.colors.accentCyan,
          bg: "rgba(56, 189, 248, 0.16)",
          border: THEME.colors.accentCyan,
          glow: "rgba(56, 189, 248, 0.4)",
          text: THEME.colors.tipText,
        };
      case "success":
        return {
          primary: THEME.colors.accentEmerald,
          bg: "rgba(16, 185, 129, 0.16)",
          border: THEME.colors.accentEmerald,
          glow: "rgba(16, 185, 129, 0.4)",
          text: THEME.colors.goodText,
        };
      case "error":
        return {
          primary: THEME.colors.accentRose,
          bg: "rgba(244, 63, 94, 0.16)",
          border: THEME.colors.accentRose,
          glow: "rgba(244, 63, 94, 0.4)",
          text: THEME.colors.badText,
        };
      case "warning":
        return {
          primary: THEME.colors.accentAmber,
          bg: "rgba(251, 191, 36, 0.16)",
          border: THEME.colors.accentAmber,
          glow: "rgba(251, 191, 36, 0.4)",
          text: THEME.colors.accentAmber,
        };
      case "info":
        return {
          primary: THEME.colors.accentPurple,
          bg: "rgba(168, 85, 247, 0.16)",
          border: THEME.colors.accentPurple,
          glow: "rgba(168, 85, 247, 0.4)",
          text: "#D8B4FE",
        };
      case "idle":
      default:
        return {
          primary: "#94A3B8",
          bg: "rgba(148, 163, 184, 0.12)",
          border: "#475569",
          glow: "rgba(148, 163, 184, 0.2)",
          text: "#CBD5E1",
        };
    }
  };

  const activeStyles = getVariantStyles(activeState.variant);

  // Icon resolver
  const renderStateIcon = (s: LifecycleState, size = 32) => {
    if (s.icon) return s.icon;
    switch (s.variant) {
      case "loading":
        return (
          <RefreshCw
            size={size}
            color={activeStyles.primary}
            style={{ transform: `rotate(${frame * 10}deg)` }}
          />
        );
      case "success":
        return <CheckCircle2 size={size} color={THEME.colors.accentEmerald} />;
      case "error":
        return <AlertOctagon size={size} color={THEME.colors.accentRose} />;
      case "warning":
        return <Clock size={size} color={THEME.colors.accentAmber} />;
      case "idle":
      default:
        return <Clock size={size} color="#94A3B8" />;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${panelEntrance}) translateY(${(1 - panelEntrance) * 20}px)`,
        opacity: panelEntrance,
        gap: "24px",
        boxSizing: "border-box",
        fontFamily: THEME.fonts.sans,
        ...style,
      }}
    >
      {/* Title Header */}
      {title && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 900,
              color: THEME.colors.accentCyan,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STATE PIPELINE CHAIN (Step Progression)                       */}
      {/* ------------------------------------------------------------- */}
      {(mode === "timeline-and-card" || mode === "timeline-only") && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px 14px",
            width: "100%",
            padding: "16px 20px",
            borderRadius: "20px",
            backgroundColor: "rgba(17, 24, 39, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          {states.map((s, idx) => {
            const isActive = s.id === activeStateId;
            const sStyles = getVariantStyles(s.variant);

            return (
              <React.Fragment key={s.id}>
                {/* State Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 18px",
                    borderRadius: "999px",
                    backgroundColor: isActive ? sStyles.bg : "rgba(255, 255, 255, 0.04)",
                    border: `1.5px solid ${isActive ? sStyles.border : "rgba(255, 255, 255, 0.12)"}`,
                    boxShadow: isActive ? `0 0 20px ${sStyles.glow}` : "none",
                    transform: `scale(${isActive ? 1 + 0.06 * transitionProgress : 0.95})`,
                    opacity: isActive ? 1 : 0.45,
                  }}
                >
                  <span style={{ display: "inline-flex" }}>
                    {renderStateIcon(s, 16)}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 900,
                      color: isActive ? sStyles.text : "#94A3B8",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector Arrow */}
                {idx < states.length - 1 && (
                  <ArrowRight size={18} color="#64748B" style={{ opacity: 0.5 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ACTIVE STATE HERO CARD (Zoomed-in focal state)                */}
      {/* ------------------------------------------------------------- */}
      {(mode === "timeline-and-card" || mode === "card-only") && (
        <div
          style={{
            width: "100%",
            borderRadius: "24px",
            backgroundColor: THEME.colors.cardBg,
            border: `2px solid ${activeStyles.border}`,
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${activeStyles.glow}`,
            padding: "36px 30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            transform: `scale(${isTransitioning ? 0.98 + 0.02 * transitionProgress : 1})`,
          }}
        >
          {/* Top Row: Causality Trigger Pill & State Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Causality Trigger Event */}
            {currentTransition?.triggerEvent ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: THEME.colors.textSecondary,
                  fontSize: "14px",
                  fontWeight: 800,
                  fontFamily: THEME.fonts.code,
                }}
              >
                <Zap size={14} color={activeStyles.primary} />
                <span>EVENT: {currentTransition.triggerEvent}</span>
              </div>
            ) : (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: THEME.colors.textSecondary,
                  fontSize: "14px",
                  fontWeight: 800,
                }}
              >
                <Sparkles size={14} color="#94A3B8" />
                <span>TRẠNG THÁI KHỞI TẠO</span>
              </div>
            )}

            {/* Current State Indicator Badge */}
            <div
              style={{
                padding: "6px 18px",
                borderRadius: "999px",
                backgroundColor: activeStyles.bg,
                border: `1.5px solid ${activeStyles.border}`,
                color: activeStyles.text,
                fontSize: "15px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: `0 0 16px ${activeStyles.glow}`,
              }}
            >
              {activeState.label}
            </div>
          </div>

          {/* Center: State Icon & Hero Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "10px 0",
            }}
          >
            {/* Big Icon */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                backgroundColor: activeStyles.bg,
                border: `2px solid ${activeStyles.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 0 20px ${activeStyles.glow}`,
              }}
            >
              {renderStateIcon(activeState, 36)}
            </div>

            {/* Title & Subtitle */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 950,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "-0.02em",
                }}
              >
                {activeState.label}
              </span>
              {activeState.subtitle && (
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: THEME.colors.textSecondary,
                  }}
                >
                  {activeState.subtitle}
                </span>
              )}
            </div>
          </div>

          {/* Description Box */}
          {(currentTransition?.description || activeState.description) && (
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "14px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "20px",
                fontWeight: 600,
                color: THEME.colors.textPrimary,
                lineHeight: 1.45,
              }}
            >
              {currentTransition?.description ?? activeState.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
