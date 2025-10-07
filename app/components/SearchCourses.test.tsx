import React from "react";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";

import SearchCourses from "@/app/components/SearchCourses";

import { genCourseTree } from "@/app/actions/courses";
import { StatusType } from "@/app/types/Response";

// Mock the server action
jest.mock("@/app/actions/courses", () => ({
  genCourseTree: jest.fn(),
}));

// Helper: find search input by placeholder
const typeAndSearch = async (text: string) => {
  const input = screen.getByPlaceholderText("Search courses ...");
  await userEvent.type(input, text);
  //   const button = screen.getByRole("button", { name: /search/i });
  //   await userEvent.click(button);
};

describe("SearchCourses", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Successful fetch renders results
  it("renders course results on successful fetch", async () => {
    const mockData = [
      {
        id: 1,
        name: "Test 1",
        parent_id: 0,
        children: [],
      },
    ];

    (genCourseTree as jest.Mock).mockResolvedValue({
      status: StatusType.OK,
      message: "Fetched successfully",
      data: mockData,
    });

    render(<SearchCourses />);

    await typeAndSearch("Test");

    // Wait for course to appear
    expect(await screen.findByText("Test 1 (0)")).toBeInTheDocument();
    expect(screen.queryByText("No courses matched your search.")).toBeNull();
    expect(screen.queryByText(/Error/)).toBeNull();
  });

  it("shows info message banner when no courses are found", async () => {
    (genCourseTree as jest.Mock).mockResolvedValue({
      status: StatusType.OK,
      message: "Fetched successfully",
      data: [],
    });

    render(<SearchCourses />);

    await typeAndSearch("UnknownCourse");

    expect(
      await screen.findByText("No courses matched your search.")
    ).toBeInTheDocument();
  });

  it("shows error message banner when fetch fails", async () => {
    (genCourseTree as jest.Mock).mockResolvedValue({
      status: StatusType.ERROR,
      message: "Error fetching courses. Please try again.",
    });

    render(<SearchCourses />);

    await typeAndSearch("ErrorQuery");

    expect(
      await screen.findByText("Error fetching courses. Please try again.")
    ).toBeInTheDocument();
  });
});
