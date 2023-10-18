"use client"
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@context/store";
import AskQuestion from "../forms/question/AskQuestion";

function FindYourAnswer() {
  const {session} = useStore()
  return (
    <div className='card p-4 flex flex-col gap-4'>
      <h1 className='font-bold text-2xl text-center text-sky-500'>
        احصل على إجابة لاستشاراتك الطبية
      </h1>
      <h2 className='font-semibold text-center'>
        نخبة من الأطباء المتخصصين سيقومون بالإجابة على استفساراتك الطبية
      </h2>
      <Link href='#' className=''>
        <button
          onClick={() =>
            useStore.setState({
              errorInput: {
                speciality: false,
                title: false,
                text: false,
              },
              askQuestion: {
                title: "",
                text: "",
                speciality: {},
                response: "",
                author: session?._id,
              },
              modal: {
                isOpen: true,
                title: "سؤالي الطبي",
                content: "",
                children: <AskQuestion />,
              },
            })
          }
          id='call-btn'
          className='w-full btn2 px-4 py-2 flex gap-2 items-enter justify-center'>
          <Image
            className='w-auto h-auto'
            src='/images/view.webp'
            width={20}
            height={10}
            alt='avatar'
          />
          <p className='font-bold text-sm'>اسأل طبيب</p>
        </button>
      </Link>
    </div>
  );
}

export default FindYourAnswer;
