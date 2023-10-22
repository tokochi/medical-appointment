"use client";
import React from "react";
import { useStore } from "@context/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Likes({ data }) {
  const router = useRouter();
  const { questionId, responseId } = JSON.parse(data);
  const { handleInputChange, askQuestion, handleSumbitComment } = useStore();
  return (
    <div>
      <button onChange={(e) => handleInputChange(e, toast, router, questionId, responseId)}>
        <svg className='w-5 h-5' viewBox='0 0 48 48'>
          <path
            d='M13 44h-3c-2.209 0-4-1.791-4-4V23c0-2.209 1.791-4 4-4h7v21C17 42.209 15.209 44 13 44zM40.663 21.569c-.955-1.009-2.274-1.566-3.716-1.569H29.5c0 0 1.09-4.377 1.465-5.845.566-2.221.68-4.09.356-5.882-.168-.931-.467-2.136-1.291-3.203-.585-.758-1.317-1.251-2.177-1.467-1.28-.319-2.048.09-2.508 1.373-.038.104-1.646 5.766-1.646 5.766-.126.447-.247.803-.432 1.09-1.188 1.852-2.624 3.653-4.268 5.489v24.157c4.46 1.274 11.166 2.441 11.623 2.484C30.882 43.988 31.14 44 31.396 44c3.608 0 6.781-2.431 7.71-6.018C39.944 34.744 41.671 27 41.671 27c.138-.511.295-1.09.329-1.722C42.075 23.877 41.6 22.561 40.663 21.569z'
            fill='#3C3C3B'
          />
        </svg>
      </button>
    </div>
  );
}

export default Likes;
