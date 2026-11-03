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
import { ITShortEpisodeProps } from "./data/it-001-nestjs-lifecycle";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3LifecycleDiagram } from "./scenes/Scene3LifecycleDiagram";
import { Scene4Promo } from "./scenes/Scene4Promo";
import { Scene5OutroCTA } from "./scenes/Scene5OutroCTA";

export const ITShort: React.FC<ITShortEpisodeProps> = ({
  audioSrc,
  subtitles,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(
    frame,
    [0, durationInFrames || 1350],
    [1, 1.025],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* 2. Synchronized SFX (Sound Cues) - volumes <= 0.30 to protect speech clarity */}
      {/* Beat 1: Hook Pop */}
      <Sequence durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.28} />
      </Sequence>

      {/* Beat 2: Problem Whoosh */}
      <Sequence from={210} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>

      {/* Beat 3: Solution Lifecycle Diagram Whoosh */}
      <Sequence from={375} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      {/* Guard Check Ding */}
      <Sequence from={520} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>
      {/* Interceptor Transition Pop */}
      <Sequence from={670} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>

      {/* Beat 4: Promo Transition Whoosh & Ding */}
      <Sequence from={850} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={855} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>

      {/* Beat 5: Outro Ding */}
      <Sequence from={1065} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={1070} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.28} />
      </Sequence>

      {/* 3. Main Stage Container with Cinematic Camera Movement */}
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
        <Branding
          seriesName="NESTJS DEEP DIVE #01"
          channelName="@laptrinhfullstack"
        />

        {/* Central Dynamic Stage (One Visual Idea at a Time) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "18px 0",
          }}
        >
          {/* Scene 1: The Hook (0s - 7.0s / 210 frames) */}
          <Sequence durationInFrames={210}>
            <Scene1Hook />
          </Sequence>

          {/* Scene 2: Problem - Confusing Lifecycle (7.0s - 12.5s / 165 frames) */}
          <Sequence from={210} durationInFrames={165}>
            <Scene2Problem />
          </Sequence>

          {/* Scene 3: Solution - Lifecycle Architecture Diagram (12.5s - 28.33s / 475 frames) */}
          <Sequence from={375} durationInFrames={475}>
            <Scene3LifecycleDiagram />
          </Sequence>

          {/* Scene 4: Reusable Course Advertisement (28.33s - 35.5s / 215 frames) */}
          <Sequence from={850} durationInFrames={215}>
            <Scene4Promo />
          </Sequence>

          {/* Scene 5: Instructor Branding & Follow CTA (35.5s - 45.0s / 285 frames) */}
          <Sequence from={1065} durationInFrames={285}>
            <Scene5OutroCTA />
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

