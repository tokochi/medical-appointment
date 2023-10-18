"use client";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingComponent from "@components/utils/LoadingComponent";
import LoginForm from "@components/forms/user/LoginForm";
import SignupForm from "@components/forms/user/SignupForm";
import LoginOrSignup from "@components/forms/user/LoginOrSignup";

function page() {
  const { isLoading, pathNameLogin } = useStore();
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
    <div className='flex h-[calc(100vh-177px)] items-stretch'>
      <div
        id='background'
        className='hidden md:flex items-end justify-end flex-1 bg-white dark:bg-gray-900'>
        <div className='flex whitespace-nowrap font-semibold items-center gap-2 text-[#999999]'>
          <p className='m-2'>صحــة و رعــــاية</p>
          <img className='w-[450px]' src='/images/hexa-bg.webp' alt='cancel' />
        </div>
      </div>
      <div
        id='middle-circle'
        className='hidden  md:flex w-24 h-24 rounded-full z-10 mx-[-48px] my-auto  items-center justify-center bg-white dark:bg-gray-900'>
        <div className='w-12 h-12 rounded-full  flex items-center justify-center bg-primary'></div>
      </div>
      <div id='form' className='p-2  h-full overflow-y-auto grow flex-1 text-white  bg-primary'>
        <div className='flex-col flex  justify-center items-center'>
          <div>
            <Image src='/images/logo.webp' width={120} height={120} alt='cancel' />
          </div>
          <h1 className='text-xl text-center font-bold p-4'>هذه الصفحة خاصة لتسجيل الدخول</h1>
          {session?.user? (
            <div className='flex flex-col justify-center items-center  gap-4'>
              <h1 className='font-semibold text-center p-2 border-b-[1px] border-dashed'>
                مرحبا بك في منصة صحتي تاجي، أنت الآن مسًّجل للدخول
              </h1>
              <h1 className='text-center'>البريد الإلكتروني: {session?.user?._doc?.email} </h1>

              <button
                onClick={() => {
                  router.refresh();
                  router.push("/user");
                }}
                className='font-semibold p-2 px-2 btn2'>
                الذهاب الى حسـابي
              </button>

              <Link href='/'>
                <button className='font-semibold p-2 px-2 btn'>الذهاب الى الصفحة الرئيسية</button>
              </Link>
            </div>
          ) : (
            <LoginOrSignup />
          )}
        </div>
      </div>
    </div>
  );
}
export default page;
