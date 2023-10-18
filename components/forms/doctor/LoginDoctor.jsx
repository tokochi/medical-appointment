"use client";
import { TextInput } from "@components/inputs";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@context/store";

function LoginDoctor() {
const { doctorInfo, handleInputChange, pathNameLogin, handleSubmitDoctorLogin, errorPassword } =
  useStore();
const router = useRouter();
  return (
    <div>
      <div id='login' className='mx-auto'>
          <form
            className='p-4 flex flex-col gap-2  justify-center items-center'
            onSubmit={(e) => handleSubmitDoctorLogin(e, toast, router, signIn)}>
            <TextInput
              type='email'
              name='email'
              value={doctorInfo?.email}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              placeholder='البريد الإلكتروني'
              label='البريد الإلكتروني'
            />
            <TextInput
              type='password'
              name='password'
              value={doctorInfo?.password}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              placeholder='كلمة السر'
              label='كلمة السر'
            />
            {errorPassword && (
              <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
                يرجى تحقق من كلمة السر او البريد الإلكتروني
              </h2>
            )}
            <p className='p-2 text-sky-500 font-semibold'>هل نسيت كلمة السر؟</p>
            <button
              type='submit'
              className='text-gray-100 shadow-sm dark:text-zinc-900 font-bold bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg px-2 p-2 text-center'>
              تسجيل
            </button>
          </form>
      </div>
    </div>
  );
}

export default LoginDoctor;
