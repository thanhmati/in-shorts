import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";
import { MacWindow } from "../../../core/MacWindow";
import { CodeBlock } from "../../../core/CodeBlock";
import { CodeHighlightLine } from "../../../core/types";
import { THEME } from "../../../core/theme";

interface Scene4CleanCodeProps {
  code: string;
  language: string;
  highlightLines?: CodeHighlightLine[];
}

export const Scene4CleanCode: React.FC<Scene4CleanCodeProps> = ({
  code,
  language,
  highlightLines,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
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
      {/* Top Status Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4px",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: `1.5px solid ${THEME.colors.accentEmerald}`,
            color: THEME.colors.accentEmerald,
            fontSize: "19px",
            fontWeight: 800,
          }}
        >
          <Sparkles size={18} />
          <span>USEMEMO & USECALLBACK</span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: `1.5px solid ${THEME.colors.accentEmerald}`,
            color: THEME.colors.accentEmerald,
            fontSize: "19px",
            fontWeight: 800,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          <Zap size={18} />
          <span>CACHE REF: 0x1A4F</span>
        </div>
      </div>

      {/* Hero Clean Code Window */}
      <MacWindow
        filename="CleanParent.tsx"
        glow="good"
        tag={{ text: "CLEAN CODE ✅", variant: "good" }}
      >
        <CodeBlock
          code={code}
          language={language}
          highlightLines={highlightLines}
          fontSize={26}
        />
      </MacWindow>

      {/* Actionable Benefit Callout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          borderRadius: "16px",
          backgroundColor: "rgba(16, 185, 129, 0.12)",
          border: `1.5px solid rgba(16, 185, 129, 0.35)`,
        }}
      >
        <ShieldCheck size={30} color={THEME.colors.accentEmerald} style={{ flexShrink: 0 }} />
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: THEME.colors.textPrimary,
            lineHeight: 1.35,
          }}
        >
          Tham chiếu vùng nhớ được giữ nguyên. Component con hoàn toàn không bị re-render thừa!
        </span>
      </div>
    </div>
  );
};
