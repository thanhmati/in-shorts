import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/series-a-js-event-loop.json";

export type JsEventLoopEpisodeProps = {
  id: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  code: string;
  thumbnail: VideoThumbnailProps;
};

export const jsEventLoopEpisode: JsEventLoopEpisodeProps = {
  id: "js-event-loop-01",
  topicTitle: "JAVASCRIPT EVENT LOOP: THỨ TỰ IN RA LÀ GÌ?",
  audioSrc: "audio/series-a-js-event-loop.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  code: `console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");`,
  thumbnail: {
    badgeText: "CÂU ĐỐ PHỎNG VẤN JAVASCRIPT",
    headlineMain: "THỨ TỰ CONSOLE.LOG",
    headlineHighlight: "LÀ GÌ? 90% ĐOÁN SAI ❌",
    subText: "Tại sao Promise (3) lại chạy trước setTimeout (2)?",
    codeSnippet: {
      filename: "event-loop.js",
      language: "javascript",
      code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`,
    },
    channelName: "@laptrinhfullstack",
  },
};
