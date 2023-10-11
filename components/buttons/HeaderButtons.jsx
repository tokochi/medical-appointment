"use client";
import { useStore } from "@context/store";
import Notification from "@components/dropdown/Notification";
import Inbox from "@components/dropdown/Inbox";
import Image from "next/image";
import Account from "@components/dropdown/Account";


function HeaderButtons() {
const { session, closeModelAnywhere } = useStore();
  return (
    <div
      onClick={(e) => closeModelAnywhere(e)}
      className=' mr-auto flex items-start justify-center gap-2'>
      <button
        name='account'
        onClick={(e) => {
          useStore.setState((state) => ({
            account: { isOpen: !state.account.isOpen },
          }));
        }}
        className='flex justify-center  items-center gap-1 rounded-xl card p-1'>
        <p className='hidden md:flex pointer-events-none'>
          مرحبا بك، <span className='font-roboto mx-1'>{session?.name}</span>
        </p>
        {session?.avatar?.[0] ? (
          <Image
            name='acount'
            className='rounded-xl pointer-events-none '
            src={session?.avatar?.[0]}
            width={27}
            height={27}
            alt='avatar'
          />
        ) : (
          <svg
            className='h-6 w-6 fill-gray-600 pointer-events-none  dark:fill-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <path d='M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M12,4.75 c1.795,0,3.25,1.455,3.25,3.25s-1.455,3.25-3.25,3.25S8.75,9.795,8.75,8S10.205,4.75,12,4.75z M12,20 c-2.438,0-4.621-1.091-6.088-2.812c-0.381-0.447-0.296-1.118,0.173-1.471C7.602,14.576,10.366,14,12,14s4.398,0.576,5.916,1.717 c0.469,0.353,0.554,1.025,0.173,1.471C16.621,18.909,14.438,20,12,20z' />
          </svg>
        )}
        <Account />
      </button>
      <button
        name='inbox'
        onClick={(e) => {
          useStore.setState((state) => ({
            inbox: { isOpen: !state.inbox.isOpen },
          }));
        }}
        className='rounded-xl  card p-1'>
        <svg
          className='h-6 w-6 fill-gray-600 pointer-events-none  dark:fill-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'>
          <path d='M4 4C2.976 4 2.1404375 4.772625 2.0234375 5.765625L12 12L21.976562 5.765625C21.859563 4.772625 21.024 4 20 4L4 4 z M 2 7.7519531L2 18C2 19.105 2.895 20 4 20L20 20C21.105 20 22 19.105 22 18L22 7.7519531L12.529297 13.669922C12.205297 13.871922 11.794703 13.871922 11.470703 13.669922L2 7.7519531 z' />
        </svg>
        <Inbox />
      </button>
      <button
        name='notification'
        onClick={(e) => {
          useStore.setState((state) => ({
            notification: { isOpen: !state.notification.isOpen },
          }));
        }}
        className='relative rounded-xl card p-1 z-10'>
        {session?.notificationsList?.length > 0 && (
          <div className='absolute top-0 right-[-3px] bg-red-600 animate-pulse rounded-full w-3 h-3'></div>
        )}
        <svg
          name='notification'
          className='h-6 w-6 fill-gray-600 pointer-events-none  dark:fill-gray-400'
          viewBox='0 0 24 24'>
          <path d='M12 2C11.172 2 10.5 2.672 10.5 3.5L10.5 4.1953125C7.9131836 4.862095 6 7.2048001 6 10L6 16L4.4648438 17.15625L4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19L12 19L19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625L18 16L18 10C18 7.2048001 16.086816 4.862095 13.5 4.1953125L13.5 3.5C13.5 2.672 12.828 2 12 2 z M 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20L10 20 z' />
        </svg>
        <Notification />
      </button>
    </div>
  );
}

export default HeaderButtons;
