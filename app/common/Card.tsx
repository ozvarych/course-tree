"use client";

import React from "react";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

function Card(props: Props): React.ReactElement {
  return (
    <div
      className={`
        rounded-md border border-neutral-300 bg-neutral-100 shadow-lg 
        w-full p-2
    `}
    >
      {props.children}
    </div>
  );
}

export default Card;
