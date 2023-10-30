import Image from 'next/image';
import React from 'react'

export default function HospsName(props) {
  return (
    <div className='flex  items-center text-right whitespace-nowrap justify-start gap-2'>
      <div id={props?._id}>
        <Image
          className='rounded-md min-w-[50px] w-auto h-auto'
          src={props?.avatar?.[0]}
          width={40}
          height={40}
          alt='avatar'
        />
      </div>
      <div id='title' className='flex flex-col'>
        <h1 className='font-bold text-clamp-xl text-sky-500  '>
          {props?.name}
        </h1>
        <h2 className='font-semibold'>{props?.title?.text}</h2>
      </div>
    </div>
  );
}


