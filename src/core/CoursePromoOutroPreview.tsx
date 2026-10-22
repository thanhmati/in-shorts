import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { SafeLayout } from "./SafeLayout";
import { Branding } from "./Branding";
import { CoursePromoOutro } from "./CoursePromoOutro";
import { KineticCaptions } from "./KineticCaptions";
import { SubtitleData } from "./types";
import outroSubtitlesJson from "../../public/audio/udemy-promo-outro.json";

export const udemyPromoOutroSubtitles = outroSubtitlesJson as unknown as SubtitleData;

export const CoursePromoOutroPreview: React.FC = () => {
  return (
    <SafeLayout>
      {/* 1. Voiceover Audio */}
      <Audio src={staticFile("audio/udemy-promo-outro.mp3")} />

      {/* 2. Synchronized SFX Cues */}
      <Sequence durationInFrames={20}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={15} durationInFrames={35}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.45} />
      </Sequence>

      {/* 3. Visual Stage */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Top Branding Bar */}
        <Branding
          seriesName="UDEMY PROMO OUTRO"
          channelName="@laptrinhfullstack"
        />

        {/* Central Dynamic Stage */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "20px 0",
            padding: "0 20px",
            boxSizing: "border-box",
            justifyContent: "center",
          }}
        >
          <CoursePromoOutro />
        </div>

        {/* Dynamic Kinetic Subtitles Bar synchronized with Voiceover */}
        <div
          style={{
            padding: "0 20px 20px 20px",
            boxSizing: "border-box",
          }}
        >
          <KineticCaptions words={udemyPromoOutroSubtitles.words} />
        </div>
      </div>
    </SafeLayout>
  );
};
