"use client";
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  const isSidebarOpen = useStore((state) => state.sidebarOpen);

  function toggleSidebar() {
    useStore.setState({ sidebarOpen: !useStore.getState().sidebarOpen });
  }
  return (
    <div
      className={`${
        isSidebarOpen ? "w-[250px]" : "w-0 "
      } bg-gray-100 overflow-x-hidden z-40 shadow-xl h-screen fixed right-0 top-0  dark:bg-gray-800  transition-w duration-300`}>
      <button
        className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        onClick={toggleSidebar}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312L10.585938 12L4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031L12 13.414062L18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969L13.414062 12L19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688L12 10.585938L5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            fill='#6B7280'
          />
        </svg>
      </button>
      <div className='flex flex-col gap-4 p-4 list-none dark:text-gray-100'>
        <li>
          <Link onClick={() => toggleSidebar()} href='/' className='flex gap-2 font-bold'>
            <Image
              src='/images/home.png'
              className='min-w-[24px] w-auto h-auto'
              width={24}
              height={24}
              alt='الرئيسية'
            />
            الرئيسية
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/about' className='flex gap-2 font-bold'>
            <Image
              src='/images/info.png'
              className=' w-auto h-auto'
              width={24}
              height={24}
              alt='من نحن؟'
            />
            من نحن؟
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/contact-us' className='flex gap-2 font-bold'>
            <Image
              src='/images/messaging.png'
              className=' w-auto h-auto'
              width={24}
              height={24}
              alt='اتصل بنا'
            />
            اتصل بنا
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/blog' className='flex gap-2 font-bold '>
            <Image
              src='/images/blog.png'
              className=' w-auto h-auto'
              width={24}
              height={24}
              alt='مقالات طبية'
            />
            مقالات طبية
          </Link>
        </li>
        <li className='p-2 border-t border-gray-500'>البحث عن ؟</li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/doctors' className='flex gap-2 font-bold'>
            <Image
              src='/images/doctor.png'
              className=' w-auto h-auto'
              width={24}
              height={24}
              alt='طبيب مختص'
            />
            طبيب مختص
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/hospitals' className='flex gap-2 font-bold'>
            <Image
              src='/images/hospital.png'
              className='w-auto h-auto'
              width={24}
              height={24}
              alt='مصحة'
            />
            عيادة
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/labs' className='flex gap-2 font-bold'>
            <Image
              src='/images/laboratory.png'
              className='w-auto h-auto'
              width={24}
              height={24}
              alt='مختبر'
            />
            مختبر
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/pharms' className='flex gap-2 font-bold'>
            <Image
              src='/images/pharm.png'
              className=' w-auto h-auto'
              width={24}
              height={24}
              alt='صيدلية'
            />
            صيدلية
          </Link>
        </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/questions' className='flex gap-2 font-bold'>
            <Image
              src='/images/help.png'
              className='w-auto h-auto'
              width={24}
              height={24}
              alt='إستشارات طبية'
            />
            إستشارات طبية
          </Link>
        </li>
        <li className='p-2 border-t border-gray-500'>المستخدم </li>
        <li>
          <Link onClick={() => toggleSidebar()} href='/login' className='flex gap-2 font-bold'>
            <Image
              src='/images/user.png'
              className='w-auto h-auto'
              width={24}
              height={24}
              alt='تسجيل'
            />
            تسجيل
          </Link>
        </li>
        <li>
          <Link href='#' className='flex gap-2 font-bold'>
            <Image
              src='/images/lang.png'
              className='w-auto h-auto'
              width={24}
              height={24}
              alt=' AR  العربية '
            />
             AR  العربية
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
