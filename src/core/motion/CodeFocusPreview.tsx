import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { CodeFocus } from "./CodeFocus";

const SAMPLE_CODE = `function UserProfile({ userId }) {
  const [data, setData] = useState(null);

  // 1. Fetch user data
  const user = useUserData(userId);

  // 2. Heavy calculation on every render
  const score = calculateReputation(user);

  return <Badge score={score} />;
}`;

export const CodeFocusPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="CODE FOCUS DEMO" channelName="@laptrinhfullstack" />

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
        <CodeFocus
          code={SAMPLE_CODE}
          language="tsx"
          filename="UserProfile.tsx"
          tag={{ text: "CODE INSPECTION 🔍", variant: "info" }}
          fontSize={27}
          dimOpacity={0.28}
          transitionDuration={10}
          focus={[
            // Beat 1 (frames 25 - 70): Focus on custom hook call
            {
              lines: [4, 5],
              startFrame: 25,
              endFrame: 70,
              variant: "cyan",
              label: "Hook dữ liệu",
              note: "Custom hook nạp dữ liệu người dùng từ cache/API",
            },
            // Beat 2 (frames 70 - 120): Shift focus to heavy un-memoized calculation
            {
              lines: [7, 8],
              startFrame: 70,
              variant: "bad",
              label: "Tính toán nặng!",
              note: "Hàm calculateReputation bị thực thi lại mỗi lần render!",
            },
          ]}
        />
      </div>
    </SafeLayout>
  );
};
