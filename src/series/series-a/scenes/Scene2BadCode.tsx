import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Flame, ShieldAlert } from "lucide-react";
import { MacWindow } from "../../../core/MacWindow";
import { CodeBlock } from "../../../core/CodeBlock";
import { ReRenderCounter } from "../../../core/graphics/ReRenderCounter";
import { CodeHighlightLine } from "../../../core/types";
import { THEME } from "../../../core/theme";

interface Scene2BadCodeProps {
  code: string;
  language: string;
  highlightLines?: CodeHighlightLine[];
}

export const Scene2BadCode: React.FC<Scene2BadCodeProps> = ({
  code,
  language,
  highlightLines,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "16px",
      }}
    >
      {/* Top Diagnostic Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
        }}
      >
        <ReRenderCounter isBad={true} startFrame={15} />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            backgroundColor: "rgba(244, 63, 94, 0.15)",
            border: `1.5px solid ${THEME.colors.accentRose}`,
            color: THEME.colors.accentRose,
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          <Flame size={20} />
          <span>INLINE OBJECT & FUNCTION</span>
        </div>
      </div>

      {/* Hero Bad Code Window - Big, Clear, High-Contrast */}
      <MacWindow
        filename="BadParent.tsx"
        glow="bad"
        tag={{ text: "BAD CODE ❌", variant: "bad" }}
      >
        <CodeBlock
          code={code}
          language={language}
          highlightLines={highlightLines}
          fontSize={30}
        />
      </MacWindow>

      {/* Actionable Warning Callout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          borderRadius: "16px",
          backgroundColor: "rgba(244, 63, 94, 0.12)",
          border: `1.5px solid rgba(244, 63, 94, 0.35)`,
        }}
      >
        <ShieldAlert size={28} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: THEME.colors.textPrimary,
            lineHeight: 1.35,
          }}
        >
          Mỗi lần cha re-render, JavaScript cấp phát vùng nhớ hoàn toàn mới!
        </span>
      </div>
    </div>
  );
};
