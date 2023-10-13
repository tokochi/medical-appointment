import React from 'react'
import { useStore } from "@context/store";
function Modal() {
    const { modal } = useStore();
    
  return (
    <div
      name='modal'
      className={`fixed inset-0 flex ${
        !modal.isOpen && "hidden"
      } items-center justify-center z-[500] w-full `}>
      <div
        className='relative w-full max-w-screen-sm h-full overflow-hidden'
        style={{ maxHeight: "80vh" }}>
        <div className='relative bg-white rounded-lg shadow  dark:bg-slate-800'>
          <div className='sticky top-0 z-[9900] bg-inherit flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600'>
            <h3 className=' text-xl font-semibold text-gray-900 dark:text-white'>{modal.title}</h3>
            <button
              type='button'
              onClick={() => useStore.setState((state) => ({ modal: state.modalClosed }))}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 mr-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='defaultModal'>
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              maxHeight: "calc(80vh - 5rem)", // Adjust the max height as needed
              overflowY: "auto",
            }}
            className={`px-2 ${modal.content && "p-2"}`}>
            {modal.content}
            {modal.children}
          </div>
          <div
            className={`flex items-center sticky bottom-0 z-[9900] bg-inherit  gap-4 p-2 space-x-2 ${
              modal.onClickBtn_1 && "border-t "
            }  border-gray-200 rounded-b dark:border-gray-600`}>
            <button
              onClick={modal.onClickBtn_1}
              type='button'
              className={`${!modal.onClickBtn_1 && "hidden"} btn2 p-1.5`}>
              {modal.textBtn_1}
            </button>
            <button
              onClick={modal.onClickBtn_2}
              type='button'
              className={`${!modal.onClickBtn_2 && "hidden"} btn p-1.5`}>
              {modal.textBtn_2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal