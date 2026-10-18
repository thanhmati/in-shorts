import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Smartphone,
  Server,
  Database,
  Send,
  Zap,
  CheckCircle2,
  HardDrive,
} from "lucide-react";
import { NodeData, NodeType } from "./NodeGraph";
import { THEME } from "../theme";

export type PacketVariant = "cyan" | "emerald" | "rose" | "amber" | "purple";

export interface PacketStage {
  id: string;
  /** Source node ID where packet starts */
  from: string;
  /** Target node ID where packet arrives */
  to: string;
  /** Frame at which the packet begins moving */
  startFrame: number;
  /** Duration in frames for packet transit (default: 20) */
  durationInFrames?: number;
  /** Label describing payload (e.g. "POST /login", "200 OK (JWT)") */
  payloadLabel?: string;
  /** Visual color theme for packet and trail */
  variant?: PacketVariant;
  /** Optional icon inside the moving packet */
  icon?: React.ReactNode;
  /** Status badge updated at target node upon arrival */
  arrivalStatus?: {
    label: string;
    variant?: "active" | "error" | "cached" | "idle" | "warning";
  };
}

export interface PacketFlowProps {
  /** Nodes in the architecture diagram */
  nodes: NodeData[];
  /** Sequence of packet transit stages */
  stages: PacketStage[];
  /** Canvas width in px (default: 960) */
  width?: number;
  /** Canvas height in px (default: 780) */
  height?: number;
  /** Diagram title */
  title?: string;
  /** Optional active stage explanation note displayed at bottom */
  stageNotes?: {
    stageId: string;
    note: string;
  }[];
  /** Container style overrides */
  style?: React.CSSProperties;
}

/**
 * Evaluates point on cubic bezier curve at parameter t in [0, 1]
 */
const getCubicBezierPoint = (
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) => {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
};

