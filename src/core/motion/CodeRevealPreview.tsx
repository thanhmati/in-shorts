import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { CodeReveal } from "./CodeReveal";

const BAD_CODE_SNIPPET = `function Parent() {
  const [count, setCount] = useState(0);

  // ❌ Tạo mới object mỗi render
  const userConfig = { theme: "dark", role: "admin" };

  return <Child config={userConfig} />;
}`;

export const CodeRevealPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="CODE REVEAL DEMO" channelName="@laptrinhfullstack" />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "0 10px",
        }}
      >
        <CodeReveal
          code={BAD_CODE_SNIPPET}
          language="tsx"
          filename="BadParent.tsx"
          tag={{ text: "INLINE ALLOCATION ❌", variant: "bad" }}
          glow="bad"
          mode="steps"
          fontSize={28}
          steps={[
            // Step 1: Reveal component definition & state
            { lines: [1, 2], atFrame: 5 },
            // Step 2: Reveal problematic inline object with bad highlight & label
            {
              lines: [4, 5],
              atFrame: 30,
              highlight: {
                type: "bad",
                label: "Cấp phát mới!",
              },
            },
            // Step 3: Reveal return statement passing prop
            { lines: [7, 8], atFrame: 65 },
          ]}
          timedHighlights={[
            // Narration beat: emphasize lines 4 & 5 strongly during explanation
            {
              lines: [4, 5],
              startFrame: 30,
              endFrame: 110,
              type: "bad",
              label: "0x1A4F !== 0x89C2",
            },
          ]}
          showLineMarker={true}
          keepLayoutStable={true}
        />
      </div>
    </SafeLayout>
  );
};
