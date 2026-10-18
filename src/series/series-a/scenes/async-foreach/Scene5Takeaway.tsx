import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Bookmark, Check, ShieldCheck, Sparkles } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene5Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const pulse = 1 + Math.sin(frame / 4) * 0.04;
  const glow = 0.5 + 0.5 * Math.sin(frame / 3.5);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "36px",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          border: `2px solid ${THEME.colors.accentEmerald}`,
          boxShadow: `0 0 ${25 * glow}px rgba(16, 185, 129, 0.4)`,
        }}
      >
        <Sparkles size={28} color={THEME.colors.accentEmerald} />
        <span
          style={{
            color: THEME.colors.accentEmerald,
            fontWeight: 950,
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          NGUYÊN TẮC VÀNG JAVASCRIPT
        </span>
      </div>

      {/* Main Headline */}
      <h2
        style={{
          fontSize: "60px",
          fontWeight: 950,
          color: "#FFFFFF",
          lineHeight: 1.2,
          margin: 0,
          textShadow: "0 8px 30px rgba(0,0,0,0.8)",
        }}
      >
        2 ĐIỀU PHẢI KHẮC CỐT GHI TÂM
      </h2>

      {/* Summary Cards */}
      <div
        style={{
          width: "920px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Rule 1 */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(244, 63, 94, 0.6)",
            borderRadius: "20px",
            padding: "24px 30px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={32} color="#F43F5E" />
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#F43F5E" }}>
              1. Array.forEach ➔ CHỈ DÙNG CHO ĐỒNG BỘ
            </div>
            <div style={{ fontSize: "22px", color: "#94A3B8", marginTop: "4px" }}>
              Không bao giờ truyền async callback vào forEach nếu cần đợi kết quả.
            </div>
          </div>
        </div>

        {/* Rule 2 */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(16, 185, 129, 0.6)",
            borderRadius: "20px",
            padding: "24px 30px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Check size={32} color="#10B981" />
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#10B981" }}>
              2. Async/Await ➔ for...of HOẶC Promise.all()
            </div>
            <div style={{ fontSize: "22px", color: "#94A3B8", marginTop: "4px" }}>
              Dùng for...of khi cần chạy tuần tự; dùng Promise.all(map) khi cần chạy song song.
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          border: `2px solid ${THEME.colors.accentAmber}`,
          borderRadius: "16px",
          padding: "16px 36px",
          transform: `scale(${pulse})`,
        }}
      >
        <Bookmark size={28} color={THEME.colors.accentAmber} />
        <span
          style={{
            fontSize: "26px",
            fontWeight: 900,
            color: THEME.colors.accentAmber,
            letterSpacing: "0.02em",
          }}
        >
          LƯU LẠI &amp; FOLLOW @LAPTRINHFULLSTACK 🚀
        </span>
      </div>
    </div>
  );
};
