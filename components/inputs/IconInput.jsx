"use client";
import React from "react";
import Image from "next/image";
function IconInput({ icon, label, type, name, id, error, placeholder, helper, ...rest }) {
  return (
    <div className='w-full'>
      <label
        htmlFor={id}
        className='block font-noto mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none'>
          <Image className='w-auto h-auto' src={icon} width={18} height={18} alt='input' />
        </div>
        <input
          type={type}
          id={id}
          name={name}
          className={`bg-gray-50 border placeholder:font-noto placeholder-gray-400  placeholder:font-semibold ${
            error ? "border-red-600 dark:border-red-600" : "border-gray-300 dark:border-gray-600"
          }  text-gray-900 text-sm  focus:ring-gray-500 focus:border-gray-500 block w-full pr-10 p-1  dark:bg-gray-700   dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
      {error && name === "name" && (
        <p className='p-1 text-xs text-red-500 dark:text-red-500'>يرجى ادخال الإسم</p>
      )}
      {error && name === "email" && (
        <p className='p-1 text-xs text-red-500 dark:text-red-500'>يرجى ادخال البريد الإلكتروني</p>
      )}
      {error && (name === "password" || name === "verifyPassword" || name === "pinCode") && (
        <p className='p-1 text-xs text-red-500 dark:text-red-500'>يرجى ادخال الرمز السري</p>
      )}
    </div>
  );
}

export default IconInput;
