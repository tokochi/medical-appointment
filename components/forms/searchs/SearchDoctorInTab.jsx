import { IconInput, SelectInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";


function SearchDoctorInTab() {
  const specialities = useStore((state) => state.specialities);
  const wilaya = useStore((state) => state.wilaya);
  return (
    <div className='p-4'>
      <div className='flex flex-wrap '>
        <div className='basis17  lg:min-w-[180px] '>
          <IconInput icon='/images/search.webp' type='text' placeholder='ابحث عن طبيب' />
        </div>
        <div className='basis17  lg:min-w-[180px]'>
          <SelectInput options={specialities} option_value='value'option_text='text' placeholder='التخصص الطبي' />
        </div>
        <div className='basis17  lg:min-w-[100px]'>
          <SelectInput options={wilaya} option_value='value'option_text='text' placeholder='الولاية' />
        </div>
        <div className='basis17  lg:min-w-[100px] '>
          <button
            type='button'
            className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            بحث
            <Image className='w-auto h-auto' src='/images/search2.webp' width={20} height={20} alt='input' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchDoctorInTab