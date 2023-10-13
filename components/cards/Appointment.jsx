"use client";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import Localization from "../../utils/Localization";
import { useStore } from "@context/store";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar-dz";
import { IconInput, SelectInput, TextInput, TextareaInput } from "@components/inputs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingComponent from "@components/utils/LoadingComponent";
import { useState, useEffect } from "react";
function Appointment({ doctor }) {
  moment().locale("ar-dz");
  const {
    appointInfo,
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
  const disabledDate = (args) => {
    const dayOfWeek = args.date.getDay();
    const matchingItem = doctor?.workTime.find((item) => item.id === dayOfWeek);
    if (matchingItem && matchingItem.state === "close") {
      args.isDisabled = true;
    }
  };
  const onchange = (args) => {
    useStore.setState((state) => ({
      appointInfo: { ...state.appointInfo, date: args.value.toLocaleDateString() },
    }));
  };
const minDate = moment().startOf("day").toISOString();
const maxDate = moment().add(8, "days").startOf("day").toISOString();
  const times = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ];
  const router = useRouter();
  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center  transform -translate-x-1/2 -translate-y-1/2'>
  //       <LoadingComponent size={100} color='#0891b2' loading={isLoading} />
  //     </div>
  //   );
  // }
  return (
    <div id="time">
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
        <div className='md:mx-auto'>
          <p>موعدك على:</p>
          <p className='mx-auto text-sky-500 font-semibold'>
            {moment(appointInfo?.date).format("LL") + " 🕒 " + appointInfo?.time}
          </p>
        </div>
      </div>
      <div className='flex flex-col p-1 gap-4'>
        <div className='card p-1 rounded-md '>
          <div  className='font-semibold  flex gap-4  p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            <p>تحديد الوقت</p>
          </div>
          <div className='flex justify-between '>
            <div className='p-4 flex gap-2 flex-wrap justify-center items-center'>
              {times.map((time) => (
                <button
                  name={time}
                  className={`p-1 md:p-2  border-[1px] relative shadow-md border-gray-200 dark:border-gray-700  grow rounded-md ${
                    appointInfo?.time === time ? "bg-sky-400" : "bg-white dark:bg-inputDark"
                  }  font-semibold md:text-lg`}
                  onClick={() => {
                    useStore.setState((state) => ({
                      appointInfo: { ...state.appointInfo, time },
                    }));
                  }}>
                  {time}
                </button>
              ))}
            </div>
            <div>
              <CalendarComponent
                min={minDate}
                max={maxDate}
                locale='ar-DZ'
                renderDayCell={disabledDate}
                change={onchange}></CalendarComponent>
            </div>
          </div>
        </div>
        <div className='card p-1 rounded-md '>
          <div className='font-semibold flex gap-4  p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            <p>معلومات إضافية</p>
          </div>
          <div className='flex flex-col gap-2'>
            <SelectInput
              name='visitArg'
              value={appointInfo?.visitArg?.value}
              onChange={(e) => handleSelectInput(e, "appointInfo")}
              options={visitArg}
              option_value='value'
              option_text='text'
              placeholder='سبب الزيـارة'
              label='سبب الزيـارة:'
            />
            <TextareaInput
              name='desc'
              value={appointInfo?.desc}
              onChange={(e) => handleInputChange(e, "appointInfo")}
              type='text'
              rows={5}
              placeholder='أكتب شرح إضافي هنا'
            />
          </div>
        </div>
        <div className='card p-1 rounded-md '>
          <div className='font-semibold flex gap-4  p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            <p>تأكيد الموعد</p>
          </div>
          <div className='flex flex-col gap-2'>
            <TextInput
              name='user.name'
              type='text'
              value={appointInfo?.user?.name}
              onChange={(e) => handleInputChange(e, "appointInfo")}
              placeholder='الإسم و اللقب'
              error={errorInput?.name}
              label='الإسم و اللقب'
            />
            <IconInput
              icon='/images/email.webp'
              name='user.email'
              value={appointInfo?.user?.email}
              onChange={(e) => handleInputChange(e, "appointInfo")}
              type='email'
              error={errorInput?.email}
              placeholder='البريد الإلكتروني'
              label='البريد الإلكتروني'
            />
            <p className='font-semibold text-center p-2'>
              سيتم إرسال رمز لك على هذا البريد الالكتروني للتحقق من صحة موعدك
            </p>
            {showPinCode ? (
              isLoading ? (
                <div className='mt-2 flex items-center justify-center  '>
                  <LoadingComponent size={50} color='#0891b2' loading={isLoading} />
                </div>
              ) : (
                <div id="pinCode" className='mx-auto p-4 text-center'>
                  <TextInput
                    type='text'
                    name='pinCode'
                    value={appointInfo?.pinCode}
                    error={errorInput?.pinCode}
                    onChange={(e) => handleInputChange(e, "appointInfo")}
                    label='الرجاء إدخال الرمز السري:'
                  />
                  <button
                    onClick={() => {
                      pinCodeVerification(router, toast);
                    }}
                    className='bg-green-600 hover:bg-green-700  focus:ring-2 focus:ring-green-800 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
                    التحقق
                    <Image
                      className='w-auto h-auto'
                      src='/images/lock.webp'
                      width={20}
                      height={20}
                      alt='input'
                    />
                  </button>
                  {timer > 0 ? (
                    <p className='text-sm p-2'>
                      سوف تتمكن من إعادة ارسال الرمز السري بعد
                      <p className='text-green-700 text-sm font-semibold p-1'>
                        {"00:" + timer + "🕒"}
                      </p>
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        sendPinCode();
                        setTimer(60);
                      }}
                      className='text-sky-500 p-2'>
                      إعادة ارسال الرمز السري
                    </button>
                  )}
                </div>
              )
            ) : (
              <button
                onClick={() => {
                  sendPinCode();
                }}
                className='bg-green-400 hover:bg-green-500  focus:ring-2 focus:ring-green-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
                تلقي الرمز
                <Image
                  className='w-auto h-auto'
                  src='/images/lock.webp'
                  width={20}
                  height={20}
                  alt='input'
                />
              </button>
            )}
          </div>
          <div id="modal-bottom" ></div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
