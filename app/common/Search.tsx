"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";

import MagnifyingGlassIcon from "@/app/icons/MagnifyingGlassIcon";
import XMarkIcon from "@/app/icons/XMarkIcon";

type Props = {
  disabled?: boolean;
  placeholder?: string;
  query: string;
  onSearch: (query: string) => void;
  onClear: () => void;
};

function Search(props: Props): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState(props.query);
  const prevTermRef = useRef(props.query);

  const handleClear = () => {
    setSearchTerm("");
    prevTermRef.current = "";
    props.onClear();
  };

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      className={`
        flex w-full flex-row items-center justify-between rounded-md 
        outline outline-neutral-500 px-4 py-3
        ${
          !props.disabled &&
          "hover:text-neutral-800 hover:outline-neutral-800 focus:text-neutral-800 focus:outline-2"
        }
      `}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <MagnifyingGlassIcon className="h-6 w-6 flex-none text-neutral-500" />
        <div
          className={`text-base w-full flex-auto ${
            searchTerm != null || searchTerm != "" ? "text-black" : "text-gray"
          }`}
        >
          <input
            className="w-full border-none bg-transparent focus:outline-none"
            disabled={props.disabled}
            type="text"
            placeholder={props.placeholder}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {searchTerm != null && searchTerm != "" && props.disabled != true && (
        <span onClick={handleClear}>
          <XMarkIcon className="top-3 h-6 w-6 cursor-pointer text-neutral-500" />
        </span>
      )}
    </div>
  );
}

export default Search;
