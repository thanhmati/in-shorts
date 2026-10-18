import { SeriesAShortProps, SubtitleData } from "../../../core/types";
import subtitles from "../../../../public/audio/series-a-react-rerender.json";

export const reactRerenderEpisode: SeriesAShortProps = {
  id: "react-rerender-01",
  topicTitle: "TẠI SAO REACT RE-RENDER VÔ ÍCH?",
  hookText: "Hàm & object inline tạo vùng nhớ mới (0x89C2 !== 0x1A4F) làm con re-render!",
  audioSrc: "audio/series-a-react-rerender.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  scenes: {
    hookDurationFrames: 630, // Switch to Clean Code at frame 633 ("Hãy khắc phục ngay...")
    badCode: {
      title: "BadParent.tsx",
      language: "tsx",
      code: `function UserProfile() {
  // ❌ TẠO VÙNG NHỚ MỚI MỖI KHI RENDER
  return (
    <UserCard 
      config={{ theme: "dark", role: "admin" }}
      onUpdate={() => fetchUser()} 
    />
  );
}`,
      highlightLines: [
        { line: 2, type: "bad" },
        { line: 5, type: "bad" },
        { line: 6, type: "bad" },
      ],
      tag: {
        text: "BAD CODE ❌",
        variant: "bad",
      },
    },
    goodCode: {
      title: "CleanParent.tsx",
      language: "tsx",
      code: `function UserProfile() {
  // ✅ CỐ ĐỊNH THAM CHIẾU VÙNG NHỚ
  const config = useMemo(
    () => ({ theme: "dark", role: "admin" }), 
    []
  );
  const handleUpdate = useCallback(
    () => fetchUser(), 
    []
  );

  return (
    <UserCard 
      config={config} 
      onUpdate={handleUpdate} 
    />
  );
}`,
      highlightLines: [
        { line: 2, type: "good" },
        { line: 3, type: "good" },
        { line: 7, type: "good" },
      ],
      tag: {
        text: "CLEAN CODE ✅",
        variant: "good",
      },
    },
    takeawayText: "Dùng useMemo cho Object, useCallback cho Hàm và bọc con bằng React.memo!",
  },
  thumbnail: {
    badgeText: "CẢNH BÁO HIỆU NĂNG REACT",
    headlineMain: "TẠI SAO REACT",
    headlineHighlight: "RE-RENDER VÔ ÍCH? ❌",
    subText: "90% Lập trình viên vô tình mắc lỗi này!",
    codeSnippet: {
      filename: "BadParent.tsx",
      language: "tsx",
      code: `// ❌ TẠO Ô NHỚ MỚI MỖI KHI RENDER
<UserCard 
  config={{ role: "admin" }} 
  onUpdate={() => fetchUser()} 
/>`,
    },
    channelName: "@laptrinhfullstack",
  },
};
