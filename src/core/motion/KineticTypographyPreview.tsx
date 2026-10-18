import React from "react";
import { Sequence } from "remotion";
import { Flame, HelpCircle, Sparkles } from "lucide-react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { KineticTypography } from "./KineticTypography";
import { THEME } from "../theme";

export const KineticTypographyPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="MOTION SYSTEM DEMO" channelName="@laptrinhfullstack" />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Sample 1: Phrase Mode (Frames 0 - 60) - High-Impact Warning Hook */}
        <Sequence durationInFrames={60}>
          <KineticTypography
            mode="phrase"
            badge={{
              text: "CẢNH BÁO HIỆU NĂNG REACT",
              icon: <Flame size={26} color={THEME.colors.accentRose} />,
              variant: "rose",
            }}
            text={["90% LẬP TRÌNH VIÊN", "DÍNH PHẢI LỖI NÀY! ❌"]}
            highlightWords={["LỖI", "NÀY!", "❌"]}
            highlightStyle="neon"
            highlightColor={THEME.colors.accentRose}
            subtitle="Khiến Toàn Bộ Ứng Dụng Bị Giật Lag Và Chậm Chạp"
            fontSize={62}
            align="center"
          />
        </Sequence>

        {/* Sample 2: Words Mode (Frames 60 - 120) - Staggered Technical Question */}
        <Sequence from={60} durationInFrames={60}>
          <KineticTypography
            mode="words"
            startFrame={0}
            staggerDelay={3}
            badge={{
              text: "CÂU ĐỐ JAVASCRIPT",
              icon: <HelpCircle size={26} color={THEME.colors.accentAmber} />,
              variant: "amber",
            }}
            text="THỨ TỰ CONSOLE.LOG THỰC TẾ LÀ GÌ?"
            highlightWords={["CONSOLE.LOG", "THỰC", "TẾ"]}
            highlightStyle="pill"
            highlightColor={THEME.colors.accentAmber}
            subtitle="Call Stack, Microtask Queue hay Macrotask Queue?"
            fontSize={56}
            align="center"
          />
        </Sequence>

        {/* Sample 3: Mask Mode (Frames 120 - 180) - Elegant Slide-Up Solution */}
        <Sequence from={120} durationInFrames={60}>
          <KineticTypography
            mode="mask"
            startFrame={0}
            staggerDelay={4}
            badge={{
              text: "GIẢI PHÁP TỐI ƯU",
              icon: <Sparkles size={26} color={THEME.colors.accentEmerald} />,
              variant: "emerald",
            }}
            text={["BÍ QUYẾT BẢO VỆ", "HIỆU NĂNG COMPONENT ✅"]}
            highlightWords={["BẢO", "VỆ", "HIỆU", "NĂNG", "✅"]}
            highlightStyle="gradient"
            highlightColor={THEME.colors.accentEmerald}
            subtitle="Giữ nguyên tham chiếu bộ nhớ với useMemo & useCallback"
            fontSize={58}
            align="center"
          />
        </Sequence>
      </div>
    </SafeLayout>
  );
};
