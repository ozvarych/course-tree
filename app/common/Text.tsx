"use client";

import React from "react";

interface Props {
  className: string;
  children: string;
  isLoading?: boolean;
}

function Text(props: Props): React.ReactElement {
  return (
    <div className="text-base">
      <span
        className={`rounded-full px-2 ${props.className} ${
          props.isLoading && "bg-neutral-300 animate-pulse"
        }`}
      >
        <span className={`${props.isLoading && "invisible"}`}>
          {props.children}
        </span>
      </span>
    </div>
  );
}

export default Text;
