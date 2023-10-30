"use client";
import { useState } from "react";
import DoctorQuestion from "./DoctorQuestion";
import Link from "next/link";
import Image from "next/image";
function Questions({ data }) {
  const questions = JSON.parse(data);
  const [slicer, setSlicer] = useState(10);
  return (
    <div className='flex flex-col gap-4'>
      {questions?.slice(0, slicer)?.map((question, index) => (
        <div key={index} className=' p-4 card rounded-md'>
          <div
            id='header'
            className=' flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
              <div id='title' className='flex flex-col'>
                <Link href={`/questions/show-response/${question._id}`}>
                  <h1 className='font-bold text-clamp-xl text-sky-500'>{question?.title}</h1>
                </Link>
                <h2 className='text-justify'>{question?.text}</h2>
              </div>
            </div>
          </div>
          <div id='body' className='mt-2'>
            {question.responses.length > 0 ? (
              <h2 className='font-semibold text-sm mb-2 text-green-500'>أجاب على هذا السؤال:</h2>
            ) : (
              <h2 className='font-semibold text-sm mb-2 text-orange-500'>
                السؤال في انتظار إجابات:
              </h2>
            )}
            {question.responses.map((response, index) => (
              <div key={index} className='flex flex-wrap justify-between'>
                <DoctorQuestion doctor={response?.doctor} />
                <Link href={`/questions/show-response/${question._id}`} className=''>
                  <button
                    id='call-btn'
                    className='w-full btn px-4 py-2 flex gap-2 items-enter justify-center'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/view.webp'
                      width={20}
                      height={10}
                      alt='avatar'
                    />
                    <p className='font-semibold text-sm'>انظر الاجابة</p>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
      {slicer < questions?.length && (
        <button
          className='btn3 p-2'
          onClick={(e) => {
            e.preventDefault();
            setSlicer(slicer + 10);
          }}>
          عرض المزيد
        </button>
      )}
    </div>
  );
}
export default Questions;
