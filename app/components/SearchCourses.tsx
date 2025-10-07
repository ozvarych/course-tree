"use client";

import React from "react";

import { useState } from "react";

import Card from "@/app/common/Card";
import CourseCard from "@/app/components/CourseCard";
import MessageBanner from "@/app/common/MessageBanner";
import Search from "@/app/common/Search";

import { genCourseTree } from "@/app/actions/courses";
import { StatusType, type Response } from "@/app/types/Response";

import type { CourseNode } from "@/app/types/CourseNode";

const placeholderCourses: CourseNode[] = [
  {
    id: 1,
    name: "Module 1: Placeholder",
    parent_id: 0,
    children: [
      {
        id: 4,
        name: "Child course",
        parent_id: 1,
        children: [],
      },
      {
        id: 6,
        name: "Another child course",
        parent_id: 1,
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "Placeholder",
    parent_id: 0,
    children: [
      {
        id: 5,
        name: "test",
        parent_id: 2,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Module 17: Placeholder",
    parent_id: 0,
    children: [],
  },
];

function SearchCourses(): React.ReactElement {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseNode[]>([]);

  const handleSearch = async (newQuery: string) => {
    setIsLoading(true);
    setQuery(newQuery);
    setErrorMessage(null);
    setCourses([]);
    const response: Response = await genCourseTree(newQuery);
    if (response.status === StatusType.OK) {
      setCourses(response.data);
    }
    if (response.status === StatusType.ERROR) {
      setErrorMessage(response.message);
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setQuery("");
    setCourses([]);
    setErrorMessage(null);
  };

  return (
    <>
      <Search
        disabled={isLoading}
        placeholder="Search courses ..."
        query={query}
        onClear={handleClear}
        onSearch={handleSearch}
      />
      <div className="flex flex-col py-8 gap-2">
        {isLoading &&
          placeholderCourses.map((c: CourseNode, index: number) => (
            <Card key={index}>
              <CourseCard course={c} isLoading={true} />
            </Card>
          ))}
        {errorMessage != null && (
          <MessageBanner message={errorMessage} status="ERROR" />
        )}
        {courses.length === 0 &&
          query !== "" &&
          !isLoading &&
          errorMessage == null && (
            <MessageBanner
              message="No courses matched your search."
              status="INFO"
            />
          )}
        {courses.map((course: CourseNode) => (
          <Card key={course.id}>
            <CourseCard course={course} />
          </Card>
        ))}
      </div>
    </>
  );
}

export default SearchCourses;
