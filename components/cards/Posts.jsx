import { useStore } from "@context/serverStore";
import Link from "next/link";
import Image from "next/image";

async function Posts() {
   const { fetchPosts } = useStore.getState();
   const posts = await fetchPosts();
  return (
    <div className='flex flex-col gap-4'>
      <div id='doct-cards' className='p-2 my-2'>
        <div className='flex justify-center flex-wrap gap-2 '>
          {posts?.map((post, index) => (
            <div key={index} className='card p-4 flex flex-col rounded-lg'>
              <div className='flex flex-col items-center justify-center gap-2 '>
                <Link href={`/blog/post/${post._id}`}>
                  <h2 id='title' className='font-bold text-xl mx-2 p-2 text-sky-500'>
                    {post?.title}
                  </h2>
                </Link>
                <Link className='mx-auto' href={`/blog/post/${post._id}`}>
                  <Image
                    src={post?.image}
                    className='rounded-xl'
                    width={450}
                    height={450}
                    alt='image'
                  />
                </Link>
                {post?.text && (
                  <div className='flex flex-col'>
                    <div
                      className='text-justify p-2 text-sm'
                      dangerouslySetInnerHTML={{ __html: post?.text.slice(0, 200) + "..." }}
                    />
                    <Link
                      className='text-sm mr-auto text-sky-600 whitespace-nowrap'
                      href={`/blog/post/${post._id}`}>
                      <button>عرض المزيد ⋙</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
