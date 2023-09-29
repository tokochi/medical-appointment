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
            <Link
              key={index}
              href={`/blog/post/${post._id}`}>
              <div className='flex flex-col gap-2 '>
                <h2 id='title' className='font-bold text-xl mx-2 p-2 text-sky-500'>
                  {post?.title}
                </h2>
                <Image
                  src={post?.image}
                  className='rounded-xl'
                  width={650}
                  height={650}
                  alt='image'
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
