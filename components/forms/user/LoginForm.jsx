"use client";
import { signIn } from "next-auth/react";
import { TextInput } from "@components/inputs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@context/store";
function LoginForm() {
  const { errorInput, userInfo, handleInputChange, handleSubmitUserLogin } = useStore();
  console.log("🚀 ~ userInfo:", userInfo)
  const router = useRouter();

  return (
    <div className='p-4 flex flex-col gap-4 justify-center text-gray-600 dark:text-gray-200'>
      {/* <button onClick={()=>signIn('facebook')} id="facebook" className="flex gap-2 items-center btnf">
              <svg className="h-10 w-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z" fill="#E0E4E8" />
              </svg>
              تسجيل الدخول مع حساب الفيسبوك  
          </button> */}
      <button onClick={() => signIn("google")} id='google' className='flex gap-4 items-center btng'>
        <Image className='m-1' src='/images/google.webp' width={30} height={30} alt='input' />
        <p className='text-sm md:text-base'>إنشاء حساب باستخدام جوجل</p>
      </button>
      <div id='divider' className='flex gap-2 text-xl justify-center items-center '>
        <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
        أو
        <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
      </div>
      <form onSubmit={(e) => handleSubmitUserLogin(e, toast, router, signIn)}>
        <TextInput
          type='text'
          name='email'
          error={errorInput?.email}
          value={userInfo?.email}
          onChange={(e) => handleInputChange(e, "userInfo")}
          placeholder='البريد الإلكتروني'
        />
        <TextInput
          type='password'
          name='password'
          error={errorInput?.password}
          value={userInfo?.password}
          onChange={(e) => handleInputChange(e, "userInfo")}
          placeholder='كلمة السر'
        />
        <p className='p-2 text-sm text-sky-500 font-semibold'>هل نسيت كلمة السر؟</p>
        <button
          type='submit'
          className='text-gray-100 shadow-sm dark:text-zinc-900 font-bold bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg  p-4 text-center'>
          تسجيل
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
