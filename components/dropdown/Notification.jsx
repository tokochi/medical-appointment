"use client";
import { useEffect } from "react";
import moment from "moment";
import { useStore } from "@context/store";
import "moment/locale/ar-dz";
moment().locale("ar-dz");

function Notification() {
  const { notification, clearNotifaction, session, deleteNotifaction } = useStore();

  return (
    <div
      name="notification"
      id='dropdown'
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`absolute left-0 top-[35px]  z-[900] max-h-[300px] w-[200px] overflow-y-auto  
       rounded-lg shadow ${!notification.isOpen && "hidden"} bg-cyan-900`}>
      <ul className=' text-sm text-gray-700 z-[500] dark:text-gray-200'>
        {!session?.notificationsList?.length && (
          <li
            className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
            لا يوجد تنبيهات
          </li>
        )}
        {session?.notificationsList?.map((notification, index) => (
          <li
            key={index}
            className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1`}>
            <h2 className={`font-semibold text-right`}>
              <div onClick={() => deleteNotifaction(notification._id)}>
                <svg className='absolute top-[-5px] right-[-6px] z-50 h-5 w-5' viewBox='0 0 48 48'>
                  <path
                    d='M24,4C12.954,4,4,12.954,4,24c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20C44,12.954,35.046,4,24,4z M31.561,29.439c0.586,0.586,0.586,1.535,0,2.121C31.268,31.854,30.884,32,30.5,32s-0.768-0.146-1.061-0.439L24,26.121l-5.439,5.439C18.268,31.854,17.884,32,17.5,32s-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121L21.879,24l-5.439-5.439c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0L24,21.879l5.439-5.439c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L26.121,24L31.561,29.439z'
                    fill='#7D7D7D'
                  />
                </svg>
              </div>
              تنبيه بخصوص {notification?.action + " " + notification?.type + " "}
            </h2>
            <div className='text-right'>
              <span className='text-green-600'>{notification?.source}</span>
            </div>
            <span className={`block text-xs font-medium `}>
              {moment(notification?.date).format("LLLL")}
            </span>
          </li>
        ))}
      </ul>
      {session?.notificationsList?.length > 0 && (
        <div className='p-1 sticky bottom-0 text-xs z-[100] bg-cyan-900'>
          <p
            onClick={() => {
              clearNotifaction();
            }}
            className='rounded-lg p-1 w-1/2 mx-auto cursor-pointer btn'>
            مسح الكُّل
          </p>
        </div>
      )}
    </div>
  );
}

export default Notification;
