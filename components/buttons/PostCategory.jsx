"use client";
import React from "react";
import { useStore } from "@context/store";
function PostCategory({ title, section, svg,fill }) {
  const { filterInfo } = useStore();
  return (
    <div className={`${filterInfo?.section?.some(item => section?.includes(item)) && "bg-yellow-600"} p-1  whitespace-nowrap`}>
      <button
        onClick={() => {
          useStore.setState((state) => ({
            filterInfo: {
              ...state.filterInfo,
              section,
            },
          }));
        }}
        className='flex gap-2 font-semibold p-2 rounded-lg hover:text-sky-700 card'>
        <svg
          className={`${fill} w-6 h-6`}
          viewBox='0 0 24 24'>
          <path d={svg} />
        </svg>
        {title}
      </button>
    </div>
  );
}

export default PostCategory;
