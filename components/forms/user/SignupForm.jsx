"use client";;
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@context/store";
import { SelectInput, TextInput } from "@components/inputs";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
function SignupForm() {
  const {
    userInfo,
    errorPassword,
    handleSelectInput,
    isRulesChecked,
    handleInputChange,
    handleRulesCheckbox,
    handleSubmitUserSignup,
  } = useStore();
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center'>
      <Link className='btn2 p-4 m-4 ' href='/doctors/join-us'>
        <button>هل أنت مهني في مجال الصحة ؟</button>
      </Link>
      <div>
        <div className='p-4 flex flex-col gap-4 justify-center '>
          <div
            id='divider'
            className='flex gap-2 text-xl justify-center items-center text-gray-600 dark:text-gray-200'>
            <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
            أو
            <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
          </div>
          {/* <button
            onClick={() => signIn("facebook")}
            id='facebook'
            className='flex gap-2 items-center btnf'>
            <svg className='h-10 w-10 ' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z'
                fill='#E0E4E8'
              />
            </svg>
            إنشاء حساب باستخدام الفيسبوك
          </button> */}
          <button
            onClick={() => signIn("google")}
            id='google'
            className='flex gap-4 items-center btng'>
            <Image
              className='m-1 w-auto h-auto'
              src='/images/google.webp'
              width={30}
              height={30}
              alt='input'
            />
            <p className="text-sm md:text-base">إنشاء حساب باستخدام جوجل</p>
 
          </button>
          <div
            id='divider'
            className='flex gap-2 text-xl justify-center items-center text-gray-600 dark:text-gray-200'>
            <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
            أو
            <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
          </div>
          <form onSubmit={(e) => handleSubmitUserSignup(e, toast, router, signIn)}>
            <div className=' flex flex-col gap-4  justify-center'>
              <TextInput
                name='name'
                type='text'
                value={userInfo?.name}
                onChange={(e) => handleInputChange(e, "userInfo")}
                placeholder='الإسم و اللقب'
                label='الإسم و اللقب'
              />
              <SelectInput
                name='gender'
                value={userInfo?.gender?.value}
                onChange={(e) => handleSelectInput(e, "userInfo")}
                options={[
                  { text: "رجل", value: "male" },
                  { text: "إمرأة", value: "female" },
                ]}
                option_value='value'
                option_text='text'
                placeholder='الجنس'
                label='الجنس:'
              />
              <TextInput
                type='phone'
                name='phone.mobile'
                value={userInfo?.phone?.mobile}
                onChange={(e) => handleInputChange(e, "userInfo")}
                placeholder='الهاتف المحمول'
                label='الهاتف المحمول'
              />
              <TextInput
                type='email'
                name='email'
                value={userInfo?.email}
                onChange={(e) => handleInputChange(e, "userInfo")}
                placeholder='البريد الإلكتروني'
                label='البريد الإلكتروني'
              />
              <TextInput
                type='password'
                name='password'
                value={userInfo?.password}
                onChange={(e) => handleInputChange(e, "userInfo")}
                placeholder='كلمة السر'
                label='كلمة السر'
              />
              <TextInput
                type='password'
                name='verifyPassword'
                value={userInfo?.verifyPassword}
                onChange={(e) => handleInputChange(e, "userInfo")}
                placeholder='تحقق من كلمة السر'
              />
              {errorPassword && (
                <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
                  يرجى تحقق من كلمة السر
                </h2>
              )}
              <div className='flex items-center gap-2'>
                <input
                  id='default-checkbox'
                  name='isRulesChecked.first'
                  checked={isRulesChecked.first}
                  onChange={(e) => handleRulesCheckbox(e)}
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor='default-checkbox'
                  className='text-sm whitespace-nowrap font-medium text-gray-900 dark:text-gray-300'>
                  <div className='flex gap-1'>
                    <p>أوافق على</p>
                    <p className='text-sky-500'> شروط وأحكام الإستخدام</p>
                    <p>في الموقع </p>
                  </div>
                </label>
              </div>
              <button
                type='submit'
                className='w-full text-gray-100 shadow-sm dark:text-zinc-900 font-bold bg-cyan-600 hover:bg-cyan-500 focus:ring-2 focus:outline-none focus:ring-cyan-300 rounded-lg  p-4 text-center'>
                تسجيل
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
