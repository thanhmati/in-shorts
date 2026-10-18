import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";

interface AudioEqualizerProps {
  isSpeaking?: boolean;
  barCount?: number;
  color?: string;
}

export const AudioEqualizer: React.FC<AudioEqualizerProps> = ({
  isSpeaking = true,
  barCount = 18,
  color = THEME.colors.accentCyan,
}) => {
  const frame = useCurrentFrame();

  const bars = Array.from({ length: barCount }, (_, i) => {
    // Generate organic wave heights using sine harmonics
    const speed = isSpeaking ? 8 : 25;
    const amplitude = isSpeaking ? 35 : 8;
    const minHeight = 6;

    const wave1 = Math.sin((frame / speed) + (i * 0.45)) * amplitude;
    const wave2 = Math.cos((frame / (speed * 0.7)) + (i * 0.3)) * (amplitude * 0.4);
    const height = Math.max(minHeight, Math.abs(wave1 + wave2) + minHeight);

    return height;
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        height: "50px",
        padding: "0 12px",
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: "4px",
            height: `${h}px`,
            backgroundColor: color,
            borderRadius: "4px",
            boxShadow: `0 0 8px ${color}`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
};
