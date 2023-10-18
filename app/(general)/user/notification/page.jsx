"use client";
import { useStore } from "@context/store";
import Image from "next/image";
import toast from "react-hot-toast";
import ToggleInput from "@components/inputs/ToggleInput";
import { useEffect } from "react";

function page() {
  const {
    userInfo,
    session,
    updateNotification,
    handleSubmitUserUpdate,
    isLoading,
  } = useStore();
 useEffect(() => useStore.setState({ userInfo: session }), [session]);
 
  return (
    <div className='w-full md:mx-20 md:mt-10'>
      <div id='personal-info' className='card rounded-md '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          معلومات التنبيهـــــات
        </div>
        <form
          onSubmit={(e) => handleSubmitUserUpdate(e, toast, userInfo?._id)}
          className='p-2 flex flex-col gap-2 justify-center'>
          <div id='site' className='mt-4 flex gap-2 justify-between items-center grow'>
            <div className=''>
              <h1 className='font-semibold'>رسالة خاصة</h1>
              <span className='text-sm'>تلقي تنبيهات بخصوص الرسائل الخاصة</span>
            </div>
            <ToggleInput
              name='رسالة'
              checked={userInfo?.notifications?.includes("رسالة")}
              onChange={(e) => updateNotification(e, "رسالة", "userInfo")}
              type='text'
            />
          </div>
          <div className='font-semibold px-2 border-b-[1px] border-gray-300 dark:border-gray-700'></div>
          <div id='site' className='flex gap-2 justify-between items-center grow'>
            <div className=''>
              <h1 className='font-semibold'>سؤال طبي</h1>
              <span className='text-sm'>تلقي تنبيهات بخصوص الأسألة الطبية</span>
            </div>
            <ToggleInput
              name='سؤال'
              checked={userInfo?.notifications?.includes("سؤال")}
              onChange={(e) => updateNotification(e, "سؤال", "userInfo")}
              type='text'
            />
          </div>
          <div className='font-semibold px-2 border-b-[1px] border-gray-300 dark:border-gray-700'></div>
          <div id='site' className='flex gap-2 justify-between items-center grow'>
            <div className=''>
              <h1 className='font-semibold'>موعد طبي</h1>
              <span className='text-sm'>تلقي تنبيهات بخصوص المواعيد الطبية</span>
            </div>
            <ToggleInput
              name='موعد'
              checked={userInfo?.notifications?.includes("موعد")}
              onChange={(e) => updateNotification(e, "موعد", "userInfo")}
              type='text'
            />
          </div>
          <div className='font-semibold px-2 border-b-[1px] border-gray-300 dark:border-gray-700'></div>
          <div id='site' className='flex gap-2 justify-between items-center grow'>
            <div className=''>
              <h1 className='font-semibold'>التعليقات</h1>
              <span className='text-sm'>تلقي تنبيهات بخصوص التعليقات</span>
            </div>
            <ToggleInput
              name='تعليق'
              checked={userInfo?.notifications?.includes("تعليق")}
              onChange={(e) => updateNotification(e, "تعليق", "userInfo")}
              type='text'
            />
          </div>
          <div className='font-semibold px-2 border-b-[1px] border-gray-300 dark:border-gray-700'></div>

          <div className='text-center   mx-auto'>
            <button
              type='submit'
              onClick={() => useStore.setState({ isLoading: true })}
              className='bg-yellow-400 rounded-xl hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
              حفظ المعلومات
              {!isLoading ? (
                <Image
                  className='w-auto h-auto'
                  src='/images/send.webp'
                  width={20}
                  height={20}
                  alt='input'
                />
              ) : (
                <svg className='w-4 h-4 animate-spin fill-blue-700' viewBox='0 0 24 24'>
                  <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
