"use client";
import { useStore } from "@context/store";
import Link from "next/link";
function SectionWorks() {
  const sectionWork = useStore((state) => state.sectionWork);
  function handleActiveTab(e) {
    const clickedId = e.target.getAttribute("id");
    const updatedTab = sectionWork.map((tab) =>
      tab.id == clickedId ? { ...tab, active: !tab.active } : { ...tab, active: false }
    );
    useStore.setState({ sectionWork: updatedTab });
  }
  return (
    <div className='bg-sky-50 dark:bg-transparent'>
      <div className='py-5'>
        <h1 className='font-bold text-clamp-2xl py-4 text-center'>إستشارات طبية</h1>
        <div className='flex gap-4 justify-center items-center'>
          <button className='btn2 px-4 py-2 whitespace-nowrap flex  gap-1'>
            <svg className='h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'>
              <path
                d='M13 0C5.925781 0 0 5.078125 0 11.5C0 14.53125 1.359375 17.25 3.5 19.28125C3.3125 19.777344 2.980469 20.457031 2.40625 21.15625C1.71875 21.996094 0.917969 22.769531 0.375 23.21875C0.0429688 23.484375 -0.0859375 23.929688 0.0546875 24.332031C0.195313 24.730469 0.574219 25 1 25C3.214844 25 4.808594 24.976563 6.25 24.59375C7.539063 24.253906 8.648438 23.535156 9.78125 22.53125C10.8125 22.777344 11.875 23 13 23C20.074219 23 26 17.921875 26 11.5C26 5.078125 20.074219 0 13 0 Z M 13 2C19.125 2 24 6.320313 24 11.5C24 16.679688 19.125 21 13 21C11.910156 21 10.78125 20.8125 9.75 20.53125C9.414063 20.445313 9.0625 20.542969 8.8125 20.78125C7.6875 21.859375 6.859375 22.363281 5.75 22.65625C5.238281 22.792969 4.257813 22.757813 3.5625 22.8125C3.703125 22.65625 3.832031 22.570313 3.96875 22.40625C4.753906 21.445313 5.472656 20.429688 5.6875 19.28125C5.75 18.929688 5.617188 18.574219 5.34375 18.34375C3.25 16.613281 2 14.1875 2 11.5C2 6.320313 6.875 2 13 2 Z M 11.09375 5.90625C10.917969 5.945313 10.753906 6.03125 10.625 6.15625L9.125 7.5625L10.46875 9.03125L11.65625 7.90625L14.0625 7.90625L15 8.96875L15 10.4375L12.4375 12.15625C12.160156 12.347656 11.996094 12.664063 12 13L12 15L14 15L14 13.5625L16.5625 11.84375C16.839844 11.652344 17.003906 11.335938 17 11L17 8.59375C17 8.351563 16.910156 8.117188 16.75 7.9375L15.25 6.25C15.0625 6.03125 14.789063 5.90625 14.5 5.90625L11.3125 5.90625C11.238281 5.898438 11.167969 5.898438 11.09375 5.90625 Z M 12 16L12 18L14 18L14 16Z'
                fill='#2F2F2F'
              />
            </svg>
            اسأل طبيب
          </button>
          <button className='btn px-4 py-2 whitespace-nowrap'>ابحث عن اجابة</button>
        </div>
      </div>
      <div className='p-4 flex flex-wrap gap-4  items-start'>
        {sectionWork.map((work) => (
          <div
            key={work.id}
            id={work.id}
            className='grow shrink  basis-[17%] min-w-[280px]  p-2 text-lg font-semibold rounded-md border-[1px] border-gray-400 bg-white dark:border-gray-700 dark:bg-inputDark'>
            <button
              onClick={(e) => handleActiveTab(e)}
              id={work.id}
              className='w-full  flex px-2 justify-between items-center '>
              {work.title}
              <svg
                id={work.id}
                className='h-10 w-10 fill-blue-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path
                  d='M7.4296875 9.5L5.9296875 11L12 17.070312L18.070312 11L16.570312 9.5L12 14.070312L7.4296875 9.5 z'
                  // fill='#2F2F2F'
                />
              </svg>
            </button>

            <div className={`overflow-hidden ${!work.active ? "max-h-0" : "h-full"}`}>
              <div className='m-2 mx-auto border-[1px] border-gray-600'></div>
              {work.articles.map((article) => (
                <div key={article.id} className='flex flex-col  gap-2'>
                  <div className='p-2'>
                    <Link href={article.link}>
                      <h2 className='text-base text-sky-600'>{article.title}</h2>
                    </Link>
                    <p className='text-xs'>{article.desc}</p>
                  </div>
                </div>
              ))}
              <div className='text-sm text-sky-600 text-left w-full p-2'>
                <Link href='#'>
                  <button>عرض المزيد ⋙</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWorks;
