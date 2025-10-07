import React from "react";

import Text from "@/app/common/Text";

import type { CourseNode } from "@/app/types/CourseNode";

interface Props {
  course: CourseNode;
  isChild?: boolean;
  isLoading?: boolean;
}

function CourseCard(props: Props): React.ReactElement {
  return (
    <div>
      <Text className="mb-4" isLoading={props.isLoading}>
        {`${props.isChild ? "- " : ""}${props.course.name} (${
          props.course.children.length
        })`}
      </Text>
      <div className="flex flex-col gap-2">
        {props.course.children.map((course: CourseNode) => {
          return (
            <div className="pl-8 flex flex-row gap-2" key={course.id}>
              <CourseCard course={course} isChild isLoading={props.isLoading} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseCard;
