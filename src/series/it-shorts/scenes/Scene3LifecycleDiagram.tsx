import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Filter,
  Layers,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export const Scene3LifecycleDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Phases within Scene 3 (duration: 475 frames):
  // Phase 1 (0 to 145): Middleware focus ("Middleware chạy trước route handler...")
  // Phase 2 (145 to 295): Guard focus ("Guard quyết định request có được phép đi tiếp...")
  // Phase 3 (295 to 475): Interceptor focus ("Còn Interceptor có thể chạy trước và sau handler...")

  const isMiddleware = frame < 145;
  const isGuard = frame >= 145 && frame < 295;
  const isInterceptor = frame >= 295;

  // Pulse animations for active beats
  const middlewarePulse = isMiddleware ? 1 + Math.sin(frame / 5) * 0.04 : 1;
  const guardPulse = isGuard ? 1 + Math.sin(frame / 5) * 0.04 : 1;
  const interceptorPulse = isInterceptor ? 1 + Math.sin(frame / 5) * 0.04 : 1;

  // Moving glowing packet Y position along the vertical chain
  // Phase 1: Packet at Middleware (Y: 0px)
  // Phase 2: Packet at Guards (Y: 130px)
  // Phase 3: Packet travels to Interceptor (Y: 260px) -> Pipe (Y: 390px) -> Handler (Y: 520px) -> Loop to Interceptor After (Y: 650px)
  const packetY = interpolate(
    frame,
    [0, 100, 145, 230, 295, 340, 380, 420, 475],
    [20, 70, 70, 185, 185, 300, 415, 530, 645],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        transform: `scale(${entrance})`,
        opacity: entrance,
      }}
    >
      {/* 1. Header with Badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 26px",
            borderRadius: "999px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "2px solid #10B981",
            boxShadow: "0 0 24px rgba(16, 185, 129, 0.4)",
          }}
        >
          <Sparkles size={22} color="#10B981" />
          <span
            style={{
              color: "#10B981",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "0.08em",
            }}
          >
            NESTJS LIFECYCLE CHUẨN
          </span>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "44px",
            fontWeight: 950,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}
        >
          THỨ TỰ THỰC THI REQUEST
        </h2>
      </div>

      {/* 2. Central Motion Graphics Board */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          borderRadius: "28px",
          border: "2.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 65px rgba(0, 0, 0, 0.85)",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Moving Data Packet Particle */}
        <div
          style={{
            position: "absolute",
            left: "48px",
            top: `${packetY}px`,
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            backgroundColor: isMiddleware
              ? "#38BDF8"
              : isGuard
              ? "#10B981"
              : "#C084FC",
            boxShadow: `0 0 25px ${
              isMiddleware ? "#38BDF8" : isGuard ? "#10B981" : "#C084FC"
            }, 0 0 45px #FFFFFF`,
            zIndex: 40,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* 1. MIDDLEWARE NODE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            borderRadius: "18px",
            backgroundColor: isMiddleware
              ? "rgba(56, 189, 248, 0.2)"
              : "rgba(15, 23, 42, 0.6)",
            border: isMiddleware
              ? "2.5px solid #38BDF8"
              : "1.5px solid rgba(255, 255, 255, 0.08)",
            boxShadow: isMiddleware
              ? "0 0 30px rgba(56, 189, 248, 0.45)"
              : "none",
            transform: `scale(${middlewarePulse})`,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #38BDF8",
              }}
            >
              <Layers size={30} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 950, color: "#FFFFFF" }}>
                1. MIDDLEWARE
              </div>
              <div style={{ fontSize: "20px", color: "#38BDF8", fontWeight: 700 }}>
                Chạy trước Route • Tiền xử lý Raw Request
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid #38BDF8",
              color: "#38BDF8",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            CORS & PARSER
          </div>
        </div>

        {/* 2. GUARDS NODE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            borderRadius: "18px",
            backgroundColor: isGuard
              ? "rgba(16, 185, 129, 0.2)"
              : "rgba(15, 23, 42, 0.6)",
            border: isGuard
              ? "2.5px solid #10B981"
              : "1.5px solid rgba(255, 255, 255, 0.08)",
            boxShadow: isGuard
              ? "0 0 30px rgba(16, 185, 129, 0.45)"
              : "none",
            transform: `scale(${guardPulse})`,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #10B981",
              }}
            >
              <ShieldCheck size={30} color="#10B981" />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 950, color: "#FFFFFF" }}>
                2. GUARDS
              </div>
              <div style={{ fontSize: "20px", color: "#10B981", fontWeight: 700 }}>
                canActivate() • Quyết định Cho Phép hay Chặn
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid #10B981",
              color: "#10B981",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            AUTH & ROLES
          </div>
        </div>

        {/* 3. INTERCEPTORS (BEFORE) NODE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            borderRadius: "18px",
            backgroundColor: isInterceptor
              ? "rgba(192, 132, 252, 0.2)"
              : "rgba(15, 23, 42, 0.6)",
            border: isInterceptor
              ? "2.5px solid #C084FC"
              : "1.5px solid rgba(255, 255, 255, 0.08)",
            boxShadow: isInterceptor
              ? "0 0 30px rgba(192, 132, 252, 0.45)"
              : "none",
            transform: `scale(${interceptorPulse})`,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(192, 132, 252, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #C084FC",
              }}
            >
              <RefreshCw size={28} color="#C084FC" />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 950, color: "#FFFFFF" }}>
                3. INTERCEPTORS (Trước Handler)
              </div>
              <div style={{ fontSize: "20px", color: "#C084FC", fontWeight: 700 }}>
                Bắt đầu RxJS Stream • Ghi nhận thời gian
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(192, 132, 252, 0.2)",
              border: "1.5px solid #C084FC",
              color: "#C084FC",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            PRE-HANDLER
          </div>
        </div>

        {/* 4. PIPES NODE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 22px",
            borderRadius: "16px",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            border: "1.5px solid rgba(255, 255, 255, 0.08)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "rgba(96, 165, 250, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid #60A5FA",
              }}
            >
              <Filter size={26} color="#60A5FA" />
            </div>
            <div>
              <div style={{ fontSize: "26px", fontWeight: 950, color: "#FFFFFF" }}>
                4. PIPES
              </div>
              <div style={{ fontSize: "19px", color: "#94A3B8", fontWeight: 600 }}>
                ValidationPipe • Chuyển đổi DTO
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              color: "#60A5FA",
              fontSize: "19px",
              fontWeight: 800,
            }}
          >
            VALIDATE
          </div>
        </div>

        {/* 5. ROUTE HANDLER (CONTROLLER) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            borderRadius: "18px",
            backgroundColor: "rgba(244, 63, 94, 0.2)",
            border: "2.5px solid #F43F5E",
            boxShadow: "0 0 25px rgba(244, 63, 94, 0.35)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(244, 63, 94, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #F43F5E",
              }}
            >
              <Server size={30} color="#F43F5E" />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 950, color: "#FFFFFF" }}>
                5. ROUTE HANDLER
              </div>
              <div style={{ fontSize: "20px", color: "#FDA4AF", fontWeight: 700 }}>
                Controller Method • Service & Database
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(244, 63, 94, 0.25)",
              border: "1.5px solid #F43F5E",
              color: "#F43F5E",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            ★ LOGIC CORE
          </div>
        </div>

        {/* 6. INTERCEPTORS (AFTER - RETURN FLOW) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 22px",
            borderRadius: "18px",
            backgroundColor: isInterceptor
              ? "rgba(236, 72, 153, 0.22)"
              : "rgba(15, 23, 42, 0.6)",
            border: isInterceptor
              ? "2.5px solid #EC4899"
              : "1.5px solid rgba(255, 255, 255, 0.08)",
            boxShadow: isInterceptor
              ? "0 0 35px rgba(236, 72, 153, 0.45)"
              : "none",
            transform: `scale(${interceptorPulse})`,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                backgroundColor: "rgba(236, 72, 153, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #EC4899",
              }}
            >
              <RefreshCw size={28} color="#EC4899" />
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 950, color: "#FFFFFF" }}>
                6. INTERCEPTORS (Sau Handler) ⤾
              </div>
              <div style={{ fontSize: "20px", color: "#F472B6", fontWeight: 700 }}>
                RxJS tap() & map() • Logging & Transform
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "10px",
              backgroundColor: "rgba(236, 72, 153, 0.25)",
              border: "1.5px solid #EC4899",
              color: "#EC4899",
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            OUTBOUND FLOW
          </div>
        </div>
      </div>

      {/* 3. Bottom Dynamic Takeaway Pill */}
      <div
        style={{
          padding: "14px 32px",
          borderRadius: "999px",
          backgroundColor: isMiddleware
            ? "rgba(56, 189, 248, 0.16)"
            : isGuard
            ? "rgba(16, 185, 129, 0.16)"
            : "rgba(192, 132, 252, 0.16)",
          border: `2px solid ${
            isMiddleware
              ? "#38BDF8"
              : isGuard
              ? "#10B981"
              : "#C084FC"
          }`,
          boxShadow: `0 0 25px ${
            isMiddleware
              ? "rgba(56, 189, 248, 0.3)"
              : isGuard
              ? "rgba(16, 185, 129, 0.3)"
              : "rgba(192, 132, 252, 0.3)"
          }`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Zap
          size={24}
          color={
            isMiddleware
              ? "#38BDF8"
              : isGuard
              ? "#10B981"
              : "#C084FC"
          }
        />
        <span
          style={{
            fontSize: "24px",
            fontWeight: 950,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          {isMiddleware && "TIỀN XỬ LÝ TRƯỚC ROUTE"}
          {isGuard && "BẢO MẬT & KIỂM SOÁT QUYỀN"}
          {isInterceptor && "VŨ KHÍ 2 CHIỀU: TRƯỚC VÀ SAU HANDLER"}
        </span>
      </div>
    </div>
  );
};
