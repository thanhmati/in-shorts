---
trigger: always_on
---

# ADDENDUM: PRODUCTION-GRADE REMOTION AGENT

## 1. PROJECT DISCOVERY — NEVER ASSUME

- Before editing, inspect the project instructions, PRD, package.json, current types, existing episodes, reusable components, and Remotion version.
- Verify all paths, scripts, component props, and schema requirements against the actual repository.
- Use project-relative paths instead of machine-specific absolute paths.
- Check the Git working tree and preserve unrelated user changes.
- Never overwrite an existing episode or asset without checking its ownership and intended update behavior.
- Reuse existing components and conventions whenever appropriate.

## 2. DIRECTOR DECISION ENGINE

- Plan visuals from the meaning and pacing of the narration, not from a fixed scene count.
- Each shot must have one clear visual focal point.
- A story beat does not automatically require a new Sequence.
- Choose between a cut, camera movement, highlight, reveal, or state transition based on the intended storytelling effect.
- Allow multiple visual elements when comparison or relationships are essential to understanding the concept.
- Do not add transitions, camera punches, or sound effects without a clear purpose.
- Every shot must communicate one primary idea and support the current narration.
- If a visual cannot be understood quickly on a mobile screen, simplify it.

## 3. SCRIPT AND TECHNICAL ACCURACY

- Prioritize correctness, clarity, and audience comprehension over word count.
- Use hooks that create genuine curiosity without fabricated statistics or unsupported claims.
- Validate code examples and technical statements before generating final narration.
- Verify version-sensitive behavior against reliable documentation or executable tests when feasible.
- Clearly distinguish general rules from assumptions and exceptions.
- Do not generate audio from a script that has unresolved technical inaccuracies.

## 4. AUDIO AND TIMELINE CONTRACT

- Inspect the actual TTS output schema before consuming its fields.
- Treat total audio duration and per-segment timestamps as separate requirements.
- Use available sentence or word timestamps to align visual events and captions.
- If precise timestamps are unavailable, use an explicit segmentation strategy and validate synchronization.
- Ensure all scene, subtitle, animation, and audio frame ranges are valid.
- Detect unintended overlaps, gaps, negative frame positions, and content extending beyond the composition duration.
- Verify audio and subtitle assets exist before registration and rendering.

## 5. MOBILE VISUAL QUALITY

- Treat font sizes as minimum design targets, not proof of readability.
- Validate text width, line count, safe areas, contrast, wrapping, and clipping.
- Do not solve overflow by silently shrinking typography below the defined minimum.
- Simplify code or split content into additional shots when necessary.
- Keep captions visually separate from code and other critical content.
- Use platform-aware safe areas and avoid placing important information under interface overlays.
- Apply animation consistently and avoid unnecessary motion.

## 6. REUSABLE REMOTION ARCHITECTURE

- Separate episode content, timeline data, visual components, and social metadata.
- Reuse existing visual primitives before introducing new components.
- Give each scene a stable identifier and validated timing data.
- Validate composition IDs, component props, asset paths, and episode schema before registration.
- Avoid duplicate registrations and unintended changes to existing episodes.
- Use deterministic frame-based animation and respect the installed Remotion version.

## 7. QUALITY GATES

Before reporting an episode as ready:

1. Validate episode data against the actual schema.
2. Run the project's TypeScript and lint checks using verified commands.
3. Validate timeline ranges, audio duration, subtitle timing, and asset existence.
4. Render the thumbnail and representative frames or a short preview when feasible.
5. Inspect visual output for clipping, layout defects, unreadable code, and timing mismatches.
6. Run relevant regression checks for existing compositions.
7. Fix detected defects and rerun the affected checks.

A successful lint command alone is not proof of rendering or visual correctness.

Do not claim that an unexecuted check passed. If a check cannot run, report it as unverified.

## 8. FAILURE RECOVERY AND IDEMPOTENCY

- Make each production step's inputs, outputs, and success conditions explicit.
- Record failures with actionable diagnostic information.
- Retry recoverable failures a limited number of times.
- Resume from valid completed artifacts when safe.
- Prevent duplicate registrations, duplicate output generation, and accidental overwrites.
- Stop when a required gate fails and cannot be recovered safely.
- Preserve unrelated changes and report unresolved issues instead of hiding them.

## 9. HANDOFF CONTRACT

Report only artifacts that actually exist and have been verified.

Distinguish clearly between:

- Generated
- Validated
- Preview-rendered
- Final-rendered

Do not imply that a video has been rendered merely because its composition is registered.

Provide the verified paths for the thumbnail and SEO file, the preview instructions, the checks performed, and any remaining limitations.

Only render the final MP4 when explicitly requested, unless the user has authorized a different workflow.

## 10. MOTION GRAPHICS & VISUAL PRIMITIVES USAGE GUIDELINES

AI agents MUST reuse the standardized motion graphics library in `src/core/motion/` instead of implementing bespoke, one-off animations.

### Component Selection Decision Matrix

| Storytelling Need | Required Motion Primitive | Best Practice |
|---|---|---|
| **Hook / Title / Technical Terms** | `KineticTypography` | Use `type="phrase"` or `"words"` for dynamic pacing; use `accentKeywords` to highlight keywords. |
| **Progressive Code Walkthrough** | `CodeReveal` | Set `linesPerSecond` matching voice narration; keeps code panel height stable. |
| **Spotlighting Critical Logic** | `CodeFocus` | Dim nonessential lines with `dimOpacity: 0.25`; place badge/pill indicator on focal line. |
| **Old vs New / Bad vs Good** | `BeforeAfter` | Use `mode="step-transform"` for mobile screen clarity rather than two side-by-side full panels. |
| **Architecture / Microservices** | `NodeGraph` | Define typed `nodes` and `edges`; use `flowAnimation` to show active connection paths. |
| **Request / Event Flow** | `PacketFlow` | Animate packet along sequential stages; display status label chips per stage. |
| **CLI / DevOps / Build Logs** | `TerminalSequence` | Simulate character-by-character typing with prompt; status-code colored output lines. |
| **Benchmarks / Performance Gain** | `ProgressMetric` | Use `type="benchmark-bars"` to compare $O(N)$ vs $O(1)$ with `deltaBadge` ($40\times$ faster). |
| **State Machine / Lifecycle** | `StateTransition` | Render step pipeline chain + hero card; specify causality triggers (`EVENT: ...`). |
| **Cinematic Focus Shift** | `CameraMove` | **Wrap only the focal element** (e.g. `MacWindow`), NEVER wrap the root canvas or captions. |
| **Synchronized Audio Feedback** | `SoundCue` | Map to `whoosh`, `pop`, `ding`. Keep `volume <= 0.32` so voiceover remains intelligible. |
| **Multi-Scene Orchestration** | `SceneTransition` (`SceneSequence`) | Calculate total duration using $\sum D_i - \sum T_i$; auto-sync sound cues at transition points. |

### Motion Execution Invariants

1. **Pure Remotion Animations**: Always use `spring()` or `interpolate()`. Never use CSS `transition`.
2. **Safe Framing**: Keep camera zoom clamped between $1.00$ and $1.15$ for focus beats. Never crop captions or header badges.
3. **Typography Minimums**: Mobile safe target $\ge 56\text{px}$ for headlines, $\ge 24\text{px} - 26\text{px}$ for code, $\ge 34\text{px}$ for captions.
4. **Reference Validation**: When authoring `NodeGraph`, `PacketFlow`, or `StateTransition`, verify that all referenced target IDs exist in the defined list.
