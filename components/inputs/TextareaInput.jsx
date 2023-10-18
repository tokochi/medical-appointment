import React from 'react'

function TextareaInput({
  label,
  name,
  id,
  placeholder,
  helper,
  error,
  ...rest
}) {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={`bg-gray-50  border ${
          error ? "border-red-600 dark:border-red-700" : "border-gray-300 dark:border-gray-600"
        }  text-gray-900 text-sm  placeholder:font-semibold  block w-full p-1  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
        placeholder={placeholder}
        {...rest}></textarea>
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
      {error && (
        <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>
          لا تترك هذه الخانة فارغة
        </p>
      )}
    </div>
  );
}

export default TextareaInput