import Image from "next/image";
import { CheckboxInput, DropInput, IconInput, SelectInput, TextInput } from "@components/inputs";

function SearchFaq() {
  return (
    <div className='p-4'>
      <div className='flex flex-wrap '>
        <div className='grow shrink basis-1/2 min-w-[280px]  lg:min-w-[180px]'>
          <IconInput
            icon='/images/search.webp'
            type='text'
            placeholder='الأمراض / الأسباب / الأعراض / العلاج'
          />
        </div>
        <div className='grow shrink basis-1/4 min-w-[280px]  lg:min-w-[100px]'>
          <button
            type='button'
            className='bg-yellow-500 hover:bg-yellow-400  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 h-[32px] dark:border-gray-600  dark:text-white'>
            بحث
            <Image
              className='w-auto h-auto'
              src='/images/search2.webp'
              width={20}
              height={20}
              alt='input'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFaq