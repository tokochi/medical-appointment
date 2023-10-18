"use client";
import { TextareaInput } from "@components/inputs";
import React from "react";
import { useStore } from "@context/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function Comment({ data }) {
   const router = useRouter();
  const {questionId ,responseId} = JSON.parse(data)
  const { handleInputChange, askQuestion, handleSumbitComment } = useStore();
  return (
    <div className='flex gap-4 justify-center items-center'>
      <TextareaInput
        name='comment'
        value={askQuestion?.comment}
        onChange={(e) => handleInputChange(e, "askQuestion")}
        type='text'
        placeholder='أكتب تعليقك هنا'
      />
      <button onClick={(e) => handleSumbitComment(e, toast,router, responseId,questionId)}>
        <svg className='w-5 h-5 fill-gray-400' viewBox='0 0 48 48'>
          <path d='M5.4453125 4.0019531 A 1.50015 1.50015 0 0 0 4.1015625 6.0410156L9.6015625 20.242188 A 1.50015 1.50015 0 0 0 10.759766 21.179688L25.701172 23.605469C26.073404 23.665819 26.037109 23.77328 26.037109 24C26.037109 24.22672 26.073399 24.334183 25.701172 24.394531L10.759766 26.820312 A 1.50015 1.50015 0 0 0 9.6015625 27.757812L4.1015625 41.958984 A 1.50015 1.50015 0 0 0 6.1699219 43.841797L43.169922 25.341797 A 1.50015 1.50015 0 0 0 43.169922 22.658203L6.1699219 4.1582031 A 1.50015 1.50015 0 0 0 5.4453125 4.0019531 z' />
        </svg>
      </button>
    </div>
  );
}

export default Comment;
