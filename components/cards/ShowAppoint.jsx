import React from "react";
import moment from "moment";
import "moment/locale/ar-dz";
import Image from "next/image";
import { TextareaInput } from "@components/inputs";
moment().locale("ar-dz");

function ShowAppoint({ appointment, askQuestion, doctor, handleInputChange }) {
  return (
    <div id='doct-cards' className='p-4 card rounded-md flex flex-col  gap-6'>
      <div id='title' className='flex flex-col  gap-6'>
        <div className='flex flex-wrap gap-2 justify-start items-start  p-2 sticky top-0 z-[1000] border-b-[1px] border-gray-300 dark:border-gray-700 bg-white rounded-xl shadow  dark:bg-slate-800'>
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
              {moment(appointment?.date).format("LL") + " 🕒 " + appointment?.time}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center p-4 bg-green-200 text-lg text-slate-800 '>
          <svg className='h-12 w-12' viewBox='0 0 48 48'>
            <linearGradient
              id='IMoH7gpu5un5Dx2vID39Ra'
              x1='9.858'
              x2='38.142'
              y1='9.858'
              y2='38.142'
              gradientUnits='userSpaceOnUse'>
              <stop offset='0' stop-color='#9dffce' />
              <stop offset='1' stop-color='#50d18d' />
            </linearGradient>
            <path
              fill='url(#IMoH7gpu5un5Dx2vID39Ra)'
              d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
            />
            <linearGradient
              id='IMoH7gpu5un5Dx2vID39Rb'
              x1='13'
              x2='36'
              y1='24.793'
              y2='24.793'
              gradientUnits='userSpaceOnUse'>
              <stop offset='.824' stop-color='#135d36' />
              <stop offset='.931' stop-color='#125933' />
              <stop offset='1' stop-color='#11522f' />
            </linearGradient>
            <path
              fill='url(#IMoH7gpu5un5Dx2vID39Rb)'
              d='M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z'
            />
          </svg>
          <p className='text-center'>
            لقد تم استلام موعدك وفي انتظار التأكيد من الطبيب. سوف تتلقى إشعارًا عبر الرسائل القصيرة
            في أقرب وقت ممكن
          </p>
        </div>
      </div>
      <div>
        <h1 className='text-sky-500 my-4 text-lg font-semibold'>لا تتردد في الاتصال بطبيبك</h1>
        <TextareaInput
          name='text'
          rows='4'
          //   value={askQuestion?.text}
          //   onChange={(e) => handleInputChange(e)}
          type='text'
          placeholder='أكتب رسالتك هنا'
        />
        <button
          //   onClick={() => {
          //      sendMessage();
          //   }}
          className='grow-0 font-semibold bg-cyan-400 rounded-lg hover:bg-cyan-500  focus:ring-2 focus:ring-cyan-700 flex mt-2 gap-2 text-w justify-center items-center  pr-5 p-1  dark:border-gray-600  dark:text-black'>
          إرسل
          <Image
            className='w-auto h-auto'
            src='/images/send.webp'
            width={20}
            height={20}
            alt='input'
          />
        </button>
        <h1 className='text-sky-500 my-4 text-lg font-semibold'> الهــاتف</h1>
        <div className='flex flex-col gap-4 items-start justify-start'>
          {doctor?.phone?.mobile && (
            <div className='flex min-w-[200px] text-xl w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
              {doctor?.phone?.mobile}
              <svg className='h-8 w-8 ' viewBox='0 0 48 48'>
                <path
                  fill='#0f0'
                  d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                />
                <path
                  fill='#FFF'
                  d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                />
              </svg>
            </div>
          )}
          {doctor?.phone?.line1 && (
            <div className='flex min-w-[200px] text-xl w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
              {doctor?.phone?.line1}
              <svg className='h-8 w-8 ' viewBox='0 0 48 48'>
                <path
                  fill='#0f0'
                  d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                />
                <path
                  fill='#FFF'
                  d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                />
              </svg>
            </div>
          )}
          {doctor?.phone?.line2 && (
            <div className='flex min-w-[200px] text-xl w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
              {doctor?.phone?.line2}
              <svg className='h-8 w-8 ' viewBox='0 0 48 48'>
                <path
                  fill='#0f0'
                  d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                />
                <path
                  fill='#FFF'
                  d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                />
              </svg>
            </div>
          )}
        </div>
        <h1 className='text-sky-500 my-4 text-lg font-semibold'>الاتجـــاهات</h1>
        <iframe
          className='w-full rounded-md'
          src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d103466.46217257043!2d${doctor?.googleMap?.lng}!3d${doctor?.googleMap?.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2sdz!4v1693834683880!5m2!1sar!2sdz`}></iframe>
      </div>
    </div>
  );
}

export default ShowAppoint;
