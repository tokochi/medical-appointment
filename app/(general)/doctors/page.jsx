"use client";
import Doctors from "@components/cards/Doctors";
import Provinces from "@components/cards/Provinces";
import RelatedPosts from "@components/cards/RelatedPosts";
import RelatedSections from "@components/cards/RelatedSections";
import SearchDoctInPage from "@components/forms/searchs/SearchDoctInPage";
import { useSession } from "next-auth/react";
function page() {
  const { data: session, status } = useSession();
  console.log("🚀 ~ session:", session);
  return (
    <div className='bg-sky-50 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        إبحث عن طبيب في ولايتك
      </h1>
      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <SearchDoctInPage />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <div id='region' className='p-2 my-2'>
            <Provinces />
          </div>
          <div id='doct-cards' className='p-2 my-2'>
            <Doctors />
          </div>
        </div>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <RelatedSections />
          <RelatedPosts />
        </div>
      </div>
    </div>
  );
}

export default page;
