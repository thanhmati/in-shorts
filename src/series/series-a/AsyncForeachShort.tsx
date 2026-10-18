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
import { AsyncForeachEpisodeProps } from "./data/async-foreach";
import { Scene1Hook } from "./scenes/async-foreach/Scene1Hook";
import { Scene2BadCode } from "./scenes/async-foreach/Scene2BadCode";
import { Scene3UnderTheHood } from "./scenes/async-foreach/Scene3UnderTheHood";
import { Scene4CleanCode } from "./scenes/async-foreach/Scene4CleanCode";
import { Scene5Takeaway } from "./scenes/async-foreach/Scene5Takeaway";

export const AsyncForeachShort: React.FC<AsyncForeachEpisodeProps> = ({
  audioSrc,
  subtitles,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(frame, [0, durationInFrames || 1270], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* 2. Procedural Sound Effects (SFX) Synchronized with Scene Transitions */}
      {/* Beat 1 Hook Pop */}
      <Sequence durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
      </Sequence>

      {/* Beat 2 Bad Code Transition */}
      <Sequence from={145} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.45} />
      </Sequence>
      {/* Terminal popup SFX */}
      <Sequence from={275} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
      </Sequence>

      {/* Beat 3 Under The Hood Transition */}
      <Sequence from={435} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.45} />
      </Sequence>

      {/* Beat 4 Clean Code Revelation & Confetti */}
      <Sequence from={725} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={728} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={795} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.5} />
      </Sequence>

      {/* Beat 5 Takeaway Transition */}
      <Sequence from={995} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={1000} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.6} />
      </Sequence>

      {/* 3. Confetti Explosion on Clean Code */}
      <SuccessConfetti triggerFrame={728} />

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
        {/* Top Branding Bar */}
        <Branding seriesName="JAVASCRIPT TIPS #03" channelName="@laptrinhfullstack" />

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
          {/* Beat 1: The Hook (0 - 5.0s / frames 0 - 150) */}
          <Sequence durationInFrames={150}>
            <Scene1Hook />
          </Sequence>

          {/* Beat 2: Bad Code & Silent Bug (5.0s - 14.67s / frames 150 - 440) */}
          <Sequence from={150} durationInFrames={290}>
            <Scene2BadCode />
          </Sequence>

          {/* Beat 3: Under The Hood Mechanism (14.67s - 24.33s / frames 440 - 730) */}
          <Sequence from={440} durationInFrames={290}>
            <Scene3UnderTheHood />
          </Sequence>

          {/* Beat 4: Clean Code Solution (24.33s - 33.33s / frames 730 - 1000) */}
          <Sequence from={730} durationInFrames={270}>
            <Scene4CleanCode />
          </Sequence>

          {/* Beat 5: Golden Rules & CTA (33.33s - 42.33s / frames 1000 - 1270) */}
          <Sequence from={1000} durationInFrames={270}>
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
