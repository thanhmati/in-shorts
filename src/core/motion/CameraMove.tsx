import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CameraTransform {
  /** Scale factor (e.g. 1.0 to 1.2). Default: 1 */
  scale?: number;
  /** Horizontal pan offset in pixels. Default: 0 */
  x?: number;
  /** Vertical pan offset in pixels. Default: 0 */
  y?: number;
}

export type CameraEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "spring";

export interface CameraMoveSegment {
  /** Frame at which the camera movement begins */
  startFrame: number;
  /** Frame at which the camera movement ends (alternative to durationInFrames) */
  endFrame?: number;
  /** Duration of movement in frames (alternative to endFrame) */
  durationInFrames?: number;
  /** Target transform at completion */
  target: CameraTransform;
  /** Transform origin during this move (e.g. "center", "50% 35%") */
  transformOrigin?: string;
  /** Easing method (default: "ease-in-out") */
  easing?: CameraEasing;
  /** Spring physics config when easing is "spring" */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

export interface UseCameraTransformOptions {
  /** Initial transform at frame 0 (default: scale 1, x 0, y 0) */
  initial?: CameraTransform;
  /** Single move shorthand */
  move?: CameraMoveSegment;
  /** Sequence of camera movements over time */
  moves?: CameraMoveSegment[];
  /** Default transform origin (default: "50% 50%") */
  transformOrigin?: string;
}

export interface CameraTransformState {
  scale: number;
  x: number;
  y: number;
  transform: string;
  transformOrigin: string;
  style: React.CSSProperties;
}

/**
 * Hook to compute deterministic frame-based camera framing transforms.
 * Use when applying camera movement directly to an arbitrary container or canvas.
 */
export const useCameraTransform = (
  options: UseCameraTransformOptions
): CameraTransformState => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const {
    initial = { scale: 1, x: 0, y: 0 },
    move,
    moves: multiMoves,
    transformOrigin: defaultOrigin = "50% 50%",
  } = options;

  const baseScale = initial.scale ?? 1;
  const baseX = initial.x ?? 0;
  const baseY = initial.y ?? 0;

  // Build sorted segments list
  const rawSegments = multiMoves ? multiMoves.slice() : move ? [move] : [];
  const segments = rawSegments.sort((a, b) => a.startFrame - b.startFrame);

  if (segments.length === 0) {
    const transform = `translate3d(${baseX.toFixed(2)}px, ${baseY.toFixed(2)}px, 0px) scale(${baseScale.toFixed(4)})`;
    return {
      scale: baseScale,
      x: baseX,
      y: baseY,
      transform,
      transformOrigin: defaultOrigin,
      style: {
        transform,
        transformOrigin: defaultOrigin,
        willChange: "transform",
      },
    };
  }

  // Pre-calculate endpoints and boundaries for all segments
  interface ResolvedSegment {
    startFrame: number;
    endFrame: number;
    from: { scale: number; x: number; y: number };
    to: { scale: number; x: number; y: number };
    origin: string;
    easing: CameraEasing;
    springConfig?: { damping?: number; stiffness?: number; mass?: number };
  }

  const resolved: ResolvedSegment[] = [];
  let prevTarget = { scale: baseScale, x: baseX, y: baseY };

  for (const seg of segments) {
    const duration = seg.durationInFrames ?? (seg.endFrame ? seg.endFrame - seg.startFrame : 20);
    const end = seg.endFrame ?? seg.startFrame + duration;
    const target = {
      scale: seg.target.scale ?? prevTarget.scale,
      x: seg.target.x ?? prevTarget.x,
      y: seg.target.y ?? prevTarget.y,
    };

    resolved.push({
      startFrame: seg.startFrame,
      endFrame: Math.max(seg.startFrame + 1, end),
      from: { ...prevTarget },
      to: target,
      origin: seg.transformOrigin || defaultOrigin,
      easing: seg.easing || "ease-in-out",
      springConfig: seg.springConfig,
    });

    prevTarget = target;
  }

  // Evaluate current state based on current frame
  let currentScale = baseScale;
  let currentX = baseX;
  let currentY = baseY;
  let currentOrigin = defaultOrigin;

