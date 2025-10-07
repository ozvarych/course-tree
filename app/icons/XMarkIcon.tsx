"use client";

import React from "react";

interface Props {
  className?: string;
}

function XMarkIcon(props: Props): React.ReactElement {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default XMarkIcon;
