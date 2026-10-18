import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Layers, ZapOff } from "lucide-react";
import { THEME } from "../../../../core/theme";
import { MacWindow } from "../../../../core/MacWindow";
import { CodeBlock } from "../../../../core/CodeBlock";

export const Scene3UnderTheHood: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = 1 + Math.sin(frame / 4) * 0.04;

  const polyfillCode = `// BÊN TRONG ARRAY.PROTOTYPE.FOREACH:
Array.prototype.myForEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    // ⚠️ GỌI CALLBACK NHƯNG KHÔNG CÓ "AWAIT"!
    callback(this[i], i, this); // -> Trả về Promise<pending>
    // forEach KHÔNG HỀ ĐỢI mà chạy ngay vòng lặp tiếp theo!
  }
};`;

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
        <Cpu size={32} color={THEME.colors.accentAmber} />
        <span
          style={{
            fontSize: "36px",
            fontWeight: 900,
            color: THEME.colors.accentAmber,
            letterSpacing: "0.04em",
          }}
        >
          TẠI SAO FOREACH BỎ QUA AWAIT?
        </span>
      </div>

      {/* Polyfill MacWindow */}
      <div style={{ width: "960px" }}>
        <MacWindow
          filename="array-prototype-foreach.js (Under the Hood)"
          glow="default"
        >
          <CodeBlock
            code={polyfillCode}
            language="javascript"
            highlightLines={[
              { line: 4, type: "bad" },
              { line: 5, type: "bad" },
              { line: 6, type: "highlight" },
            ]}
          />
        </MacWindow>
      </div>

      {/* Visual Memory / Execution Pipeline */}
      <div
        style={{
          width: "960px",
          backgroundColor: "#0B1120",
          border: `2px solid rgba(251, 191, 36, 0.4)`,
          borderRadius: "20px",
          padding: "24px 30px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Layers size={24} color="#FBBF24" />
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#FBBF24" }}>
              LUỒNG THỰC THI BẤT ĐỒNG BỘ:
            </span>
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#F87171",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              transform: `scale(${pulse})`,
            }}
          >
            KHÔNG ĐỢI PROMISE!
          </span>
        </div>

        {/* Promise items representation */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
          {[1, 2, 3].map((num) => {
            const delay = (num - 1) * 15;
            const itemEntrance = spring({
              frame: frame - delay,
              fps,
              config: { damping: 10, stiffness: 120 },
            });
            return (
              <div
                key={num}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  border: "2px dashed #F59E0B",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  transform: `scale(${Math.max(0, itemEntrance)})`,
                  opacity: itemEntrance,
                }}
              >
                <span style={{ fontSize: "16px", color: "#94A3B8", fontWeight: 700 }}>
                  Item #{num}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#FDE047",
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  Promise &lt;pending&gt;
                </span>
                <span style={{ fontSize: "15px", color: "#EF4444", fontWeight: 700 }}>
                  (Bị forEach bỏ rơi)
                </span>
              </div>
            );
          })}
        </div>

        {/* Danger alert footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(239, 68, 68, 0.4)",
          }}
        >
          <ZapOff size={22} color="#EF4444" />
          <span style={{ fontSize: "20px", color: "#FECDD3", fontWeight: 700 }}>
            forEach được thiết kế cho code đồng bộ — nó hoàn toàn không biết callback là async!
          </span>
        </div>
      </div>
    </div>
  );
};
