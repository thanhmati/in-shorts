import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Smartphone,
  Server,
  Database,
  Zap,
  Network,
  Layers,
  Cpu,
  HardDrive,
} from "lucide-react";
import { THEME } from "../theme";

export type NodeType =
  | "client"
  | "gateway"
  | "service"
  | "database"
  | "cache"
  | "queue"
  | "worker"
  | "custom";

export type NodeStatusVariant = "idle" | "active" | "error" | "cached" | "warning";

export interface NodeData {
  id: string;
  title: string;
  subtitle?: string;
  type?: NodeType;
  /** Explicit icon override from lucide-react */
  icon?: React.ReactNode;
  /** X coordinate in px (relative to graph container) */
  x: number;
  /** Y coordinate in px (relative to graph container) */
  y: number;
  /** Node box width in px (default: 260) */
  width?: number;
  /** Node box height in px (default: 105) */
  height?: number;
  /** Frame when node begins entrance (defaults to startFrame) */
  revealFrame?: number;
  /** Optional status badge */
  status?: {
    label: string;
    variant?: NodeStatusVariant;
    atFrame?: number;
  };
  /** Highlight active state */
  highlight?: {
    active: boolean;
    variant?: "cyan" | "emerald" | "rose" | "amber";
    startFrame?: number;
    endFrame?: number;
  };
}

export interface EdgeData {
  id: string;
  from: string; // source node id
  to: string; // target node id
  label?: string; // payload or request method
  direction?: "forward" | "backward" | "bidirectional" | "none";
  dashed?: boolean;
  color?: string;
  revealFrame?: number;
  drawDuration?: number;
  highlight?: {
    active: boolean;
    variant?: "cyan" | "emerald" | "rose" | "amber";
    startFrame?: number;
    endFrame?: number;
  };
}

export interface NodeGraphProps {
  /** Array of diagram nodes */
  nodes: NodeData[];
  /** Array of directional connections */
  edges?: EdgeData[];
  /** Graph container width in px (default: 960) */
  width?: number;
  /** Graph container height in px (default: 820) */
  height?: number;
  /** Overall graph entrance start frame (default: 0) */
  startFrame?: number;
  /** Optional diagram title / category header */
  title?: string;
  /** Container style overrides */
  style?: React.CSSProperties;
}

