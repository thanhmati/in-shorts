import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MessageSquare, Trophy } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const pulse = 1 + Math.sin(frame / 3.5) * 0.04;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "28px",
        width: "100%",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 36px",
          borderRadius: "999px",
          backgroundColor: "rgba(168, 85, 247, 0.15)",
          border: `2px solid ${THEME.colors.accentPurple}`,
          boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
        }}
      >
        <Trophy size={34} color={THEME.colors.accentPurple} />
        <span
          style={{
            color: THEME.colors.accentPurple,
            fontWeight: 950,
            fontSize: "26px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          KẾT QUẢ ĐÁNH GIÁ TRÌNH ĐỘ
        </span>
      </div>

      {/* Score Tier List */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            width: "100%",
            padding: "22px 30px",
            borderRadius: "22px",
            backgroundColor: "rgba(16, 185, 129, 0.18)",
            border: `2.5px solid ${THEME.colors.accentEmerald}`,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "36px" }}>🚀</span>
            <span
              style={{
                fontSize: "30px",
                color: "#FFFFFF",
                fontWeight: 950,
              }}
            >
              5 / 5 Câu Đúng
            </span>
          </div>
          <span
            style={{
              fontSize: "24px",
              color: THEME.colors.goodText,
              fontWeight: 950,
              padding: "8px 18px",
              borderRadius: "12px",
              backgroundColor: "rgba(16, 185, 129, 0.3)",
            }}
          >
            SENIOR LEVEL ⭐
          </span>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            width: "100%",
            padding: "22px 30px",
            borderRadius: "22px",
            backgroundColor: "rgba(56, 189, 248, 0.18)",
            border: `2.5px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "36px" }}>⚡</span>
            <span
              style={{
                fontSize: "30px",
                color: "#FFFFFF",
                fontWeight: 950,
              }}
            >
              3 – 4 Câu Đúng
            </span>
          </div>
          <span
            style={{
              fontSize: "24px",
              color: THEME.colors.tipText,
              fontWeight: 950,
              padding: "8px 18px",
              borderRadius: "12px",
              backgroundColor: "rgba(56, 189, 248, 0.3)",
            }}
          >
            MIDDLE LEVEL 👍
          </span>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            width: "100%",
            padding: "22px 30px",
            borderRadius: "22px",
            backgroundColor: "rgba(251, 191, 36, 0.18)",
            border: `2.5px solid ${THEME.colors.accentAmber}`,
            boxShadow: "0 10px 30px rgba(251, 191, 36, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "36px" }}>📖</span>
            <span
              style={{
                fontSize: "30px",
                color: "#FFFFFF",
                fontWeight: 950,
              }}
            >
              1 – 2 Câu Đúng
            </span>
          </div>
          <span
            style={{
              fontSize: "24px",
              color: THEME.colors.accentAmber,
              fontWeight: 950,
              padding: "8px 18px",
              borderRadius: "12px",
              backgroundColor: "rgba(251, 191, 36, 0.3)",
            }}
          >
            CẦN LUYỆN THÊM!
          </span>
        </div>
      </div>

      {/* CTA Box */}
      <div
        style={{
          width: "100%",
          padding: "30px 32px",
          borderRadius: "26px",
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          border: `2.5px solid ${THEME.colors.accentAmber}`,
          boxShadow:
            "0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(251, 191, 36, 0.25)",
          transform: `scale(${pulse})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            color: THEME.colors.accentAmber,
            fontSize: "32px",
            fontWeight: 950,
            marginBottom: "10px",
          }}
        >
          <MessageSquare size={36} color={THEME.colors.accentAmber} />
          <span>BẠN ĐƯỢC MẤY ĐIỂM?</span>
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "26px",
            fontWeight: 800,
          }}
        >
          Bình luận số điểm & bấm Follow kênh nhé! 🚀
        </div>
      </div>
    </div>
  );
};
