import { SubtitleData, VideoThumbnailProps } from "../../../core/types";
import subtitles from "../../../../public/audio/series-a-js-interview-quiz.json";

export type QuizQuestion = {
  id: number;
  numberLabel: string;
  questionText: string;
  code: string;
  optionA: {
    label: string;
    value: string;
    isCorrect: boolean;
  };
  optionB: {
    label: string;
    value: string;
    isCorrect: boolean;
  };
  correctValue: string;
  explanation: string;
  startFrame: number;
  revealFrame: number;
  endFrame: number;
};

export type JsInterviewQuizEpisodeProps = {
  id: string;
  topicTitle: string;
  audioSrc: string;
  subtitles: SubtitleData;
  questions: QuizQuestion[];
  thumbnail: VideoThumbnailProps;
};

export const jsInterviewQuizEpisode: JsInterviewQuizEpisodeProps = {
  id: "js-interview-quiz-01",
  topicTitle: "THỬ THÁCH 5 CÂU HỎI PHỎNG VẤN JAVASCRIPT HÓC BÚA",
  audioSrc: "audio/series-a-js-interview-quiz.mp3",
  subtitles: subtitles as unknown as SubtitleData,
  questions: [
    {
      id: 1,
      numberLabel: "CÂU HỎI 1 / 5",
      questionText: "typeof NaN trả về kiểu dữ liệu gì?",
      code: `console.log(typeof NaN);`,
      optionA: { label: "A", value: '"undefined"', isCorrect: false },
      optionB: { label: "B", value: '"number"', isCorrect: true },
      correctValue: '"number"',
      explanation: "Chuẩn IEEE 754: NaN (Not-a-Number) vẫn thuộc kiểu số thực!",
      startFrame: 185,
      revealFrame: 280,
      endFrame: 445,
    },
    {
      id: 2,
      numberLabel: "CÂU HỎI 2 / 5",
      questionText: "Mảng rỗng cộng mảng rỗng ra kết quả gì?",
      code: `console.log([] + []);`,
      optionA: { label: "A", value: "[]", isCorrect: false },
      optionB: { label: "B", value: '"" (Chuỗi rỗng)', isCorrect: true },
      correctValue: '"" (Chuỗi rỗng)',
      explanation: "Ép kiểu Primitive: [].toString() nối nhau thành chuỗi rỗng \"\"!",
      startFrame: 445,
      revealFrame: 535,
      endFrame: 705,
    },
    {
      id: 3,
      numberLabel: "CÂU HỎI 3 / 5",
      questionText: "0.1 + 0.2 === 0.3 là true hay false?",
      code: `console.log(0.1 + 0.2 === 0.3);`,
      optionA: { label: "A", value: "true", isCorrect: false },
      optionB: { label: "B", value: "false", isCorrect: true },
      correctValue: "false",
      explanation: "Sai số nhị phân: 0.1 + 0.2 = 0.30000000000000004 !== 0.3!",
      startFrame: 705,
      revealFrame: 845,
      endFrame: 980,
    },
    {
      id: 4,
      numberLabel: "CÂU HỎI 4 / 5",
      questionText: "In biến x trước khi khai báo var x = 5?",
      code: `console.log(x);\nvar x = 5;`,
      optionA: { label: "A", value: "ReferenceError", isCorrect: false },
      optionB: { label: "B", value: "undefined", isCorrect: true },
      correctValue: "undefined",
      explanation: "Cơ chế Hoisting đưa khai báo var x lên đầu với undefined!",
      startFrame: 980,
      revealFrame: 1088,
      endFrame: 1250,
    },
    {
      id: 5,
      numberLabel: "CÂU HỎI 5 / 5",
      questionText: "true == \"true\" là true hay false?",
      code: `console.log(true == "true");`,
      optionA: { label: "A", value: "true", isCorrect: false },
      optionB: { label: "B", value: "false", isCorrect: true },
      correctValue: "false",
      explanation: "Toán tử == ép cả hai về số: Number(true)=1 !== Number('true')=NaN!",
      startFrame: 1250,
      revealFrame: 1345,
      endFrame: 1480,
    },
  ],
  thumbnail: {
    badgeText: "JS INTERVIEW QUIZ #01",
    headlineMain: "THỬ THÁCH 5 CÂU",
    headlineHighlight: "PHỎNG VẤN JS! ⚡",
    highlightColor: "#FBBF24",
    subText: "90% ứng viên trả lời sai ít nhất 2 câu! Kèm giải thích chi tiết!",
    codeSnippet: {
      filename: "interview-quiz.js",
      language: "javascript",
      code: `typeof NaN === ?\n[] + [] === ?\n0.1 + 0.2 === 0.3 ?`,
    },
    channelName: "@laptrinhfullstack",
  },
};
