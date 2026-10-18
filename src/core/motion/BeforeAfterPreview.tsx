import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { BeforeAfter } from "./BeforeAfter";

const BAD_CODE = `function Parent({ id }) {
  // ❌ Tạo mới callback mỗi lần render
  const handleClick = () => {
    doAction(id);
  };

  return <ExpensiveChild onClick={handleClick} />;
}`;

const GOOD_CODE = `function Parent({ id }) {
  // ✅ Giữ nguyên tham chiếu bộ nhớ
  const handleClick = useCallback(() => {
    doAction(id);
  }, [id]);

  return <ExpensiveChild onClick={handleClick} />;
}`;

export const BeforeAfterPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="BEFORE & AFTER DEMO" channelName="@laptrinhfullstack" />

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
        <BeforeAfter
          mode="sequential"
          transitionEffect="wipe-down"
          switchFrame={45}
          transitionDuration={12}
          fontSize={27}
          before={{
            filename: "BadHandler.tsx",
            tag: { text: "UNSTABLE CALLBACK ❌", variant: "bad" },
            code: BAD_CODE,
            highlightLines: [
              { line: 2, type: "bad" },
              { line: 3, type: "bad" },
            ],
            note: "Mỗi lần cha render, hàm handleClick mang địa chỉ bộ nhớ mới!",
          }}
          after={{
            filename: "CleanHandler.tsx",
            tag: { text: "MEMOIZED CALLBACK ✅", variant: "good" },
            code: GOOD_CODE,
            highlightLines: [
              { line: 2, type: "good" },
              { line: 5, type: "good" },
            ],
            note: "useCallback giữ nguyên tham chiếu hàm, bảo vệ ExpensiveChild!",
          }}
          lessonTakeaway="BÀI HỌC: Chỉ truyền callback bọc trong useCallback khi component con là React.memo!"
        />
      </div>
    </SafeLayout>
  );
};
