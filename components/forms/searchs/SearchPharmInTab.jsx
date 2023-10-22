import Image from "next/image";
import SearchName from "@components/inputs/search/SearchName";
import SearchWilaya from "@components/inputs/search/SearchWilaya";
import Link from "next/link";

function SearchPharm() {
 return (
   <div className='p-4'>
     <div className='flex flex-wrap '>
       <div className='basis4'>
         <SearchName placeholder='ابحث عن صيدلية' />
       </div>
       <div className='basis4'>
         <SearchWilaya />
       </div>
       <div className='basis4 '>
         <Link
           href='/pharms'
           type='button'
           className='bg-yellow-500 hover:bg-yellow-400  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 h-[32px] dark:border-gray-600  dark:text-white'>
           بحث
           <Image src='/images/search2.webp' width={20} height={20} alt='input' />
         </Link>
       </div>
     </div>
   </div>
 );
}

export default SearchPharm;
