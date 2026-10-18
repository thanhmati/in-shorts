import { SeriesAShortProps, SubtitleData } from "../../../core/types";
import subtitles from "../../../../public/audio/series-a-react-rerender.json";

export const reactRerenderEpisode: SeriesAShortProps = {
  id: "react-rerender-01",
  topicTitle: "TRÁNH RE-RENDER TRONG REACT",
  hookText: "Hàm & object inline tạo tham chiếu mới làm re-render toàn bộ!",
  audioSrc: "audio/series-a-react-rerender.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  scenes: {
    hookDurationFrames: 360, // Switch to Good Code at frame 360 ("Hãy khắc phục ngay...")
    badCode: {
      title: "BadParent.tsx",
      language: "tsx",
      code: `function UserProfile() {
  // ❌ TẠO MỚI THAM CHIẾU MỖI KHI RENDER
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
  // ✅ GIỮ NGUYÊN THAM CHIẾU VỚI USEMEMO / USECALLBACK
  const config = useMemo(
    () => ({ theme: "dark", role: "admin" }), 
    []
  );
  const handleUpdate = useCallback(() => fetchUser(), []);

  return <UserCard config={config} onUpdate={handleUpdate} />;
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
    takeawayText: "Dùng useMemo cho Object và useCallback cho Function khi truyền vào Component con!",
  },
};
