"use client";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import Localization from "../../utils/Localization";
import { useStore } from "@context/store";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar-dz";
import { TextInput, } from "@components/inputs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
function DoctorSub({doctor}) {
  const {
    doctorInfo,
    errorInput,
    showPinCode,
    visitArg,
    pinCodeVerification,
    isLoading,
    sendPinCode,
    handleSelectInput,
    handleInputChange,
  } = useStore();
 const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  Localization("اطباء");
  const onchange = (args) => {
    useStore.setState((state) => ({
      errorInput: { ...state.errorInput, date: false },
      doctorInfo: {
        ...state.doctorInfo,
          subscription: {
              endDate: args.endDate,
              startDate: args.startDate,
          }
      },
    }));
  };
 
  const router = useRouter();
  return (
    <div id='time'>
      <div className='flex flex-wrap gap-2 justify-start  p-2 sticky top-0 z-[1000] border-b-[1px] border-gray-300 dark:border-gray-700 bg-white rounded-xl shadow  dark:bg-slate-800'>
        <div className=''>
          <Image
            className='rounded-xl w-auto h-auto'
            src={doctor?.avatar?.[0]}
            width={40}
            height={40}
            alt='avatar'
          />
        </div>
        <div id='title' className='flex flex-col'>
          <h1 className='font-bold text-sky-500'>
            {doctor?.title?.text + " "}
            {doctor?.name}
          </h1>
          <h2 className='font-semibold text-sm'>{doctor?.speciality?.text}</h2>
        </div>
        {/* <div className='md:mx-auto'>
            <p>موعدك على:</p>
            <p className='mx-auto text-sky-500 font-semibold'>
              {moment(appointInfo?.date).format("LL") + " 🕒 " + appointInfo?.time}
            </p>
          </div> */}
      </div>
      <div className='flex flex-col p-1 gap-4'>
        <div className='card p-1 rounded-md '>
          <div className='font-semibold  flex gap-4  p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            <p>تحديد المدة:</p>
            <p>
              {moment(doctorInfo?.subscription?.endDate).diff(
                moment(doctorInfo?.subscription?.startDate),
                "days"
              ) + "  يوم  "}
            </p>
          </div>
          <div className={`flex justify-between ${errorInput.date && "border-red-600 border"}`}>
            <DateRangePickerComponent
              startDate={doctorInfo?.subscription?.startDate}
              endDate={doctorInfo?.subscription?.endDate}
              locale='ar-DZ'
              enableRtl
              change={onchange}></DateRangePickerComponent>
            {errorInput.date && (
              <p className='text-xs p-1 animate-bounce text-red-500 dark:text-red-500'>
                مدة الإشتراك يرجى ادخال
              </p>
            )}
          </div>
        </div>
        <div className='card p-1 rounded-md flex flex-col gap-2 '>
          <TextInput
            name='subscription.plan'
            type='text'
            value={doctorInfo?.subscription?.plan}
            onChange={(e) => handleInputChange(e, "doctorInfo")}
            placeholder='العرض الأول'
            label='العرض:'
          />
          <TextInput
            name='subscription.price'
            step={1000}
            type='number'
            lang='en'
            value={doctorInfo?.subscription?.price}
            onChange={(e) => handleInputChange(e, "doctorInfo")}
            placeholder='20000دج'
            label='السعر:'
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorSub;
