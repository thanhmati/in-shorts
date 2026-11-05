import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KeyRound, Lock, CheckCircle2 } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene6BcryptHash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Hashing transformation at frame 30
  const hashTransformSpring = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Lock snap trigger at frame 70
  const lockSpring = spring({
    frame: Math.max(0, frame - 70),
    fps,
    config: { damping: 8, stiffness: 220 },
  });
  const isLocked = frame >= 70;

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        transform: `scale(${enterSpring})`,
      }}
    >
      {/* Visual Focal Badge (Max 3-5 words) */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "9999px",
          background: isLocked ? "rgba(16, 185, 129, 0.15)" : "rgba(251, 191, 36, 0.15)",
          border: `1.5px solid ${isLocked ? THEME.colors.accentEmerald : THEME.colors.accentAmber}`,
          boxShadow: isLocked
            ? "0 0 30px rgba(16, 185, 129, 0.35)"
            : "0 0 25px rgba(251, 191, 36, 0.25)",
          marginBottom: "35px",
        }}
      >
        <KeyRound size={24} color={isLocked ? THEME.colors.accentEmerald : THEME.colors.accentAmber} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: isLocked ? THEME.colors.accentEmerald : THEME.colors.accentAmber,
            letterSpacing: "1.5px",
          }}
        >
          {isLocked ? "BCRYPT MATCH 🔒" : "BCRYPT HASHING ⚙️"}
        </span>
      </div>

      {/* Main Hashing Machine Container */}
      <div
        style={{
          width: "820px",
          background: "rgba(17, 24, 39, 0.8)",
          border: `2px solid ${isLocked ? THEME.colors.accentEmerald : THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: isLocked
            ? "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 45px rgba(16, 185, 129, 0.3)"
            : THEME.shadows.windowGlow,
        }}
      >
        {/* Step 1: Plain Input vs Salt Machine */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(11, 15, 25, 0.9)",
            border: `1.5px solid ${THEME.colors.cardBorder}`,
            borderRadius: "18px",
            padding: "18px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Lock size={24} color={THEME.colors.textSecondary} />
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "20px", color: THEME.colors.textSecondary }}>
              PLAIN INPUT:
            </span>
          </div>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "24px",
              color: THEME.colors.accentAmber,
              letterSpacing: "4px",
            }}
          >
            ••••••••
          </span>
        </div>

        {/* Dynamic Bcrypt Hashing Arrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ height: "2px", flex: 1, background: "rgba(56, 189, 248, 0.3)" }} />
          <div
            style={{
              padding: "6px 18px",
              borderRadius: "12px",
              background: "rgba(56, 189, 248, 0.15)",
              border: `1px solid ${THEME.colors.accentCyan}`,
              fontFamily: THEME.fonts.code,
              fontSize: "16px",
              color: THEME.colors.accentCyan,
              fontWeight: 700,
            }}
          >
            bcrypt.compare(pass, hash)
          </div>
          <div style={{ height: "2px", flex: 1, background: "rgba(56, 189, 248, 0.3)" }} />
        </div>

        {/* Step 2: Irreversible Hash String */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "rgba(11, 15, 25, 0.95)",
            border: `1.5px solid ${isLocked ? THEME.colors.accentEmerald : THEME.colors.accentCyan}`,
            borderRadius: "18px",
            padding: "20px 24px",
            transform: `scale(${hashTransformSpring})`,
          }}
        >
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textMuted }}>
            COMPUTED HASH (SALT + ROUNDS):
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "20px",
              color: isLocked ? THEME.colors.accentEmerald : THEME.colors.accentCyan,
              wordBreak: "break-all",
            }}
          >
            $2b$10$e8F9qZxL0mP4uVw7Y...
          </span>
        </div>

        {/* Step 3: Match Result Banner */}
        <div
          style={{
            marginTop: "10px",
            padding: "20px 28px",
            borderRadius: "20px",
            background: isLocked
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 78, 59, 0.4))"
              : "rgba(31, 41, 55, 0.4)",
            border: `2px solid ${isLocked ? THEME.colors.accentEmerald : THEME.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            transform: `scale(${isLocked ? lockSpring : 1})`,
            boxShadow: isLocked ? "0 0 35px rgba(16, 185, 129, 0.4)" : "none",
          }}
        >
          {isLocked ? (
            <>
              <CheckCircle2 size={32} color={THEME.colors.accentEmerald} />
              <span
                style={{
                  fontFamily: THEME.fonts.sans,
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "1px",
                }}
              >
                PASSWORD VERIFIED: 100% MATCH
              </span>
            </>
          ) : (
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "20px",
                color: THEME.colors.textMuted,
              }}
            >
              Comparing hashes...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
