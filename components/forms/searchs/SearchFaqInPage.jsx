import Image from "next/image";
import Link from "next/link";
import { useStore } from "@context/serverStore";
async function SearchFaqInPage() {
      const { fetchQuestions, randomizer } = useStore.getState();
  const questions = await fetchQuestions();
    return (
      <div className='card rounded-md p-4 flex flex-col gap-4 justify-center'>
        {randomizer(questions, 1)?.map((question, index) => (
          <div key={index} className=''>
            <div
              id='header'
              className=' flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
              <div className='flex mb-1 gap-4'>
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
                  <div>
                    <Link
                      className='flex mb-2 text-sm gap-4'
                      href={`${
                        response?.doctor?._id ? "/doctors/profile/" + response?.doctor?._id : "#"
                      }`}>
                      <div id='avatar'>
                        <img
                          className='rounded-xl w-auto h-auto max-w-[50px]'
                          src={response?.doctor?.avatar?.[0] || "/images/heart.webp"}
                          width={50}
                          height={50}
                          alt='avatar'
                        />
                      </div>
                      <div id='title' className='flex flex-col'>
                        <h1 className='font-bold text-sky-500  '>
                          {response?.doctor?.title?.text && response?.doctor?.title?.text + " "}
                          {response?.doctor?.name}
                        </h1>
                        <h2 className='font-semibold'>{response?.doctor?.speciality?.text}</h2>
                      </div>
                    </Link>
                  </div>
                  <Link href={`/questions/show-response/${question._id}`} className='mx-auto'>
                    <button
                      id='call-btn'
                      className='w-full btn px-4 py-2 flex gap-2  items-center justify-center'>
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
        <div className='border-b-[1px] border-gray-200 w-full'></div>
        <div id='others' className=''>
          <h2 className='font-semibold text-sm text-center my-4'>أسألة متعلقة</h2>
          <div className='flex flex-col gap-2'>
            {randomizer(questions, 8)?.map((question, index) => (
              <Link href={`/questions/show-response/${question._id}`} className=''>
                <button className='w-full flex gap-2 text-sm items-enter'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/inscription.webp'
                    width={20}
                    height={5}
                    alt='avatar'
                  />
                  <p className='font-semibold text-sky-400 mx-1'>{question?.title}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
}

export default SearchFaqInPage;
