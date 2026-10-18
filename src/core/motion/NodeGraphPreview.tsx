import React from "react";
import { SafeLayout } from "../SafeLayout";
import { Branding } from "../Branding";
import { NodeGraph } from "./NodeGraph";

export const NodeGraphPreview: React.FC = () => {
  return (
    <SafeLayout>
      <Branding seriesName="SYSTEM DESIGN DEMO" channelName="@laptrinhfullstack" />

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
        <NodeGraph
          title="KIẾN TRÚC CLIENT - SERVER - CACHE - DATABASE"
          width={960}
          height={760}
          nodes={[
            // 1. Client App
            {
              id: "client",
              title: "Client Application",
              subtitle: "Web / Mobile (React)",
              type: "client",
              x: 350,
              y: 50,
              width: 260,
              height: 100,
              revealFrame: 5,
              status: { label: "Online", variant: "active", atFrame: 10 },
            },
            // 2. API Gateway & Server
            {
              id: "gateway",
              title: "API Gateway",
              subtitle: "Node.js / Express",
              type: "gateway",
              x: 350,
              y: 280,
              width: 260,
              height: 100,
              revealFrame: 25,
              status: { label: "Rate Limit OK", variant: "idle", atFrame: 35 },
              highlight: {
                active: true,
                variant: "cyan",
                startFrame: 35,
                endFrame: 70,
              },
            },
            // 3. Redis Cache
            {
              id: "cache",
              title: "Redis Cache",
              subtitle: "In-Memory RAM",
              type: "cache",
              x: 140,
              y: 530,
              width: 260,
              height: 100,
              revealFrame: 50,
              status: { label: "Cache Miss ❌", variant: "error", atFrame: 65 },
              highlight: {
                active: true,
                variant: "amber",
                startFrame: 55,
                endFrame: 75,
              },
            },
            // 4. PostgreSQL Primary DB
            {
              id: "database",
              title: "PostgreSQL DB",
              subtitle: "Primary ACID Storage",
              type: "database",
              x: 560,
              y: 530,
              width: 260,
              height: 100,
              revealFrame: 75,
              status: { label: "200 OK ✅", variant: "active", atFrame: 90 },
              highlight: {
                active: true,
                variant: "emerald",
                startFrame: 85,
                endFrame: 120,
              },
            },
          ]}
          edges={[
            // Client to Gateway
            {
              id: "e-client-gw",
              from: "client",
              to: "gateway",
              label: "GET /api/user/42",
              revealFrame: 30,
              drawDuration: 12,
              highlight: {
                active: true,
                variant: "cyan",
                startFrame: 30,
                endFrame: 60,
              },
            },
            // Gateway to Cache
            {
              id: "e-gw-cache",
              from: "gateway",
              to: "cache",
              label: "1. Lookup Key",
              revealFrame: 55,
              drawDuration: 12,
              highlight: {
                active: true,
                variant: "amber",
                startFrame: 55,
                endFrame: 75,
              },
            },
            // Gateway to Database (Fallback query on miss)
            {
              id: "e-gw-db",
              from: "gateway",
              to: "database",
              label: "2. SQL Query",
              dashed: true,
              revealFrame: 80,
              drawDuration: 14,
              highlight: {
                active: true,
                variant: "emerald",
                startFrame: 80,
                endFrame: 120,
              },
            },
          ]}
        />
      </div>
    </SafeLayout>
  );
};
