"use client";
import React from 'react'
import moment from "moment";
import { useStore } from "@context/store";
import "moment/locale/ar-dz";
moment().locale("ar-dz");

function Notification() {
  const { notification,sidebarOpen, currentAdmin } = useStore();
  return (
    <div
      id='dropdown'
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`absolute left-0  z-50 ${
        !notification.isOpen && "hidden"
      } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
      <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
        {currentAdmin?.notificationsList?.map((notification, index) => (
          <li className={`card p-2 border-b border-slate-200 hover:bg-gray-300 last:border-0`}>
            <div className=''>
              <h2 className={`font-semibold `}>
                تنبيه بخوص {notification?.action + " " + notification?.type + " "}
              </h2>
              <hr className='w-full mb-2' />
              <div className='flex gap-2 flex-col mb-4 justify-center'>
                <div className=''>
                  <span className='text-green-600 mr-2 text-right'>{notification?.source}</span>
                </div>
              </div>
            </div>
            <span className={`block text-xs font-medium `}>
              {moment(notification?.date).format("LLLL")}
            </span>
          </li>
        ))}
        <div
          className={`flex items-center sticky bottom-0 z-[9900] bg-inherit  gap-4 p-2 space-x-2 border-t  border-gray-200 rounded-b dark:border-gray-600`}>
          <button onClick={() => {}} type='button' className={`btn p-1.5`}>
            مسح الكُّل
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Notification