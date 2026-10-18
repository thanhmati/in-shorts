import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/series-a-async-foreach.json";

export type AsyncForeachEpisodeProps = {
  id: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  thumbnail: VideoThumbnailProps;
};

export const asyncForeachEpisode: AsyncForeachEpisodeProps = {
  id: "async-foreach-01",
  topicTitle: "BẪY ASYNC/AWAIT CHẾT NGƯỜI TRONG ARRAY.FOREACH",
  audioSrc: "audio/series-a-async-foreach.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  thumbnail: {
    badgeText: "JAVASCRIPT PITFALL #03",
    headlineMain: "ĐỪNG DÙNG ASYNC/AWAIT",
    headlineHighlight: "TRONG FOREACH! ⚠️",
    subText: "Tại sao console.log lại chạy trước khi database lưu xong?",
    codeSnippet: {
      filename: "silent-bug.js",
      language: "javascript",
      code: `users.forEach(async (user) => {
  await saveUserToDB(user); // ❌ KHÔNG ĐỢI!
});
console.log("XONG TẤT CẢ! 🚀"); // CHẠY ĐẦU TIÊN`,
    },
    channelName: "@laptrinhfullstack",
  },
};
