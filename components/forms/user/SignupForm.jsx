'use client'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { CheckboxInput, DropInput, IconInput, SelectInput, TextInput } from "@components/inputs";
import Image from "next/image";
import toast from "react-hot-toast"
import Link from "next/link";
function SignupForm() {
    const [userInfo, setUserInfo] = useState({ email: '', password: '', name: '', gender: 'male', phone: '' })
    const [password, setPassword] = useState('')
    const [isRulesChecked, setIsRulesChecked] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const router = useRouter();
    const handleRadioChange = (event) => {
        setUserInfo((prevState) => ({
            ...prevState,
            gender: event.target.value,
        }));
    };
    const handleCheckboxChange = (event) => {
        setIsRulesChecked(event.target.checked)
    };
  const handleOnChange = (event) => {
      setErrorPassword(false);
        const { name, value } = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || password !== userInfo.password) { return toast.error('يرجى تحقق من كلمة السر') }
        if (!isRulesChecked) { return toast.error('يرجى موافقة على شروط وأحكام الإستخدام'); }
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            if (response.ok) {
                toast.success('تم تسجيل المستخدم بنجاح')
              setUserInfo({ email: '', password: '', name: '', gender: 'male', phone: '' })
                   const response = await signIn("credentials", { ...userInfo, redirect: false });
                   if (response?.ok && !response?.error) {
                     router.push("/user/dashboard");
                   } else {
                     toast.error(response?.error);
                   }

            } else {
                toast.error('فشلت عملية تسجيل المستخدم');
            }
    };

    return (
      <div className='flex flex-col justify-center'>
        <Link className='btn2 p-4 m-4 ' href='/doctors/join-us'>
          <button>هل أنت مهني في مجال الصحة ؟</button>
        </Link>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='p-4 flex flex-col gap-4 justify-center '>
            <div
              id='divider'
              className='flex gap-2 text-xl justify-center items-center text-gray-600 dark:text-gray-200'>
              <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
              أو
              <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
            </div>
            <button
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
            </button>
            <button
              onClick={() => signIn("google")}
              id='google'
              className='flex gap-4 items-center btng'>
              <Image
                className='m-1 w-auto h-auto'
                src='/images/google.png'
                width={30}
                height={30}
                alt='input'
              />
              إنشاء حساب باستخدام جوجل
            </button>
            <div
              id='divider'
              className='flex gap-2 text-xl justify-center items-center text-gray-600 dark:text-gray-200'>
              <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
              أو
              <div className='w-full border-b-2 border-gray-400 rounder-xl'></div>
            </div>
            <h1 className='text-center'>الرجاء إدخال البيانات الخاصة بك</h1>

            <TextInput
              name='name'
              type='text'
              value={userInfo.name}
              onChange={(e) => handleOnChange(e)}
              placeholder='الإسم و اللقب'
            />
            <div className='flex items-center  justify-center gap-8'>
              <div className='flex items-center '>
                <input
                  checked={userInfo.gender === "female"}
                  onChange={(e) => handleRadioChange(e)}
                  id='gender-1'
                  type='radio'
                  value='female'
                  name='gender'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='gender-1' className='font-medium text-gray-900 dark:text-gray-300'>
                  إمرأة
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  checked={userInfo.gender === "male"}
                  onChange={(e) => handleRadioChange(e)}
                  id='gender-2'
                  type='radio'
                  value='male'
                  name='gender'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label htmlFor='gender-2' className='font-medium text-gray-900 dark:text-gray-300'>
                  رجل
                </label>
              </div>
            </div>
            <TextInput
              type='phone'
              name='phone'
              value={userInfo.phone}
              onChange={(e) => handleOnChange(e)}
              placeholder='الهاتف المحمول'
            />
            <TextInput
              type='email'
              name='email'
              value={userInfo.email}
              onChange={(e) => handleOnChange(e)}
              placeholder='البريد الإلكتروني'
            />
            <TextInput
              type='password'
              name='password'
              value={userInfo.password}
              onChange={(e) => handleOnChange(e)}
              placeholder='كلمة السر'
            />
            <TextInput
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                name='checkbox'
                checked={isRulesChecked}
                onChange={(e) => handleCheckboxChange(e)}
                type='checkbox'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-checkbox'
                className='text-sm font-medium text-gray-900 dark:text-gray-300'>
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
    );
}

export default SignupForm