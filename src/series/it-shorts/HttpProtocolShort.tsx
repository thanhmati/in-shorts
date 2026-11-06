import React, { useMemo } from "react";
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
import { ITShortEpisodeProps } from "./data/it-003-http-protocol";
import outroSubtitlesJson from "../../../public/audio/udemy-promo-outro.json";
import { Scene1GlobeHook } from "./scenes/http-protocol/Scene1GlobeHook";
import { Scene2UniversalLanguage } from "./scenes/http-protocol/Scene2UniversalLanguage";
import { Scene3RequestEnvelope } from "./scenes/http-protocol/Scene3RequestEnvelope";
import { Scene4ServerResponse } from "./scenes/http-protocol/Scene4ServerResponse";
import { Scene5StatusCodes } from "./scenes/http-protocol/Scene5StatusCodes";
import { Scene6CoursePromo } from "./scenes/http-protocol/Scene6CoursePromo";

export const PROMO_START_FRAME = 1477;
export const PROMO_DURATION = 265;
export const HTTP_SHORT_TOTAL_FRAMES = PROMO_START_FRAME + PROMO_DURATION; // 1742 (~58.06s @ 30 FPS)

export const HttpProtocolShort: React.FC<ITShortEpisodeProps> = ({
  audioSrc,
  subtitles,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Combined synchronized subtitles: Part 1 (Concept) + Course Promo Outro
  const combinedWords = useMemo(() => {
    const part1 = subtitles.words.filter(
      (w) => w.endFrame <= PROMO_START_FRAME
    );

    const promoWords = (
      outroSubtitlesJson.words as typeof subtitles.words
    ).map((w) => ({
      ...w,
      startFrame: w.startFrame + PROMO_START_FRAME,
      endFrame: w.endFrame + PROMO_START_FRAME,
      startSec: (w.startFrame + PROMO_START_FRAME) / 30,
      endSec: (w.endFrame + PROMO_START_FRAME) / 30,
    }));

    return [...part1, ...promoWords];
  }, [subtitles]);

  // Subtle continuous cinematic camera drift
  const cameraScale = interpolate(
    frame,
    [0, durationInFrames || HTTP_SHORT_TOTAL_FRAMES],
    [1, 1.025],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio Tracks */}
      {/* 1A. Main Concept Voiceover (Frames 0 -> 1477) */}
      <Sequence durationInFrames={PROMO_START_FRAME}>
        {audioSrc && <Audio src={staticFile(audioSrc)} />}
      </Sequence>

      {/* 1B. Course Promotion Outro Voiceover (Frames 1477 -> 1742) */}
      <Sequence from={PROMO_START_FRAME} durationInFrames={PROMO_DURATION}>
        <Audio src={staticFile("audio/udemy-promo-outro.mp3")} />
      </Sequence>

      {/* 2. Synchronized SFX (Sound Cues) */}
      {/* Scene 1: Hook Pop & Second Question */}
      <Sequence durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={110} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.25} />
      </Sequence>

      {/* Scene 2: Universal Language Whoosh & Rulebook Ding */}
      <Sequence from={295} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={315} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={390} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.25} />
      </Sequence>

      {/* Scene 3: Request Envelope Whoosh & Component Pops */}
      <Sequence from={600} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={760} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={915} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={1020} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={1075} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>

      {/* Scene 4: Server Processing Ding & Response Blast Whoosh */}
      <Sequence from={1103} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={1175} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>

      {/* Scene 5: Status Codes Whoosh, 200 Ding & 404 Pop */}
      <Sequence from={1270} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={1280} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={1375} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>

      {/* Scene 6: Course Promotion Outro Whoosh & Chime */}
      <Sequence from={PROMO_START_FRAME} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={PROMO_START_FRAME + 15} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.28} />
      </Sequence>

      {/* 3. Main Stage Container with Cinematic Drift */}
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
          seriesName="WEB PROTOCOL #03"
          channelName="@laptrinhfullstack"
        />

        {/* Central Dynamic Stage (One Action Beat per Scene) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "18px 0",
          }}
        >
          {/* Action 1: The Hook - Web Communication Network (0 - 9.83s / 295 frames) */}
          <Sequence durationInFrames={295}>
            <Scene1GlobeHook />
          </Sequence>

          {/* Action 2: Universal Language / Protocol Rule (9.83s - 20.00s / 305 frames) */}
          <Sequence from={295} durationInFrames={305}>
            <Scene2UniversalLanguage />
          </Sequence>

          {/* Action 3: HTTP Request Envelope (20.00s - 36.77s / 503 frames) */}
          <Sequence from={600} durationInFrames={503}>
            <Scene3RequestEnvelope />
          </Sequence>

          {/* Action 4: Server Processing & Response (36.77s - 42.33s / 167 frames) */}
          <Sequence from={1103} durationInFrames={167}>
            <Scene4ServerResponse />
          </Sequence>

          {/* Action 5: Status Codes 200 OK vs 404 (42.33s - 49.23s / 207 frames) */}
          <Sequence from={1270} durationInFrames={207}>
            <Scene5StatusCodes />
          </Sequence>

          {/* Action 6: Course Promotion Outro (49.23s - 58.06s / 265 frames) */}
          <Sequence from={PROMO_START_FRAME} durationInFrames={PROMO_DURATION}>
            <Scene6CoursePromo />
          </Sequence>
        </div>

        {/* Bottom Kinetic Captions (Word-by-word synchronized) */}
        <div style={{ marginBottom: "16px" }}>
          <KineticCaptions words={combinedWords} />
        </div>
      </div>
    </SafeLayout>
  );
};

