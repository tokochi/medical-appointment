import RelatedWoks from "@components/cards/RelatedWoks";
import FindYourAnswer from "@components/cards/FindYourAnswer";
import { useStore } from "@context/serverStore";
import ShowPost from "@components/cards/ShowPost";

async function page({ params }) {
  const { fetchPost } = useStore.getState();
  const post = await fetchPost(params?.id);
  return (
    <div className='bg-sky-100 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        مقالات طبية
      </h1>
      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] hidden md:inline-block min-w-[280px] p-2'>
          <FindYourAnswer />
          <RelatedWoks />
        </div>
        <div className='grow shrink basis-[70%] min-w-[280px]'>
          <ShowPost post={post} />
        </div>
        {/* <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <div>
            <RelatedSections />
            <RelatedPosts />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default page;
