import React from "react";

function ToggleInput({ label, type, checked, name, id, placeholder, helper, ...rest }) {
  return (
    <div className='flex gap-2 items-center justify-center'>
      <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {checked ? "مشغل" : "موقف"}
      </span>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          checked={checked}
          className='sr-only peer'
          id={id}
          name={name}
          {...rest}
        />
        <div className="w-11 h-6 bg-gray-200   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
      </label>
    </div>
  );
}

export default ToggleInput;
