import React from "react";
import {
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ArrowRight,
  Bell,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { SuccessConfetti } from "../../../core/graphics/SuccessConfetti";

export const Scene5OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Staggered springs for CTA cards
  const cta1Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  const cta2Spring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 11, stiffness: 140 },
  });

  // Subtle floating motion
  const floatY = Math.sin(frame / 18) * 6;
  const pulseScale = 1 + Math.sin(frame / 5) * 0.035;

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        boxSizing: "border-box",
        transform: `scale(${entrance}) translateY(${floatY}px)`,
        opacity: entrance,
      }}
    >
      {/* Trigger Confetti around frame 20 into the scene */}
      <SuccessConfetti triggerFrame={20} />

      {/* 1. Header Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 28px",
          borderRadius: "999px",
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          border: "2px solid #38BDF8",
          boxShadow: "0 0 24px rgba(56, 189, 248, 0.35)",
        }}
      >
        <Sparkles size={24} color="#38BDF8" />
        <span
          style={{
            color: "#38BDF8",
            fontSize: "22px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          KẾT NỐI & NÂNG TRÌNH BACKEND
        </span>
      </div>

      {/* 2. Instructor Profile Showcase Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "940px",
          padding: "26px 32px",
          borderRadius: "26px",
          backgroundColor: "rgba(17, 24, 39, 0.94)",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          boxSizing: "border-box",
        }}
      >
        {/* Big Avatar with Glowing Border */}
        <div
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "999px",
            overflow: "hidden",
            border: "3.5px solid #10B981",
            boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)",
            flexShrink: 0,
            backgroundColor: "#0B0F19",
          }}
        >
          <Img
            src={staticFile("courses/instructor-avatar.png")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Profile Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "42px",
                fontWeight: 950,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Đỗ Tấn Thành
            </h2>
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1.5px solid #10B981",
                borderRadius: "8px",
                padding: "4px 12px",
                color: "#10B981",
                fontSize: "18px",
                fontWeight: 800,
              }}
            >
              Verified Instructor
            </div>
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#38BDF8",
              fontWeight: 800,
              marginTop: "4px",
            }}
          >
            @laptrinhfullstack
          </div>

          {/* Social Proof Tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(251, 191, 36, 0.12)",
                padding: "6px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(251, 191, 36, 0.3)",
              }}
            >
              <Star size={18} color="#FBBF24" fill="#FBBF24" />
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#FDE047" }}>
                4.8★ Top Rated
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(168, 85, 247, 0.12)",
                padding: "6px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(168, 85, 247, 0.3)",
              }}
            >
              <Users size={18} color="#C084FC" />
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#E9D5FF" }}>
                10,000+ Học viên
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary CTA Card: Course Link */}
      <div
        style={{
          width: "100%",
          maxWidth: "940px",
          padding: "24px 28px",
          borderRadius: "22px",
          background:
            "linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #E11D48 100%)",
          boxShadow:
            "0 18px 45px rgba(234, 88, 12, 0.5), 0 0 35px rgba(245, 158, 11, 0.35)",
          transform: `scale(${cta1Spring * pulseScale})`,
          opacity: cta1Spring,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GraduationCap size={34} color="#FFFFFF" />
          </div>
          <div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 950,
                color: "#FFFFFF",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              LINK KHÓA HỌC Ở BIO & MÔ TẢ
            </div>
          </div>
        </div>
        <ExternalLink size={32} color="#FFFFFF" />
      </div>

      {/* 4. Secondary CTA Card: Follow Channel */}
      <div
        style={{
          width: "100%",
          maxWidth: "940px",
          padding: "24px 28px",
          borderRadius: "22px",
          backgroundColor: "rgba(17, 24, 39, 0.94)",
          border: "2.5px solid #10B981",
          boxShadow:
            "0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.3)",
          transform: `scale(${cta2Spring})`,
          opacity: cta2Spring,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "14px",
              backgroundColor: "rgba(16, 185, 129, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #10B981",
            }}
          >
            <Bell size={30} color="#10B981" />
          </div>
          <div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 950,
                color: "#FFFFFF",
              }}
            >
              FOLLOW @LAPTRINHFULLSTACK
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "10px 22px",
            borderRadius: "12px",
            backgroundColor: "#10B981",
            color: "#FFFFFF",
            fontSize: "20px",
            fontWeight: 950,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          FOLLOW <ArrowRight size={20} color="#FFFFFF" />
        </div>
      </div>
    </div>
  );
};
