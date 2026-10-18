import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { THEME } from "../theme";
import { SceneSequence, type SceneItem, calculateSequenceTotalDuration } from "./SceneTransition";
import { AlertTriangle, CheckCircle2, Trophy } from "lucide-react";

export const SCENE_SEQUENCE_DATA: SceneItem[] = [
  {
    id: "scene-problem",
    durationInFrames: 50,
    transitionToNext: {
      type: "wipe",
      direction: "from-right",
      durationInFrames: 15,
      soundCue: "whoosh",
      soundVolume: 0.28,
    },
    content: (
      <SafeLayout>
        <Branding seriesName="TRANSITION SYSTEM" channelName="@laptrinhfullstack" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "36px 30px",
              borderRadius: "24px",
              backgroundColor: "rgba(244, 63, 94, 0.12)",
              border: `2px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 63, 94, 0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <AlertTriangle size={36} color={THEME.colors.accentRose} />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  color: THEME.colors.badText,
                  letterSpacing: "0.06em",
                }}
              >
                CẢNH 1: VẤN ĐỀ HIỆU NĂNG
              </span>
            </div>
            <h2
              style={{
                fontSize: "38px",
                fontWeight: 950,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Vòng lặp lồng nhau khiến UI bị đơ khi render 10,000 dòng!
            </h2>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                color: THEME.colors.textSecondary,
              }}
            >
              TRANSITION TO NEXT: Directional Wipe (from-right) + Whoosh SFX
            </div>
          </div>
        </div>
      </SafeLayout>
    ),
  },
  {
    id: "scene-solution",
    durationInFrames: 50,
    transitionToNext: {
      type: "fade",
      durationInFrames: 14,
      soundCue: "ding",
      soundVolume: 0.28,
    },
    content: (
      <SafeLayout>
        <Branding seriesName="TRANSITION SYSTEM" channelName="@laptrinhfullstack" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "36px 30px",
              borderRadius: "24px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: `2px solid ${THEME.colors.accentEmerald}`,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <CheckCircle2 size={36} color={THEME.colors.accentEmerald} />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  color: THEME.colors.goodText,
                  letterSpacing: "0.06em",
                }}
              >
                CẢNH 2: GIẢI PHÁP TỐI ƯU
              </span>
            </div>
            <h2
              style={{
                fontSize: "38px",
                fontWeight: 950,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Chuyển sang cấu trúc Map tra cứu O(1) và Virtual Windowing!
            </h2>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                color: THEME.colors.textSecondary,
              }}
            >
              TRANSITION TO NEXT: Smooth Crossfade + Confirmation Ding SFX
            </div>
          </div>
        </div>
      </SafeLayout>
    ),
  },
  {
    id: "scene-takeaway",
    durationInFrames: 40,
    content: (
      <SafeLayout>
        <Branding seriesName="TRANSITION SYSTEM" channelName="@laptrinhfullstack" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "36px 30px",
              borderRadius: "24px",
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: `2px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Trophy size={36} color={THEME.colors.accentCyan} />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 900,
                  color: THEME.colors.tipText,
                  letterSpacing: "0.06em",
                }}
              >
                CẢNH 3: BÀI HỌC CỐT LÕI
              </span>
            </div>
            <h2
              style={{
                fontSize: "38px",
                fontWeight: 950,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Tốc độ tăng 40x và FPS luôn ổn định ở mức 60 khung hình/giây!
            </h2>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                color: THEME.colors.textSecondary,
              }}
            >
              FINAL SCENE: Hoàn tất chuỗi chuyển cảnh với timeline đồng bộ.
            </div>
          </div>
        </div>
      </SafeLayout>
    ),
  },
];

export const SCENE_SEQUENCE_TOTAL_FRAMES = calculateSequenceTotalDuration(SCENE_SEQUENCE_DATA);

export const SceneTransitionPreview: React.FC = () => {
  return <SceneSequence scenes={SCENE_SEQUENCE_DATA} />;
};
