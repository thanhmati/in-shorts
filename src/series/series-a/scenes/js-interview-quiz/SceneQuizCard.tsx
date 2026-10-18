import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, Clock, HelpCircle, Lightbulb, XCircle } from "lucide-react";
import { THEME } from "../../../../core/theme";
import { MacWindow } from "../../../../core/MacWindow";
import { CodeBlock } from "../../../../core/CodeBlock";
import { QuizQuestion } from "../../data/js-interview-quiz";

interface SceneQuizCardProps {
  question: QuizQuestion;
  currentAbsoluteFrame: number;
}

export const SceneQuizCard: React.FC<SceneQuizCardProps> = ({
  question,
  currentAbsoluteFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast, crisp entrance animation (settles in ~6-8 frames, no lagging behind voice)
  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 220 },
  });

  const cardScale = interpolate(entranceProgress, [0, 1], [0.96, 1]);
  const cardOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  const isRevealed = currentAbsoluteFrame >= question.revealFrame;

  // Snappy reveal transition spring
  const revealProgress = spring({
    frame: Math.max(0, currentAbsoluteFrame - question.revealFrame),
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  // Countdown timer calculation (from start of question until reveal)
  const countdownDuration = Math.max(1, question.revealFrame - question.startFrame);
  const elapsedCountdown = Math.max(
    0,
    Math.min(countdownDuration, currentAbsoluteFrame - question.startFrame)
  );
  const timerPercent = Math.max(0, 100 - (elapsedCountdown / countdownDuration) * 100);

  // Pulse animation for countdown
  const timerPulse = 1 + Math.sin(frame / 3) * 0.04;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: "24px",
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
      }}
    >
      {/* 1. Header: Question Badge & Countdown Pill */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Question Counter */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 26px",
              borderRadius: "16px",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: `2px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
            }}
          >
            <HelpCircle size={26} color={THEME.colors.accentCyan} />
            <span
              style={{
                color: THEME.colors.accentCyan,
                fontWeight: 950,
                fontSize: "24px",
                letterSpacing: "0.06em",
              }}
            >
              {question.numberLabel}
            </span>
          </div>

          {/* Countdown Indicator */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 26px",
              borderRadius: "16px",
              backgroundColor: isRevealed
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(251, 191, 36, 0.2)",
              border: `2px solid ${
                isRevealed ? THEME.colors.accentEmerald : THEME.colors.accentAmber
              }`,
              boxShadow: `0 0 25px ${
                isRevealed
                  ? "rgba(16, 185, 129, 0.35)"
                  : "rgba(251, 191, 36, 0.35)"
              }`,
              transform: isRevealed ? "scale(1)" : `scale(${timerPulse})`,
            }}
          >
            <Clock
              size={24}
              color={
                isRevealed ? THEME.colors.accentEmerald : THEME.colors.accentAmber
              }
            />
            <span
              style={{
                color: isRevealed
                  ? THEME.colors.goodText
                  : THEME.colors.accentAmber,
                fontWeight: 950,
                fontSize: "22px",
                letterSpacing: "0.04em",
              }}
            >
              {isRevealed ? "HẾT GIỜ! 🔔" : "ĐANG ĐẾM NGƯỢC... ⏳"}
            </span>
          </div>
        </div>

        {/* Countdown Progress Line */}
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: isRevealed ? "0%" : `${timerPercent}%`,
              height: "100%",
              backgroundColor: isRevealed
                ? THEME.colors.accentEmerald
                : THEME.colors.accentAmber,
              boxShadow: `0 0 16px ${
                isRevealed ? THEME.colors.accentEmerald : THEME.colors.accentAmber
              }`,
            }}
          />
        </div>
      </div>

      {/* 2. Code MacWindow */}
      <div style={{ width: "100%" }}>
        <MacWindow
          filename="interview-code.js"
          glow={isRevealed ? "good" : "default"}
          tag={{
            text: isRevealed ? "ĐÃ MỞ ĐÁP ÁN" : "DỰ ĐOÁN KẾT QUẢ",
            variant: isRevealed ? "good" : "tip",
          }}
        >
          <div style={{ padding: "40px 32px" }}>
            <CodeBlock
              code={question.code}
              language="javascript"
              fontSize={38}
              lineHeight={1.65}
            />
          </div>
        </MacWindow>
      </div>

      {/* 3. Options Cards (A vs B) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Option A */}
        <div
          style={{
            width: "100%",
            padding: "24px 30px",
            borderRadius: "22px",
            backgroundColor: isRevealed
              ? question.optionA.isCorrect
                ? "rgba(16, 185, 129, 0.22)"
                : "rgba(244, 63, 94, 0.18)"
              : "rgba(17, 24, 39, 0.9)",
            border: `2.5px solid ${
              isRevealed
                ? question.optionA.isCorrect
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentRose
                : "rgba(255, 255, 255, 0.15)"
            }`,
            boxShadow: isRevealed
              ? question.optionA.isCorrect
                ? "0 0 30px rgba(16, 185, 129, 0.45)"
                : "0 0 20px rgba(244, 63, 94, 0.3)"
              : "0 10px 25px rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform:
              isRevealed && question.optionA.isCorrect
                ? `scale(${1 + 0.03 * revealProgress})`
                : "scale(1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: isRevealed
                  ? question.optionA.isCorrect
                    ? "rgba(16, 185, 129, 0.35)"
                    : "rgba(244, 63, 94, 0.35)"
                  : "rgba(255, 255, 255, 0.12)",
                color: isRevealed
                  ? question.optionA.isCorrect
                    ? THEME.colors.goodText
                    : THEME.colors.badText
                  : "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 950,
              }}
            >
              {question.optionA.label}
            </div>
            <span
              style={{
                fontSize: "36px",
                fontFamily: THEME.fonts.code,
                fontWeight: 800,
                color: isRevealed
                  ? question.optionA.isCorrect
                    ? THEME.colors.goodText
                    : THEME.colors.badText
                  : "#F8FAFC",
              }}
            >
              {question.optionA.value}
            </span>
          </div>

          {isRevealed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {question.optionA.isCorrect ? (
                <>
                  <CheckCircle2 size={34} color={THEME.colors.accentEmerald} />
                  <span
                    style={{
                      color: THEME.colors.goodText,
                      fontWeight: 950,
                      fontSize: "24px",
                    }}
                  >
                    ĐÚNG ✅
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={34} color={THEME.colors.accentRose} />
                  <span
                    style={{
                      color: THEME.colors.badText,
                      fontWeight: 950,
                      fontSize: "24px",
                    }}
                  >
                    SAI ❌
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Option B */}
        <div
          style={{
            width: "100%",
            padding: "24px 30px",
            borderRadius: "22px",
            backgroundColor: isRevealed
              ? question.optionB.isCorrect
                ? "rgba(16, 185, 129, 0.22)"
                : "rgba(244, 63, 94, 0.18)"
              : "rgba(17, 24, 39, 0.9)",
            border: `2.5px solid ${
              isRevealed
                ? question.optionB.isCorrect
                  ? THEME.colors.accentEmerald
                  : THEME.colors.accentRose
                : "rgba(255, 255, 255, 0.15)"
            }`,
            boxShadow: isRevealed
              ? question.optionB.isCorrect
                ? "0 0 30px rgba(16, 185, 129, 0.45)"
                : "0 0 20px rgba(244, 63, 94, 0.3)"
              : "0 10px 25px rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform:
              isRevealed && question.optionB.isCorrect
                ? `scale(${1 + 0.03 * revealProgress})`
                : "scale(1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: isRevealed
                  ? question.optionB.isCorrect
                    ? "rgba(16, 185, 129, 0.35)"
                    : "rgba(244, 63, 94, 0.35)"
                  : "rgba(255, 255, 255, 0.12)",
                color: isRevealed
                  ? question.optionB.isCorrect
                    ? THEME.colors.goodText
                    : THEME.colors.badText
                  : "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 950,
              }}
            >
              {question.optionB.label}
            </div>
            <span
              style={{
                fontSize: "36px",
                fontFamily: THEME.fonts.code,
                fontWeight: 800,
                color: isRevealed
                  ? question.optionB.isCorrect
                    ? THEME.colors.goodText
                    : THEME.colors.badText
                  : "#F8FAFC",
              }}
            >
              {question.optionB.value}
            </span>
          </div>

          {isRevealed && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {question.optionB.isCorrect ? (
                <>
                  <CheckCircle2 size={34} color={THEME.colors.accentEmerald} />
                  <span
                    style={{
                      color: THEME.colors.goodText,
                      fontWeight: 950,
                      fontSize: "24px",
                    }}
                  >
                    ĐÚNG ✅
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={34} color={THEME.colors.accentRose} />
                  <span
                    style={{
                      color: THEME.colors.badText,
                      fontWeight: 950,
                      fontSize: "24px",
                    }}
                  >
                    SAI ❌
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Golden Explanation Box (Reveals smoothly) */}
      <div
        style={{
          width: "100%",
          padding: "20px 24px",
          borderRadius: "20px",
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          border: `2px solid ${THEME.colors.accentAmber}`,
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          opacity: isRevealed ? revealProgress : 0.4,
          transform: isRevealed
            ? `translateY(${interpolate(revealProgress, [0, 1], [15, 0])}px)`
            : "translateY(0px)",
        }}
      >
        <Lightbulb size={34} color={THEME.colors.accentAmber} style={{ flexShrink: 0 }} />
        <span
          style={{
            fontSize: "26px",
            color: isRevealed ? THEME.colors.accentAmber : THEME.colors.textSecondary,
            fontWeight: 800,
            lineHeight: 1.4,
          }}
        >
          {isRevealed
            ? question.explanation
            : "Gợi ý: Hãy chú ý cơ chế ép kiểu hoặc phạm vi biến!"}
        </span>
      </div>
    </div>
  );
};
