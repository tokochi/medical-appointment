"use client";
import Image from "next/image";
import { useStore } from "@context/store";
import Message from "@components/cards/Message";
import LoginOrSignup from "../forms/user/LoginOrSignup";

function SendMessage({ data }) {
  const doctor = JSON.parse(data);
const { session } = useStore();
  return (
    <button
      onClick={() => {
        useStore.setState({
          askQuestion: {
            date:Date.now(),
            title: "",
            text: "",
            files: [],
            author: session?._id,
            doctor: doctor?._id,
            details: { weight: 85, length: 180 },
          },
          modal: {
            isOpen: true,
            title: session ? "اطرح سؤال لطبيبك" : "لا يمكنك المواصلة يجب ان تسًّجل دوخلك",
            content: "",
            children: session ? <Message doctor={doctor} /> : <LoginOrSignup />,
          },
        });
      }}
      id='call-btn'
      className='w-full btn px-4 py-2 flex gap-2 items-enter justify-center'>
      <Image src='/images/email.webp' width={20} height={10} alt='avatar' />
      <p className='font-semibold text-sm'>إرسال رسالة</p>
    </button>
  );
}

export default SendMessage;
 