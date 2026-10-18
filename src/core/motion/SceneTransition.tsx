import React from "react";
import { useVideoConfig } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
  type TransitionTiming,
  type TransitionPresentation,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { none } from "@remotion/transitions/none";
import { iris } from "@remotion/transitions/iris";
import { SoundCue, type SoundCueType } from "./SoundCue";

export type SceneTransitionType = "cut" | "fade" | "wipe" | "slide" | "iris";
export type TransitionDirection = "from-left" | "from-right" | "from-top" | "from-bottom";

export interface SceneTransitionConfig {
  /** Transition visual effect */
  type: SceneTransitionType;
  /** Duration of transition in frames (default: 15 for animated, 1 for cut) */
  durationInFrames?: number;
  /** Direction for wipe or slide (default: "from-right") */
  direction?: TransitionDirection;
  /** Timing function: "linear" or "spring" (default: "linear") */
  timing?: "linear" | "spring";
  /** Spring physics config if timing is "spring" */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Synchronized sound cue accompanying the transition */
  soundCue?: SoundCueType;
  /** Audio volume for transition sound cue (default: 0.28) */
  soundVolume?: number;
}

export interface SceneItem {
  id: string;
  durationInFrames: number;
  content: React.ReactNode;
  /** Transition connecting this scene to the subsequent scene */
  transitionToNext?: SceneTransitionConfig;
}

export interface SceneTimingBoundary {
  id: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  transitionStartFrame?: number;
}

/**
 * Calculates the exact total duration of a scene sequence,
 * rigorously accounting for scene overlap during transitions.
 */
export const calculateSequenceTotalDuration = (scenes: SceneItem[]): number => {
  if (scenes.length === 0) return 0;
  if (scenes.length === 1) return scenes[0].durationInFrames;

  let totalDuration = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    if (scene.durationInFrames <= 0) {
      throw new Error(`[SceneSequence Error]: Scene "${scene.id}" must have durationInFrames > 0.`);
    }

    totalDuration += scene.durationInFrames;

    if (i < scenes.length - 1) {
      const transition = scene.transitionToNext;
      if (transition && transition.type !== "cut") {
        const tDuration = transition.durationInFrames ?? 15;
        const nextScene = scenes[i + 1];

        if (tDuration >= scene.durationInFrames) {
          throw new Error(
            `[SceneSequence Error]: Transition from "${scene.id}" has duration ${tDuration} frames, which exceeds scene duration (${scene.durationInFrames}f).`
          );
        }
        if (tDuration >= nextScene.durationInFrames) {
          throw new Error(
            `[SceneSequence Error]: Transition from "${scene.id}" to "${nextScene.id}" has duration ${tDuration} frames, which exceeds incoming scene duration (${nextScene.durationInFrames}f).`
          );
        }

        // Transitions cause overlapping of outgoing and incoming scenes
        totalDuration -= tDuration;
      }
    }
  }

  return totalDuration;
};

/**
 * Calculates deterministic frame boundaries for each scene in the sequence.
 * Essential for subtitle, caption, and audio synchronization.
 */
export const calculateSceneTimingBoundaries = (scenes: SceneItem[]): SceneTimingBoundary[] => {
  const boundaries: SceneTimingBoundary[] = [];
  let currentStart = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const duration = scene.durationInFrames;
    const end = currentStart + duration;
    const transition = scene.transitionToNext;

    let transitionStart: number | undefined;

    if (i < scenes.length - 1 && transition && transition.type !== "cut") {
      const tDuration = transition.durationInFrames ?? 15;
      transitionStart = end - tDuration;
      boundaries.push({
        id: scene.id,
        startFrame: currentStart,
        endFrame: end,
        durationInFrames: duration,
        transitionStartFrame: transitionStart,
      });
      // Next scene begins right as the transition starts
      currentStart = transitionStart;
    } else {
      boundaries.push({
        id: scene.id,
        startFrame: currentStart,
        endFrame: end,
        durationInFrames: duration,
      });
      currentStart = end;
    }
  }

  return boundaries;
};

/**
 * Resolves presentation object for Remotion's TransitionSeries
 */
export const resolveTransitionPresentation = (
  type: SceneTransitionType,
  direction: TransitionDirection = "from-right",
  dimensions: { width: number; height: number } = { width: 1080, height: 1920 }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): TransitionPresentation<any> => {
  switch (type) {
    case "fade":
      return fade();
    case "wipe":
      return wipe({ direction });
    case "slide":
      return slide({ direction });
    case "iris":
      return iris({ width: dimensions.width, height: dimensions.height });
    case "cut":
    default:
      return none();
  }
};

/**
 * Resolves timing function (linear or spring) for Remotion's TransitionSeries
 */
export const resolveTransitionTiming = (
  config: SceneTransitionConfig
): TransitionTiming => {
  const durationInFrames = config.durationInFrames ?? 15;

  if (config.timing === "spring") {
    return springTiming({
      durationInFrames,
      config: config.springConfig || { damping: 14, stiffness: 120 },
    });
  }

  return linearTiming({ durationInFrames });
};

export interface SceneSequenceProps {
  /** Ordered list of scenes with individual durations and exit transitions */
  scenes: SceneItem[];
  /** Container style overrides */
  style?: React.CSSProperties;
}

/**
 * Declarative SceneSequence component.
 * Connects scenes with story-appropriate transitions (cut, fade, wipe, slide, iris),
 * handles frame overlap calculations, and automatically plays synchronized sound cues.
 */
export const SceneSequence: React.FC<SceneSequenceProps> = ({ scenes, style }) => {
  const { width, height } = useVideoConfig();

  // 1. Validate all boundaries and overlap contracts
  calculateSequenceTotalDuration(scenes);
  const boundaries = calculateSceneTimingBoundaries(scenes);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      {/* 2. Visual Transition Series */}
      <TransitionSeries>
        {scenes.map((scene, idx) => {
          const isLast = idx === scenes.length - 1;
          const transition = scene.transitionToNext;

          return (
            <React.Fragment key={scene.id}>
              <TransitionSeries.Sequence durationInFrames={scene.durationInFrames}>
                {scene.content}
              </TransitionSeries.Sequence>

              {!isLast && transition && transition.type !== "cut" && (
                <TransitionSeries.Transition
                  presentation={resolveTransitionPresentation(
                    transition.type,
                    transition.direction,
                    { width, height }
                  )}
                  timing={resolveTransitionTiming(transition)}
                />
              )}
            </React.Fragment>
          );
        })}
      </TransitionSeries>

      {/* 3. Synchronized Sound Cues (fired at transition start frames) */}
      {scenes.map((scene, idx) => {
        const transition = scene.transitionToNext;
        if (!transition?.soundCue) return null;
        const boundary = boundaries[idx];
        const triggerFrame = boundary.transitionStartFrame ?? boundary.endFrame;

        return (
          <SoundCue
            key={`sfx-${scene.id}`}
            type={transition.soundCue}
            atFrame={triggerFrame}
            volume={transition.soundVolume ?? 0.28}
          />
        );
      })}
    </div>
  );
};
