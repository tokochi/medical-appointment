import Image from "next/image";
import SearchName from "@components/inputs/search/SearchName";
import SearchSpeciality from "@components/inputs/search/SearchSpeciality";
import SearchWilaya from "@components/inputs/search/SearchWilaya";
import Link from "next/link";
function SearchDoctorInTab() {

  return (
    <div className='p-4'>
      <div className='flex flex-wrap'>
        <div className='basis17  lg:min-w-[180px] '>
          <SearchName placeholder='ابحث عن طبيب' />
        </div>
        <div className='basis17  lg:min-w-[180px]'>
          <SearchSpeciality placeholder='التخصص الطبي' />
        </div>
        <div className='basis17  lg:min-w-[100px]'>
          <SearchWilaya />
        </div>
        <div className='basis17  lg:min-w-[100px] '>
          <Link
            href='/doctors'
            type='button'
            className='bg-yellow-400 h-[32px] hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5  dark:border-gray-600  dark:text-black'>
            بحث
            <Image
              className='w-auto h-auto'
              src='/images/search2.webp'
              width={20}
              height={20}
              alt='input'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchDoctorInTab;
