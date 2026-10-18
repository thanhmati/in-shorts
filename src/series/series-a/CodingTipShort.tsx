import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SafeLayout } from "../../core/SafeLayout";
import { Branding } from "../../core/Branding";
import { KineticCaptions } from "../../core/KineticCaptions";
import { SuccessConfetti } from "../../core/graphics/SuccessConfetti";
import { SeriesAShortProps } from "../../core/types";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2BadCode } from "./scenes/Scene2BadCode";
import { Scene3MemoryExplainer } from "./scenes/Scene3MemoryExplainer";
import { Scene4CleanCode } from "./scenes/Scene4CleanCode";
import { Scene5Takeaway } from "./scenes/Scene5Takeaway";

export const CodingTipShort: React.FC<SeriesAShortProps> = ({
  audioSrc,
  subtitles,
  scenes,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(frame, [0, durationInFrames || 1193], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* 2. Procedural Sound Effects (SFX) Synchronized with Scene Transitions */}
      {/* Beat 1 Hook Pop */}
      <Sequence durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>

      {/* Beat 2 Bad Code Transition */}
      <Sequence from={133} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* Beat 3 Memory Explainer Transition */}
      <Sequence from={373} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* Beat 4 Clean Code Revelation */}
      <Sequence from={623} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={625} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.75} />
      </Sequence>

      {/* Beat 5 Takeaway Whoosh */}
      <Sequence from={923} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>

      {/* 3. Confetti Explosion on Clean Code */}
      <SuccessConfetti triggerFrame={625} />

      {/* 4. Film Stage Container with Camera Motion */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transform: `scale(${cameraScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Top Branding Bar with Audio Equalizer */}
        <Branding seriesName="REACT TIPS #01" channelName="@laptrinhfullstack" />

        {/* Central Dynamic Stage (One Visual Beat at a Time) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "24px 0",
          }}
        >
          {/* Beat 1: The Hook (0s - 4.5s) */}
          <Sequence durationInFrames={135}>
            <Scene1Hook />
          </Sequence>

          {/* Beat 2: Bad Code Close-up (4.5s - 12.5s) */}
          <Sequence from={135} durationInFrames={240}>
            <Scene2BadCode
              code={scenes.badCode.code}
              language={scenes.badCode.language}
              highlightLines={scenes.badCode.highlightLines}
            />
          </Sequence>

          {/* Beat 3: Under-the-Hood RAM Heap Explainer (12.5s - 20.8s) */}
          <Sequence from={375} durationInFrames={250}>
            <Scene3MemoryExplainer />
          </Sequence>

          {/* Beat 4: Clean Code & Fix Close-up (20.8s - 30.8s) */}
          <Sequence from={625} durationInFrames={300}>
            <Scene4CleanCode
              code={scenes.goodCode.code}
              language={scenes.goodCode.language}
              highlightLines={scenes.goodCode.highlightLines}
            />
          </Sequence>

          {/* Beat 5: Golden Rules & Call To Action (30.8s - 39.8s) */}
          <Sequence from={925} durationInFrames={268}>
            <Scene5Takeaway />
          </Sequence>
        </div>

        {/* Bottom Kinetic Captions (Word-by-word synchronized) */}
        <div style={{ marginBottom: "16px" }}>
          <KineticCaptions words={subtitles.words} />
        </div>
      </div>
    </SafeLayout>
  );
};
