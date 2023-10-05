"use client";
import { useStore } from "@context/store";
import Image from "next/image";
import { CheckboxInput, IconInput, SelectInput } from "@components/inputs";

function SearchPharmInPage (){
  const specialities = useStore((state) => state.specialities);
  const wilaya = useStore((state) => state.wilaya);
  const visitArg = useStore((state) => state.visitArg);
  return (
    <div className='card rounded-md'>
      <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
        سجلّ البحث
      </div>
      <div className='p-2 flex flex-col gap-2 justify-center'>
        <div className=''>
          <IconInput icon='/images/search.webp' type='text' placeholder='اسم الصيدلية' />
        </div>
        <div className=''>
          <SelectInput options={wilaya} option_value='value'option_text='text' placeholder='الولاية' />
        </div>
        <div className=''>
          <CheckboxInput label='بطاقة تأمين' />
        </div>
        <div className=''>
          <CheckboxInput label='مفتوحة 24/7' />
        </div>
        <div className=''>
          <button
            type='button'
            className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            بحث
            <Image src='/images/search2.webp' width={20} height={20} alt='input' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPharmInPage;
