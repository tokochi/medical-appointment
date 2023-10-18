import { useStore } from "@context/serverStore";
import moment from "moment";
import "moment/locale/ar-dz";
import GetSession from "@components/session/GetSession";
import RespondQuestion from "@components/buttons/RespondQuestion";
 moment().locale("ar-dz");
async function page() {
  const { fetchQuestions } = useStore.getState();
   const session = await GetSession();
  const questionsList = await fetchQuestions();
  const questions = questionsList
    .filter((question) =>
    [...session?.specialities, session?.speciality].some((speciality) =>
      speciality?.text?.includes(question.speciality.tag)
    )
  ).filter(question => question.responses.every(res => res.docotorID === session._id));

  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      {questions.length === 0 && (
        <div className='bg-sky-50 w-full dark:bg-primary m-4 md:m-4 rounded '>
          <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
            لايوجد أي سؤال في تخصصك الطبي
          </div>
        </div>
      )}
      {questions.map((question, index) => (
        <div key={index} className='card rounded-lg p-4 w-full flex flex-col gap-2'>
          <div
            id='header'
            className=' flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
              <div id='title' className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl text-sky-500'>{question?.title}</h1>
                <p className=' text-sky-500 text-sm font-semibold '>
                  {moment(question?._doc?.date).format("LLLL") + " 🕒 "}
                </p>
                <h2 className='text-justify p-2'>{question?.text}</h2>
              </div>
            </div>
          </div>
          <div className='p-2  text-center mx-auto'>
            <RespondQuestion data={JSON.stringify(question?._id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
