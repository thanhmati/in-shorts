import { Composition, Folder, Still } from "remotion";
import { CodingTipShort } from "./series/series-a/CodingTipShort";
import { EventLoopShort } from "./series/series-a/EventLoopShort";
import { VideoThumbnail } from "./core/VideoThumbnail";
import { reactRerenderEpisode } from "./series/series-a/data/react-rerender";
import { jsEventLoopEpisode } from "./series/series-a/data/js-event-loop";

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

        <Composition
          id="JsEventLoop"
          component={EventLoopShort}
          durationInFrames={jsEventLoopEpisode.subtitles.durationInFrames || 1346}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={jsEventLoopEpisode}
        />
        {jsEventLoopEpisode.thumbnail && (
          <Still
            id="JsEventLoop-Thumbnail"
            component={VideoThumbnail}
            width={1080}
            height={1920}
            defaultProps={jsEventLoopEpisode.thumbnail}
          />
        )}
      </Folder>
    </>
  );
};

