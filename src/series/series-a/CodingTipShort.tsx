import React from "react";
import {
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { SafeLayout } from "../../core/SafeLayout";
import { Branding } from "../../core/Branding";
import { MacWindow } from "../../core/MacWindow";
import { CodeBlock } from "../../core/CodeBlock";
import { KineticCaptions } from "../../core/KineticCaptions";
import { SeriesAShortProps } from "../../core/types";
import { THEME } from "../../core/theme";

export const CodingTipShort: React.FC<SeriesAShortProps> = ({
  topicTitle,
  hookText,
  audioSrc,
  subtitles,
  scenes,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for top title
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Calculate timing for Bad Code vs Good Code
  const hookDuration = scenes.hookDurationFrames;
  const isGoodCodePhase = frame >= hookDuration;

  // Transition spring when switching from Bad Code to Good Code
  const codeTransition = spring({
    frame: frame - hookDuration,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const activeScene = isGoodCodePhase ? scenes.goodCode : scenes.badCode;
  const isBad = !isGoodCodePhase;

  return (
    <SafeLayout>
      {/* Voiceover Audio */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* Top Branding Bar */}
      <Branding seriesName="REACT TIPS #01" channelName="@laptrinhfullstack" />

      {/* Main Hook & Title Header */}
      <div
        style={{
          transform: `scale(${titleEntrance})`,
          opacity: titleEntrance,
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
            color: isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald,
            fontWeight: 800,
            fontSize: "24px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {isBad ? (
            <>
              <AlertTriangle size={28} />
              <span>Cảnh báo hiệu năng</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={28} />
              <span>Giải pháp tối ưu</span>
            </>
          )}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "44px",
            fontWeight: 900,
            lineHeight: 1.25,
            color: THEME.colors.textPrimary,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          {topicTitle}
        </h1>
      </div>

      {/* Code Card Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          perspective: "1000px",
        }}
      >
        <div
          style={{
            transform: isGoodCodePhase
              ? `translateY(${(1 - codeTransition) * 30}px) scale(${0.96 + codeTransition * 0.04})`
              : "none",
            opacity: isGoodCodePhase ? codeTransition : 1,
          }}
        >
          <MacWindow
            filename={activeScene.title}
            glow={isBad ? "bad" : "good"}
            tag={activeScene.tag}
          >
            <CodeBlock
              code={activeScene.code}
              language={activeScene.language}
              highlightLines={activeScene.highlightLines}
              fontSize={24}
            />
          </MacWindow>
        </div>

        {/* Takeaway / Explainer Banner */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px 20px",
            borderRadius: "14px",
            backgroundColor: isBad
              ? "rgba(244, 63, 94, 0.1)"
              : "rgba(16, 185, 129, 0.1)",
            border: `1.5px solid ${
              isBad ? "rgba(244, 63, 94, 0.3)" : "rgba(16, 185, 129, 0.3)"
            }`,
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Lightbulb
            size={28}
            color={isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald}
            style={{ flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
              lineHeight: 1.4,
            }}
          >
            {isBad
              ? hookText
              : scenes.takeawayText}
          </span>
        </div>
      </div>

      {/* Bottom Kinetic Captions Area */}
      <div style={{ marginTop: "32px" }}>
        <KineticCaptions words={subtitles.words} />
      </div>
    </SafeLayout>
  );
};
