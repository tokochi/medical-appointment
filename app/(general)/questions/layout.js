"use client";
import RelatedSections from "@components/cards/RelatedSections";
import RelatedWoks from "@components/cards/RelatedWoks";
import FindYourAnswer from "@components/cards/FindYourAnswer";
import RelatedPosts from "@components/cards/RelatedPosts";



export default function RootLayout({ children }) {
  return (
    <div className='bg-sky-50 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        أسئلة طبية
      </h1>
      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <FindYourAnswer />
          <RelatedWoks />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <div id='doct-cards' className='p-2 my-2'>
            {children}
          </div>
        </div>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <div>
            <RelatedSections />
            <RelatedPosts/>
          </div>
        </div>
      </div>
    </div>
  );
}

