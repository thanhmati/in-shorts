import React from "react";
import { CoursePromoOutro } from "../../../../core/CoursePromoOutro";
import { getCourse } from "../../../../core/courses";

export const Scene6CoursePromo: React.FC = () => {
  const course = getCourse("nestjs-realtime");

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <CoursePromoOutro
        course={course}
        headlineBadge="KHÓA HỌC BACKEND THỰC CHIẾN 🚀"
        customCta="LINK ƯU ĐÃI KHÓA HỌC TẠI PHẦN MÔ TẢ & BIO 🚀"
      />
    </div>
  );
};

