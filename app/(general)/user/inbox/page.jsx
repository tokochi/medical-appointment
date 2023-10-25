"use client";
import Message from "@components/cards/mail/UserMessage";
import LoginOrSignup from "@components/forms/user/LoginOrSignup";
import { useStore } from "@context/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/ar-dz";
import ShowInboxMessage from "@components/cards/ShowInboxMessage";
moment().locale("ar-dz");
function page() {
  const { session, handleDeleteMessage, handleUpdateMessage } = useStore();
  const router = useRouter();
  if (session?.inbox?.length === 0)
    return (
      <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
        <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
          لايوجد أي رسالة خاص بك
        </div>
      </div>
    );
  return (
    <div className='flex flex-col gap-4 overflow-x-auto w-full md:m-10'>
      <div className='card p-4 rounded-md overflow-x-auto w-full'>
        <table className='text-sm whitespace-nowrap md:text-base min-w-[600px] w-full'>
          <thead>
            <tr>
              <th className='w-1/4 text-center text-yellow-600 p-2'>من طرف</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>العنــوان</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>توقيت</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {session?.inbox?.reverse()?.map((message, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  if (!message.status) {
                    handleUpdateMessage(message?._id, session?._id, "users");
                  }
                  useStore.setState((state) => ({
                    session: {
                      ...state.session,
                      inbox: [...state.session.inbox].map((item) =>
                        item._id === message._id ? { ...item, status: true } : item
                      ),
                    },
                    modal: {
                      isOpen: true,
                      title: message?.title || "(بدون عنوان)",
                      content: <ShowInboxMessage message={message} />,
                    },
                  }));
                }}
                className={`text-center cursor-pointer  text-sm border-b border-gray-300 dark:border-gray-600 hover:bg-sky-500/50 ${
                  !message.status && "font-bold dark:text-slate-300 text-slate-700  "
                } p-2`}>
                <td className='text-center p-2 '>
                  <div id='avatar' className='text-right flex flex-col gap-2'>
                    <h1 className='font-bold text-sky-500'>
                      {message?.from?.title?.text + " "}
                      {message?.from?.name}
                    </h1>
                    <h2 className='font-semibold'>{message?.from?.speciality?.text}</h2>
                  </div>
                </td>
                <td className='text-center p-2 '>
                  <div className='flex gap-2 justify-center'>
                    <p>{message?.title || " (بدون عنوان) "}</p>
                    <p className='truncate font-thin max-w-[120px]'>{message?.text}</p>
                  </div>
                </td>
                <td className='text-center p-2'>{moment(message.date).format("LLLL") + " 🕒 "}</td>
                <td className='text-center p-2'>
                  <div className='flex gap-2'>
                    <button
                      onClick={(e) => {
                       { e.stopPropagation();useStore.setState({
                          messageToSend: {
                            title: `الرد على :${message?.title.replace("الرد على", "")}`,
                            text: "",
                            from: {
                              id: session?._id,
                              name: session?.name,
                              email: session?.email,
                              // title: session?.title,
                              // speciality: session?.speciality,
                            },
                          },
                          modal: {
                            isOpen: true,
                            title: session
                              ? "الرد على الرسالة"
                              : "لا يمكنك المواصلة يجب ان تسًّجل دوخلك",
                            content: "",
                            children: session ? (
                              <Message id={message?.from?.id} />
                            ) : (
                              <LoginOrSignup />
                            ),
                          },
                        });}
                      }}
                      className='flex z-50 justify-around bg-green-300/50 hover:bg-green-300 dark:bg-green-600/50 hover:dark:bg-green-600 p-1 text-xs rounded-md gap-1'>
                      الـرد
                      <svg className='w-4 h-4' width='48' height='48' viewBox='0 0 48 48'>
                        <path fill='#00BCD4' d='M5 19L19 30 19 8z' />
                        <path
                          fill='#00BCD4'
                          d='M43,40h-8c0-9.374-7.626-17-17-17v-8C31.785,15,43,26.215,43,40z'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        useStore.setState({
                          messageToSend: message,
                          modal: {
                            isOpen: true,
                            title: "حذف رسالة",
                            content: "هل أنت متأكد من عملية الحذف!",
                            textBtn_1: "موافقة",
                            textBtn_2: "إلغـــــاء",
                            onClickBtn_1: (e) => {
                              useStore.setState((state) => ({
                                session: {
                                  ...state.session,
                                  inbox: [...state.session.inbox].filter(
                                    (item) => item._id !== message._id
                                  ),
                                },
                              }));
                              handleDeleteMessage(
                                e,
                                toast,
                                session._id,
                                "users",
                                message._id,
                                router
                              );
                            },
                            onClickBtn_2: (e) => {
                              useStore.setState((state) => ({ modal: state.modalClosed }));
                            },
                          },
                        })
                      }}
                      className='flex z-50 justify-around dark:bg-red-500/50 hover:dark:bg-red-500 hover:bg-red-300 bg-red-300/50 p-1 text-xs rounded-md gap-1'>
                      حـذف
                      <svg className='w-4 h-4' viewBox='0 0 48 48'>
                        <path
                          fill='#CFD8DC'
                          d='M36,7H8c-2.209,0-4,1.791-4,4v17c0,2.209,1.791,4,4,4h28c2.209,0,4-1.791,4-4V11C40,8.791,38.209,7,36,7z'
                        />
                        <path
                          fill='#78909C'
                          d='M5.088,8.273c-0.461,0.491-0.795,1.098-0.961,1.773L22,23l17.873-12.953c-0.166-0.676-0.5-1.282-0.961-1.773L22,20.53L5.088,8.273z'
                        />
                        <path
                          fill='#F44336'
                          d='M44,31c0,5.523-4.477,10-10,10s-10-4.477-10-10s4.477-10,10-10S44,25.477,44,31'
                        />
                        <path
                          fill='#FFF'
                          d='M32.5 25H35.5V37H32.5z'
                          transform='rotate(134.999 34 31)'
                        />
                        <path
                          fill='#FFF'
                          d='M32.501 25H35.501V36.999H32.501z'
                          transform='rotate(-134.999 34 31)'
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
