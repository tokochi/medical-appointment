"use client"
import React from 'react'
function TextInput({
  label,
  type,
  name,
  id,
  placeholder,
  error,
  helper,
  ...rest
}) {
 return (
   <div className='w-full'>
     <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>{label}</label>
     <input
       id={id}
       name={name}
       type={type}
       className={`bg-gray-50  border ${
         error ? "border-red-600 dark:border-red-700" : "border-gray-300 dark:border-gray-600"
       }  text-gray-900 text-sm  placeholder:font-semibold  block w-full p-1  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
       placeholder={placeholder}
       {...rest}
     />
     {helper && <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{helper}</p>}
     {error && (name === "name" || name.includes(".name")) && (
       <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>يرجى ادخال الإسم</p>
     )}
     {error && (name === "email" || name.includes(".email")) && (
       <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>
         يرجى ادخال البريد الإلكتروني
       </p>
     )}
     {error  && (
       <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>
         يرجى ادخال العنوان
       </p>
     )}
     {error && (name === "password" || name === "verifyPassword" || name === "pinCode") && (
       <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>
         يرجى ادخال الرمز السري
       </p>
     )}
   </div>
 );
}
export default TextInput