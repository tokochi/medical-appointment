"use client";
import { TextareaInput } from "@components/inputs";
import { useStore } from "@context/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


function RespondQuestion({ data }) {
  const id = JSON.parse(data);
   const router = useRouter();
   const { session,  handleUpdateQuestion } = useStore();
  return (
    <button
      onClick={() =>
        useStore.setState({
          askQuestion: { doctorID: session?._id, text: "" },
          modal: {
            isOpen: true,
            title: "إضافة إجابة",
            children: <RespondText />,
            textBtn_1: "موافقة",
            textBtn_2: "إلغـــــاء",
            onClickBtn_1: (e) => {
              handleUpdateQuestion(e, toast, router, id);
              //   router.refresh();
            },
            onClickBtn_2: (e) => {
              useStore.setState((state) => ({ modal: state.modalClosed }));
            },
          },
        })
      }
      className='bg-yellow-400 rounded-xl hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
      إجابة على هذا السؤال
      <Image className='w-auto h-auto' src='/images/send.webp' width={20} height={20} alt='input' />
    </button>
  );
}

function RespondText() {
    const {  askQuestion, handleInputChange} = useStore();
  return (
    <div>
      <TextareaInput
        name='text'
        rows={8}
        value={askQuestion?.text}
        onChange={(e) => handleInputChange(e, "askQuestion")}
        type='text'
        placeholder='أكتب إجابتك هنا'
      />
    </div>
  );
}
export default RespondQuestion;
