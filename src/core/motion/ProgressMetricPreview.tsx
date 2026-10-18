import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { ProgressMetric } from "./ProgressMetric";

export const ProgressMetricPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="PERFORMANCE METRIC DEMO" channelName="@laptrinhfullstack" />

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
        <ProgressMetric
          type="benchmark-bars"
          title="TỐC ĐỘ TRA CỨU (100,000 PHẦN TỬ)"
          subtitle="Minh họa thời gian thực thi: Array.find() vs Set.has()"
          startFrame={10}
          durationInFrames={35}
          unit="ms"
          maxValue={500}
          benchmarkItems={[
            {
              id: "array-find",
              label: "1. Array.find() — Thuật toán O(N)",
              value: 480,
              variant: "rose",
              deltaBadge: "Chậm ❌",
            },
            {
              id: "set-has",
              label: "2. Set.has() — Thuật toán O(1)",
              value: 12,
              variant: "emerald",
              deltaBadge: "40x Nhanh hơn 🚀",
              highlight: true,
            },
          ]}
          conclusion={{
            text: "Set.has() sử dụng Hash Map giúp tra cứu tức thì chỉ trong 12ms!",
            variant: "good",
            atFrame: 45,
          }}
        />
      </div>
    </SafeLayout>
  );
};
