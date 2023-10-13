"use client";
import SearchName from "@components/inputs/search/SearchName";
import SearchSpeciality from "@components/inputs/search/SearchSpeciality";
import SearchWilayaFull from "@components/inputs/search/SearchWilayaFull";
import SearchGender from "@components/inputs/search/SearchGender";
import SearchHomeVisit from "@components/inputs/search/SearchHomeVisit";
import SearchInssurance from "@components/inputs/search/SearchInssurance";
import SearchFullTime from "@components/inputs/search/SearchFullTime";
import { useStore } from "@context/store";
function SearchHospInPage() {
  const { filterDefault } = useStore();
  return (
    <div className='card rounded-md'>
      <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
        سجلّ البحث
      </div>
      <div className='p-2 flex flex-col gap-2 justify-center'>
        <SearchName placeholder='اسم العيادة / مستشفى' label='العيادة :' />
        <SearchSpeciality placeholder='التخصص' type='hosp' label='التخصص:' />
        <SearchWilayaFull />
        <SearchInssurance />
        <SearchFullTime />
        <div className=''>
          <button
            onClick={() =>
              useStore.setState({
                filterInfo: filterDefault,
              })
            }
            type='button'
            className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            تحديث
            <svg className='h-6 w-6' width='512' height='512' viewBox='0 0 512 512'>
              <path
                fill='#357180'
                d='M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z'
              />
              <path
                fill='#F7F7F7'
                d='M408.7,177.5c-2.5-4.9-14.7-16-35.3-5.9c-20.6,10.1-10.6,32.3-10.6,32.3c7.7,15.7,12,33.4,12,52c0,65.6-53.2,118.8-118.8,118.8c-65.6,0-118.8-53.2-118.8-118.8c0-61.4,46.6-111.9,106.4-118.2v30.8c0,0-0.1,1.8,1.8,3c1.9,1.2,3.8,0,3.8,0l98.6-58.1c0,0,2.2-1.2,2.2-3.4c0-1.9-2.2-3.2-2.2-3.2l-98.2-57.8c0,0-2.2-1.6-4.2-0.8c-2,0.8-1.7,3.5-1.7,3.5v33c-89,6.4-159.2,80.6-159.2,171.2c0,94.8,76.9,171.7,171.7,171.7c94.8,0,171.7-76.9,171.7-171.7C427.7,227.7,420.8,201,408.7,177.5z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchHospInPage;
