import { IconInput, SelectInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";

function SearchHostp() {
  const wilaya = useStore((state) => state.wilaya);
  const types = ["مستشفى عام", "عيادة عامة", "عيادة خاصة", "اسنان", "تجميل", "سرطان"];
  return (
    <div className='p-4'>
      <div className='flex flex-wrap '>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[180px]'>
          <IconInput icon='/images/search.png' type='text' placeholder='ابحث عن مصحة' />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <SelectInput options={types} placeholder='النوع' />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <SelectInput options={wilaya} option_value='value'option_text='text' placeholder='الولاية' />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <button
            type='button'
            className='bg-yellow-500 hover:bg-yellow-400  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-white'>
            بحث
            <Image src='/images/search2.png' width={20} height={20} alt='input' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchHostp