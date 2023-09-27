import { IconInput, SelectInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";

function SearchLab (){
  const wilaya = useStore((state) => state.wilaya);
  return (
        <div className='p-4'>
      <div className='flex flex-wrap '>
        <div className='basis4'>
          <IconInput icon='/images/search.png' type='text' placeholder='ابحث عن مختبر' />
        </div>

        <div className='basis4'>
          <SelectInput options={wilaya} option_value='value'option_text='text' placeholder='الولاية' />
        </div>
        <div className='basis4 '>
          <button
            type='button'
            className='bg-yellow-500 hover:bg-yellow-400  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-white'>
            بحث
            <Image className="w-auto h-auto" src='/images/search2.png' width={20} height={20} alt='input' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchLab