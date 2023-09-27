import React from 'react'

function TextInput({
  label,
  type,
  name,
  id,
  placeholder,
  helper,
  ...rest
}) {
  return (
    <div className='w-full'>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className='bg-gray-50  border border-gray-300 text-gray-900 text-sm  placeholder:font-semibold  block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
        placeholder={placeholder}
        {...rest}
      />
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
    </div>
  );
}

export default TextInput