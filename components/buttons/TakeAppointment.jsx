"use client"
import Appointment from "@components/cards/Appointment";
import LoginOrSignup from "@components/forms/user/LoginOrSignup";
import { useStore } from "@context/store";
import React from "react";

function TakeAppointment({ doctor }) {
  const { session } = useStore();
  return (
    <button
      className='w-full btn2 px-4 py-2 flex gap-2 items-enter justify-center'
      onClick={() => {
        useStore.setState({
          appointInfo: {
            date: new Date(),
            time: "9:00",
            doctor: doctor._id,
            user: {
              id: session?._id,
              email: session?.email,
              name: session?.name,
            },
          },
          showPinCode: false,
          modal: {
            isOpen: true,
            title: session ? "تحديد موعد طبي:" : "لا يمكنك المواصلة يجب ان تسًّجل دوخلك",
            content: "",
            children: session ? <Appointment doctor={doctor} /> : <LoginOrSignup />,
          },
        });
      }}>
      <svg className='h-5 w-5 fill-gray-900' viewBox='0 0 28 28'>
        <path d='M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M19.707,15.707 l-5.56,5.56c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-2.453-2.453c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l1.746,1.746l4.853-4.853c0.391-0.391,1.023-0.391,1.414,0S20.098,15.316,19.707,15.707z M24,10H6V6h18V10z"' />
      </svg>
      <p className='font-semibold text-sm mx-1'>إحجز موعد</p>
    </button>
  );
}

export default TakeAppointment;
