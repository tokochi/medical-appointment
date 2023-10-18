"use client";
import Image from "next/image";
import { useStore } from "@context/store";
import LoginOrSignup from "../forms/user/LoginOrSignup";
import UserMessage from "@components/cards/mail/UserMessage";

function UserSendMessage({ data }) {
  const doctor = JSON.parse(data);
  const { session } = useStore();
  return (
    <button
      onClick={() => {
        useStore.setState({
          messageToSend: {
            title: "",
            files:[],
            text: "",
            from: {
              id: session?._id,
              name: session?.name,
              email: session?.email,
            },
            status: false,
          },
          modal: {
            isOpen: true,
            title: session ? "أرسل رسالتك" : "لا يمكنك المواصلة يجب ان تسًّجل دوخلك",
            content: "",
            children: session ? <UserMessage id={doctor._id} /> : <LoginOrSignup />,
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
export default UserSendMessage;
