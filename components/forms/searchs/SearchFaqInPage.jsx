"use client";
import Image from "next/image";
import Link from "next/link";


function SearchFaqInPage() {
    return (
      <div className='card rounded-md p-4 flex flex-col gap-4 justify-center'>
        <div id='title' className=''>
          <h1 className='font-bold text-clamp-xl   text-sky-500'>
            اوجاع صدر وظهر وكتمة وضيق صدر منذ سنتين
          </h1>
        </div>
        <div id='content' className='text-justify text-sm'>
          <h2>
            السلام عليكم هل من الممكن ان تكون الحساسية الصدرية (الربو) تسبب الما في الصدر والظهر
            فانا مريض حساسية صدرية واسكو الام قوية في الصدر(خاصة في الجهة...{" "}
          </h2>
        </div>
        <h2 className='font-semibold text-sm text-center text-green-500'>أجاب على هذا السؤال:</h2>
        <div id='doctor' className=''>
          <Link
            className='mb-1 grow shrink basis-[70%] min-w-[280px] items-center flex gap-4'
            href='#'>
            <div id='avatar' className='rounded-lg'>
              <Image className="" src='/images/doc1.webp' width={50} height={50} alt='avatar' />
            </div>
            <div id='title' className='flex flex-col gap-1'>
              <h1 className='font-bold text-clamp-xl text-sky-500'>الدكتور مراد بلغازي</h1>
              <h2 className='font-semibold text-xs'>أخصائي الأمراض الرئوية</h2>
            </div>
          </Link>
        </div>
        <div id='button' className=''>
          <Link href='#' className=''>
            <button id='call-btn' className='w-full btn2 p-2 flex gap-2 items-enter justify-center'>
              <Image className="w-auto h-auto" src='/images/ask.webp' width={20} height={10} alt='avatar' />
              <p className='font-semibold mx-1'>انظر الاجابة</p>
            </button>
          </Link>
        </div>
        <div className='border-b-[1px] border-gray-200 w-full'></div>
        <div id='others' className=''>
          <h2 className='font-semibold text-sm text-center my-4'>أسألة متعلقة</h2>
          <div className='flex flex-col gap-2'>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>كيس على المستو الجبين</p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>دوائ الحساسية</p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>ألم كبير في ساقاي</p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>عدم القدرة على التبول </p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>التأخر الحركي</p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>المغص و الغازات</p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>السكري في الدم </p>
              </button>
            </Link>
            <Link href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-enter'>
                <Image className="w-auto h-auto" src='/images/inscription.webp' width={20} height={5} alt='avatar' />
                <p className='font-semibold text-sky-400 mx-1'>صبام الحامل</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default SearchFaqInPage;
