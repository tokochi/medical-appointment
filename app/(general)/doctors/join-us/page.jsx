"use client";
import { useStore } from "@context/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconInput, SelectInput } from "@components/inputs";
import toast from "react-hot-toast";

function page() {
  const { doctorInfo, isRulesChecked, specialities,handleInputChange,errorInput,handleSelectInput, wilaya } = useStore();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRulesChecked) {
      return toast.error("يرجى موافقة على الإنظمام  ");
    }
    router.push("/doctors/signup");
  };  
  return (
    <div className='p-4 flex flex-wrap items-start gap-10 bg-gray-100 dark:bg-slate-900'>
      <div className='card rounded-md grow shrink basis-[30%] min-w-[280px]'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            هل أنت ممارس طبي؟
          </div>
          <div className='p-2 flex flex-col gap-2 justify-center'>
            <div className=''>
              <IconInput
                icon='/images/user.webp'
                name='name'
                error={errorInput?.name}
                value={doctorInfo.name}
                onChange={(e) => handleInputChange(e, "doctorInfo")}
                type='text'
                placeholder='الإسم كامل بالعربية'
              />
            </div>
            <div className=''>
              <IconInput
                icon='/images/email.webp'
                name='email'
                error={errorInput?.email}
                value={doctorInfo.email}
                onChange={(e) => handleInputChange(e, "doctorInfo")}
                type='email'
                placeholder='البريد الإلكتروني'
              />
            </div>
            <div className=''>
              <IconInput
                icon='/images/phone.webp'
                name='phone.mobile'
                value={doctorInfo.phone.mobile}
                onChange={(e) => handleInputChange(e, "doctorInfo")}
                type='phone'
                placeholder='رقم الجوال'
              />
            </div>
            <div className=''>
              <SelectInput
                name='gender'
                value={doctorInfo.gender}
                onChange={(e) => handleInputChange(e, "doctorInfo")}
                options={[
                  { text: "رجل", value: "male" },
                  { text: "إمرأة", value: "female" },
                ]}
                option_value='value'
                option_text='text'
                placeholder='الجنس'
              />
            </div>
            <div className=''>
              <SelectInput
                name='speciality'
                value={doctorInfo?.speciality?.value}
                onChange={(e) => handleSelectInput(e, "doctorInfo")}
                options={specialities}
                option_value='value'
                option_text='text'
                placeholder='التخصص'
                label='التخصص  الرئيسي:'
              />
            </div>
            <div className=''>
              <SelectInput
                name='address?.wilaya'
                value={doctorInfo?.address?.wilaya?.value}
                onChange={(e) => handleSelectInput(e, "doctorInfo")}
                options={wilaya}
                option_value='value'
                option_text='text'
                placeholder='الولاية'
                label='الولاية:'
              />
            </div>
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
                أنا متخصص في الرعاية الصحية و أريد الإنظمام
              </label>
            </div>
            <div className='text-center text-sm flex flex-col gap-2'>
              <button
                type='submit'
                className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
                تقديم الطلب
                <Image
                  className='w-auto h-auto'
                  src='/images/send.webp'
                  width={20}
                  height={20}
                  alt='input'
                />
              </button>
              سيقوم أحد مستشارينا بالرد عليك بعد تقديم طلبك
            </div>
          </div>
        </form>
      </div>
      <div className='grow shrink basis-[60%] min-w-[380px]'>
        <h1 className='font-bold text-clamp-2xl py-4 text-start'>
          الجيل القادم من الحلول للممارسين الطبيين مع منصة
          <Image
            className='w-auto h-auto inline-block'
            src='/images/logo-text.webp'
            width={80}
            height={20}
            alt='hero'
          />
        </h1>
        <div className='flex flex-wrap   gap-8'>
          <div className='grow shrink'>
            <h1 className='font-semibold'>
              <Image
                className='w-auto h-auto inline-block pl-2'
                src='/images/check-emoji.webp'
                width={20}
                height={20}
                alt='hero'
              />
              احصل على راحة العمل
            </h1>
            <h1 className='font-semibold'>
              <Image
                className='w-auto h-auto inline-block pl-2'
                src='/images/check-emoji.webp'
                width={20}
                height={20}
                alt='hero'
              />
              تحسين رعاية المرضى
            </h1>
            <h1 className='font-semibold'>
              <Image
                className='w-auto h-auto inline-block pl-2'
                src='/images/check-emoji.webp'
                width={20}
                height={20}
                alt='hero'
              />
              توفير الوقت كل يوم
            </h1>
          </div>
          <div className='grow shrink'>
            <Image
              className='inline-block pl-2 '
              src='/images/work-img-2.webp'
              width={350}
              height={350}
              alt='hero'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
