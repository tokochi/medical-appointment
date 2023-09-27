import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "@context/store";

function RelatedPosts() {
const { posts, fetchPosts } = useStore();
useEffect(() => {
  fetchPosts();
}, []);
  return (
    <div className='flex flex-col gap-2 p-2'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        مقالات طبية
      </h1>
      {posts.map((post, index) => (
        <div key={index} className=''>
          <Link onClick={(e) => useStore.setState({ selectedPost: post })} href='/blog/post'>
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
