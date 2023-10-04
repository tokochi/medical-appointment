"use client"
import Link from "next/link";
import Image from "next/image";
import LoginAdmin from "@components/forms/admin/LoginAdmin";
import { useStore } from "@context/store";
import { useRouter} from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingComponent from "@components/LoadingComponent";
import { useEffect, useState } from "react";


function page() {
  const { isLoading, session } = useStore();
  const router = useRouter()
   if (!session) {
     return (
       <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
         <LoadingComponent size={100} color='#0891b2' loading={isLoading} />
       </div>
     );
   }
  return (
    <div className='flex h-screen  items-center'>
      <div className='hidden md:flex h-screen  flex-1 relative bg-white dark:bg-gray-900 w-full'>
        <div className='absolute bottom-0 left-0 flex flex-wrap font-semibold items-center justify-center text-[#999999]'>
          <p>صحــة و رعــــاية</p>
          <Image src='/images/hexa-bg.png' width={450} height={450} alt='cancel' />
        </div>
      </div>
      <div className='hidden  md:flex w-24 h-24 rounded-full z-10 mx-[-48px]  items-center justify-center bg-white dark:bg-gray-900'>
        <div className='w-12 h-12 rounded-full  flex items-center justify-center bg-primary'></div>
      </div>
      <div className='flex p-10 text-center h-screen overflow-y-auto flex-1 flex-col justify-center items-center text-white  bg-primary'>
        <div>
          <Image src='/images/logo.png' width={150} height={150} alt='cancel' />
        </div>
        <h1 className='text-2xl  font-bold p-4'>هذه الصفحة خاصة بالمشرفين على الموقع</h1>
        {session?.isAdmin ? (
          <div className='flex flex-col justify-center items-center  gap-4'>
            <h1 className='font-semibold text-center p-2 border-b-[1px] border-dashed'>
              مرحبا بك في منصة المشرفين، أنت الآن مسًّجل للدخول
            </h1>
            <h1 className='text-center'>البريد الإلكتروني: {session?.email} </h1>

            <button
              onClick={() => {
                router.refresh();
                router.push("admin/dashboard");
              }}
              className='font-semibold p-2 px-2 btn2'>
              الذهاب الى الواجهة
            </button>

            <Link href='/'>
              <button className='font-semibold p-2 px-2 btn'>الذهاب الى الصفحة الرئيسية</button>
            </Link>
          </div>
        ) : (
          <LoginAdmin />
        )}
      </div>
    </div>
  );
}
export default page;
