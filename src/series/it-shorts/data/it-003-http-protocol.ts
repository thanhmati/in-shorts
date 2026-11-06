import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/it-003-http-protocol.json";

export type ITShortEpisodeProps = {
  id: string;
  category: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  thumbnail: VideoThumbnailProps;
};

export const it003Episode: ITShortEpisodeProps = {
  id: "IT-003",
  category: "Web Networking",
  topicTitle: "HTTP LÀ GÌ? CƠ CHẾ GIAO TIẾP WEB CLIENT & SERVER",
  audioSrc: "audio/it-003-http-protocol.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  thumbnail: {
    tagText: "WEB NETWORKING",
    headlineMain: "HTTP HOẠT ĐỘNG",
    headlineHighlight: "THẾ NÀO? ⚡",
    highlightColor: "#38BDF8",
    heroVisualType: "diagram",
    channelName: "@laptrinhfullstack",
  },
};

