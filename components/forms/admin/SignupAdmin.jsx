import { signIn } from "next-auth/react";
import { useStore } from "@context/store";
import { useRouter } from "next/navigation";
import { TextInput } from "@components/inputs";
import toast from "react-hot-toast";
function SignupAdmin() {
 const {
   adminInfo,
   errorPassword,
   errorAdminKey,
   handleInputChange,
   pathNameLogin,
   handleSubmitAdminSignup,
 } = useStore();
 const router = useRouter();
;
  return (
    <form onSubmit={(e) => handleSubmitAdminSignup(e, toast, router, signIn)}>
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-center'>
          ــــــــــــــــ الرجاء إدخال البيانات الخاصة بك ــــــــــــــــ{" "}
        </h1>
        <TextInput
          name='name'
          type='text'
          value={adminInfo?.name}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='الإسم و اللقب'
          label='الإسم و اللقب'
        />
        {/* <TextInput
          type='phone'
          name='phone.mobile'
          value={adminInfo?.phone?.mobile}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='الهاتف المحمول'
          label='الهاتف المحمول'
        /> */}
        <TextInput
          type='email'
          name='email'
          value={adminInfo?.email}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='البريد الإلكتروني'
          label='البريد الإلكتروني'
        />
        <TextInput
          type='password'
          name='password'
          value={adminInfo?.password}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='كلمة السر'
          label='كلمة السر'
        />
        <TextInput
          type='password'
          name='verifyPassword'
          value={adminInfo?.verifyPassword}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='تحقق من كلمة السر'
        />
        {errorPassword && (
          <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
            يرجى تحقق من كلمة السر
          </h2>
        )}
        <TextInput
          type='password'
          name='adminKey'
          value={adminInfo?.adminKey}
          onChange={(e) => handleInputChange(e, "adminInfo")}
          placeholder='كلمة سر المشرف'
          label='كلمة سر المشرف:'
        />
        {errorAdminKey && (
          <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
            يرجى تحقق من كلمة سر المشرف
          </h2>
        )}
        <button
          type='submit'
          className='w-full text-gray-100 shadow-sm dark:text-zinc-900 font-bold bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg  p-4 text-center'>
          تسجيل
        </button>
      </div>
    </form>
  );
}

export default SignupAdmin;
