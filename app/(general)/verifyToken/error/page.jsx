"use client";
import { IconInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import toast from "react-hot-toast";
import { useEffect } from "react";

function page() {
  const { askQuestion, handleInputChange, errorInput, submitMessageSupport } = useStore();
   useEffect(
     () =>
       useStore.setState({
         askQuestion: {
           email: "",
           text: "",
           phone: "",
           name: "",
         },
       }),
     []
   );
  return (
    <div className='bg-sky-50 w-full p-4 dark:bg-primary m-1 md:m-4 rounded '>
      <div className='card rounded-lg p-4 text-center
       md:m-10 md:text-xl font-semibold'>
        <svg className='md:w-20 md:h-20 w-10 h-10 mx-auto' viewBox='0 0 48 48'>
          <path
            fill='#FFC107'
            d='M40,40H8c-0.717,0-1.377-0.383-1.734-1.004c-0.356-0.621-0.354-1.385,0.007-2.004l16-28C22.631,8.378,23.289,8,24,8s1.369,0.378,1.728,0.992l16,28c0.361,0.619,0.363,1.383,0.007,2.004S40.716,40,40,40z'
          />
          <path
            fill='#5D4037'
            d='M22,34.142c0-0.269,0.047-0.515,0.143-0.746c0.094-0.228,0.229-0.426,0.403-0.592c0.171-0.168,0.382-0.299,0.624-0.393c0.244-0.092,0.518-0.141,0.824-0.141c0.306,0,0.582,0.049,0.828,0.141c0.25,0.094,0.461,0.225,0.632,0.393c0.175,0.166,0.31,0.364,0.403,0.592C25.953,33.627,26,33.873,26,34.142c0,0.27-0.047,0.516-0.143,0.74c-0.094,0.225-0.229,0.419-0.403,0.588c-0.171,0.166-0.382,0.296-0.632,0.392C24.576,35.954,24.3,36,23.994,36c-0.307,0-0.58-0.046-0.824-0.139c-0.242-0.096-0.453-0.226-0.624-0.392c-0.175-0.169-0.31-0.363-0.403-0.588C22.047,34.657,22,34.411,22,34.142 M25.48,30h-2.973l-0.421-12H25.9L25.48,30z'
          />
        </svg>
        <p> لم تتم عملية التسجيل بنجاح يرجى الاتصال بفريق الدعم :</p>
        <p className='m-4 font-roboto'> البريد الإلكتروني : support@sehatitaji.com</p>
      </div>
      <form
        className='flex flex-col justify-start items-center gap-2'
        onSubmit={(e) => {
          submitMessageSupport(e, toast);
        }}>
        <h1 className='font-semibold text-2xl p-2 text-center'>اتصل بنا</h1>
        {/* <h2 className='p-2'>اقتراح، مشكلة فنية، ملاحظة</h2> */}
        {/* <h2 className='p-2'>
          ملاحظة: هذه الاستمارة ليس للاتصال بالأطباء، استخدامه فقط للاتصال بفريق الدعم.
        </h2> */}
        <div id='name' className=''>
          <IconInput
            icon='/images/user.webp'
            name='name'
            value={askQuestion.name}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='text'
            placeholder='الإسم كامل بالعربية'
            label='الإسم كامل بالعربية:'
          />
        </div>
        <div id='email' className=''>
          <IconInput
            icon='/images/email.webp'
            name='email'
            error={errorInput?.email}
            value={askQuestion.email}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='email'
            placeholder='البريد الإلكتروني '
            label='البريد الإلكتروني:'
          />
        </div>
        <div id='phone' className=''>
          <IconInput
            icon='/images/phone.webp'
            name='phone'
            value={askQuestion.phone}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='phone'
            placeholder='رقم الجوال'
            label='رقم الجوال:'
          />
        </div>
        <div id='phone' className=''>
          <TextareaInput
            name='text'
            rows='4'
            value={askQuestion?.text}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='text'
            placeholder='أكتب رسالتك هنا'
          />
        </div>
        <div className='text-center text-sm flex flex-col gap-2'>
          <button
            type='submit'
            className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            تقديم رسالتك
            <Image
              className='w-auto h-auto'
              src='/images/send.webp'
              width={20}
              height={20}
              alt='input'
            />
          </button>
          سيقوم أحد المشرفين بالرد عليك بعد تقديم رسالتك
        </div>
      </form>
    </div>
  );
}
export default page;
