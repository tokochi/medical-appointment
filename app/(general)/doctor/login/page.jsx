"use client";
import Link from "next/link";
import Image from "next/image";
import LoginDoctor from "@components/forms/doctor/LoginDoctor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingComponent from "@components/utils/LoadingComponent";

function page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status == "loading") {
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <LoadingComponent size={100} color='#0891b2' loading={status == "loading"} />
      </div>
    );
  }
  return (
    <div className='flex h-screen w-full items-center'>
      <div className='hidden md:flex h-screen  flex-1 relative bg-white dark:bg-gray-900 w-full'>
        <div className='absolute bottom-0 left-0 flex flex-wrap font-semibold items-center justify-center text-[#999999]'>
          <p>صحــة و رعــــاية</p>
          <Image src='/images/hexa-bg.webp' width={450} height={450} alt='cancel' />
        </div>
      </div>
      <div className='hidden  md:flex w-24 h-24 rounded-full z-10 mx-[-48px]  items-center justify-center bg-white dark:bg-gray-900'>
        <div className='w-12 h-12 rounded-full  flex items-center justify-center bg-primary'></div>
      </div>
      <div className='flex p-10 text-center h-screen overflow-y-auto flex-1 flex-col justify-center items-center text-white  bg-primary'>
        <div>
          <Image src='/images/logo.webp' width={150} height={150} alt='cancel' />
        </div>
        <h1 className='text-2xl  font-bold p-4'>هذه الصفحة خاصة بالأطباء على الموقع</h1>
        {session?.user?._doc?.isDoctor ? (
          <div className='flex flex-col justify-center items-center  gap-4'>
            <h1 className='font-semibold text-center p-2 border-b-[1px] border-dashed'>
              مرحبا بك في منصة الأطباء أنت الآن مسًّجل للدخول
            </h1>
            <h1 className='text-center'>البريد الإلكتروني: {session?.user?._doc?.email} </h1>
            <button
              onClick={() => {
                router.refresh();
                router.push("doctor");
              }}
              className='font-semibold p-2 px-2 btn2'>
              الذهاب الى الواجهة
            </button>
            <Link href='/'>
              <button className='font-semibold p-2 px-2 btn'>الذهاب الى الصفحة الرئيسية</button>
            </Link>
          </div>
        ) : (
          <LoginDoctor />
        )}
      </div>
    </div>
  );
}
export default page;
