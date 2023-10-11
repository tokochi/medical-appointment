"use client"
import { useStore } from "@context/store";
function SidebarToggle() {
  return (
    <button
      className='inline-flex w-8 h-8 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      onClick={()=> useStore.setState({ sidebarOpen: !useStore.getState().sidebarOpen })}>
      <svg
        className='h-8 w-8 fill-gray-600 dark:fill-gray-400'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'>
        <path d='M3 5 A 1.0001 1.0001 0 1 0 3 7L21 7 A 1.0001 1.0001 0 1 0 21 5L3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13L21 13 A 1.0001 1.0001 0 1 0 21 11L3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19L21 19 A 1.0001 1.0001 0 1 0 21 17L3 17 z' />
      </svg>
    </button>
  );
}

export default SidebarToggle