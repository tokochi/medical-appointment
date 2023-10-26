"use client";
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";
import SlicerServices from "@components/utils/SlicerServices";
import TakeAppointment from "@components/buttons/TakeAppointment";
import NothingFound from "./NothingFound";

function Doctors({ data }) {
  const { handleFilterInfo } = useStore();
  const doctorsList = JSON.parse(data);
  const doctors = handleFilterInfo(doctorsList);

  return (
    <div className='flex flex-col gap-4'>
      {doctors.length === 0 && <NothingFound />}
      {doctors.map((item, index) => (
        <div key={index} className=' p-2 card rounded-md'>
          <div
            id='header'
            className='p-2 flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div
              className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
              href='/doctors/profile'>
              <Link
                className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
                id={item?._id}
                href={`/doctors/profile/${item?._id}`}>
                <div id={item?._id}>
                  <Image
                    className='rounded-xl w-auto h-auto min-w-[70px]'
                    src={item?.avatar?.[0]}
                    width={80}
                    height={80}
                    alt='avatar'
                  />
                </div>
                <div id='title' className='flex flex-col'>
                  <h1 className='font-bold text-clamp-xl text-sky-500  '>
                    {item?.title?.text + " "}
                    {item?.name}
                  </h1>
                  <h2 className='font-semibold'>{item?.speciality?.text}</h2>
                  <div className='border-b-[1px] border-gray-400 dark:border-gray-100 w-[80%] m-1' />
                  {item?.otherServices?.isFullTimeOpen && (
                    <h2 className='flex items-start gap-2 pt-1 text-cyan-400 text-sm'>
                      <Image
                        className='mr-[1px] w-auto h-auto'
                        src='/images/schedule.webp'
                        width={18}
                        height={15}
                        alt='location'
                      />
                      عيادة مفتوحة 24/7
                    </h2>
                  )}
                  {item?.otherServices?.insurance && (
                    <h2 className='flex items-start gap-2 pt-1 text-green-500 text-sm'>
                      <Image
                        className='w-auto h-auto'
                        src='/images/card_security.webp'
                        width={18}
                        height={15}
                        alt='location'
                      />
                      يقبل بطاقة تأمين
                    </h2>
                  )}
                  {item?.otherServices?.homeVisits && (
                    <h2 className='flex items-start gap-2 pt-1 text-yellow-500 text-sm'>
                      <Image
                        className='w-auto h-auto'
                        src='/images/home-book.webp'
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
                      src='/images/location-png.webp'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    {item?.address?.wilaya?.text && item?.address?.wilaya?.text + "، "}
                    {item?.address?.daira?.text && item?.address?.daira?.text + "، "}
                    {item?.address?.commune?.text &&
                      item?.address?.commune?.text !== item?.address?.daira?.text &&
                      item?.address?.commune?.text + "، "}
                    {item?.address?.street && item?.address?.street}
                  </h2>
                </div>
              </Link>
            </div>
            <div className='mb-1 flex flex-col gap-2 grow shrink'>
              <TakeAppointment data={JSON.stringify(item)} />
              <Link href={`/doctors/profile/${item?._id}`} className=''>
                <button
                  id='call-btn'
                  className='w-full btn px-4 py-2 flex gap-2 items-enter justify-center'>
                  <svg className='w-5 h-5 fill-gray-900' viewBox='0 0 24 24'>
                    <path d='M5 3C3.897 3 3 3.897 3 5L3 19C3 20.103 3.897 21 5 21L19 21C20.103 21 21 20.103 21 19L21 5C21 3.897 20.103 3 19 3L5 3 z M 12 8C16 8 18 12 18 12C18 12 16 16 12 16C8 16 6 12 6 12C6 12 8 8 12 8 z M 12 10 A 2 2 0 0 0 10 12 A 2 2 0 0 0 12 14 A 2 2 0 0 0 14 12 A 2 2 0 0 0 12 10 z' />
                  </svg>
                  <p className='font-semibold text-sm'>عرض الملف</p>
                </button>
              </Link>
            </div>
          </div>
          <div id='body' className='p-2'>
            <div className='flex flex-wrap gap-2'>
              {item?.officePics?.slice(0, 6).map((image, index) => (
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
              <SlicerServices data={JSON.stringify(item)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Doctors;
