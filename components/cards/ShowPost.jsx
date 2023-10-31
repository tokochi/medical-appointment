import React from 'react'
import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
function ShowPost({post}) {

  return (
    <div id='doct-cards' className='p-4 card rounded-md'>
      <div id='title' className='flex flex-col gap-6'>
        <div className='w-full'>
          <h1 className='font-bold p-1 md:text-xl text-sky-500'>{post?.title}</h1>
          <div className='w-full text-xs md:text-sm flex flex-wrap gap-4 border-b-[1px] border-t-[1px] p-2 border-gray-600'>
            <div className='flex gap-2 justify-center items-start ml-auto'>
              <div id='avatar'>
                <img
                  className='rounded-xl'
                  src={post?.doctor?.avatar?.[0] || "/images/heart.webp"}
                  width={50}
                  height={50}
                  alt='avatar'
                />
              </div>
              <div id='title' className='flex flex-col'>
                <h1 className='font-bold md:text-clamp-xl text-sky-500  '>
                  {post?.doctor?.title?.text && post?.doctor?.title?.text + " "}
                  {post?.doctor?.name}
                </h1>
                <h2 className='font-semibold'>{post?.doctor?.speciality?.text}</h2>
              </div>
            </div>
            <div className='flex gap-1 justify-center items-start'>
              <svg className='h-4 w-4 fill-gray-700 dark:fill-gray-300' viewBox='0 0 24 24'>
                <path d='M6 1L6 3L5 3C3.9 3 3 3.9 3 5L3 19C3 20.1 3.9 21 5 21L19 21C20.1 21 21 20.1 21 19L21 5C21 3.9 20.1 3 19 3L18 3L18 1L16 1L16 3L8 3L8 1L6 1 z M 5 8L19 8L19 19L5 19L5 8 z M 9.5 10C8.1309372 10 7 11.130937 7 12.5L7 13L9 13L9 12.5C9 12.213063 9.2130628 12 9.5 12C9.7869372 12 10 12.213063 10 12.5C10 12.757858 9.6525934 13.557212 9.0820312 14.298828C8.5114692 15.040445 7.7913724 15.762633 7.3144531 16.210938L7 16.507812L7 18L12 18L12 16L10.222656 16C10.381275 15.814548 10.515452 15.715819 10.667969 15.517578C11.347407 14.634445 12 13.683142 12 12.5C12 11.130937 10.869063 10 9.5 10 z M 16.75 10L13 11.455078L13 13.068359L15 12.365234L15 18L17 18L17 10L16.75 10 z' />
              </svg>
              <h3 className=''>{moment(post?.date).format("LLL")}</h3>
            </div>
            <div className='flex gap-1'>
              <svg className='h-4 w-4 fill-gray-700 dark:fill-gray-300' viewBox='0 0 24 24'>
                <path d='M12.172,3c0,0-9.279,9.279-9.586,9.586c-0.781,0.781-0.781,2.047,0,2.828c0.918,0.918,4.828,4.828,6,6 c0.781,0.781,2.047,0.781,2.828,0C11.721,21.107,21,11.828,21,11.828V3H12.172z M17.5,8C16.672,8,16,7.328,16,6.5S16.672,5,17.5,5 S19,5.672,19,6.5S18.328,8,17.5,8z'/>
              </svg>
              <h3 className='font-semibold'>{post?.section}</h3>
            </div>
            <div className='flex gap-1'>
              <svg className='h-4 w-4 fill-gray-700 dark:fill-gray-300' viewBox='0 0 24 24'>
                <path d='M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4 z M 12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z' />
              </svg>
              <h3 className=''>3361</h3>
            </div>
          </div>
        </div>
        {post?.text && (
          <div className='text-justify text-xs md:text-sm' dangerouslySetInnerHTML={{ __html: post?.text }} />
        )}
      </div>
    </div>
  );
}

export default ShowPost