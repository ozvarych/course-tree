"use server";

import { StatusType } from "@/app/types/Response";

import CourseUtils from "@/app/utils/CourseUtils";

import type { Course } from "@/app/types/Course";
import type { CourseNode } from "@/app/types/CourseNode";
import type { Response } from "@/app/types/Response";

const SEARCH_COURSE_TREE_URI: string =
  "https://coursetreesearch-service-sandbox.dev.tophat.com/?query=";

/**
 * Searches for courses based on search query and returns a formatted object of
 * array of course trees.
 *
 * @param searchQuery string search query
 * @returns object with enum status, message and data as an array of course tree
 */

export async function genCourseTree(searchQuery: string): Promise<Response> {
  const q = searchQuery.trim();

  try {
    // Expect a flat-list of courses
    const response = await fetch(`${SEARCH_COURSE_TREE_URI}${q}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return {
        status: StatusType.ERROR,
        message: "Error fetching courses. Please try again.",
      };
    }

    // Convert JSON response to course object
    const flatCourses: Course[] = (await response.json()) as Course[];
    // Build an array of course trees from courses flatmap
    const courseTree: CourseNode[] = CourseUtils.buildCourseTree(flatCourses);

    return {
      status: StatusType.OK,
      message: "Successful fetched courses.",
      data: courseTree,
    };
  } catch (error) {
    return {
      status: StatusType.ERROR,
      message: "Error fetching courses. Please try again.",
    };
  }
}
