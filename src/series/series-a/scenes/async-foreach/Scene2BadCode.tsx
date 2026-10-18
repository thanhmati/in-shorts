import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertCircle, Terminal, XCircle } from "lucide-react";
import { MacWindow } from "../../../../core/MacWindow";
import { CodeBlock } from "../../../../core/CodeBlock";
import { THEME } from "../../../../core/theme";

export const Scene2BadCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Terminal output pops up at frame 140 (when voice reaches "Nhưng bất ngờ là...")
  const terminalEntrance = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  const badCodeSnippet = `async function processUsers(users: User[]) {
  // ❌ BẪY ASYNC NGẦM TRONG FOREACH
  users.forEach(async (user) => {
    await saveUserToDB(user);
  });

  console.log("XONG TẤT CẢ! 🚀");
}`;

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
        gap: "28px",
        padding: "0 20px",
      }}
    >
      {/* Scene Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <XCircle size={32} color={THEME.colors.accentRose} />
        <span
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: THEME.colors.accentRose,
            letterSpacing: "0.04em",
          }}
        >
          ĐOẠN CODE DÍNH BẪY ASYNC
        </span>
      </div>

      {/* Main MacWindow with Bad Code */}
      <div style={{ width: "960px" }}>
        <MacWindow
          filename="process-users.ts"
          glow="bad"
        >
          <CodeBlock
            code={badCodeSnippet}
            language="typescript"
            highlightLines={[
              { line: 3, type: "bad" },
              { line: 4, type: "bad" },
              { line: 7, type: "highlight" },
            ]}
          />
        </MacWindow>
      </div>

      {/* Terminal Real-World Output Simulation */}
      {frame >= 120 && (
        <div
          style={{
            width: "960px",
            backgroundColor: "#030712",
            border: `2px solid rgba(244, 63, 94, 0.7)`,
            borderRadius: "18px",
            padding: "22px 28px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            transform: `translateY(${interpolate(terminalEntrance, [0, 1], [40, 0])}px) scale(${terminalEntrance})`,
            opacity: terminalEntrance,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Terminal size={22} color="#F43F5E" />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#F43F5E",
                fontFamily: "JetBrains Mono",
              }}
            >
              TERMINAL OUTPUT THỰC TẾ:
            </span>
          </div>

          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "24px",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ color: "#34D399", fontWeight: 700 }}>
              &gt; XONG TẤT CẢ! 🚀 <span style={{ color: "#EF4444", fontSize: "20px" }}>(CHẠY ĐẦU TIÊN!)</span>
            </div>
            <div style={{ color: "#64748B" }}>
              [DB] Đang lưu user 1... <span style={{ color: "#F59E0B" }}>(vẫn đang chờ DB)</span>
            </div>
            <div style={{ color: "#64748B" }}>
              [DB] Đang lưu user 2... <span style={{ color: "#F59E0B" }}>(vẫn đang chờ DB)</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(244, 63, 94, 0.15)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              borderRadius: "10px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <AlertCircle size={22} color="#F43F5E" />
            <span style={{ fontSize: "20px", color: "#FECDD3", fontWeight: 700 }}>
              Hàm đã kết thúc nhưng dữ liệu trong Database chưa hề được lưu!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
