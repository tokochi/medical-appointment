"use client"
import React, { useState } from 'react'

function Rating() {
const [rate, setRate] = useState({ star1: true, star2: true, star3:true,star4:true,star5:true,});
  return (
    <div className='flex items-center space-x-1'>
      <h2 className='p-2'>هل أعجبك الرد ؟</h2>
      <svg
        className={`w-4 h-4  cursor-pointer ${rate.star1 ? "text-yellow-300" : "text-gray-500"}`}
        onClick={() =>
          setRate((prev) => ({
            star1: !prev.star1,
            star2: false,
            star3: false,
            star4: false,
            star5: false,
          }))
        }
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
      </svg>
      <svg
        className={`w-4 h-4 cursor-pointer ${rate.star2 ? "text-yellow-300" : "text-gray-500"}`}
        onClick={() =>
          setRate((prev) => ({
            star1: true,
            star2: !prev.star2,
            star3: false,
            star4: false,
            star5: false,
          }))
        }
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
      </svg>
      <svg
        className={`w-4 h-4 cursor-pointer ${rate.star3 ? "text-yellow-300" : "text-gray-500"}`}
        onClick={() =>
          setRate((prev) => ({
            star1: true,
            star2: true,
            star3: !prev.star3,
            star4: false,
            star5: false,
          }))
        }
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
      </svg>
      <svg
        className={`w-4 h-4 cursor-pointer ${rate.star4 ? "text-yellow-300" : "text-gray-500"}`}
        onClick={() =>
          setRate((prev) => ({
            star1: true,
            star2: true,
            star3: true,
            star4: !prev.star4,
            star5: false,
          }))
        }
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
      </svg>
      <svg
        className={`w-4 h-4 cursor-pointer ${rate.star5 ? "text-yellow-300" : "text-gray-500"}`}
        onClick={() =>
          setRate((prev) => ({
            star1: true,
            star2: true,
            star3: true,
            star4: true,
            star5: !prev.star5,
          }))
        }
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 22 20'>
        <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
      </svg>
    </div>
  );
}

export default Rating