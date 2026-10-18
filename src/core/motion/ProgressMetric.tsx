import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, TrendingDown, TrendingUp, Zap, Sparkles } from "lucide-react";
import { THEME } from "../theme";

export type MetricType = "counter" | "progress-bar" | "benchmark-bars";
export type MetricVariant = "cyan" | "emerald" | "rose" | "amber" | "purple";

export interface BenchmarkBarItem {
  id: string;
  label: string;
  value: number;
  unit?: string;
  variant?: MetricVariant;
  highlight?: boolean;
  deltaBadge?: string; // e.g. "40x Nhanh hơn" or "-97% Bộ nhớ"
}

export interface MetricMilestone {
  atValue: number;
  label: string;
  color?: string;
}

export interface ProgressMetricProps {
  /** Presentation mode: counter | progress-bar | benchmark-bars */
  type?: MetricType;
  /** Metric headline */
  title: string;
  /** Technical category or illustrative subtitle */
  subtitle?: string;

  // Counter & Progress Bar options
  fromValue?: number;
  toValue?: number;
  unit?: string;
  decimals?: number;
  variant?: MetricVariant;
  milestones?: MetricMilestone[];

  // Benchmark Bars options
  benchmarkItems?: BenchmarkBarItem[];
  maxValue?: number;

  /** Animation start frame (default: 0) */
  startFrame?: number;
  /** Duration in frames for interpolation (default: 30) */
  durationInFrames?: number;

  /** Final takeaway card below the metric */
  conclusion?: {
    text: string;
    variant?: "good" | "bad" | "info";
    atFrame?: number;
  };

  style?: React.CSSProperties;
}

