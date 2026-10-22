import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Star,
} from "lucide-react";
import { THEME } from "./theme";
import { getCourse, UdemyCourse } from "./courses";

export interface CoursePromoOutroProps {
  course?: UdemyCourse;
  courseId?: string;
  headlineBadge?: string;
  customCta?: string;
}

export const CoursePromoOutro: React.FC<CoursePromoOutroProps> = ({
  course: propCourse,
  courseId,
  headlineBadge = "LỘ TRÌNH BACKEND THỰC CHIẾN",
  customCta,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const course = propCourse || getCourse(courseId);

  // Entrance spring animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Smooth floating hover drift
  const floatY = Math.sin(frame / 18) * 8;
  const floatTilt = Math.sin(frame / 22) * 1.2;

  // CTA pulsing effect
  const ctaPulse = 1 + Math.sin(frame / 4) * 0.035;

  // Shine sweep across cover image
  const shineTranslate = interpolate(frame % 90, [0, 45, 90], [-100, 200, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "22px",
        transform: `scale(${entrance})`,
        opacity: entrance,
        boxSizing: "border-box",
      }}
    >
      {/* 1. Category / Objective Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 30px",
          borderRadius: "999px",
          backgroundColor: "rgba(224, 35, 78, 0.15)",
          border: "2px solid #E0234E",
          boxShadow: "0 0 30px rgba(224, 35, 78, 0.35)",
        }}
      >
        <GraduationCap size={30} color="#E0234E" />
        <span
          style={{
            color: "#E0234E",
            fontWeight: 950,
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {headlineBadge}
        </span>
      </div>

      {/* 2. Main Course Showcase Card with 3D Tilt */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          padding: "24px 28px",
          borderRadius: "28px",
          backgroundColor: "rgba(17, 24, 39, 0.94)",
          border: "2.5px solid rgba(224, 35, 78, 0.45)",
          boxShadow:
            "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(224, 35, 78, 0.2)",
          backdropFilter: "blur(16px)",
          transform: `translateY(${floatY}px) rotate(${floatTilt}deg)`,
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          textAlign: "left",
          boxSizing: "border-box",
        }}
      >
        {/* Top Badges: Udemy + Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Udemy Official Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 20px",
              borderRadius: "12px",
              backgroundColor: "rgba(164, 53, 240, 0.2)",
              border: "1.5px solid #A435F0",
            }}
          >
            <span
              style={{
                color: "#D8B4FE",
                fontSize: "22px",
                fontWeight: 950,
                letterSpacing: "0.05em",
              }}
            >
              UDEMY • {course.badgeText}
            </span>
          </div>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              borderRadius: "12px",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              border: `1.5px solid ${THEME.colors.accentAmber}`,
            }}
          >
            <Star size={22} color={THEME.colors.accentAmber} fill={THEME.colors.accentAmber} />
            <span
              style={{
                color: THEME.colors.accentAmber,
                fontSize: "22px",
                fontWeight: 950,
              }}
            >
              {course.rating.toFixed(1)} ({course.ratingCount}+)
            </span>
          </div>
        </div>

        {/* Course Cover Image Banner */}
        <div
          style={{
            width: "100%",
            height: "360px",
            borderRadius: "18px",
            overflow: "hidden",
            position: "relative",
            border: "2px solid rgba(255, 255, 255, 0.12)",
            backgroundColor: "#0B0F19",
          }}
        >
          <Img
            src={staticFile(course.coverImage)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Animated Light Sweep Effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "60%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transform: `skewX(-25deg) translateX(${shineTranslate}%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Course Title & Subtitle */}
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 950,
              color: "#FFFFFF",
              lineHeight: 1.25,
            }}
          >
            {course.title}
          </h2>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "22px",
              color: "#94A3B8",
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            {course.subtitle}
          </p>
        </div>

        {/* 3 Core Highlights */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {course.highlights.map((highlight, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "23px",
                  color: "#E2E8F0",
                  fontWeight: 750,
                  lineHeight: 1.3,
                }}
              >
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Instructor Mini Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "6px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "999px",
                overflow: "hidden",
                border: "2px solid #10B981",
                boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Img
                src={staticFile(course.instructor.avatar)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "#FFFFFF" }}>
                {course.instructor.name}
              </div>
              <div style={{ fontSize: "18px", color: "#38BDF8", fontWeight: 700 }}>
                {course.instructor.handle}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#A78BFA",
              fontWeight: 800,
              backgroundColor: "rgba(167, 139, 250, 0.12)",
              padding: "6px 14px",
              borderRadius: "8px",
            }}
          >
            {course.platform} Instructor
          </div>
        </div>
      </div>

      {/* 3. High-Energy Pulsing Call To Action Box */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          padding: "22px 28px",
          borderRadius: "22px",
          background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 50%, #E11D48 100%)",
          boxShadow:
            "0 18px 45px rgba(234, 88, 12, 0.45), 0 0 35px rgba(245, 158, 11, 0.35)",
          transform: `scale(${ctaPulse})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          boxSizing: "border-box",
        }}
      >
        <Sparkles size={32} color="#FFFFFF" />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "25px",
            fontWeight: 950,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {customCta || course.ctaText}
        </span>
        <ArrowRight size={28} color="#FFFFFF" />
      </div>
    </div>
  );
};
