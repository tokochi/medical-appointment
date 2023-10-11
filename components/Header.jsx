
import { useStore } from "@context/serverStore";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import SidebarToggle from "./buttons/SidebarToggle";
import DarkModeToggle from "./buttons/DarkModeToggle";
import HeaderButtons from "./buttons/HeaderButtons";
import StoreInit from "./StoreInit";

async function Header({ session }) {
  const { isSidebarOpen} = useStore.getState();
  return (
    <nav  className='bg-primary  border-gray-200 border-b-4 border-b-border transition-colors duration-300'>
      <div className='container flex items-center  w-full py-2  px-4'>
        <StoreInit />
        <SidebarToggle />
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
            <HeaderButtons />
        )}
        <DarkModeToggle />
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
