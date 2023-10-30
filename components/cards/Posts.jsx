"use client"
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
function Posts({ data }) {
  const { handleFilterInfo } = useStore();
  const postsList = JSON.parse(data);
  const posts = handleFilterInfo(postsList);
  const [slicer, setSlicer] = useState(12);
  return (
    <div className=' flex flex-col gap-4'>
      <div id='doct-cards' className='p-2 my-2'>
        <div className='flex justify-center flex-wrap gap-2 '>
          {posts?.slice(0, slicer).map((post, index) => (
            <div
              key={index}
              className='card p-4 flex flex-col rounded-lg grow shrink basis-[30%] min-w-[280px]'>
              <div className='flex flex-col items-center justify-center gap-2 '>
                <Link href={`/blog/post/${post._id}`}>
                  <h2
                    id='title'
                    className='font-bold md:text-xl truncate whitespace-nowrap max-w-[250px] md:max-w-[400px] mx-2 p-2 text-sky-500'>
                    {post?.title}
                  </h2>
                </Link>
                <Link className='mx-auto shrink' href={`/blog/post/${post._id}`}>
                  <Image
                    src={post?.image}
                    className='rounded-xl h-auto w-auto'
                    width={450}
                    height={450}
                    alt='image'
                  />
                </Link>
                <div className='p-1 px-1 rounded-xl text-xs ml-auto bg-purple-700'>
                  {post?.section}
                </div>
                {post?.desc && (
                  <div className='flex flex-col text-justify  px-2 text-sm max-w-[450px]'>
                    {post?.desc}
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
        {slicer < posts?.length && (
          <button
            className='btn3 w-full m-2  p-2'
            onClick={(e) => {
              e.preventDefault();
              setSlicer(slicer + 12);
            }}>
            عرض المزيد
          </button>
        )}
      </div>
    </div>
  );
}

export default Posts;
