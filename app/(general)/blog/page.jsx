import RelatedSections from "@components/cards/RelatedSections";
import RelatedWoks from "@components/cards/RelatedWoks";
import FindYourAnswer from "@components/cards/FindYourAnswer";
import Posts from "@components/cards/Posts";
function page() {
  return (
    <div className='bg-sky-50 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        مقالات طبية
      </h1>
      <div className='flex flex-wrap  gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <FindYourAnswer />
          <RelatedWoks />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <Posts />
        </div>
        <div className='grow shrink basis-[25%] min-w-[280px] p-2'>
          <div>
            <RelatedSections />
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
