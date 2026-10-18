import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { WordCaption } from "./types";
import { THEME } from "./theme";

interface KineticCaptionsProps {
  words: WordCaption[];
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({ words }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!words || words.length === 0) return null;

  // Find active word index
  let activeIndex = words.findIndex(
    (w) => frame >= w.startFrame && frame <= w.endFrame
  );

  // If between words, pick the closest one
  if (activeIndex === -1) {
    activeIndex = words.findIndex((w) => w.startFrame > frame);
    if (activeIndex > 0) activeIndex -= 1;
    if (activeIndex === -1) activeIndex = words.length - 1;
  }

  // Display a chunk of words (e.g. 4-5 words per screen to avoid clutter)
  const CHUNK_SIZE = 5;
  const chunkIndex = Math.floor(activeIndex / CHUNK_SIZE);
  const startIndex = chunkIndex * CHUNK_SIZE;
  const currentChunk = words.slice(startIndex, startIndex + CHUNK_SIZE);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "110px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 24px",
        backgroundColor: "rgba(17, 24, 39, 0.75)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px 16px",
          textAlign: "center",
        }}
      >
        {currentChunk.map((w, i) => {
          const globalIdx = startIndex + i;
          const isActive = globalIdx === activeIndex;
          const isPast = frame > w.endFrame;

          // Spring bounce for the active word
          const activeBounce = isActive
            ? spring({
                frame: frame - w.startFrame,
                fps,
                config: { damping: 10, stiffness: 200 },
              })
            : 1;

          const scale = isActive ? 1 + activeBounce * 0.15 : 1;
          const color = isActive
            ? THEME.colors.accentAmber
            : isPast
            ? THEME.colors.textPrimary
            : THEME.colors.textMuted;

          const shadow = isActive ? THEME.shadows.textGlow : "none";

          return (
            <span
              key={`${globalIdx}-${w.word}`}
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "36px",
                fontWeight: isActive ? 900 : 700,
                color,
                textShadow: shadow,
                transform: `scale(${scale})`,
                display: "inline-block",
                letterSpacing: "-0.01em",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
