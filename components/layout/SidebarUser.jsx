"use client";
import Link from "next/link";
import { useStore } from "@context/store";
import { useRouter, usePathname } from "next/navigation";
function SidebarUser() {
  const router = useRouter();
  const path = usePathname();
  const { setDropDowns } = useStore();
  return (
    <div
      className={` min-w-[50px] m-1 md:m-2 rounded-xl bg-gray-100 shrink-0 overflow-x-hidden shadow-xl dark:bg-[#002130] transition-w duration-300`}>
      <div className='flex flex-col gap-4 p-2 list-none dark:text-gray-100'>
        <li className={`mt-4 ${path === "/user" && "dark:bg-primary bg-cyan-500 "} rounded p-2`}>
          <Link
            onClick={() => { router.refresh();  setDropDowns("close");}}
            href='/user'
            className={`flex gap-2 font-semibold `}>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'>
              <path d='M20.5 3C18.203405 3 16.305701 4.7666235 16.050781 7L12.5 7C10.015 7 8 9.015 8 11.5L8 38.5C8 40.985 10.015 43 12.5 43L35.5 43C37.985 43 40 40.985 40 38.5L40 11.5C40 9.015 37.985 7 35.5 7L31.949219 7C31.694299 4.7666235 29.796595 3 27.5 3L20.5 3 z M 20.5 6L27.5 6C28.346499 6 29 6.6535009 29 7.5C29 8.3464991 28.346499 9 27.5 9L20.5 9C19.653501 9 19 8.3464991 19 7.5C19 6.6535009 19.653501 6 20.5 6 z M 24 17C26.209 17 28 18.791 28 21C28 23.209 26.209 25 24 25C21.791 25 20 23.209 20 21C20 18.791 21.791 17 24 17 z M 17.8125 28L30.189453 28C31.187453 28 32 28.8125 32 29.8125L32 30.230469C32 32.153469 29.457 35 24 35C18.543 35 16 32.153469 16 30.230469L16 29.8125C16 28.8125 16.8125 28 17.8125 28 z' />
            </svg>
            <p className={`hidden md:inline-block `}>معلوماتي</p>
          </Link>
        </li>
        <li className={`${path === "/user/health" && "dark:bg-primary bg-cyan-500"} rounded p-2`}>
          <Link
            onClick={() => { router.refresh();  setDropDowns("close");}}
            href='/user/health'
            className='flex gap-2 font-semibold'>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'>
              <path d='M8.5 8C6.019 8 4 10.019 4 12.5L4 35.5C4 35.917 4.0746406 36.312312 4.1816406 36.695312C4.2226406 36.543312 4.2643125 36.391188 4.3203125 36.242188L5.5390625 33L6.6152344 30.132812L9.3359375 22.890625C10.209938 20.562625 12.467125 19 14.953125 19L42 19L42 17.5C42 15.019 39.981 13 37.5 13L24.042969 13L19.572266 9.2734375C18.586266 8.4514375 17.335734 8 16.052734 8L8.5 8 z M 14.953125 22C13.703125 22 12.583531 22.775312 12.144531 23.945312L7.1308594 37.296875C6.6388594 38.603875 7.6049531 40 9.0019531 40L38.046875 40C39.296875 40 40.416469 39.224688 40.855469 38.054688L45.865234 24.714844C46.366234 23.405844 45.400047 22 43.998047 22L14.953125 22 z' />
            </svg>
            <p className={`hidden md:inline-block`}>ملفي الطبي</p>
          </Link>
        </li>
        <li
          className={`${
            path === "/user/appointment" && "dark:bg-primary bg-cyan-500"
          } rounded p-2`}>
          <Link
            onClick={() => { router.refresh();  setDropDowns("close");}}
            href='/user/appointment'
            className='flex gap-2 font-semibold'>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'>
              <path d='M10.5 6C7.468 6 5 8.468 5 11.5L5 36C5 39.309 7.691 42 11 42L24.074219 42C23.294219 40.79 22.713141 39.442 22.369141 38L11 38C9.897 38 9 37.103 9 36L9 16L39 16L39 22.605469C40.466 23.079469 41.813 23.809281 43 24.738281L43 11.5C43 8.468 40.532 6 37.5 6L10.5 6 z M 13.5 20 A 1.50015 1.50015 0 1 0 13.5 23L15.5 23 A 1.50015 1.50015 0 1 0 15.5 20L13.5 20 z M 21.5 20C20.672 20 20 20.671 20 21.5C20 22.329 20.672 23 21.5 23L29.998047 23C31.538047 22.357 33.227 22 35 22C35.302 22 35.597531 22.024922 35.894531 22.044922C35.960531 21.875922 36 21.693 36 21.5C36 20.671 35.328 20 34.5 20L21.5 20 z M 35 24C28.925 24 24 28.925 24 35C24 41.075 28.925 46 35 46C41.075 46 46 41.075 46 35C46 28.925 41.075 24 35 24 z M 13.5 26 A 1.50015 1.50015 0 1 0 13.5 29L15.5 29 A 1.50015 1.50015 0 1 0 15.5 26L13.5 26 z M 21.5 26C20.671 26 20 26.671 20 27.5C20 28.329 20.671 29 21.5 29L23.474609 29C24.049609 27.897 24.778813 26.889 25.632812 26L21.5 26 z M 34 28C34.552 28 35 28.448 35 29L35 35L40 35C40.552 35 41 35.448 41 36C41 36.552 40.552 37 40 37L34 37C33.448 37 33 36.552 33 36L33 29C33 28.448 33.448 28 34 28 z M 13.5 32 A 1.50015 1.50015 0 1 0 13.5 35L15.5 35 A 1.50015 1.50015 0 1 0 15.5 32L13.5 32 z M 21.5 32C20.671 32 20 32.671 20 33.5C20 34.329 20.671 35 21.5 35L22 35C22 33.966 22.133328 32.965 22.361328 32L21.5 32 z' />
            </svg>
            <p className={`hidden md:inline-block`}>مواعيد طبية</p>
          </Link>
        </li>
        <li className={`${path === "/user/inbox" && "dark:bg-primary bg-cyan-500"} rounded p-2`}>
          <Link
            onClick={() => { router.refresh();  setDropDowns("close");}}
            href='/user/inbox'
            className='flex gap-2 font-semibold'>
            <svg className='h-6 w-6 fill-gray-600 dark:fill-gray-400' viewBox='0 0 24 24'>
              <path d='M4 4C3.07 4 2.2923125 4.6429063 2.0703125 5.5039062L12 11.726562L21.935547 5.5214844C21.719547 4.6504844 20.937 4 20 4L4 4 z M 2 7.734375L2 18C2 19.103 2.897 20 4 20L20 20C21.103 20 22 19.103 22 18L22 7.7558594L12 14L2 7.734375 z' />
            </svg>
            <p className={`hidden md:inline-block`}>رسـالاتي</p>
          </Link>
        </li>
        <li className={`${path === "/user/mycard" && "dark:bg-primary bg-cyan-500"} rounded p-2`}>
          <Link
            onClick={() => { router.refresh();  setDropDowns("close");}}
            href='/user/mycard'
            className='flex gap-2 font-semibold'>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'>
              <path d='M45,15.5v17c0,3.584-2.916,6.5-6.5,6.5h-29C5.916,39,3,36.084,3,32.5v-17C3,11.916,5.916,9,9.5,9h29 C42.084,9,45,11.916,45,15.5z M17,20v-2c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v2c0,1.105,0.895,2,2,2h4 C16.105,22,17,21.105,17,20z M15,30.5c0-0.828-0.672-1.5-1.5-1.5h-3C9.672,29,9,29.672,9,30.5S9.672,32,10.5,32h3 C14.328,32,15,31.328,15,30.5z M23,30.5c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3 C22.328,32,23,31.328,23,30.5z M31,30.5c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3 C30.328,32,31,31.328,31,30.5z M39,30.5c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h3 C38.328,32,39,31.328,39,30.5z M39,17.5c0-0.828-0.672-1.5-1.5-1.5h-13c-0.828,0-1.5,0.672-1.5,1.5s0.672,1.5,1.5,1.5h13 C38.328,19,39,18.328,39,17.5z' />
            </svg>
            <p className={`hidden md:inline-block`}>بطاقتي</p>
          </Link>
        </li>
        <li
          className={`${
            path === "/user/notification" && "dark:bg-primary bg-cyan-500"
          } rounded p-2`}>
          <Link
            //onClick={() => router.refresh()}
            href='/user/notification'
            className='flex gap-2 font-semibold'>
            <svg className='h-6 w-6 fill-gray-600 dark:fill-gray-400' viewBox='0 0 48 48'>
              <path d='M3.4667969 3.9863281 A 1.50015 1.50015 0 0 0 2.5625 6.671875L7.5625 10.671875 A 1.5007322 1.5007322 0 1 0 9.4375 8.328125L4.4375 4.328125 A 1.50015 1.50015 0 0 0 3.4667969 3.9863281 z M 44.488281 3.9863281 A 1.50015 1.50015 0 0 0 43.5625 4.328125L38.5625 8.328125 A 1.5007322 1.5007322 0 1 0 40.4375 10.671875L45.4375 6.671875 A 1.50015 1.50015 0 0 0 44.488281 3.9863281 z M 24 4C15.729 4 9 10.729 9 19L9 27.185547L6.2382812 33.498047C5.8982812 34.273047 5.9745 35.159188 6.4375 35.867188C6.9005 36.576188 7.6822969 37 8.5292969 37L39.470703 37C40.317703 37 41.0995 36.576188 41.5625 35.867188C42.0265 35.159188 42.101719 34.273047 41.761719 33.498047L39 27.185547L39 19C39 10.729 32.271 4 24 4 z M 1.5 16 A 1.50015 1.50015 0 1 0 1.5 19L5.5 19 A 1.50015 1.50015 0 1 0 5.5 16L1.5 16 z M 42.5 16 A 1.50015 1.50015 0 1 0 42.5 19L46.5 19 A 1.50015 1.50015 0 1 0 46.5 16L42.5 16 z M 18.349609 39C19.175609 41.327 21.393 43 24 43C26.607 43 28.824391 41.327 29.650391 39L18.349609 39 z' />
            </svg>
            <p className={`hidden md:inline-block`}>التنبيهات</p>
          </Link>
        </li>
        <li className={`${path === "/user/security" && "dark:bg-primary bg-cyan-500"} rounded p-2`}>
          <Link
            //onClick={() => router.refresh()}
            href='/user/security'
            className='flex gap-2 font-semibold'>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'>
              <path d='M24.048828 2 A 1.50015 1.50015 0 0 0 22.998047 2.3847656C22.998047 2.3847656 15.490168 9 6.5 9 A 1.50015 1.50015 0 0 0 5 10.5L5 22.759766C5 29.437814 8.0894135 40.426402 23.417969 46.882812 A 1.50015 1.50015 0 0 0 24.582031 46.882812C39.910586 40.426403 43 29.437814 43 22.759766L43 10.5 A 1.50015 1.50015 0 0 0 41.5 9C32.509832 9 25.001953 2.3847656 25.001953 2.3847656 A 1.50015 1.50015 0 0 0 24.048828 2 z M 24 12C27.31 12 30 14.69 30 18L30 20C31.65 20 33 21.35 33 23L33 31C33 32.65 31.65 34 30 34L18 34C16.35 34 15 32.65 15 31L15 23C15 21.35 16.35 20 18 20L18 18C18 14.69 20.69 12 24 12 z M 24 15C22.35 15 21 16.35 21 18L21 20L27 20L27 18C27 16.35 25.65 15 24 15 z M 24 24 A 3 3 0 0 0 24 30 A 3 3 0 0 0 24 24 z' />
            </svg>
            <p className={`hidden md:inline-block`}>حماية</p>
          </Link>
        </li>
        {/* <li className={`${path === "/user/mycard" && "dark:bg-primary bg-cyan-500"} rounded p-2`}>
          <Link onClick={() => signOut()} href='/admin' className='flex gap-2 font-semibold'>
            <svg
              className='h-6 w-6 fill-gray-600 dark:fill-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              <path d='M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M19.707,12.707 l-3.3,3.3C16.212,16.202,15.956,16.3,15.7,16.3s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L16.586,13H9 c-0.553,0-1-0.447-1-1s0.447-1,1-1h7.586l-1.593-1.593c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l3.3,3.3 C20.098,11.684,20.098,12.316,19.707,12.707z' />
            </svg>
            <p className={`hidden md:inline-block`}>الخروج</p>
          </Link>
        </li> */}
      </div>
    </div>
  );
}

export default SidebarUser;
