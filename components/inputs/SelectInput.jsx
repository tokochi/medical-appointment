import React from 'react'

function SelectInput({
  icon,
  label,
  type,
  name,
  option_value,
  option_text,
  id,
  placeholder,
  helper,
  options = [],
  ...rest
}) {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <select
        id={id}
        name={name}
        {...rest}
        className='bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-gray-500 focus:border-gray-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'>
        <option style={{ display: "none" }}>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option[option_value]}>
            {option[option_text]}
          </option>
        ))}
      </select>
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
    </div>
  );
}

export default SelectInput