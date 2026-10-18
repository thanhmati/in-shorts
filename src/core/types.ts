export type WordCaption = {
  word: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
};

export type SubtitleData = {
  text: string;
  voice: string;
  rate: string;
  fps: number;
  durationInFrames: number;
  durationInSeconds: number;
  words: WordCaption[];
};

export type CodeHighlightLine = {
  line: number;
  type?: "bad" | "good" | "highlight";
};

export type CodingTipScene = {
  title: string;
  subtitle?: string;
  code: string;
  language: string;
  highlightLines?: CodeHighlightLine[];
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
};

export type PlatformSeo = {
  title: string;
  description: string;
  hashtags: string[];
};

export type VideoSeo = {
  youtube: {
    title: string;
    description: string;
    hashtags: string[];
  };
  tiktok: {
    caption: string;
    hashtags: string[];
  };
  facebook: {
    caption: string;
    hashtags: string[];
  };
};

export type VideoThumbnailProps = {
  badgeText: string;
  headlineMain: string;
  headlineHighlight: string;
  highlightColor?: string;
  subText?: string;
  codeSnippet?: {
    filename: string;
    code: string;
    language: string;
  };
  channelName?: string;
};

export type SeriesAShortProps = {
  id: string;
  topicTitle: string;
  hookText: string;
  audioSrc: string;
  subtitles: SubtitleData;
  scenes: {
    hookDurationFrames: number;
    badCode: CodingTipScene;
    goodCode: CodingTipScene;
    takeawayText: string;
  };
  seo?: VideoSeo;
  thumbnail?: VideoThumbnailProps;
};