export const ProgressMetric: React.FC<ProgressMetricProps> = ({
  type = "counter",
  title,
  subtitle,
  fromValue = 0,
  toValue = 100,
  unit = "",
  decimals = 0,
  variant = "cyan",
  milestones = [],
  benchmarkItems = [],
  maxValue,
  startFrame = 0,
  durationInFrames = 30,
  conclusion,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const relativeStart = frame - startFrame;
  const isStarted = relativeStart >= 0;

  const entrance = isStarted
    ? spring({
        frame: relativeStart,
        fps,
        config: { damping: 13, stiffness: 110 },
      })
    : 0;

  // Numerical progress interpolation
  const progressSpring = isStarted
    ? spring({
        frame: relativeStart,
        fps,
        durationInFrames,
        config: { damping: 15, stiffness: 90 },
      })
    : 0;

  const currentNumericValue =
    fromValue + (toValue - fromValue) * progressSpring;

  // Format number
  const formattedValue =
    decimals > 0
      ? currentNumericValue.toFixed(decimals)
      : Math.round(currentNumericValue).toLocaleString();

  // Color resolver
  const getVariantColors = (v: MetricVariant = "cyan") => {
    switch (v) {
      case "emerald":
        return {
          primary: THEME.colors.accentEmerald,
          bg: "rgba(16, 185, 129, 0.15)",
          border: THEME.colors.accentEmerald,
          glow: "rgba(16, 185, 129, 0.35)",
          text: THEME.colors.goodText,
        };
      case "rose":
        return {
          primary: THEME.colors.accentRose,
          bg: "rgba(244, 63, 94, 0.15)",
          border: THEME.colors.accentRose,
          glow: "rgba(244, 63, 94, 0.35)",
          text: THEME.colors.badText,
        };
      case "amber":
        return {
          primary: THEME.colors.accentAmber,
          bg: "rgba(251, 191, 36, 0.15)",
          border: THEME.colors.accentAmber,
          glow: "rgba(251, 191, 36, 0.35)",
          text: THEME.colors.accentAmber,
        };
      case "purple":
        return {
          primary: THEME.colors.accentPurple,
          bg: "rgba(168, 85, 247, 0.15)",
          border: THEME.colors.accentPurple,
          glow: "rgba(168, 85, 247, 0.35)",
          text: "#D8B4FE",
        };
      case "cyan":
      default:
        return {
          primary: THEME.colors.accentCyan,
          bg: "rgba(56, 189, 248, 0.15)",
          border: THEME.colors.accentCyan,
          glow: "rgba(56, 189, 248, 0.35)",
          text: THEME.colors.tipText,
        };
    }
  };

  const colors = getVariantColors(variant);

  // Direction indicator
  const isDecreasing = toValue < fromValue;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${entrance}) translateY(${(1 - entrance) * 20}px)`,
        opacity: entrance,
        boxSizing: "border-box",
        fontFamily: THEME.fonts.sans,
        ...style,
      }}
    >
      {/* Metric Card Container */}
      <div
        style={{
          width: "100%",
          borderRadius: "24px",
          backgroundColor: THEME.colors.cardBg,
          border: `1.5px solid ${colors.border}`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px ${colors.glow}`,
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: THEME.colors.textSecondary,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {/* Illustrative Tag */}
          <div
            style={{
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.primary,
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Zap size={14} />
            <span>BENCHMARK</span>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* MODE 1: HERO COUNTER                                        */}
        {/* ----------------------------------------------------------- */}
        {type === "counter" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
              }}
            >
              {/* Direction Indicator */}
              {fromValue !== toValue && (
                <div style={{ marginRight: "4px" }}>
                  {isDecreasing ? (
                    <TrendingDown size={44} color={THEME.colors.accentEmerald} />
                  ) : (
                    <TrendingUp size={44} color={colors.primary} />
                  )}
                </div>
              )}

              {/* Big Hero Number */}
              <span
                style={{
                  fontFamily: THEME.fonts.code,
                  fontSize: "68px",
                  fontWeight: 950,
                  color: colors.primary,
                  letterSpacing: "-0.03em",
                  textShadow: `0 0 30px ${colors.glow}`,
                }}
              >
                {formattedValue}
              </span>

              {/* Unit Suffix */}
              {unit && (
                <span
                  style={{
                    fontFamily: THEME.fonts.sans,
                    fontSize: "30px",
                    fontWeight: 800,
                    color: THEME.colors.textSecondary,
                  }}
                >
                  {unit}
                </span>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* MODE 2: PROGRESS BAR WITH MILESTONES                        */}
        {/* ----------------------------------------------------------- */}
        {(type === "progress-bar" || (type === "counter" && milestones.length > 0)) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {/* Bar Track */}
            <div
              style={{
                width: "100%",
                height: "18px",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, Math.max(0, (currentNumericValue / (toValue || 100)) * 100))}%`,
                  background: `linear-gradient(90deg, ${colors.primary}, ${THEME.colors.accentEmerald})`,
                  boxShadow: `0 0 16px ${colors.primary}`,
                  borderRadius: "999px",
                }}
              />
            </div>

            {/* Milestones Markers */}
            {milestones.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "6px",
                }}
              >
                {milestones.map((m, idx) => {
                  const isReached = currentNumericValue >= m.atValue;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        opacity: isReached ? 1 : 0.45,
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        color={isReached ? THEME.colors.accentEmerald : "#64748B"}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: isReached ? THEME.colors.textPrimary : "#64748B",
                        }}
                      >
                        {m.label} ({m.atValue}{unit})
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* MODE 3: BENCHMARK BARS COMPARISON                           */}
        {/* ----------------------------------------------------------- */}
        {type === "benchmark-bars" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            {benchmarkItems.map((item, idx) => {
              const maxVal = maxValue || Math.max(...benchmarkItems.map((b) => b.value));
              const itemColors = getVariantColors(item.variant);

              // Proportional width calculation
              const rawPct = (item.value / (maxVal || 1)) * 100;
              const animatedWidth = Math.max(12, rawPct * progressSpring);

              const itemAge = frame - (startFrame + idx * 8);
              const itemEntrance =
                itemAge >= 0
                  ? spring({
                      frame: itemAge,
                      fps,
                      config: { damping: 14, stiffness: 110 },
                    })
                  : 0;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                    transform: `scale(${itemEntrance})`,
                    opacity: itemEntrance,
                  }}
                >
                  {/* Label & Value Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 800,
                        color: THEME.colors.textPrimary,
                      }}
                    >
                      {item.label}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontFamily: THEME.fonts.code,
                          fontSize: "22px",
                          fontWeight: 900,
                          color: itemColors.primary,
                        }}
                      >
                        {Math.round(item.value * progressSpring)} {item.unit || unit}
                      </span>

                      {/* Optional Delta Badge */}
                      {item.deltaBadge && progressSpring > 0.8 && (
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "8px",
                            backgroundColor: itemColors.bg,
                            border: `1px solid ${itemColors.border}`,
                            color: itemColors.primary,
                            fontSize: "14px",
                            fontWeight: 900,
                          }}
                        >
                          {item.deltaBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar Track */}
                  <div
                    style={{
                      width: "100%",
                      height: "22px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${animatedWidth}%`,
                        backgroundColor: itemColors.primary,
                        boxShadow: `0 0 16px ${itemColors.primary}`,
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Conclusion Callout Note */}
      {conclusion && (conclusion.atFrame === undefined || frame >= conclusion.atFrame) && (
        <div
          style={{
            marginTop: "18px",
            width: "100%",
            padding: "16px 20px",
            borderRadius: "16px",
            backgroundColor:
              conclusion.variant === "good"
                ? "rgba(16, 185, 129, 0.14)"
                : conclusion.variant === "bad"
                ? "rgba(244, 63, 94, 0.14)"
                : "rgba(56, 189, 248, 0.14)",
            border: `1.5px solid ${
              conclusion.variant === "good"
                ? THEME.colors.accentEmerald
                : conclusion.variant === "bad"
                ? THEME.colors.accentRose
                : THEME.colors.accentCyan
            }`,
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxSizing: "border-box",
            backdropFilter: "blur(12px)",
          }}
        >
          {conclusion.variant === "good" ? (
            <CheckCircle2 size={26} color={THEME.colors.accentEmerald} style={{ flexShrink: 0 }} />
          ) : (
            <Sparkles size={26} color={THEME.colors.accentCyan} style={{ flexShrink: 0 }} />
          )}
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.35,
            }}
          >
            {conclusion.text}
          </span>
        </div>
      )}
    </div>
  );
};
