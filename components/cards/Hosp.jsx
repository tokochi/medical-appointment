"use client";
import { useEffect, useState, useMemo } from "react";
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";

function Hosp() {
  const { fetchDoctors, doctors } = useStore();
  const [slicer, setSlicer] = useState(null);
  useEffect(() => {
    fetchDoctors();
  }, []);
  return (
    <div className='flex flex-col gap-4'>
      {doctors.map((item, index) => (
        <div key={item._id} className=' p-2 card rounded-md'>
          <div
            id='header'
            className='p-2 flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div
              className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
              href='/doctors/profile'>
              <Link
                className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
                id={item._id}
                // onClick={(e) => useStore.setState({ selectedDoctor: item })}
                href={`/doctors/profile/${item._id}`}>
                <div id={item._id}>
                  <Image
                    className='rounded-xl w-auto h-auto'
                    src={item.avatar?.[0]}
                    width={80}
                    height={80}
                    alt='avatar'
                  />
                </div>
                <div id='title' className='flex flex-col'>
                  <h1 className='font-bold text-clamp-xl text-sky-500  '>
                    {item.title.text + " "}
                    {item.name}
                  </h1>
                  <h2 className='font-semibold'>{item.speciality.text}</h2>
                  <div className='border-b-[1px] border-gray-400 dark:border-gray-100 w-full m-1' />
                  {item.otherServices.isFullTimeOpen && (
                    <h2 className='flex items-start gap-2 pt-1 text-cyan-400 text-sm'>
                      <Image
                        className='mr-[1px] w-auto h-auto'
                        src='/images/schedule.png'
                        width={18}
                        height={15}
                        alt='location'
                      />
                      عيادة مفتوحة 24/7
                    </h2>
                  )}
                  {item.otherServices.insurance && (
                    <h2 className='flex items-start gap-2 pt-1 text-green-500 text-sm'>
                      <Image
                        className='w-auto h-auto'
                        src='/images/card_security.png'
                        width={18}
                        height={15}
                        alt='location'
                      />
                      يقبل بطاقة تأمين
                    </h2>
                  )}
                  {item.otherServices.homeVisits && (
                    <h2 className='flex items-start gap-2 pt-1 text-yellow-500 text-sm'>
                      <Image
                        className='w-auto h-auto'
                        src='/images/home-book.png'
                        width={18}
                        height={15}
                        alt='location'
                      />
                      زيارة مزلية
                    </h2>
                  )}
                  <h2 className='flex gap-2 items-start text-blue-600  text-sm'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/location-png.png'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    {item.address.wilaya.text + "، "}
                    {item.address.daira.text + "، "}
                    {item.address.commune.text &&
                      item.address.commune.text !== item.address.daira.text &&
                      item.address.commune.text + "، "}
                    {item.address.street}
                  </h2>
                </div>
              </Link>
            </div>
            <div className='mb-1 flex flex-col gap-2 grow shrink'>
              <Link
                // onClick={useStore.setState({ selectedDoctor: item })}
                href={`/doctors/profile/${item._id}`}
                className=''>
                <button
                  id='call-btn'
                  className='w-full btn2 px-4 py-2 flex gap-2 items-enter justify-center'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/today.png'
                    width={20}
                    height={10}
                    alt='avatar'
                  />
                  <p className='font-semibold text-sm mx-1'>إحجز موعد</p>
                </button>
              </Link>
              {/* <Link
                   onClick={() => console.log("🚀 ~display model")}
                   // href='/doctors/profile'
                   className=''>
                   <button
                     id='call-btn'
                     className='w-full btn3 px-4 py-2 flex gap-2 items-enter justify-center'>
                     <Image
                       className='w-auto h-auto'
                       src='/images/phone.png'
                       width={20}
                       height={10}
                       alt='avatar'
                     />
                     <p className='font-semibold text-sm'>عرض الهاتف</p>
                   </button>
                 </Link> */}
              <Link
                // onClick={useStore.setState({ selectedDoctor: item })}
                href={`/doctors/profile/${item._id}`}
                className=''>
                <button
                  id='call-btn'
                  className='w-full btn px-4 py-2 flex gap-2 items-enter justify-center'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/view.png'
                    width={20}
                    height={10}
                    alt='avatar'
                  />
                  <p className='font-semibold text-sm'>عرض الملف</p>
                </button>
              </Link>
            </div>
          </div>
          <div id='body' className='p-2'>
            <div className='flex flex-wrap gap-2'>
              {item.officePics.slice(0, 6).map((image, index) => (
                <Link key={index} className=' flex gap-2' href={image}>
                  <Image
                    className='w-auto h-auto'
                    src={image}
                    width={40}
                    height={40}
                    alt='avatar'
                  />
                </Link>
              ))}
              <div id='works' className='flex flex-wrap gap-2'>
                {item.services
                  .slice(0, item._id == slicer ? item.services.length : 5)
                  .map((service, index) => (
                    <Link key={index} href='#'>
                      <button
                        key={index}
                        className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                        <p>{service.text}</p>
                      </button>
                    </Link>
                  ))}
                {item.services.length > 5 && item._id != slicer && (
                  <button
                    className='text-sm text-sky-600 text-left p-2'
                    id={item._id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSlicer(e.target.getAttribute("id"));
                    }}>
                    عرض المزيد ⋙
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hosp;
