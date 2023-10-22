"use client";
import { useStore } from "@context/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
function ShowAppointDetails({ children, data }) {
  const appoint = JSON.parse(data);
  const [currentUser, setCurrentUser] = useState(null);
  const { fetchUser } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUser(appoint?._doc?.user?.id); // Call the fetchUser function
        setCurrentUser(user); // Update currentUser with the fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  function AppointDetails() {
    return (
      <div className='p-2 flex flex-col gap-2'>
        <div className='flex card flex-wrap gap-2 justify-start p-2 border-b-[1px] border-gray-300 dark:border-gray-700 bg-white rounded-xl shadow  dark:bg-slate-800'>
          <div className=''>
            <Image
              className='rounded-xl w-auto h-auto'
              src={currentUser?.avatar?.[0]}
              width={40}
              height={40}
              alt='avatar'
            />
          </div>
          <div id='title' className='flex flex-col'>
            <h1 className='font-bold text-sky-500'>{currentUser?.name}</h1>
            <h2 className='font-semibold text-sm'>{currentUser?.email}</h2>
          </div>
          <div className='md:mx-auto'>
            <p>موعدك على:</p>
            <p className='mx-auto text-sky-500 font-semibold'>
              {moment(appoint?._doc.date).format("LL") + " 🕒 " + appoint?._doc.time}
            </p>
          </div>
        </div>
        <h1 className='font-bold text-sky-500'>الملف الطبي</h1>
        <div className='border-b-[1px] border-gray-600'></div>
        <div>
          <div className='flex flex-wrap gap-4'>
            <div id='age-weight-height' className='flex flex-wrap gap-2'>
              <div className='flex btn4 gap-1'>
                <p>السًّن:</p>
                <p>{currentUser?.healthInfo?.age}</p>
                <p>سنة</p>
              </div>
              <div className='flex btn4 gap-1'>
                <p>الوزن:</p>
                <p>{currentUser?.healthInfo?.weight}</p>
                <p>كغ</p>
              </div>
              <div className='flex btn4 gap-1 '>
                <p>الطول:</p>
                <p>{currentUser?.healthInfo?.height}</p>
                <p>سم</p>
              </div>
              <div className='btn4 grow '>
                <p>{currentUser?.healthInfo?.bloodType?.text}</p>
              </div>
            </div>
            <div className=''>
              <div id='questions' className='flex flex-col '>
                <div className='flex flex-wrap gap-4 justify-between'>
                  <p className=''>هل تعاني من أمراض جلدية مثل الصدفية أو الأكزيما؟</p>
                  <p>{currentUser?.healthInfo?.bloodType?.questions?.skinDisease ? "✅" : "❌"}</p>
                </div>
                <div className='flex flex-wrap gap-4 justify-between'>
                  <p className=''>هل تدخن أو تتعاطى أي مواد مخدرة؟</p>
                  <p>{currentUser?.healthInfo?.bloodType?.questions?.smoking ? "✅" : "❌"}</p>
                </div>
                <div className='flex flex-wrap gap-4 justify-between'>
                  <p className=''>هل تعاني من مشكلة تساقط الشعر؟</p>
                  <p>{currentUser?.healthInfo?.bloodType?.questions?.hairLose ? "✅" : "❌"}</p>
                </div>
                <div className='flex flex-wrap gap-4 justify-between'>
                  <p className=''>هل تعاني من آلام في المفاصل أو العضلات؟</p>
                  <p>
                    {currentUser?.healthInfo?.bloodType?.questions?.ArticulationIssue ? "✅" : "❌"}
                  </p>
                </div>
              </div>
              <div className='p-2 flex flex-col gap-2 justify-center'>
                <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                  الامراض المزمنة
                </div>
                <div id='chrono-disease' className='flex flex-wrap gap-2 '>
                  {currentUser?.healthInfo?.chrnoDiseases?.map((item, index) => (
                    <div key={index} className='text-sm btn4'>
                      <p>{item?.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                حساسية:
              </div>
              <div id='alergies' className='flex flex-wrap gap-2 p-2'>
                {currentUser?.healthInfo?.alergies?.map((item, index) => (
                  <div key={index} className='text-sm btn4'>
                    <p>{item?.text}</p>
                  </div>
                ))}
              </div>
              <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                الأمراض العائلية المتوارثة:
              </div>
              <div id='inheritDiseases' className='flex flex-wrap gap-2 p-2'>
                {currentUser?.healthInfo?.inheritDiseases?.map((item, index) => (
                  <div key={index} className='text-sm btn4'>
                    <p>{item?.text}</p>
                  </div>
                ))}
              </div>
              <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                تلقيحــات:
              </div>
              <div id='inheritDiseases' className='flex flex-wrap gap-2 p-2'>
                {currentUser?.healthInfo?.vaccinations?.map((item, index) => (
                  <div key={index} className='text-sm btn4'>
                    <p>
                      {item?.text + " - " + moment(item?.time).format("LL") + " - " + item?.hosp}
                    </p>
                  </div>
                ))}
              </div>
              <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                عمليات جراحية:
              </div>
              <div id='inheritDiseases' className='flex flex-wrap gap-2 p-2'>
                {currentUser?.healthInfo?.surgeries?.map((item, index) => (
                  <div key={index} className='btn4 text-sm'>
                    <p>
                      {item?.text + " - " + moment(item?.time).format("LL") + " - " + item?.hosp}
                    </p>
                  </div>
                ))}
              </div>
              <div className='font-semibold text-sky-500 p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
                آخر الفحوصات و تحاليل طبية:
              </div>
              <div id='inheritDiseases'>
                {currentUser?.healthInfo?.examinations?.map((exam, index) => (
                  <div key={index} className=' '>
                    {exam?.includes(".pdf") ? (
                      <Link href={exam}>
                        <svg className='h-[70px] w-[70px]' viewBox='0 0 48 48'>
                          <path fill='#FF5722' d='M40 45L8 45 8 3 30 3 40 13z' />
                          <path fill='#FBE9E7' d='M38.5 14L29 14 29 4.5z' />
                          <path
                            fill='#FFEBEE'
                            d='M15.81 29.5V33H13.8v-9.953h3.391c.984 0 1.77.306 2.355.916s.878 1.403.878 2.379-.29 1.745-.868 2.311S18.175 29.5 17.149 29.5H15.81zM15.81 27.825h1.381c.383 0 .679-.125.889-.376s.314-.615.314-1.094c0-.497-.107-.892-.321-1.187-.214-.293-.501-.442-.861-.447H15.81V27.825zM21.764 33v-9.953h2.632c1.162 0 2.089.369 2.778 1.107.691.738 1.043 1.75 1.057 3.035v1.613c0 1.308-.346 2.335-1.035 3.079C26.504 32.628 25.553 33 24.341 33H21.764zM23.773 24.722v6.61h.602c.67 0 1.142-.177 1.415-.53.273-.353.417-.962.431-1.828v-1.729c0-.93-.13-1.578-.39-1.944-.26-.367-.702-.56-1.326-.578H23.773zM34.807 28.939h-3.124V33h-2.01v-9.953h5.51v1.675h-3.5v2.55h3.124V28.939z'
                          />
                        </svg>
                      </Link>
                    ) : (
                      <Link href={exam}>
                        <Image
                          className='rounded-xl w-auto h-auto'
                          src={exam}
                          width={50}
                          height={50}
                          alt='avatar'
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        useStore.setState((state) => ({
          modal: {
            isOpen: true,
            title: "موعد طبي مع:",
            content: <AppointDetails />,
          },
        }));
      }}>
      {children}
    </button>
  );
}

export default ShowAppointDetails;
