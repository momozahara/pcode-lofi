import React from "react";
import { playPath } from "components/button";
import { ItemProps } from "./types/item";

export default function Item({ item, current, onClick }: ItemProps) {
  return (
    <div
      className={`item ${item === current ? "main" : ""}`}
      onClick={() => onClick(item)}
    >
      <div className="item-content">
        <div className="mr-[12px]">
          <svg
            className="w-[24px] h-[24px]"
            viewBox="0 0 48 48"
          >
            <path
              fill="currentColor"
              d={playPath}
            />
          </svg>
        </div>
        <div className="uppercase drop">{item.name}</div>
      </div>
    </div>
  );
}
