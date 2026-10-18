import { Composition, Folder, Still } from "remotion";
import { CodingTipShort } from "./series/series-a/CodingTipShort";
import { VideoThumbnail } from "./core/VideoThumbnail";
import { reactRerenderEpisode } from "./series/series-a/data/react-rerender";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Series-A-CodingTips">
        <Composition
          id="ReactRerender"
          component={CodingTipShort}
          durationInFrames={reactRerenderEpisode.subtitles.durationInFrames || 1193}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={reactRerenderEpisode}
        />
        {reactRerenderEpisode.thumbnail && (
          <Still
            id="ReactRerender-Thumbnail"
            component={VideoThumbnail}
            width={1080}
            height={1920}
            defaultProps={reactRerenderEpisode.thumbnail}
          />
        )}
      </Folder>
    </>
  );
};
