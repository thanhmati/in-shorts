import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/it-001-nestjs-lifecycle.json";

export type ITShortEpisodeProps = {
  id: string;
  category: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  thumbnail: VideoThumbnailProps;
};

export const it001Episode: ITShortEpisodeProps = {
  id: "IT-001",
  category: "NestJS Deep Dive",
  topicTitle: "MIDDLEWARE VS GUARD VS INTERCEPTOR TRONG NESTJS",
  audioSrc: "audio/it-001-nestjs-lifecycle.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  thumbnail: {
    badgeText: "NESTJS ARCHITECTURE DEEP DIVE",
    headlineMain: "MIDDLEWARE vs GUARD",
    headlineHighlight: "vs INTERCEPTOR ⚡",
    highlightColor: "#38BDF8",
    subText: "Hiểu chuẩn vòng đời Request Lifecycle trong NestJS",
    codeSnippet: {
      filename: "request-lifecycle.ts",
      language: "typescript",
      code: `// Thứ tự thực thi chuẩn trong NestJS:
1. Middleware   -> Pre-routing (CORS / Parser)
2. Guards       -> canActivate() (Auth & Roles)
3. Interceptors -> Pre-controller logic
4. Pipes        -> Validation & Transform
5. RouteHandler -> Controller / Business Logic
6. Interceptors -> RxJS tap / map (Outbound)`,
    },
    channelName: "@laptrinhfullstack",
  },
};
