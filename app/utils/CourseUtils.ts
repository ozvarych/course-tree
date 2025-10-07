import type { Course } from "@/app/types/Course";
import type { CourseNode } from "@/app/types/CourseNode";

/**
 * Build an array of course-trees from a flat list of courses
 *
 * @param courses a flat list of courses
 * @returns an array of course-trees
 */
function buildCourseTree(courses: Course[]): CourseNode[] {
  const courseMap = new Map<number, CourseNode>();
  const courseRoots: CourseNode[] = [];

  // Create course nodes with an empty array of children and put in map
  for (const course of courses) {
    const id = course.id;
    if (!id) {
      continue; // skip invalid entries
    }

    const courseNode: CourseNode = {
      ...course,
      children: [],
    };
    courseMap.set(id, courseNode);
  }

  // Link children to parents
  for (const node of courseMap.values()) {
    const parentId = node.parent_id;
    if (parentId && parentId !== node.id) {
      const parent = courseMap.get(parentId);
      if (parent) {
        parent.children = parent.children ?? [];
        parent.children.push(node);
        continue;
      }
    }
    // If no valid parent found, it's a root
    courseRoots.push(node);
  }

  // Sort course children
  return sortCourseChildren(courseRoots);
}

/**
 * Sort the course tree array by name and children array by name.
 *
 * @param courseRoots an array of course-trees
 * @returns a sorted array of course-trees and their sorted children
 */

function sortCourseChildren(courseRoots: CourseNode[]): CourseNode[] {
  const sortedCourseRoots = courseRoots.sort(sortChildren);
  for (const root of sortedCourseRoots.values()) {
    root.children = root.children.sort(sortChildren);
  }
  return sortedCourseRoots;
}

/**
 * Function to compare two corse nodes by id
 *
 * @param a The first course for comparison
 * @param b The second course for comparison.
 * @returns number of sort
 */
function sortChildren(a: CourseNode, b: CourseNode): number {
  return a.id < b.id ? -1 : 1;
}

const CourseUtils = {
  buildCourseTree,
};

export default CourseUtils;
