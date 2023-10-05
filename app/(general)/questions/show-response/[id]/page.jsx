import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/serverStore";
import Rating from "@components/Rating";

async function page({params}) {
  const { fetchQuestion } = useStore.getState();
  const selectedQuestion = await fetchQuestion(params?.id);
  return (
    <div className='grow shrink basis-[50%] min-w-[280px]'>
      <div id='question-card' className='p-2 my-2'>
        <div className=' p-4 card rounded-md'>
          <div
            id='header'
            className=' flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
              <div id='title' className='flex flex-col'>
                <h1 className='font-bold text-clamp-xl text-sky-500'>{selectedQuestion?.title}</h1>
                <h2 className='text-justify'>{selectedQuestion?.text}</h2>
              </div>
            </div>
          </div>
          <div id='body' className='mt-2'>
            <h2 className='font-semibold text-sm mb-2 text-green-500'>أجاب على هذا السؤال:</h2>
            <div className='flex flex-col gap-2'>
              <Link className='my-1  flex gap-4' href='/doctors/profile'>
                <div id='avatar'>
                  <Image
                    className='rounded-xl w-auto h-auto'
                    src={selectedQuestion?.doctor?.avatar?.[0] || "/images/heart.webp"}
                    width={80}
                    height={80}
                    alt='avatar'
                  />
                </div>
                <div id='title' className='flex flex-col'>
                  <h1 className='font-bold text-clamp-xl text-sky-500  '>
                    {selectedQuestion?.doctor?.title?.text + " "}
                    {selectedQuestion?.doctor?.name}
                  </h1>
                  <h2 className='font-semibold'>{selectedQuestion?.doctor?.speciality?.text}</h2>
                </div>
              </Link>
              الإجابة:
              <div className='p-4 border-[1px] border-dashed'>
                <h2 className='text-justify'>{selectedQuestion?.response}</h2>
              </div>
              <Rating />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