  // Check if before the first move
  if (frame < resolved[0].startFrame) {
    currentScale = baseScale;
    currentX = baseX;
    currentY = baseY;
    currentOrigin = defaultOrigin;
  } else {
    // Check if inside an active move
    const activeSeg = resolved.find(
      (s) => frame >= s.startFrame && frame <= s.endFrame
    );

    if (activeSeg) {
      currentOrigin = activeSeg.origin;
      const progress = calculateProgress(
        frame,
        activeSeg.startFrame,
        activeSeg.endFrame,
        fps,
        activeSeg.easing,
        activeSeg.springConfig
      );

      currentScale = interpolate(progress, [0, 1], [activeSeg.from.scale, activeSeg.to.scale]);
      currentX = interpolate(progress, [0, 1], [activeSeg.from.x, activeSeg.to.x]);
      currentY = interpolate(progress, [0, 1], [activeSeg.from.y, activeSeg.to.y]);
    } else {
      // Find latest completed segment
      const completed = resolved.filter((s) => frame > s.endFrame);
      if (completed.length > 0) {
        const last = completed[completed.length - 1];
        currentScale = last.to.scale;
        currentX = last.to.x;
        currentY = last.to.y;
        currentOrigin = last.origin;
      }
    }
  }

  // Clamping for mobile safe boundaries (prevents runaway zoom)
  const clampedScale = Math.min(1.4, Math.max(0.7, currentScale));

  const transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0px) scale(${clampedScale.toFixed(4)})`;

  return {
    scale: clampedScale,
    x: currentX,
    y: currentY,
    transform,
    transformOrigin: currentOrigin,
    style: {
      transform,
      transformOrigin: currentOrigin,
      willChange: "transform",
    },
  };
};

function calculateProgress(
  frame: number,
  start: number,
  end: number,
  fps: number,
  easing: CameraEasing,
  springConfig?: { damping?: number; stiffness?: number; mass?: number }
): number {
  const duration = Math.max(1, end - start);
  const elapsed = Math.max(0, frame - start);

  if (easing === "spring") {
    return spring({
      frame: elapsed,
      fps,
      durationInFrames: duration,
      config: springConfig || { damping: 14, stiffness: 120 },
    });
  }

  let remotionEasing = Easing.inOut(Easing.quad);
  if (easing === "linear") {
    remotionEasing = Easing.linear;
  } else if (easing === "ease-in") {
    remotionEasing = Easing.in(Easing.quad);
  } else if (easing === "ease-out") {
    remotionEasing = Easing.out(Easing.quad);
  }

  return interpolate(frame, [start, end], [0, 1], {
    easing: remotionEasing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export interface CameraMoveProps extends UseCameraTransformOptions {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Reusable CameraMove component.
 * Wraps focal visual content and applies smooth, controlled camera framing
 * without distorting or cropping root captions or branding overlays.
 */
export const CameraMove: React.FC<CameraMoveProps> = ({
  initial,
  move,
  moves,
  transformOrigin,
  className,
  style,
  children,
}) => {
  const camera = useCameraTransform({
    initial,
    move,
    moves,
    transformOrigin,
  });

  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...camera.style,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * High-utility camera movement presets for standard motion beats.
 */
export const CameraPresets = {
  /**
   * Subtle 3-4% push-in for establishing visual depth without distraction.
   */
  subtleDrift: (startFrame = 0, durationInFrames = 60): CameraMoveSegment => ({
    startFrame,
    durationInFrames,
    target: { scale: 1.04 },
    easing: "ease-out",
  }),

  /**
   * Snappy emphasis zoom to direct audience focus to critical code or diagram elements.
   */
  emphasisZoom: (
    startFrame: number,
    durationInFrames = 22,
    yOffset = -35,
    targetScale = 1.12
  ): CameraMoveSegment => ({
    startFrame,
    durationInFrames,
    target: { scale: targetScale, y: yOffset },
    easing: "spring",
    springConfig: { damping: 13, stiffness: 130 },
  }),

  /**
   * Smooth pull back to neutral framing after an emphasized beat.
   */
  pullBack: (startFrame: number, durationInFrames = 20): CameraMoveSegment => ({
    startFrame,
    durationInFrames,
    target: { scale: 1.0, x: 0, y: 0 },
    easing: "ease-in-out",
  }),
};
