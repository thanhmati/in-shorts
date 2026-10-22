import { Composition, Folder, Still } from "remotion";
import { CodingTipShort } from "./series/series-a/CodingTipShort";
import { EventLoopShort } from "./series/series-a/EventLoopShort";
import { VideoThumbnail } from "./core/VideoThumbnail";
import { KineticTypographyPreview } from "./core/motion/KineticTypographyPreview";
import { CodeRevealPreview } from "./core/motion/CodeRevealPreview";
import { CodeFocusPreview } from "./core/motion/CodeFocusPreview";
import { BeforeAfterPreview } from "./core/motion/BeforeAfterPreview";
import { NodeGraphPreview } from "./core/motion/NodeGraphPreview";
import { PacketFlowPreview } from "./core/motion/PacketFlowPreview";
import { TerminalSequencePreview } from "./core/motion/TerminalSequencePreview";
import { ProgressMetricPreview } from "./core/motion/ProgressMetricPreview";
import { StateTransitionPreview } from "./core/motion/StateTransitionPreview";
import { CameraMovePreview } from "./core/motion/CameraMovePreview";
import {
  SceneTransitionPreview,
  SCENE_SEQUENCE_TOTAL_FRAMES,
} from "./core/motion/SceneTransitionPreview";
import { reactRerenderEpisode } from "./series/series-a/data/react-rerender";
import { jsEventLoopEpisode } from "./series/series-a/data/js-event-loop";
import { AsyncForeachShort } from "./series/series-a/AsyncForeachShort";
import { asyncForeachEpisode } from "./series/series-a/data/async-foreach";
import { JsInterviewQuizShort } from "./series/series-a/JsInterviewQuizShort";
import { jsInterviewQuizEpisode } from "./series/series-a/data/js-interview-quiz";
import {
  CoursePromoOutroPreview,
  udemyPromoOutroSubtitles,
} from "./core/CoursePromoOutroPreview";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="MotionSystem">
        <Composition
          id="KineticTypographyPreview"
          component={KineticTypographyPreview}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="CodeRevealPreview"
          component={CodeRevealPreview}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="CodeFocusPreview"
          component={CodeFocusPreview}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BeforeAfterPreview"
          component={BeforeAfterPreview}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NodeGraphPreview"
          component={NodeGraphPreview}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="PacketFlowPreview"
          component={PacketFlowPreview}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="TerminalSequencePreview"
          component={TerminalSequencePreview}
          durationInFrames={100}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ProgressMetricPreview"
          component={ProgressMetricPreview}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="StateTransitionPreview"
          component={StateTransitionPreview}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="CameraMovePreview"
          component={CameraMovePreview}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SceneTransitionPreview"
          component={SceneTransitionPreview}
          durationInFrames={SCENE_SEQUENCE_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="PromoComponents">
        <Composition
          id="UdemyPromoOutroPreview"
          component={CoursePromoOutroPreview}
          durationInFrames={udemyPromoOutroSubtitles.durationInFrames || 265}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
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

        <Composition
          id="AsyncForeach"
          component={AsyncForeachShort}
          durationInFrames={asyncForeachEpisode.subtitles.durationInFrames || 1270}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={asyncForeachEpisode}
        />
        {asyncForeachEpisode.thumbnail && (
          <Still
            id="AsyncForeach-Thumbnail"
            component={VideoThumbnail}
            width={1080}
            height={1920}
            defaultProps={asyncForeachEpisode.thumbnail}
          />
        )}

        <Composition
          id="JsInterviewQuiz"
          component={JsInterviewQuizShort}
          durationInFrames={jsInterviewQuizEpisode.subtitles.durationInFrames || 1669}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={jsInterviewQuizEpisode}
        />
        {jsInterviewQuizEpisode.thumbnail && (
          <Still
            id="JsInterviewQuiz-Thumbnail"
            component={VideoThumbnail}
            width={1080}
            height={1920}
            defaultProps={jsInterviewQuizEpisode.thumbnail}
          />
        )}
      </Folder>
    </>
  );
};

