import type { Course } from "@/app/types/Course";

export type CourseNode = Course & {
  children: CourseNode[];
};
