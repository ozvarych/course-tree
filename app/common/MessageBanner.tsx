import React from "react";

import ErrorIcon from "@/app/icons/ErrorIcon";
import InfoIcon from "@/app/icons/InfoIcon";

interface Props {
  message: string;
  status: "ERROR" | "INFO";
}

function MessageBanner(props: Props): React.ReactElement {
  let icon: React.ReactElement | null = null;
  let color: string = "";

  switch (props.status) {
    case "ERROR":
      icon = <ErrorIcon className="size-6 flex-none text-red-700" />;
      color = "bg-red-100 text-red-900";
      break;

    case "INFO":
    default:
      icon = <InfoIcon className="size-6 flex-none text-blue-700" />;
      color = "bg-blue-100 text-blue-900";
      break;
  }

  return (
    <div className={`flex flex-row gap-2 rounded-md p-4 ${color}`}>
      {icon}
      {props.message}
    </div>
  );
}

export default MessageBanner;
