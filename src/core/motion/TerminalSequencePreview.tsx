import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { TerminalSequence } from "./TerminalSequence";

export const TerminalSequencePreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="DEV TOOLS DEMO" channelName="@laptrinhfullstack" />

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
        <TerminalSequence
          title="thanhdo@macbook: ~/in-shorts — zsh"
          fontSize={25}
          lineHeight={1.65}
          glow="auto"
          steps={[
            {
              command: "npm run build",
              prompt: "➜",
              cwd: "~/in-shorts",
              typeStartFrame: 10,
              typeDurationFrames: 20,
              outputStartFrame: 36,
              outputLineDelay: 6,
              outputLines: [
                { text: "> in-shorts@1.0.0 build", type: "dim" },
                { text: "> remotion bundle --bundle-cache", type: "dim" },
                { text: "Bundling entrypoint with Rspack...", type: "info" },
                { text: "3 compositions verified (1080×1920 @ 30 FPS)", type: "stdout" },
                { text: "Built in 410ms (0 errors, 0 warnings)", type: "success" },
                { text: "Bundle size: 1.2 MB — Ready to render! 🚀", type: "success" },
              ],
              status: {
                label: "BUNDLE SUCCESS ✅",
                variant: "good",
                atFrame: 72,
              },
            },
          ]}
          takeawayNote={{
            text: "Rspack tăng tốc độ bundle Remotion gấp 5 lần so với Webpack truyền thống!",
            variant: "good",
            atFrame: 72,
          }}
        />
      </div>
    </SafeLayout>
  );
};
