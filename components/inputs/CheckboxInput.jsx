import React from 'react'

function CheckboxInput({
  label,
  name,
  id,
  placeholder,
  helper,
  checked,
  ...rest
}) {
  return (
    <div >
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {placeholder}
      </label>
      <div className='flex items-start justify-start gap-2'>
        <input
          id={id}
          name={name}
          type='checkbox'
          checked={checked}
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          {...rest}
        />
        <label htmlFor={id} className='text-sm font-medium text-gray-900 dark:text-gray-300'>
          {label}
        </label>
      </div>
    </div>
  );
}

export default CheckboxInput