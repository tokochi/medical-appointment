import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/serverStore";

async  function RelatedPosts() {
  const { fetchPosts } = useStore.getState();
  const posts = await fetchPosts();
  return (
    <div className='flex flex-col gap-2 p-2'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        مقالات طبية
      </h1>
      {posts.map((post, index) => (
        <div key={index} className=''>
          <Link href={`/blog/post/${post._id}`}>
            <Image className='rounded-xl' src={post.image} width={300} height={300} alt='avatar' />
            <h2 id='title' className='font-bold text-clamp-xl mx-2 p-2 text-sky-500'>
              {post.title}
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RelatedPosts;
