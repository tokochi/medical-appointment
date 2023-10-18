"use client";;
import { IconInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import toast from "react-hot-toast";
import { useEffect } from "react";

function page() {
  const { askQuestion, handleInputChange,errorInput, submitMessageSupport } = useStore();
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
    <div className='card p-4 flex flex-wrap justify-center items-center '>
      <form
        className='basis-[60%] grow shrink min-w-[300px] flex flex-col gap-2'
        onSubmit={(e) => { submitMessageSupport(e, toast); }}>
        <h1 className='font-semibold text-2xl p-2 text-center'>اتصل بنا</h1>
        <h2 className='p-2'>اقتراح، مشكلة فنية، ملاحظة</h2>
        <h2 className='p-2'>
          ملاحظة: هذه الاستمارة ليس للاتصال بالأطباء، استخدامه فقط للاتصال بفريق الدعم.
        </h2>
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
      <div id='hero-img' className='basis-[40%] grow shrink min-w-[350px] p-4'>
        <Image className='mx-auto' src='/images/contact.webp' width={450} height={450} alt='hero' />
      </div>
    </div>
  );
}

export default page;
