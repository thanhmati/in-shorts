export interface UdemyCourseInstructor {
  name: string;
  avatar: string;
  handle: string;
  role: string;
}

export interface UdemyCourse {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  platform: "Udemy";
  rating: number;
  ratingCount: number;
  badgeText: string;
  highlights: string[];
  ctaText: string;
  url: string;
  instructor: UdemyCourseInstructor;
}

export const UDEMY_COURSES: Record<string, UdemyCourse> = {
  "nestjs-realtime": {
    id: "nestjs-realtime",
    title: "NestJS Thực Chiến: API & Real-time App",
    subtitle: "Xây dựng hệ thống Enterprise với TypeScript, PostgreSQL, Prisma & Docker",
    coverImage: "courses/nestjs-cover.png",
    platform: "Udemy",
    rating: 4.8,
    ratingCount: 19,
    badgeText: "HOT & NEW ⭐",
    highlights: [
      "Thực chiến Real-time Chat App với WebSockets & Prisma",
      "Làm chủ PostgreSQL, Docker Compose & Migrations",
      "Bảo mật JWT, Rate Limiting & Clean Architecture",
    ],
    ctaText: "LINK ƯU ĐÃI KHÓA HỌC TẠI BIO & BÌNH LUẬN GHIM 🚀",
    url: "https://www.udemy.com/course/nestjs-thuc-chien-xay-dung-api-tu-co-ban-en-nang-cao/",
    instructor: {
      name: "Đỗ Tấn Thành",
      avatar: "courses/instructor-avatar.png",
      handle: "@laptrinhfullstack",
      role: "Fullstack Engineer & Instructor",
    },
  },
};

export const DEFAULT_COURSE = UDEMY_COURSES["nestjs-realtime"];

export function getCourse(courseId?: string): UdemyCourse {
  if (courseId && UDEMY_COURSES[courseId]) {
    return UDEMY_COURSES[courseId];
  }
  return DEFAULT_COURSE;
}
