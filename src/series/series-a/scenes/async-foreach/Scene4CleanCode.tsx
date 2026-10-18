import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, FastForward, ListOrdered } from "lucide-react";
import { THEME } from "../../../../core/theme";
import { MacWindow } from "../../../../core/MacWindow";
import { CodeBlock } from "../../../../core/CodeBlock";

export const Scene4CleanCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 110 },
  });

  const parallelEntrance = spring({
    frame: frame - 65,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const sequentialCode = `// ✅ CÁCH 1: TUẦN TỰ (Theo thứ tự)
for (const user of users) {
  await saveUserToDB(user); 
  // Chờ user này xong mới tới user sau!
}`;

  const parallelCode = `// ⚡ CÁCH 2: SONG SONG SIÊU TỐC (Parallel)
await Promise.all(
  users.map(async (u) => await saveUserToDB(u))
);
// Gửi đồng thời N request, chờ tất cả cùng xong!`;

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
        gap: "24px",
        padding: "0 20px",
      }}
    >
      {/* Scene Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CheckCircle2 size={36} color={THEME.colors.accentEmerald} />
        <span
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: THEME.colors.accentEmerald,
            letterSpacing: "0.04em",
          }}
        >
          2 GIẢI PHÁP CHUẨN XỊN THAY THẾ
        </span>
      </div>

      {/* Solution 1: for...of (Sequential) */}
      <div style={{ width: "960px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid #38BDF8",
            borderRadius: "999px",
            marginBottom: "10px",
          }}
        >
          <ListOrdered size={20} color="#38BDF8" />
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#38BDF8" }}>
            CÁCH 1: DÙNG FOR...OF (XỬ LÝ TUẦN TỰ)
          </span>
        </div>

        <MacWindow
          filename="sequential-fix.ts"
          glow="good"
        >
          <CodeBlock
            code={sequentialCode}
            language="typescript"
            highlightLines={[
              { line: 2, type: "good" },
              { line: 3, type: "good" },
            ]}
          />
        </MacWindow>
      </div>

      {/* Solution 2: Promise.all (Parallel) */}
      <div
        style={{
          width: "960px",
          opacity: Math.max(0, parallelEntrance),
          transform: `scale(${Math.max(0, parallelEntrance)})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid #10B981",
            borderRadius: "999px",
            marginBottom: "10px",
          }}
        >
          <FastForward size={20} color="#10B981" />
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#10B981" }}>
            CÁCH 2: DÙNG PROMISE.ALL (CHẠY SONG SONG NHANH GẤP 10X)
          </span>
        </div>

        <MacWindow
          filename="parallel-fix.ts"
          glow="good"
        >
          <CodeBlock
            code={parallelCode}
            language="typescript"
            highlightLines={[
              { line: 2, type: "good" },
              { line: 3, type: "good" },
            ]}
          />
        </MacWindow>
      </div>
    </div>
  );
};
