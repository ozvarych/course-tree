import CourseUtils from "@/app/utils/CourseUtils";

import type { Course } from "@/app/types/Course";
import type { CourseNode } from "@/app/types/CourseNode";

describe("Course Utils Build Course Tree", () => {
  it("should handle one course ", () => {
    const flatCourses: Course[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
      },
    ];

    const treeCourses: CourseNode[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
        children: [],
      },
    ];
    expect(CourseUtils.buildCourseTree(flatCourses)).toEqual(treeCourses);
  });

  it("should handle nested hierarchy", () => {
    const flatCourses: Course[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
      },
      {
        id: 2,
        name: "test2",
        parent_id: 1,
      },
      {
        id: 3,
        name: "test3",
        parent_id: 2,
      },
    ];

    const treeCourses: CourseNode[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
        children: [
          {
            id: 2,
            name: "test2",
            parent_id: 1,
            children: [
              {
                id: 3,
                name: "test3",
                parent_id: 2,
                children: [],
              },
            ],
          },
        ],
      },
    ];
    expect(CourseUtils.buildCourseTree(flatCourses)).toEqual(treeCourses);
  });

  it("should handle multiple roots", () => {
    const flatCourses: Course[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
      },
      {
        id: 2,
        name: "test2",
        parent_id: 1,
      },
      {
        id: 3,
        name: "test3",
        parent_id: 6,
      },
      {
        id: 4,
        name: "test4",
        parent_id: 3,
      },
    ];

    const treeCourses: CourseNode[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
        children: [
          {
            id: 2,
            name: "test2",
            parent_id: 1,
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: "test3",
        parent_id: 6,
        children: [
          {
            id: 4,
            name: "test4",
            parent_id: 3,
            children: [],
          },
        ],
      },
    ];
    expect(CourseUtils.buildCourseTree(flatCourses)).toEqual(treeCourses);
  });

  it("should handle sorting multiple roots by id", () => {
    const flatCourses: Course[] = [
      {
        id: 4,
        name: "test4",
        parent_id: 3,
      },
      {
        id: 3,
        name: "test3",
        parent_id: 6,
      },
      {
        id: 2,
        name: "test2",
        parent_id: 1,
      },
      {
        id: 1,
        name: "test1",
        parent_id: 0,
      },
    ];

    const treeCourses: CourseNode[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 0,
        children: [
          {
            id: 2,
            name: "test2",
            parent_id: 1,
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: "test3",
        parent_id: 6,
        children: [
          {
            id: 4,
            name: "test4",
            parent_id: 3,
            children: [],
          },
        ],
      },
    ];
    expect(CourseUtils.buildCourseTree(flatCourses)).toEqual(treeCourses);
  });

  it("should ignore cyclic references", () => {
    const flatCourses: Course[] = [
      {
        id: 1,
        name: "test1",
        parent_id: 2,
      },
      {
        id: 2,
        name: "test2",
        parent_id: 1,
      },
    ];

    const treeCourses: CourseNode[] = [];
    expect(CourseUtils.buildCourseTree(flatCourses)).toEqual(treeCourses);
  });
});
