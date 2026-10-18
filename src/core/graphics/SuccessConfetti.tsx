import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Circle, Spark, Star } from "@remotion/shapes";
import { THEME } from "../theme";

interface SuccessConfettiProps {
  triggerFrame: number;
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 2 * Math.PI + (i % 2 === 0 ? 0.1 : -0.1);
  const distance = 160 + (i % 5) * 55;
  const size = 16 + (i % 3) * 8;
  const type = i % 3 === 0 ? "spark" : i % 3 === 1 ? "star" : "circle";
  const color =
    i % 4 === 0
      ? THEME.colors.accentEmerald
      : i % 4 === 1
      ? THEME.colors.accentCyan
      : i % 4 === 2
      ? THEME.colors.accentAmber
      : "#6EE7B7";

  return { angle, distance, size, type, color, id: i };
});

export const SuccessConfetti: React.FC<SuccessConfettiProps> = ({
  triggerFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = frame - triggerFrame;
  if (progress < 0 || progress > 45) return null;

  const explosion = spring({
    frame: progress,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const opacity = interpolate(progress, [0, 25, 45], [1, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {PARTICLES.map((p) => {
        const x = Math.cos(p.angle) * p.distance * explosion;
        const y = Math.sin(p.angle) * p.distance * explosion;
        const rotate = progress * (p.id % 2 === 0 ? 8 : -8);

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              opacity,
            }}
          >
            {p.type === "spark" ? (
              <Spark width={p.size * 2} height={p.size * 2} fill={p.color} />
            ) : p.type === "star" ? (
              <Star points={5} innerRadius={p.size * 0.4} outerRadius={p.size} fill={p.color} />
            ) : (
              <Circle radius={p.size * 0.6} fill={p.color} />
            )}
          </div>
        );
      })}
    </div>
  );
};
