import Image from "next/image";
import SearchName from "@components/inputs/search/SearchName";
import SearchSpeciality from "@components/inputs/search/SearchSpeciality";
import SearchWilaya from "@components/inputs/search/SearchWilaya";
import Link from "next/link";

function SearchHostp() {
  return (
    <div className='p-4'>
      <div className='flex flex-wrap '>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[180px]'>
          <SearchName placeholder='ابحث عن مصحة' />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <SearchSpeciality type='hosp' placeholder='التخصص الطبي' />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <SearchWilaya />
        </div>
        <div className='grow shrink basis-[17%] min-w-[280px]  lg:min-w-[100px]'>
          <Link
            href='/hospitals'
            type='button'
            className='bg-yellow-500 hover:bg-yellow-400  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-white'>
            بحث
            <Image src='/images/search2.webp' width={20} height={20} alt='input' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchHostp;
