import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { StateTransition } from "./StateTransition";

export const StateTransitionPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="SYSTEM ARCHITECTURE" channelName="@laptrinhfullstack" />

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
        <StateTransition
          title="VÒNG ĐỜI XÁC THỰC (AUTH LIFECYCLE)"
          startFrame={5}
          initialStateId="unauth"
          states={[
            {
              id: "unauth",
              label: "UNAUTHENTICATED",
              subtitle: "Khách vãng lai / Form đăng nhập",
              description: "Chưa có session token. Người dùng đang ở màn hình đăng nhập.",
              variant: "idle",
            },
            {
              id: "validating",
              label: "VALIDATING",
              subtitle: "Kiểm tra mật khẩu & Ký JWT",
              variant: "loading",
            },
            {
              id: "authenticated",
              label: "AUTHENTICATED",
              subtitle: "Phiên bảo mật đang hoạt động",
              variant: "success",
            },
          ]}
          transitions={[
            {
              fromStateId: "unauth",
              toStateId: "validating",
              atFrame: 35,
              durationInFrames: 12,
              triggerEvent: "POST /api/v1/auth/login",
              description: "Client gửi payload đăng nhập. Hệ thống đối chiếu mã băm và tạo Session Token.",
            },
            {
              fromStateId: "validating",
              toStateId: "authenticated",
              atFrame: 75,
              durationInFrames: 12,
              triggerEvent: "HTTP 200 OK (JWT Issued)",
              description: "Xác thực thành công! Token lưu vào HttpOnly Cookie, cấp quyền truy cập Dashboard.",
            },
          ]}
        />
      </div>
    </SafeLayout>
  );
};
