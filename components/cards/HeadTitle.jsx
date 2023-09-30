'use client'
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import {  usePathname } from "next/navigation";
function HeadTitle() {
  const path = usePathname().slice(7);
  const [pathname, setPathname] = useState("الرئيسيـــة");
  useEffect(() => {
    switch (path) {
      case "dashboard":
        setPathname("الرئيسيـــة");
        break;
      case "dashboard/doctors":
        setPathname("الأطبـــــــاء");
        break;
      case "dashboard/pharms":
        setPathname("الصيـــدلات");
        break;
      case "dashboard/labs":
        setPathname("المختبـــرات");
        break;
      case "dashboard/hospitals":
        setPathname("لعيــــــادات");
        break;
      case "dashboard/posts":
        setPathname("المقـــــالات");
        break;
      case "dashboard/users":
        setPathname("المستخدميــــن");
        break;
      case "dashboard/settings":
        setPathname("الإعــــــدادات");
        break;
    }
  }, [path]);
  return (
    <div
      id='title'
      className='overflow-hidden shadow-md shadow-cyan-400/30 dark:shadow-transparent s flex justify-between m-1.5 md:m-4  md:mx-10  bg-primary rounded-2xl'>
      <h1 className='p-4 text-clamp-xl font-bold text-white '>{pathname}</h1>
      <Image
        className='min-w-[50px]'
        src='/images/pulse-2.png'
        width={150}
        height={150}
        alt='input'
      />
    </div>
  );
}

export default HeadTitle;
