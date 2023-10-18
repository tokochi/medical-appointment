import React from "react";

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
  error,
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
        className={`bg-gray-50 border ${
          error ? "border-red-600 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
        }  text-gray-900 text-sm  font-semibold   block w-full p-1 dark:bg-gray-700   dark:text-gray-200`}>
        <option style={{ display: "none" }}>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} tag={option.tag} value={option[option_value]}>
            {option[option_text]}
          </option>
        ))}
      </select>
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
      {error && <p className='p-1 text-xs text-red-500 dark:text-red-500'>يرجى ادخال الاختصاص</p>}
    </div>
  );
}

export default SelectInput;
