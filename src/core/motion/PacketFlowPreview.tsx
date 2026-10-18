import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { PacketFlow } from "./PacketFlow";

export const PacketFlowPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="HTTP PACKET FLOW DEMO" channelName="@laptrinhfullstack" />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PacketFlow
          title="HTTP REQUEST & RESPONSE FLOW"
          width={960}
          height={750}
          nodes={[
            {
              id: "client",
              title: "Client Application",
              subtitle: "Browser (React.js)",
              type: "client",
              x: 350,
              y: 50,
              width: 260,
              height: 100,
              status: { label: "Online", variant: "idle" },
            },
            {
              id: "server",
              title: "Backend API Server",
              subtitle: "Node.js / Express",
              type: "service",
              x: 350,
              y: 440,
              width: 260,
              height: 100,
              status: { label: "Ready", variant: "idle" },
            },
          ]}
          stages={[
            // Stage 1: Client sends HTTP POST Request to Server
            {
              id: "http-req",
              from: "client",
              to: "server",
              startFrame: 15,
              durationInFrames: 25,
              payloadLabel: "POST /auth/login { email, pass }",
              variant: "cyan",
              icon: <ArrowDown size={22} strokeWidth={2.8} />,
              arrivalStatus: { label: "Xác thực thành công ✅", variant: "active" },
            },
            // Stage 2: Server returns HTTP 200 Response with JWT back to Client
            {
              id: "http-res",
              from: "server",
              to: "client",
              startFrame: 50,
              durationInFrames: 25,
              payloadLabel: "200 OK + Set-Cookie (JWT)",
              variant: "emerald",
              icon: <ArrowUp size={22} strokeWidth={2.8} />,
              arrivalStatus: { label: "Logged In 🚀", variant: "active" },
            },
          ]}
          stageNotes={[
            {
              stageId: "http-req",
              note: "Giai đoạn 1: Client gửi payload đăng nhập qua giao thức bảo mật HTTPS",
            },
            {
              stageId: "http-res",
              note: "Giai đoạn 2: Server xác thực mật khẩu bcrypt và trả về JWT Session Cookie",
            },
          ]}
        />
      </div>
    </SafeLayout>
  );
};
