import React from "react";
import { useCurrentFrame } from "remotion";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { MacWindow } from "../MacWindow";
import { CodeBlock } from "../CodeBlock";
import { CameraMove, CameraPresets } from "./CameraMove";
import { THEME } from "../theme";

const SAMPLE_CODE = `function ProductList({ items, filter }) {
  // ⚡ Dòng trọng tâm: Tránh tính toán lại tốn kém
  const filtered = useMemo(() => {
    return items.filter(i => i.tag === filter);
  }, [items, filter]);

  return <List items={filtered} />;
}`;

export const CameraMovePreview: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic phase label based on current camera status
  let phaseLabel = "FRAME 0 - 30: GÓC NHÌN TOÀN CẢNH (SCALE 1.00)";
  let phaseColor = THEME.colors.textSecondary;

  if (frame >= 30 && frame < 80) {
    phaseLabel = "FRAME 30 - 80: EMPHASIS ZOOM (SCALE 1.12, SPRING)";
    phaseColor = THEME.colors.accentCyan;
  } else if (frame >= 80) {
    phaseLabel = "FRAME 80 - 120: PULL-BACK RESET (SCALE 1.00)";
    phaseColor = THEME.colors.accentEmerald;
  }

  return (
    <SafeLayout>
      <Branding seriesName="CAMERA MOVE SYSTEM" channelName="@laptrinhfullstack" />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "24px",
          padding: "0 10px",
        }}
      >
        {/* Camera Status Pill Indicator (Stationary, outside camera transform) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginBottom: "36px",
            padding: "8px 24px",
            borderRadius: "999px",
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            border: `1.5px solid ${phaseColor}`,
            fontSize: "16px",
            fontWeight: 800,
            fontFamily: THEME.fonts.code,
            color: phaseColor,
            letterSpacing: "0.04em",
            boxShadow: `0 0 16px ${phaseColor}40`,
          }}
        >
          {phaseLabel}
        </div>

        {/* CameraMove Wrapper: Wraps the focal code panel */}
        <CameraMove
          initial={{ scale: 1.0, x: 0, y: 0 }}
          moves={[
            CameraPresets.emphasisZoom(30, 22, -10, 1.10),
            CameraPresets.pullBack(80, 22),
          ]}
        >
          <MacWindow
            filename="ProductList.tsx"
            tag={{ text: "KEY EMPHASIS BEAT", variant: "good" }}
            glow={frame >= 30 && frame < 80 ? "good" : "default"}
          >
            <CodeBlock
              code={SAMPLE_CODE}
              language="tsx"
              fontSize={25}
              highlightLines={[
                {
                  line: 3,
                  type: "good",
                },
              ]}
            />
          </MacWindow>
        </CameraMove>
      </div>
    </SafeLayout>
  );
};
