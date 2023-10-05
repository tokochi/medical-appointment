import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/serverStore";
import DoctorQuestion from "./DoctorQuestion";

async function Questions() {
  const { fetchQuestions } = useStore.getState();
  const questions = await fetchQuestions();
  return (
    <div className='flex flex-col gap-4'>
      {questions.map((question, index) => (
        <div key={index} className=' p-4 card rounded-md'>
          <div
            id='header'
            className=' flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
              <div id='title' className='flex flex-col'>
                <Link
                  href={`/questions/show-response/${question._id}`}>
                  <h1 className='font-bold text-clamp-xl text-sky-500'>{question?.title}</h1>
                </Link>
                <h2 className='text-justify'>{question?.text}</h2>
              </div>
            </div>
          </div>
          <div id='body' className='mt-2'>
            <h2 className='font-semibold text-sm mb-2 text-green-500'>أجاب على هذا السؤال:</h2>
            <div className='flex flex-wrap gap-2'>
              <DoctorQuestion doctor={question?.doctor} />
              <Link
                href={`/questions/show-response/${question._id}`}
                className=''>
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
          </div>
        </div>
      ))}
    </div>
  );
}
export default Questions;
