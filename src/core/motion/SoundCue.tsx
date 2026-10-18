import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export type SoundCueType = "whoosh" | "pop" | "ding" | "custom";

export interface SoundCueProps {
  /** Sound cue preset or custom */
  type: SoundCueType;
  /** Path relative to public/ directory (required if type is "custom") */
  src?: string;
  /** Frame at which the audio cue triggers (default: 0) */
  atFrame?: number;
  /** Volume level between 0.0 and 1.0 (default: 0.28 to maintain vocal clarity) */
  volume?: number;
  /** Playback speed multiplier (default: 1.0) */
  playbackRate?: number;
  /** Start trim offset in seconds or frames */
  startFrom?: number;
  /** End trim offset in seconds or frames */
  endAt?: number;
}

export const SOUND_ASSET_PATHS: Record<Exclude<SoundCueType, "custom">, string> = {
  whoosh: "sfx/whoosh.wav",
  pop: "sfx/pop.wav",
  ding: "sfx/ding.wav",
};

/**
 * Resolves and validates the static asset path for a sound cue.
 */
export const resolveSoundSrc = (type: SoundCueType, customSrc?: string): string => {
  if (type === "custom") {
    if (!customSrc) {
      throw new Error(`[SoundCue Error]: type is "custom" but no custom src path was provided.`);
    }
    const cleanPath = customSrc.startsWith("/") ? customSrc.slice(1) : customSrc;
    return staticFile(cleanPath);
  }

  const relPath = SOUND_ASSET_PATHS[type];
  if (!relPath) {
    throw new Error(`[SoundCue Error]: Unsupported sound cue type "${type}".`);
  }

  return staticFile(relPath);
};

/**
 * Reusable SoundCue component for synchronized, subtle audio reinforcement.
 * Automatically handles staticFile resolution, timeline frame offsets, and safe volume levels.
 */
export const SoundCue: React.FC<SoundCueProps> = ({
  type,
  src,
  atFrame = 0,
  volume = 0.28,
  playbackRate = 1.0,
  startFrom,
  endAt,
}) => {
  const resolvedSrc = resolveSoundSrc(type, src);
  // Clamp volume to safe ceiling (never exceed 1.0; recommended max 0.40 over speech)
  const safeVolume = Math.min(1.0, Math.max(0, volume));

  const audioElement = (
    <Audio
      src={resolvedSrc}
      volume={safeVolume}
      playbackRate={playbackRate}
      startFrom={startFrom}
      endAt={endAt}
    />
  );

  if (atFrame > 0) {
    return <Sequence from={atFrame}>{audioElement}</Sequence>;
  }

  return audioElement;
};