export const NodeGraph: React.FC<NodeGraphProps> = ({
  nodes,
  edges = [],
  width = 960,
  height = 820,
  startFrame = 0,
  title,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Technical validation of edge references
  const nodeMap = new Map<string, NodeData>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  edges.forEach((edge) => {
    if (!nodeMap.has(edge.from)) {
      throw new Error(
        `[NodeGraph Error]: Edge "${edge.id}" references non-existent source node "${edge.from}".`
      );
    }
    if (!nodeMap.has(edge.to)) {
      throw new Error(
        `[NodeGraph Error]: Edge "${edge.id}" references non-existent target node "${edge.to}".`
      );
    }
  });

  // Default icon resolver
  const getNodeIcon = (type?: NodeType, custom?: React.ReactNode) => {
    if (custom) return custom;
    switch (type) {
      case "client":
        return <Smartphone size={28} color={THEME.colors.accentCyan} />;
      case "gateway":
        return <Network size={28} color={THEME.colors.accentPurple} />;
      case "service":
        return <Server size={28} color={THEME.colors.accentCyan} />;
      case "database":
        return <Database size={28} color={THEME.colors.accentEmerald} />;
      case "cache":
        return <Zap size={28} color={THEME.colors.accentAmber} />;
      case "queue":
        return <Layers size={28} color={THEME.colors.accentAmber} />;
      case "worker":
        return <Cpu size={28} color={THEME.colors.accentCyan} />;
      case "custom":
      default:
        return <HardDrive size={28} color={THEME.colors.textPrimary} />;
    }
  };

  // Status badge styling
  const getStatusStyles = (variant: NodeStatusVariant = "idle") => {
    switch (variant) {
      case "active":
      case "cached":
        return {
          bg: "rgba(16, 185, 129, 0.2)",
          border: THEME.colors.accentEmerald,
          text: THEME.colors.goodText,
        };
      case "error":
        return {
          bg: "rgba(244, 63, 94, 0.2)",
          border: THEME.colors.accentRose,
          text: THEME.colors.badText,
        };
      case "warning":
        return {
          bg: "rgba(251, 191, 36, 0.2)",
          border: THEME.colors.accentAmber,
          text: THEME.colors.accentAmber,
        };
      case "idle":
      default:
        return {
          bg: "rgba(56, 189, 248, 0.15)",
          border: THEME.colors.accentCyan,
          text: THEME.colors.tipText,
        };
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
      {/* Optional Diagram Title Header */}
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
              fontFamily: THEME.fonts.sans,
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

      {/* SVG Layer for Connections */}
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
          {/* Arrow markers for edges */}
          <marker
            id="arrow-cyan"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={THEME.colors.accentCyan} />
          </marker>
          <marker
            id="arrow-emerald"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={THEME.colors.accentEmerald} />
          </marker>
          <marker
            id="arrow-amber"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={THEME.colors.accentAmber} />
          </marker>
          <marker
            id="arrow-default"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748B" />
          </marker>
        </defs>

        {edges.map((edge) => {
          const fromNode = nodeMap.get(edge.from)!;
          const toNode = nodeMap.get(edge.to)!;

          const fromW = fromNode.width || 260;
          const fromH = fromNode.height || 105;
          const toW = toNode.width || 260;
          const toH = toNode.height || 105;

          // Compute connection anchor coordinates
          // If toNode is below fromNode:
          const isBelow = toNode.y > fromNode.y + fromH * 0.7;
          let startX = fromNode.x + fromW / 2;
          let startY = fromNode.y + fromH;
          let endX = toNode.x + toW / 2;
          let endY = toNode.y;

          if (!isBelow) {
            // Horizontal relationship
            if (toNode.x > fromNode.x) {
              startX = fromNode.x + fromW;
              startY = fromNode.y + fromH / 2;
              endX = toNode.x;
              endY = toNode.y + toH / 2;
            } else {
              startX = fromNode.x;
              startY = fromNode.y + fromH / 2;
              endX = toNode.x + toW;
              endY = toNode.y + toH / 2;
            }
          }

          // Smooth curved bezier path
          const midY = (startY + endY) / 2;
          const pathD = isBelow
            ? `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
            : `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;

          // Edge progressive draw timing
          const edgeStart = edge.revealFrame ?? startFrame;
          const drawDuration = edge.drawDuration || 14;
          const edgeAge = frame - edgeStart;
          const isEdgeRevealed = edgeAge >= 0;

          const drawProgress = isEdgeRevealed
            ? spring({
                frame: edgeAge,
                fps,
                durationInFrames: drawDuration,
                config: { damping: 15, stiffness: 100 },
              })
            : 0;

          // Estimate path length for strokeDashoffset
          const approxLength = Math.hypot(endX - startX, endY - startY) * 1.25;

          // Highlight detection
          const isHighlighted =
            edge.highlight?.active &&
            frame >= (edge.highlight.startFrame ?? 0) &&
            (edge.highlight.endFrame === undefined ||
              frame <= edge.highlight.endFrame);

          const edgeColor = isHighlighted
            ? edge.highlight?.variant === "emerald"
              ? THEME.colors.accentEmerald
              : edge.highlight?.variant === "rose"
              ? THEME.colors.accentRose
              : edge.highlight?.variant === "amber"
              ? THEME.colors.accentAmber
              : THEME.colors.accentCyan
            : edge.color || "#475569";

          const markerId =
            edgeColor === THEME.colors.accentCyan
              ? "url(#arrow-cyan)"
              : edgeColor === THEME.colors.accentEmerald
              ? "url(#arrow-emerald)"
              : edgeColor === THEME.colors.accentAmber
              ? "url(#arrow-amber)"
              : "url(#arrow-default)";

          // Midpoint for connection label
          const labelX = (startX + endX) / 2;
          const labelY = (startY + endY) / 2;

          return (
            <g key={edge.id}>
              {/* Animated Path */}
              {isEdgeRevealed && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={edgeColor}
                  strokeWidth={isHighlighted ? 4 : 2.5}
                  strokeDasharray={
                    edge.dashed
                      ? "8, 6"
                      : `${approxLength}`
                  }
                  strokeDashoffset={
                    edge.dashed ? 0 : (1 - drawProgress) * approxLength
                  }
                  markerEnd={drawProgress > 0.85 ? markerId : undefined}
                  style={{
                    filter: isHighlighted
                      ? `drop-shadow(0 0 10px ${edgeColor})`
                      : "none",
                  }}
                />
              )}

              {/* Edge Label Pill */}
              {edge.label && isEdgeRevealed && drawProgress > 0.4 && (
                <foreignObject
                  x={labelX - 110}
                  y={labelY - 18}
                  width={220}
                  height={36}
                  style={{ overflow: "visible" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      opacity: interpolate(drawProgress, [0.4, 0.8], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <div
                      style={{
                        padding: "3px 12px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(11, 15, 25, 0.92)",
                        border: `1px solid ${edgeColor}`,
                        boxShadow: `0 4px 12px rgba(0, 0, 0, 0.6)`,
                        color: edgeColor,
                        fontFamily: THEME.fonts.code,
                        fontSize: "14px",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {edge.label}
                    </div>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {nodes.map((node) => {
        const nodeW = node.width || 260;
        const nodeH = node.height || 105;

        const nodeStart = node.revealFrame ?? startFrame;
        const nodeAge = frame - nodeStart;
        const isRevealed = nodeAge >= 0;

        const entrance = isRevealed
          ? spring({
              frame: nodeAge,
              fps,
              config: { damping: 13, stiffness: 120 },
            })
          : 0;

        // Highlight detection
        const isNodeHighlighted =
          node.highlight?.active &&
          frame >= (node.highlight.startFrame ?? 0) &&
          (node.highlight.endFrame === undefined ||
            frame <= node.highlight.endFrame);

        const highlightColor = isNodeHighlighted
          ? node.highlight?.variant === "emerald"
            ? THEME.colors.accentEmerald
            : node.highlight?.variant === "rose"
            ? THEME.colors.accentRose
            : node.highlight?.variant === "amber"
            ? THEME.colors.accentAmber
            : THEME.colors.accentCyan
          : THEME.colors.cardBorder;

        // Status badge timing
        const statusActive =
          node.status && (node.status.atFrame === undefined || frame >= node.status.atFrame);
        const statusStyles = getStatusStyles(node.status?.variant);

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
              border: `2px solid ${highlightColor}`,
              boxShadow: isNodeHighlighted
                ? `0 0 30px ${highlightColor}66, inset 0 0 16px ${highlightColor}22`
                : "0 15px 35px rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              padding: "16px 18px",
              gap: "14px",
              boxSizing: "border-box",
              transform: `scale(${entrance}) translateY(${(1 - entrance) * 16}px)`,
              opacity: entrance,
              zIndex: 3,
            }}
          >
            {/* Left Type Icon */}
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

            {/* Middle Title & Subtitle */}
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
                  fontFamily: THEME.fonts.sans,
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

            {/* Optional Status Pill Badge */}
            {statusActive && node.status && (
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "12px",
                  padding: "2px 10px",
                  borderRadius: "999px",
                  backgroundColor: statusStyles.bg,
                  border: `1.5px solid ${statusStyles.border}`,
                  color: statusStyles.text,
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  boxShadow: `0 0 12px ${statusStyles.border}44`,
                }}
              >
                {node.status.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
