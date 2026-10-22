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
import { JsInterviewQuizEpisodeProps } from "./data/js-interview-quiz";
import { Scene0Hook } from "./scenes/js-interview-quiz/Scene0Hook";
import { SceneQuizCard } from "./scenes/js-interview-quiz/SceneQuizCard";
import { Scene6Outro } from "./scenes/js-interview-quiz/Scene6Outro";

export const JsInterviewQuizShort: React.FC<JsInterviewQuizEpisodeProps> = ({
  audioSrc,
  subtitles,
  questions,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(
    frame,
    [0, durationInFrames || 1669],
    [1, 1.025],
    { extrapolateRight: "clamp" }
  );

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio */}
      {audioSrc && <Audio src={staticFile(audioSrc)} />}

      {/* 2. Procedural Sound Effects (SFX) Synchronized with Scene Transitions */}
      {/* Intro Pop */}
      <Sequence durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
      </Sequence>

      {/* Q1 SFX */}
      <Sequence from={182} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={280} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* Q2 SFX */}
      <Sequence from={442} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={535} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* Q3 SFX */}
      <Sequence from={702} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={845} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* Q4 SFX */}
      <Sequence from={977} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={1088} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* Q5 SFX */}
      <Sequence from={1247} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={1345} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* Outro Transition & Celebration */}
      <Sequence from={1477} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={1485} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.5} />
      </Sequence>

      {/* Confetti Trigger at Outro evaluation */}
      <SuccessConfetti triggerFrame={1485} />

      {/* 3. Film Stage Container with Camera Motion */}
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
        <Branding
          seriesName="JS INTERVIEW QUIZ #01"
          channelName="@laptrinhfullstack"
        />

        {/* Central Dynamic Stage (One Visual Beat at a Time) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "20px 0",
            padding: "0 52px",
            boxSizing: "border-box",
            justifyContent: "center",
          }}
        >
          {/* Scene 0: Hook */}
          <Sequence durationInFrames={185} premountFor={10}>
            <Scene0Hook />
          </Sequence>

          {/* Scene 1: Question 1 */}
          <Sequence from={185} durationInFrames={445 - 185} premountFor={10}>
            <SceneQuizCard
              question={questions[0]}
              currentAbsoluteFrame={frame}
            />
          </Sequence>

          {/* Scene 2: Question 2 */}
          <Sequence from={445} durationInFrames={705 - 445} premountFor={10}>
            <SceneQuizCard
              question={questions[1]}
              currentAbsoluteFrame={frame}
            />
          </Sequence>

          {/* Scene 3: Question 3 */}
          <Sequence from={705} durationInFrames={980 - 705} premountFor={10}>
            <SceneQuizCard
              question={questions[2]}
              currentAbsoluteFrame={frame}
            />
          </Sequence>

          {/* Scene 4: Question 4 */}
          <Sequence from={980} durationInFrames={1250 - 980} premountFor={10}>
            <SceneQuizCard
              question={questions[3]}
              currentAbsoluteFrame={frame}
            />
          </Sequence>

          {/* Scene 5: Question 5 */}
          <Sequence from={1250} durationInFrames={1480 - 1250} premountFor={10}>
            <SceneQuizCard
              question={questions[4]}
              currentAbsoluteFrame={frame}
            />
          </Sequence>

          {/* Scene 6: Outro */}
          <Sequence from={1480} durationInFrames={1669 - 1480} premountFor={10}>
            <Scene6Outro />
          </Sequence>
        </div>

        {/* Dynamic Kinetic Subtitles Bar */}
        <div
          style={{
            padding: "0 52px 28px 52px",
            boxSizing: "border-box",
          }}
        >
          <KineticCaptions words={subtitles.words} />
        </div>
      </div>
    </SafeLayout>
  );
};