export const PacketFlow: React.FC<PacketFlowProps> = ({
  nodes,
  stages,
  width = 960,
  height = 780,
  title,
  stageNotes = [],
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Index nodes by ID
  const nodeMap = new Map<string, NodeData>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Validate stages
  stages.forEach((stage) => {
    if (!nodeMap.has(stage.from)) {
      throw new Error(
        `[PacketFlow Error]: Stage "${stage.id}" references non-existent source node "${stage.from}".`
      );
    }
    if (!nodeMap.has(stage.to)) {
      throw new Error(
        `[PacketFlow Error]: Stage "${stage.id}" references non-existent target node "${stage.to}".`
      );
    }
  });

  // Variant color mapping helper
  const getVariantColor = (v: PacketVariant = "cyan") => {
    switch (v) {
      case "emerald":
        return THEME.colors.accentEmerald;
      case "rose":
        return THEME.colors.accentRose;
      case "amber":
        return THEME.colors.accentAmber;
      case "purple":
        return THEME.colors.accentPurple;
      case "cyan":
      default:
        return THEME.colors.accentCyan;
    }
  };

  // Find currently active packet stage
  const activeStage = stages.find((stage) => {
    const dur = stage.durationInFrames || 22;
    return frame >= stage.startFrame && frame < stage.startFrame + dur;
  });

  // Find most recent completed stage for arrival state
  const completedStages = stages.filter((stage) => {
    const dur = stage.durationInFrames || 22;
    return frame >= stage.startFrame + dur;
  });
  const lastCompletedStage =
    completedStages.length > 0
      ? completedStages[completedStages.length - 1]
      : null;

  // Active note lookup
  const activeStageId = activeStage?.id || lastCompletedStage?.id;
  const currentNote = stageNotes.find((n) => n.stageId === activeStageId)?.note;

  // Default node icon resolver
  const getNodeIcon = (type?: NodeType, custom?: React.ReactNode) => {
    if (custom) return custom;
    switch (type) {
      case "client":
        return <Smartphone size={28} color={THEME.colors.accentCyan} />;
      case "service":
      case "gateway":
        return <Server size={28} color={THEME.colors.accentCyan} />;
      case "database":
        return <Database size={28} color={THEME.colors.accentEmerald} />;
      case "cache":
        return <Zap size={28} color={THEME.colors.accentAmber} />;
      default:
        return <HardDrive size={28} color={THEME.colors.textPrimary} />;
    }
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        boxSizing: "border-box",
        fontFamily: THEME.fonts.sans,
        ...style,
      }}
    >
      {/* Title Header */}
      {title && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
            zIndex: 2,
          }}
        >
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

      {/* SVG Layer: Route Tracks */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw Static Track Lines between stage nodes */}
        {stages.map((stage) => {
          const fromNode = nodeMap.get(stage.from)!;
          const toNode = nodeMap.get(stage.to)!;

          const fromW = fromNode.width || 260;
          const fromH = fromNode.height || 105;
          const toW = toNode.width || 260;
          const toH = toNode.height || 105;

          const isGoingDown = toNode.y > fromNode.y;
          const startX = fromNode.x + fromW / 2;
          const startY = isGoingDown ? fromNode.y + fromH : fromNode.y;
          const endX = toNode.x + toW / 2;
          const endY = isGoingDown ? toNode.y : toNode.y + toH;

          const midY = (startY + endY) / 2;
          const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

          const isThisStageActive = activeStage?.id === stage.id;
          const stageColor = getVariantColor(stage.variant);

          return (
            <path
              key={`track-${stage.id}`}
              d={pathD}
              fill="none"
              stroke={isThisStageActive ? stageColor : "#334155"}
              strokeWidth={isThisStageActive ? 3.5 : 2}
              strokeDasharray={isThisStageActive ? "6, 6" : "4, 4"}
              opacity={isThisStageActive ? 0.9 : 0.4}
            />
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node) => {
        const nodeW = node.width || 260;
        const nodeH = node.height || 105;

        // Check if node is active source or target
        const isSource = activeStage?.from === node.id;
        const isTarget = activeStage?.to === node.id;
        const isRecentlyTarget = lastCompletedStage?.to === node.id;

        const isHighlighted = isSource || isTarget || isRecentlyTarget;
        const accentColor = activeStage
          ? getVariantColor(activeStage.variant)
          : THEME.colors.accentCyan;

        // Node scale impact spring when packet arrives
        const impactProgress =
          isTarget && activeStage
            ? Math.max(0, frame - (activeStage.startFrame + (activeStage.durationInFrames || 22) - 4))
            : 0;

        const impactSpring =
          impactProgress > 0
            ? spring({
                frame: impactProgress,
                fps,
                config: { damping: 10, stiffness: 180 },
              })
            : 1;

        // Arrival status badge lookup
        const arrivalBadge =
          isRecentlyTarget && lastCompletedStage?.arrivalStatus
            ? lastCompletedStage.arrivalStatus
            : node.status;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: `${nodeW}px`,
              height: `${nodeH}px`,
              backgroundColor: THEME.colors.cardBg,
              borderRadius: "18px",
              border: `2px solid ${
                isHighlighted ? accentColor : THEME.colors.cardBorder
              }`,
              boxShadow: isHighlighted
                ? `0 0 25px ${accentColor}55, inset 0 0 12px ${accentColor}22`
                : "0 15px 35px rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              padding: "16px 18px",
              gap: "14px",
              boxSizing: "border-box",
              transform: `scale(${impactProgress > 0 ? 1 + 0.04 * (1 - impactSpring) : 1})`,
              zIndex: 3,
            }}
          >
            {/* Node Icon */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {getNodeIcon(node.type, node.icon)}
            </div>

            {/* Titles */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {node.title}
              </div>

              {node.subtitle && (
                <div
                  style={{
                    fontFamily: THEME.fonts.code,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: THEME.colors.textSecondary,
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {node.subtitle}
                </div>
              )}
            </div>

            {/* Dynamic Arrival Status Badge */}
            {arrivalBadge && (
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "12px",
                  padding: "3px 12px",
                  borderRadius: "999px",
                  backgroundColor:
                    arrivalBadge.variant === "error"
                      ? "rgba(244, 63, 94, 0.25)"
                      : arrivalBadge.variant === "active"
                      ? "rgba(16, 185, 129, 0.25)"
                      : "rgba(56, 189, 248, 0.2)",
                  border: `1.5px solid ${
                    arrivalBadge.variant === "error"
                      ? THEME.colors.accentRose
                      : arrivalBadge.variant === "active"
                      ? THEME.colors.accentEmerald
                      : THEME.colors.accentCyan
                  }`,
                  color:
                    arrivalBadge.variant === "error"
                      ? THEME.colors.badText
                      : arrivalBadge.variant === "active"
                      ? THEME.colors.goodText
                      : THEME.colors.tipText,
                  fontSize: "13px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                }}
              >
                {arrivalBadge.label}
              </div>
            )}
          </div>
        );
      })}

      {/* Active Moving Packet Layer */}
      {activeStage && (() => {
        const fromNode = nodeMap.get(activeStage.from)!;
        const toNode = nodeMap.get(activeStage.to)!;

        const fromW = fromNode.width || 260;
        const fromH = fromNode.height || 105;
        const toW = toNode.width || 260;
        const toH = toNode.height || 105;

        const isGoingDown = toNode.y > fromNode.y;
        const startPoint = {
          x: fromNode.x + fromW / 2,
          y: isGoingDown ? fromNode.y + fromH : fromNode.y,
        };
        const endPoint = {
          x: toNode.x + toW / 2,
          y: isGoingDown ? toNode.y : toNode.y + toH,
        };

        const midY = (startPoint.y + endPoint.y) / 2;
        const p1 = { x: startPoint.x, y: midY };
        const p2 = { x: endPoint.x, y: midY };

        // Progress math
        const duration = activeStage.durationInFrames || 22;
        const stageProgress = spring({
          frame: frame - activeStage.startFrame,
          fps,
          durationInFrames: duration,
          config: { damping: 15, stiffness: 100 },
        });

        // Compute current coordinates on cubic bezier curve
        const currentCoord = getCubicBezierPoint(
          startPoint,
          p1,
          p2,
          endPoint,
          stageProgress
        );

        const packetColor = getVariantColor(activeStage.variant);

        return (
          <div
            style={{
              position: "absolute",
              left: `${currentCoord.x}px`,
              top: `${currentCoord.y}px`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* Moving Payload Pill Label */}
            {activeStage.payloadLabel && (
              <div
                style={{
                  marginBottom: "8px",
                  padding: "4px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(11, 15, 25, 0.95)",
                  border: `1.5px solid ${packetColor}`,
                  boxShadow: `0 0 20px ${packetColor}66`,
                  color: packetColor,
                  fontFamily: THEME.fonts.code,
                  fontSize: "14px",
                  fontWeight: 900,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                {activeStage.payloadLabel}
              </div>
            )}

            {/* Glowing Packet Orb Token */}
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: packetColor,
                boxShadow: `0 0 25px ${packetColor}, 0 0 50px ${packetColor}88`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0B0F19",
              }}
            >
              {activeStage.icon || <Send size={20} strokeWidth={2.5} />}
            </div>
          </div>
        );
      })()}

      {/* Bottom Takeaway / Phase Note */}
      {currentNote && (
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "20px",
            right: "20px",
            padding: "16px 22px",
            borderRadius: "16px",
            backgroundColor: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${
              activeStage
                ? getVariantColor(activeStage.variant)
                : THEME.colors.accentEmerald
            }`,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            backdropFilter: "blur(12px)",
            zIndex: 4,
          }}
        >
          <CheckCircle2
            size={26}
            color={
              activeStage
                ? getVariantColor(activeStage.variant)
                : THEME.colors.accentEmerald
            }
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.35,
            }}
          >
            {currentNote}
          </span>
        </div>
      )}
    </div>
  );
};
