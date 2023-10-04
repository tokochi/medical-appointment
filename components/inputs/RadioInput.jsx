import React from 'react'

function RadioInput({ label, type, name, id, placeholder, helper, ...rest }) {
  return (
    <div className='flex items-center mb-4'>
      <input
        id={id}
        type='radio'
        name={name}
        {...rest}
        className='w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      />
      <label
        htmlFor='default-radio-1'
        className='mr-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
       {label}
      </label>
    </div>
  );
}

export default RadioInput