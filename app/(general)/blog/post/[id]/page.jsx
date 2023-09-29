import RelatedWoks from "@components/cards/RelatedWoks";
import FindYourAnswer from "@components/cards/FindYourAnswer";
import { useStore } from "@context/serverStore";

async function page({ params }) {
  const { fetchPost } = useStore.getState();
  const post = await fetchPost(params?.id);
  return (
    <div className='bg-sky-50 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        مقالات طبية
      </h1>
      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <FindYourAnswer />
          <RelatedWoks />
        </div>
        <div className='grow shrink basis-[70%] min-w-[280px]'>
          <div id='doct-cards' className='p-2 my-2'>
            <div className=' p-4 card rounded-md'>
              <div id='header' className=' flex flex-wrap justify-center items-start '>
                <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
                  <div id='title' className='flex flex-col'>
                    <div className='w-full my-2 border-b-[1px] border-gray-600'>
                      <h1 className='font-bold text-xl text-sky-500'>{post?.title}</h1>
                      <h3>{post?.date.toISOString().substring(0, 10)}</h3>
                    </div>
                    {post?.text && (
                      <div
                        className='text-justify'
                        dangerouslySetInnerHTML={{ __html: post?.text }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
