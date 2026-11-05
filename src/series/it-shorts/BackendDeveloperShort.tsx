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
import { ITShortEpisodeProps } from "./data/it-002-backend-developer";
import outroSubtitlesJson from "../../../public/audio/udemy-promo-outro.json";
import { Scene1LoginHook } from "./scenes/backend-developer/Scene1LoginHook";
import { Scene2PacketJourney } from "./scenes/backend-developer/Scene2PacketJourney";
import { Scene3EngineWelcome } from "./scenes/backend-developer/Scene3EngineWelcome";
import { Scene4SecurityRateLimit } from "./scenes/backend-developer/Scene4SecurityRateLimit";
import { Scene5DatabaseQuery } from "./scenes/backend-developer/Scene5DatabaseQuery";
import { Scene6BcryptHash } from "./scenes/backend-developer/Scene6BcryptHash";
import { Scene7JwtSignature } from "./scenes/backend-developer/Scene7JwtSignature";
import { Scene8FaceVsBrain } from "./scenes/backend-developer/Scene8FaceVsBrain";
import { ScenePromoOutro } from "./scenes/backend-developer/ScenePromoOutro";

export const PROMO_START_FRAME = 1101;
export const PROMO_DURATION = 265;
export const BACKEND_SHORT_TOTAL_FRAMES = PROMO_START_FRAME + PROMO_DURATION; // 1366 (~45.53s)

export const BackendDeveloperShort: React.FC<ITShortEpisodeProps> = ({
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
    [0, durationInFrames || BACKEND_SHORT_TOTAL_FRAMES],
    [1, 1.025],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <SafeLayout>
      {/* 1. Voiceover Audio Tracks */}
      {/* 1A. Main Concept Voiceover (Frames 0 -> 1101) */}
      <Sequence durationInFrames={PROMO_START_FRAME}>
        {audioSrc && <Audio src={staticFile(audioSrc)} />}
      </Sequence>

      {/* 1B. Course Promotion Outro Voiceover (Frames 1101 -> 1366) */}
      <Sequence from={PROMO_START_FRAME} durationInFrames={PROMO_DURATION}>
        <Audio src={staticFile("audio/udemy-promo-outro.mp3")} />
      </Sequence>

      {/* 2. Synchronized SFX (Sound Cues) */}
      {/* Scene 1: Button Click Pop */}
      <Sequence from={45} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.28} />
      </Sequence>

      {/* Scene 2: Packet Journey Whoosh */}
      <Sequence from={105} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={225} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.24} />
      </Sequence>

      {/* Scene 3: Backend Engine Welcome Ding */}
      <Sequence from={310} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>

      {/* Scene 4: Rate Limit Shield Pop */}
      <Sequence from={420} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>

      {/* Scene 5: Database Query Whoosh & Ding */}
      <Sequence from={510} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={570} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>

      {/* Scene 6: Bcrypt Machine Pop & Lock Ding */}
      <Sequence from={613} durationInFrames={20}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={683} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.28} />
      </Sequence>

      {/* Scene 7: JWT Signature Ding & Return Whoosh */}
      <Sequence from={762} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={847} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.26} />
      </Sequence>

      {/* Scene 8: Face vs Brain Whoosh */}
      <Sequence from={934} durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>

      {/* Scene 9: Course Promotion Outro Whoosh & Chime */}
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
          seriesName="BACKEND ARCHITECTURE #02"
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
          {/* Action 1: The Hook - Click Login (0 - 3.5s / 105 frames) */}
          <Sequence durationInFrames={105}>
            <Scene1LoginHook />
          </Sequence>

          {/* Action 2: The Journey - From Client to Server (3.5s - 10.3s / 205 frames) */}
          <Sequence from={105} durationInFrames={205}>
            <Scene2PacketJourney />
          </Sequence>

          {/* Action 3: Welcome to Backend Engine (10.3s - 14.0s / 110 frames) */}
          <Sequence from={310} durationInFrames={110}>
            <Scene3EngineWelcome />
          </Sequence>

          {/* Action 4: Rate Limiting & Firewall (14.0s - 17.0s / 90 frames) */}
          <Sequence from={420} durationInFrames={90}>
            <Scene4SecurityRateLimit />
          </Sequence>

          {/* Action 5: Database Query (17.0s - 20.4s / 103 frames) */}
          <Sequence from={510} durationInFrames={103}>
            <Scene5DatabaseQuery />
          </Sequence>

          {/* Action 6: Bcrypt Hashing & Lock (20.4s - 25.4s / 149 frames) */}
          <Sequence from={613} durationInFrames={149}>
            <Scene6BcryptHash />
          </Sequence>

          {/* Action 7: JWT Signature & 200 OK (25.4s - 31.1s / 172 frames) */}
          <Sequence from={762} durationInFrames={172}>
            <Scene7JwtSignature />
          </Sequence>

          {/* Action 8: Frontend Face vs Backend Brain (31.1s - 36.7s / 167 frames) */}
          <Sequence from={934} durationInFrames={167}>
            <Scene8FaceVsBrain />
          </Sequence>

          {/* Action 9: Course Promotion Outro (36.7s - 45.53s / 265 frames) */}
          <Sequence from={PROMO_START_FRAME} durationInFrames={PROMO_DURATION}>
            <ScenePromoOutro />
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
