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
import { JsEventLoopEpisodeProps } from "./data/js-event-loop";
import { Scene1Hook } from "./scenes/js-event-loop/Scene1Hook";
import { Scene2CodePuzzle } from "./scenes/js-event-loop/Scene2CodePuzzle";
import { Scene3Verdict } from "./scenes/js-event-loop/Scene3Verdict";
import { Scene4EventLoopDiagram } from "./scenes/js-event-loop/Scene4EventLoopDiagram";
import { Scene5Takeaway } from "./scenes/js-event-loop/Scene5Takeaway";

export const EventLoopShort: React.FC<JsEventLoopEpisodeProps> = ({
  audioSrc,
  subtitles,
  code,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(frame, [0, durationInFrames || 1346], [1, 1.03], {
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

      {/* Beat 2 Code Puzzle Whoosh & Number Pops */}
      <Sequence from={113} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={177} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={190} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={207} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={223} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={233} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.6} />
      </Sequence>

      {/* Beat 3 Verdict Whoosh & Ding/Punch */}
      <Sequence from={308} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={310} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.75} />
      </Sequence>

      {/* Beat 4 Event Loop Diagram Whoosh & Transitions */}
      <Sequence from={583} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={795} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={915} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={1015} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={1065} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={1105} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={1145} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.65} />
      </Sequence>

      {/* Beat 5 Takeaway Whoosh & Ding */}
      <Sequence from={1178} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={1182} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.7} />
      </Sequence>

      {/* 3. Confetti Celebration at Verdict Reveal (Frame 310) */}
      <SuccessConfetti triggerFrame={310} />

      {/* 4. Film Stage Container with Cinematic Motion */}
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
        <Branding seriesName="JAVASCRIPT TIPS #02" channelName="@laptrinhfullstack" />

        {/* Central Dynamic Stage (One Visual Idea at a Time) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "24px 0",
          }}
        >
          {/* Scene 1: The Hook Question (0s - 3.8s / 115 frames) */}
          <Sequence durationInFrames={115}>
            <Scene1Hook />
          </Sequence>

          {/* Scene 2: Code Snippet & Intuition Trap (3.8s - 10.3s / 195 frames) */}
          <Sequence from={115} durationInFrames={195}>
            <Scene2CodePuzzle code={code} />
          </Sequence>

          {/* Scene 3: Verdict Reveal (10.3s - 19.5s / 275 frames) */}
          <Sequence from={310} durationInFrames={275}>
            <Scene3Verdict />
          </Sequence>

          {/* Scene 4: 3-Container Infographic Engine (19.5s - 39.3s / 595 frames) */}
          <Sequence from={585} durationInFrames={595}>
            <Scene4EventLoopDiagram />
          </Sequence>

          {/* Scene 5: 3 Golden Rules & CTA (39.3s - 44.87s / 166 frames) */}
          <Sequence from={1180} durationInFrames={166}>
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
