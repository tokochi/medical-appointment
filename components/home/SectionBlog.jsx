"use client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Image from "next/image";

function SectionBlog() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: { origin: "center", perView: 1.5, spacing: 30 },
  });

  return (
    <div className='bg-sky-50 dark:bg-gray-800 w-full'>
      <div className='p-5 flex justify-between items-center mx-auto md:max-w-[600px]'>
        <h1 className='font-bold text-clamp-2xl py-4 text-center'>المجلة الطبية</h1>
        <button className='btn px-4 py-2 whitespace-nowrap'> المزيد من المقالات</button>
      </div>
      <div className='p-4 flex flex-wrap gap-4 justify-center'>
        <div className='w-[350px] items-center justify-center'>
          <Image
            className='rounded-md w-auto h-auto'
            width={350}
            height={350}
            src='/images/carousel4.webp'
            alt='hero'
          />
          <h1 className='font-bold text-clamp-xl text-sky-500 py-2'>الكوليسترول</h1>
          <h2 className='font-semibold text-clamp-xl'>
            السبب الرئيسي للوفاة هو أمراض القلب والأوعية الدموية هي المشكلة الصحية العامة رقم...
          </h2>
        </div>
        <div className='w-[350px] items-center justify-center'>
          <Image
            className='rounded-md w-auto h-auto'
            width={350}
            height={350}
            src='/images/carousel5.webp'
            alt='hero'
          />
          <h1 className='font-bold text-clamp-xl text-sky-500 py-2'>الحمل خارج الرحم</h1>
          <h2 className='font-semibold text-clamp-xl'>
            خلال الحمل الطبيعي تمر البويضة المخصبة عبر مسار معين تسلكه ليستقر الحمل ويحدث التعشيش
            ...داخل تجويف الرحم
          </h2>
        </div>

        <div ref={sliderRef} className='keen-slider md:max-w-[600px]'>
          <div className='keen-slider__slide rounded-md'>
            <Image
              key='1'
              className='w-auto h-auto'
              width={350}
              height={350}
              src='/images/carousel1.webp'
              alt='hero'
            />
            <h1 className='font-bold text-clamp-xl text-sky-500 py-2'>اضرار التدخين</h1>
          </div>
          <div className='keen-slider__slide rounded-md'>
            <Image
              key='2'
              className='w-auto h-auto'
              width={350}
              height={350}
              src='/images/carousel2.webp'
              alt='hero'
            />
            <h1 className='font-bold text-clamp-xl text-sky-500 py-2'>صرطان الثدي</h1>
          </div>
          <div className='keen-slider__slide rounded-md'>
            <Image
              key='3'
              className='w-auto h-auto'
              src='/images/carousel3.webp'
              width={350}
              height={350}
              alt='hero'
            />
            <h1 className='font-bold text-clamp-xl text-sky-500 py-2'>فوائد التغذية</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBlog;
