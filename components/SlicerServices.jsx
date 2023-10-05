"use client";
import Link from "next/link";
import { useState } from "react";

function SlicerServices({ item }) {

  const [slicer, setSlicer] = useState(null);
  return (
    <div id='works' className='flex flex-wrap gap-2'>
      {item?.services
        .slice(0, item?._id == slicer ? item?.services?.length : 5)
        .map((service, index) => (
          <Link key={index} href='#'>
            <button
              key={index}
              className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
              <p>{service.text}</p>
            </button>
          </Link>
        ))}
      {item?.services?.length > 5 && item?._id != slicer && (
        <button
          className='text-sm text-sky-600 text-left p-2'
          id={item?._id}
          onClick={(e) => {
            e.preventDefault();
            setSlicer(e.target.getAttribute("id"));
          }}>
          عرض المزيد ⋙
        </button>
      )}
    </div>
  );
}

export default SlicerServices;
