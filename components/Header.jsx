"use client";
import { useStore } from "@context/store";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Header({ session }) {
 const { isSidebarOpen } = useStore();
  function toggleSidebar() {
    useStore.setState({ sidebarOpen: !useStore.getState().sidebarOpen });
  }
  function toggleDark() {
    try {
      if (typeof window !== "undefined") {
        const value = JSON.parse(localStorage?.getItem("theme"));
        localStorage?.setItem("theme", JSON.stringify(!value));
        document.documentElement.classList?.toggle("dark");
        useStore.setState({ darkTheme: !value });
      }
    } catch (error) {
      console.log("🚀 ~error localStorage");
    }
  }
  return (
    <nav className='bg-primary  border-gray-200 border-b-4 border-b-border transition-colors duration-300'>
      <div className='container flex items-center  w-full py-2  px-4'>
        <button
          data-collapse-toggle='navbar-default'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={toggleSidebar}>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <Link className='' href='/'>
          <Image
            src='/images/logo.webp'
            className='min-w-[40px]'
            width={80}
            height={80}
            alt='Flowbite Logo'
          />
        </Link>
        <div className='hidden lg:flex gap-6 grow justify-center items-center'>
          <Link className='links' href='/doctors'>
            الأطباء
          </Link>
          <Link className='links' href='/labs'>
            مختبر
          </Link>
          <Link className='links' href='/pharms'>
            صيدلية
          </Link>
          <Link className='links' href='/hospitals'>
            العيادات
          </Link>
          <Link className='links' href='/questions'>
            الأسئلة الطبية
          </Link>
          <Link className='links' href='/blog'>
            مقالات طبية
          </Link>
          {/* <Link className='links' href='/contact-us'>
            اتصل بنا
          </Link> */}
        </div>

        {!session ? (
          <Link className='mx-2 mr-auto' href='/login'>
            <button type='button' className='btn px-4 py-2'>
              تسجيل
            </button>
          </Link>
        ) : (
          <Link className='mx-2 mr-auto' href='/'>
            <button onClick={() => signOut()} type='button' className='btn px-4 py-2'>
              خروج
            </button>
          </Link>
        )}
        <button
          onClick={toggleDark}
          type='button'
          className={` mx-2 origin-center dark:rotate-180 transition-all duration-300`}>
          <Image src='/images/dark.webp' width={20} height={20} alt='Flowbite Logo' />
        </button>
      </div>
      <div
        className={`${
          isSidebarOpen &&
          "fixed top-0 left-0 z-20 h-full w-full bg-black bg-opacity-50 backdrop-blur-[2px] pointer-events-none"
        }`}
      />
      <Sidebar />
    </nav>
  );
}

export default Header;
