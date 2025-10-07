"use client";

import React from "react";

import { useCallback, useEffect, useRef, useState } from "react";

import MagnifyingGlassIcon from "@/app/icons/MagnifyingGlassIcon";
import XMarkIcon from "@/app/icons/XMarkIcon";

interface Props {
  disabled?: boolean;
  placeholder: string;
  query: string;
  onClear: () => void;
  onSearch: (query: string) => void;
}

function Search(props: Props): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>(props.query);
  const prevTermRef = useRef(props.query);

  const handleClear = useCallback(() => {
    setSearchTerm("");
    prevTermRef.current = "";
    props.onClear();
  }, [props.onClear]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  useEffect(() => {
    setSearchTerm(props.query);
    prevTermRef.current = props.query;
  }, [props.query]);

  // Debounce onSearch — fires 400ms after last keystroke
  useEffect(() => {
    if (searchTerm === prevTermRef.current) {
      // no real change, skip
      return;
    }

    const handler = setTimeout(() => {
      props.onSearch(searchTerm);
      prevTermRef.current = searchTerm;
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, props.onSearch]);

  const hasValue = searchTerm != null || searchTerm != "";
  return (
    <div
      className={`
        flex w-full flex-row items-center justify-between rounded-md 
        outline outline-neutral-500 px-4 py-3
        ${
          !props.disabled &&
          `hover:text-neutral-800 hover:outline-neutral-800 
          focus:text-neutral-800 focus:outline-2`
        }
      ${props.disabled && "bg-neutral-200 cursor-not-allowed"}
      `}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <MagnifyingGlassIcon className="h-6 w-6 flex-none text-neutral-500" />
        <div
          className={`text-base w-full flex-auto ${
            hasValue ? "text-black" : "text-gray"
          }`}
        >
          <input
            className={`
              w-full border-none bg-transparent focus:outline-none 
              disabled:cursor-not-allowed
            `}
            disabled={props.disabled}
            type="text"
            placeholder={props.placeholder}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {hasValue && props.disabled !== true && (
        <span onClick={handleClear}>
          <XMarkIcon className="top-3 size-6 cursor-pointer text-neutral-500" />
        </span>
      )}
    </div>
  );
}

export default Search;
