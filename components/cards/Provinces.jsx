"use client";
import { useStore } from "@context/store";
import { useState } from "react";

function Provinces() {
  const { wilaya, daira, filterInfo } = useStore();
  const [slicer, setSlicer] = useState(10);
  if (filterInfo?.wilaya?.text === "") {
    return (
      <div className='flex flex-wrap gap-2'>
        {wilaya.slice(0, slicer).map((region, index) => (
          <button
            name="wilaya"
            onClick={(e) => {
              e.preventDefault();
              useStore.setState((state) => ({
                filterInfo: {
                  ...state.filterInfo,
                  wilaya: { text: region.text, value: region.value },
                }
              }));}}
            key={index}
            className='p-1 px-2   bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-inputDark hover:bg-slate-400 font-medium'>
            <p>{region.text}</p>
          </button>
        ))}
        {wilaya.length !== slicer ? (
          <button onClick={() => setSlicer(wilaya.length)} className='hover:text-sky-500 text-sm'>
            " عرض المزيد ..."
          </button>
        ) : (
          <button onClick={() => setSlicer(10)} className='hover:text-sky-500 text-sm'>
            "عرض القليل ..."
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className='flex flex-wrap gap-2'>
        {daira
          .filter((region) => region?.wilaya === filterInfo?.wilaya?.value)
          .slice(0, slicer)
          .map((region, index) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                useStore.setState((state) => ({
                  filterInfo: {
                    ...state.filterInfo,
                    daira: { text: region.text, value: region.value },
                  },
                }));
              }}
              key={index}
              className='p-1 px-2  bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-inputDark hover:bg-slate-400 font-medium'>
              <p>{region.text}</p>
            </button>
          ))}
        {wilaya.length !== slicer ? (
          <button onClick={() => setSlicer(wilaya.length)} className='hover:text-sky-500 text-sm'>
            " عرض المزيد ..."
          </button>
        ) : (
          <button onClick={() => setSlicer(10)} className='hover:text-sky-500 text-sm'>
            "عرض القليل ..."
          </button>
        )}
      </div>
    );
  }
}

export default Provinces;
