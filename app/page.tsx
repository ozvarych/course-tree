import React from "react";

import CapIcon from "@/app/icons/CapIcon";
import SearchCourses from "@/app/components/SearchCourses";

export default function Home(): React.ReactElement {
  return (
    <div className="mx-auto mt-16 w-[800px] rounded-md bg-white py-4">
      <main className="flex w-full flex-col bg-white px-4 ">
        <div className="flex flex-row gap-2 mb-4">
          <CapIcon className="size-8 text-violet-600 stroke-2" />
          <div className="font-bold mb-4 text-3xl text-violet-600">
            Search Courses
          </div>
        </div>
        <SearchCourses />
      </main>
    </div>
  );
}
