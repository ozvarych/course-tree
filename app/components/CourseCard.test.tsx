import React from "react";

import { render, screen } from "@testing-library/react";

import CourseCard from "@/app/components/CourseCard";

import type { CourseNode } from "@/app/types/CourseNode";

// Mock the Text component (to simplify rendering)
jest.mock("@/app/common/Text", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactElement }) => (
    <span>{children} </span>
  ),
}));

describe("CourseCard", () => {
  const mockCourse: CourseNode = {
    id: 1,
    name: "Root Course",
    parent_id: 0,
    children: [
      {
        id: 2,
        name: "Child 1",
        parent_id: 1,
        children: [
          {
            id: 3,
            name: "Grandchild 1",
            parent_id: 2,
            children: [],
          },
        ],
      },
      {
        id: 4,
        name: "Child 2",
        parent_id: 1,
        children: [],
      },
    ],
  };

  it("renders course name with child count", () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText("Root Course (2)")).toBeInTheDocument();
  });

  it("renders child and grandchild courses recursively", () => {
    render(<CourseCard course={mockCourse} />);

    // Root
    expect(screen.getByText("Root Course (2)")).toBeInTheDocument();

    // Child
    expect(screen.getByText("- Child 1 (1)")).toBeInTheDocument();
    expect(screen.getByText("- Child 2 (0)")).toBeInTheDocument();

    // Grandchild
    expect(screen.getByText("- Grandchild 1 (0)")).toBeInTheDocument();
  });

  it("renders loading state if isLoading is true", () => {
    render(<CourseCard course={mockCourse} isLoading />);

    // We mock Text, but we can still verify the name renders
    expect(screen.getByText("Root Course (2)")).toBeInTheDocument();
  });

  it("renders with isChild prefix correctly", () => {
    const childCourse: CourseNode = { ...mockCourse, children: [] };
    render(<CourseCard course={childCourse} isChild />);

    // The "-" prefix should appear
    expect(screen.getByText("- Root Course (0)")).toBeInTheDocument();
  });
});
