import React from 'react'
import { useStore } from "@context/store";
function Modal() {
    const { modal, isLoading } = useStore();
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
              className={`${
                !modal.onClickBtn_1 && "hidden"
              } btn2 p-1.5 flex  gap-2 justify-center items-center`}>
              {modal.textBtn_1}
              {isLoading && (
                <svg className='w-4 h-4 animate-spin fill-cyan-900' viewBox='0 0 24 24'>
                  <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
                </svg>
              )}
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