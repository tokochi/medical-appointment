"use client";
import React from "react";
import Image from "next/image";
function Hospitals() {
  return (
    <div>
      <div className='card p-4'>
        <Image
          src='/images/logo.png'
          className='min-w-[40px]'
          width={80}
          height={80}
          alt='Flowbite Logo'
        />
        <h1></h1>
      </div>
    </div>
  );
}

export default Hospitals;
