"use client";
import LoginForm from '@components/forms/user/LoginForm';
import SignupForm from '@components/forms/user/SignupForm';
import { useStore } from "@context/store";
import { redirect } from "next/navigation";
function page() {
const { pathNameLogin, session } = useStore();
  if (session){redirect("/");}
    return (
      <div className='flex flex-col justify-center items-center  bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-800 dark:to-slate-900'>
        <div className='flex gap-4 '>
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
        <div id='login' className='max-w-xl mx-auto'>
          {pathNameLogin === "login" && <LoginForm />}
        </div>
        <div id='signup' className=''></div>
        {pathNameLogin === "signup" && <SignupForm />}
        <div></div>
      </div>
    );
}

export default page