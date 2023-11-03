import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/serverStore";
import Rating from "@components/utils/Rating";
import DoctorQuestion from "@components/cards/DoctorQuestion";
import moment from "moment";
import "moment/locale/ar-dz";
import Comment from "@components/cards/Comment";
moment().locale("ar-dz");

export async function generateMetadata({ params }) {
 const { fetchQuestion } = useStore.getState();
 const selectedQuestion = await fetchQuestion(params?.id);
  return {
    title: "أسئلة طبية",
    desciption: selectedQuestion?.title,
  };
}





async function page({ params }) {
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
                <h1 className='font-bold text-xl text-sky-500'>{selectedQuestion?.title}</h1>
                <p className=' text-sky-500 text-sm font-semibold '>
                  {moment(selectedQuestion?.date).format("LLLL") + " 🕒 "}
                </p>
                <h2 className='text-justify p-1'>{selectedQuestion?.text}</h2>
              </div>
            </div>
          </div>
          <div id='body' className='mt-2'>
            {selectedQuestion?.responses?.length > 0 ? (
              <h2 className='font-semibold text-sm mb-2 text-green-500'>أجاب على هذا السؤال:</h2>
            ) : (
              <h2 className='font-semibold text-sm mb-2 text-orange-500'>
                السؤال في انتظار إجابات:
              </h2>
            )}
            {selectedQuestion?.responses?.map((response, index) => (
              <div key={index}>
                <div className=''>
                  <DoctorQuestion doctor={response?.doctor} />
                </div>
                <div className='flex flex-col gap-2'>
                  الإجابة:
                  <div className=' p-4 border-[1px] border-dashed border-slate-800 dark:border-gray-300'>
                    <h2 className='text-justify'>{response?.text}</h2>
                  </div>
                  <Rating />
                  <Comment
                    data={JSON.stringify({
                      questionId: selectedQuestion._id,
                      responseId: response?._id,
                    })}
                  />
                  التعليقات:
                  {response?.comments.map((comment, index) => (
                    <div key={index} className='card flex flex-col gap-2 rounded-md p-2'>
                      <div className='flex text-xs flex-wrap justify-between'>
                        <p>مستخدم:</p>
                        <p>{moment(selectedQuestion?.date).format("LLLL")}</p>
                      </div>
                      <p className=''> {comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
