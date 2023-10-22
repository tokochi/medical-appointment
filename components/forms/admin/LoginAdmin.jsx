"use client";
import { TextInput } from "@components/inputs";
import SignupAdmin from "@components/forms/admin/SignupAdmin";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@context/store";

function LoginAdmin() {
const { adminInfo, handleInputChange, pathNameLogin,errorInput, handleSubmitAdminLogin, errorPassword } =
  useStore();
const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center  bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-800 dark:to-slate-900'>
      <div className='flex gap-4 p-2 justify-center items-center w-full'>
        <button
          onClick={() => useStore.setState({ pathNameLogin: "login" })}
          className={`font-bold p-4 border-b-4 ${
            pathNameLogin === "login" ? "border-blue-400 text-blue-500" : "border-gray-400"
          }`}>
          تسجيل الدخول
        </button>
        <button
          onClick={() => useStore.setState({ pathNameLogin: "signup" })}
          className={`font-bold p-4 border-b-4 ${
            pathNameLogin === "signup" ? "border-blue-400 text-blue-500" : "border-gray-400"
          }`}>
          إنشاء حساب
        </button>
      </div>

      <div id='login' className='w-full'>
        {pathNameLogin === "login" && (
          <form
            className='p-4 flex flex-col gap-2  justify-center items-center'
            onSubmit={(e) => handleSubmitAdminLogin(e, toast, router, signIn)}>
            <TextInput
              type='email'
              name='email'
              error={errorInput.email}
              value={adminInfo?.email}
              onChange={(e) => handleInputChange(e, "adminInfo")}
              placeholder='البريد الإلكتروني'
              label='البريد الإلكتروني'
            />
            <TextInput
              type='password'
              name='password'
              error={errorInput.password}
              value={adminInfo?.password}
              onChange={(e) => handleInputChange(e, "adminInfo")}
              placeholder='كلمة السر'
              label='كلمة السر'
            />
            {errorPassword && (
              <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
                يرجى تحقق من كلمة السر او البريد الإلكتروني
              </h2>
            )}
            <button className='p-2 mb-2 text-xs text-sky-500 font-semibold'>
              هل نسيت كلمة السر؟
            </button>
            <button
              type='submit'
              className='text-gray-100 shadow-sm dark:text-zinc-900 font-bold bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg px-2 p-2 text-center'>
              تسجيل
            </button>
          </form>
        )}
        {pathNameLogin === "signup" && <SignupAdmin />}
      </div>
    </div>
  );
}

export default LoginAdmin;
