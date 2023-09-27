import React from 'react'

function TextareaInput({
  label,
  name,
  id,
  placeholder,
  helper,
  ...rest
}) {
  return (
    <div className='relative z-0 w-full mb-6 group'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className='block p-1 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
        placeholder={placeholder}
        {...rest}></textarea>
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
    </div>
  );
}

export default TextareaInput