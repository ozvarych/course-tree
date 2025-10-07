import { genCourseTree } from "@/app/actions/courses";

import CourseUtils from "@/app/utils/CourseUtils";
import { StatusType } from "@/app/types/Response";

jest.mock("@/app/utils/CourseUtils", () => ({
  __esModule: true,
  default: {
    buildCourseTree: jest.fn(),
  },
}));

describe("Courses genCourseTree", () => {
  const mockBuildCourseTree = CourseUtils.buildCourseTree as jest.Mock;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockBuildCourseTree.mockReset();
  });

  it("returns OK with course tree data when fetch succeeds", async () => {
    const mockFlatCourses = [
      { id: 1, name: "Test 1", parent_id: 0 },
      { id: 2, name: "Test 2", parent_id: 1 },
    ];
    const mockTree = [
      {
        id: 1,
        name: "Test 1",
        parent_id: 0,
        children: [{ id: 2, name: "Test 2", parent_id: 1 }],
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFlatCourses),
      } as Response)
    );

    mockBuildCourseTree.mockReturnValue(mockTree);

    const result = await genCourseTree("test");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("?query=test"),
      expect.objectContaining({ method: "GET" })
    );

    expect(mockBuildCourseTree).toHaveBeenCalledWith(mockFlatCourses);

    expect(result).toEqual({
      status: StatusType.OK,
      message: "Successful fetched courses.",
      data: mockTree,
    });
  });

  it("returns OK with empty data when API returns empty list", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    );

    mockBuildCourseTree.mockReturnValue([]);

    const result = await genCourseTree("empty data");

    expect(result).toEqual({
      status: StatusType.OK,
      message: "Successful fetched courses.",
      data: [],
    });
  });

  it("returns ERROR when fetch fails or response is not ok", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network down")));

    const result1 = await genCourseTree("Error");

    expect(result1).toEqual({
      status: StatusType.ERROR,
      message: "Error fetching courses. Please try again.",
    });

    // simulate response not ok
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      } as Response)
    );

    const result2 = await genCourseTree("Bad");

    expect(result2).toEqual({
      status: StatusType.ERROR,
      message: "Error fetching courses. Please try again.",
    });
  });
});
