import React from 'react'
import { useStore } from "@context/store";
function Stepper() {
  const {
        setteperBtn,
        handleStepperButtonClick,
        personalInfo_ref,
        workInfo_ref,
        geoInfo_ref,
        workSchedule_ref,
        documentsUpload_ref,
      } = useStore();
  return (
    <ol className='relative  text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400'>
      <li
        onClick={() => {
          personalInfo_ref.current &&
            personalInfo_ref.current.scrollIntoView({ behavior: "smooth" });
          handleStepperButtonClick("btn_1");
        }}
        className='mb-10 ml-4 h-10'>
        <span
          className={`${
            setteperBtn.btn_1 ? "bg-green-200 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"
          } absolute flex items-center justify-center w-8 h-8  rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 48 48'>
            <path d='M39.5,8c2.485,0,4.5,2.015,4.5,4.5v23.009c0,2.485-2.015,4.5-4.5,4.5h-31c-2.485,0-4.5-2.015-4.5-4.5V12.5 C4,10.015,6.015,8,8.5,8H39.5z M18.5,25h-7c-0.759,0-1.387,0.564-1.486,1.296L10,26.5v0.984l0.016,0.217 c0.325,2.227,2.189,3.302,4.984,3.302c2.662,0,4.479-0.974,4.928-2.989l0.057-0.31L20,27.485V26.5c0-0.759-0.564-1.387-1.296-1.486 L18.5,25z M36.5,25.992h-8.995l-0.204,0.014c-0.732,0.099-1.296,0.727-1.296,1.486c0,0.759,0.564,1.387,1.296,1.486l0.204,0.014 H36.5l0.204-0.014C37.436,28.879,38,28.252,38,27.492c0-0.759-0.564-1.387-1.296-1.486L36.5,25.992z M15,17.004 c-1.657,0-3,1.343-3,3c0,1.657,1.343,3,3,3s3-1.343,3-3C18,18.347,16.657,17.004,15,17.004z M36.5,19h-8.995l-0.204,0.014 c-0.732,0.099-1.296,0.727-1.296,1.486s0.564,1.387,1.296,1.486L27.505,22H36.5l0.204-0.014C37.436,21.887,38,21.259,38,20.5 s-0.564-1.387-1.296-1.486L36.5,19z' />
          </svg>
        </span>
        <h3 className='hidden sm:inline-block text-xs'>المعلومات الشخصية</h3>
      </li>
      <li
        onClick={() => {
          workInfo_ref.current && workInfo_ref.current.scrollIntoView({ behavior: "smooth" });
          handleStepperButtonClick("btn_2");
        }}
        className='mb-10 ml-4 h-10'>
        <span
          className={`${
            setteperBtn.btn_2 ? "bg-green-200 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"
          } absolute flex items-center justify-center w-8 h-8  rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 48 48'>
            <path d='M16.5 5 A 1.50015 1.50015 0 0 0 15 6.5L15 14L11.5 14C7.364 14 4 17.364 4 21.5L4 35.5C4 39.636 7.364 43 11.5 43L36.5 43C40.636 43 44 39.636 44 35.5L44 21.5C44 17.364 40.636 14 36.5 14L33 14L33 6.5 A 1.50015 1.50015 0 0 0 31.5 5L16.5 5 z M 18 8L30 8L30 14L18 14L18 8 z M 24 20C26.209 20 28 21.791 28 24C28 26.209 26.209 28 24 28C21.791 28 20 26.209 20 24C20 21.791 21.791 20 24 20 z M 18.447266 30L29.552734 30C30.352734 30 31 30.647266 31 31.447266L31 32.751953C31 34.974953 28.163 37 24 37C19.837 37 17 34.974953 17 32.751953L17 31.447266C17 30.647266 17.647266 30 18.447266 30 z' />
          </svg>
        </span>
        <h3 className='hidden sm:inline-block text-xs'>المعلومات المهنية</h3>
      </li>
      <li
        onClick={() => {
          geoInfo_ref.current && geoInfo_ref.current.scrollIntoView({ behavior: "smooth" });
          handleStepperButtonClick("btn_3");
        }}
        className='mb-10 ml-4 h-10'>
        <span
          className={`${
            setteperBtn.btn_3 ? "bg-green-200 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"
          } absolute flex items-center justify-center w-8 h-8  rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 48 48'>
            <path d='M34 4c-5.514 0-10 4.432-10 9.878 0 2.35.854 4.629 2.42 6.435.167.187 4.093 4.584 5.419 5.831.605.57 1.383.855 2.16.855s1.555-.285 2.16-.854c1.54-1.448 5.266-5.657 5.434-5.847C43.146 18.508 44 16.228 44 13.878 44 8.432 39.514 4 34 4zM34 17c-1.657 0-3-1.343-3-3 0-1.657 1.343-3 3-3s3 1.343 3 3C37 15.657 35.657 17 34 17zM22.196 16C22.067 15.303 22 14.593 22 13.878c0-3.52 1.563-6.677 4.029-8.854C25.359 4.365 24.672 4 24 4c-2.473 0-5.164 4.792-6.362 12H22.196zM23.183 19h-5.931C17.095 20.59 17 22.256 17 24s.095 3.41.252 5h13.496c.034-.34.053-.697.079-1.046-2.126-2.198-5.867-6.273-5.901-6.311C24.223 20.833 23.64 19.943 23.183 19zM14 24c0-1.666.082-3.345.237-5h-9.6C4.223 20.599 4 22.273 4 24s.223 3.401.637 5h9.6C14.082 27.345 14 25.666 14 24zM18.289 4.841C12.632 6.531 8.018 10.659 5.674 16h8.93C15.281 11.61 16.521 7.606 18.289 4.841zM29.711 43.159c5.657-1.69 10.271-5.817 12.615-11.159h-8.93C32.719 36.39 31.479 40.394 29.711 43.159zM5.674 32c2.344 5.341 6.958 9.469 12.615 11.159C16.521 40.394 15.281 36.39 14.604 32H5.674zM44 24c0-1.086-.098-2.148-.266-3.187-.198.272-.407.538-.629.794-.04.045-4.38 4.709-6.98 7.393h7.238C43.777 27.401 44 25.727 44 24zM17.638 32c1.198 7.208 3.89 12 6.362 12s5.164-4.792 6.362-12H17.638z' />
          </svg>
        </span>
        <h3 className='hidden sm:inline-block text-xs'>الموقع الجغرافي</h3>
      </li>
      <li
        onClick={() => {
          workSchedule_ref.current &&
            workSchedule_ref.current.scrollIntoView({ behavior: "smooth" });
          handleStepperButtonClick("btn_4");
        }}
        className='mb-10 ml-4 h-10'>
        <span
          className={`${
            setteperBtn.btn_4 ? "bg-green-200 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"
          } absolute flex items-center justify-center w-8 h-8  rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 48 48'>
            <path d='M11.5 0C5.1664891 0 0 5.1664939 0 11.5C0 17.833506 5.1664891 23 11.5 23C17.833511 23 23 17.833506 23 11.5C23 5.1664939 17.833511 0 11.5 0 z M 11.5 3C16.212192 3 20 6.7878114 20 11.5C20 16.212189 16.212192 20 11.5 20C6.7878084 20 3 16.212189 3 11.5C3 6.7878114 6.7878084 3 11.5 3 z M 11.476562 4.9785156 A 1.50015 1.50015 0 0 0 10 6.5L10 11.5 A 1.50015 1.50015 0 0 0 10.439453 12.560547L12.439453 14.560547 A 1.50015 1.50015 0 1 0 14.560547 12.439453L13 10.878906L13 6.5 A 1.50015 1.50015 0 0 0 11.476562 4.9785156 z M 23.820312 6C24.572312 7.681 25 9.539 25 11.5C25 12.355 24.911766 13.189 24.759766 14L42 14L42 12.5C42 8.916 39.084 6 35.5 6L23.820312 6 z M 23.820312 17C21.713313 21.712 16.995 25 11.5 25C9.539 25 7.681 24.572312 6 23.820312L6 35.5C6 39.084 8.916 42 12.5 42L35.5 42C39.084 42 42 39.084 42 35.5L42 17L23.820312 17 z M 24 22C25.381 22 26.5 23.119 26.5 24.5C26.5 25.881 25.381 27 24 27C22.619 27 21.5 25.881 21.5 24.5C21.5 23.119 22.619 22 24 22 z M 32.5 22C33.881 22 35 23.119 35 24.5C35 25.881 33.881 27 32.5 27C31.119 27 30 25.881 30 24.5C30 23.119 31.119 22 32.5 22 z M 15.5 31C16.881 31 18 32.119 18 33.5C18 34.881 16.881 36 15.5 36C14.119 36 13 34.881 13 33.5C13 32.119 14.119 31 15.5 31 z M 24 31C25.381 31 26.5 32.119 26.5 33.5C26.5 34.881 25.381 36 24 36C22.619 36 21.5 34.881 21.5 33.5C21.5 32.119 22.619 31 24 31 z' />
          </svg>
        </span>
        <h3 className='hidden sm:inline-block text-xs'>برنماج العمل</h3>
      </li>
      <li
        onClick={() => {
          documentsUpload_ref.current &&
            documentsUpload_ref.current.scrollIntoView({ behavior: "smooth" });
          handleStepperButtonClick("btn_5");
        }}
        className='mb-10 ml-4 h-10'>
        <span
          className={`${
            setteperBtn.btn_5 ? "bg-green-200 dark:bg-green-900" : "bg-gray-100 dark:bg-gray-700"
          } absolute flex items-center justify-center w-8 h-8  rounded-full -left-4 ring-4 ring-white dark:ring-gray-900`}>
          <svg
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 48 48'>
            <path d='M12.5 4C10.019 4 8 6.019 8 8.5L8 39.5C8 41.981 10.019 44 12.5 44L35.5 44C37.981 44 40 41.981 40 39.5L40 20L28.5 20C26.019 20 24 17.981 24 15.5L24 4L12.5 4 z M 27 4.8789062L27 15.5C27 16.327 27.673 17 28.5 17L39.121094 17L27 4.8789062 z M 24 22C24.38375 22 24.767547 22.146453 25.060547 22.439453L29.060547 26.439453C29.646547 27.024453 29.646547 27.975547 29.060547 28.560547C28.768547 28.854547 28.384 29 28 29C27.616 29 27.232453 28.853547 26.939453 28.560547L25.5 27.121094L25.5 32.5C25.5 33.329 24.829 34 24 34C23.171 34 22.5 33.329 22.5 32.5L22.5 27.121094L21.060547 28.560547C20.474547 29.146547 19.525453 29.146547 18.939453 28.560547C18.353453 27.975547 18.354453 27.025453 18.939453 26.439453L22.939453 22.439453C23.232453 22.146453 23.61625 22 24 22 z M 17.5 36L30.5 36C31.329 36 32 36.671 32 37.5C32 38.329 31.329 39 30.5 39L17.5 39C16.671 39 16 38.329 16 37.5C16 36.671 16.671 36 17.5 36 z' />
          </svg>
        </span>
        <h3 className='hidden sm:inline-block text-xs'>تحميل وثائق</h3>
      </li>
    </ol>
  );
}

export default Stepper