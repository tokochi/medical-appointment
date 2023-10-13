import React from 'react'

function NothingFound() {
  return (
    <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
      <div className='card rounded-lg p-4 flex flex-col justify-center items-center gap-4 m-5 text-xl font-semibold'>
        <svg className='w-10 h-10' viewBox='0 0 40 40'>
          <path
            fill='#f2faff'
            d='M9.5,34.5V30c0-4.092,2.412-7.838,6.145-9.545L16.639,20l-0.994-0.455 C11.912,17.838,9.5,14.092,9.5,10V5.5h21V10c0,4.092-2.412,7.838-6.145,9.545L23.361,20l0.994,0.455 C28.088,22.162,30.5,25.908,30.5,30v4.5H9.5z'
          />
          <path
            fill='#788b9c'
            d='M30,6v4c0,3.897-2.297,7.465-5.853,9.091L22.158,20l1.989,0.909C27.703,22.535,30,26.103,30,30v4 H10v-4c0-3.897,2.297-7.465,5.853-9.091L17.842,20l-1.989-0.909C12.297,17.465,10,13.897,10,10V6H30 M31,5H9v5 c0,4.445,2.642,8.265,6.437,10C11.642,21.735,9,25.555,9,30v5h22v-5c0-4.445-2.642-8.265-6.437-10C28.358,18.265,31,14.445,31,10 V5L31,5z'
          />
          <path
            fill='#8bb7f0'
            d='M9.5 6.5L9.5 4.5 6.5 4.5 6.5 1.5 33.5 1.5 33.5 4.5 30.5 4.5 30.5 6.5z'
          />
          <path fill='#4e7ab5' d='M33,2v2h-2h-1v1v1H10V5V4H9H7V2H33 M34,1H6v4h3v2h22V5h3V1L34,1z' />
          <g>
            <path
              fill='#8bb7f0'
              d='M6.5 38.5L6.5 35.5 9.5 35.5 9.5 33.5 30.5 33.5 30.5 35.5 33.5 35.5 33.5 38.5z'
            />
            <path
              fill='#4e7ab5'
              d='M30,34v1v1h1h2v2H7v-2h2h1v-1v-1H30 M31,33H9v2H6v4h28v-4h-3V33L31,33z'
            />
          </g>
        </svg>
        <p>لايوجـــد عنصر يوافـــق البحـــث</p>
      </div>
    </div>
  );
}

export default NothingFound
