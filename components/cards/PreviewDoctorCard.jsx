import React from 'react'
import { useStore } from "@context/store";
import Image from "next/image";
import Link from 'next/link';
function PreviewDoctorCard() {
const { doctorInfo  } = useStore();
  return (
      <div
        id='show-card'
        className='hidden lg:flex px-2  sticky top-0 grow shrink  basis-[35%] min-w-[450px]'>
        <div className='w-full'>
          <h1 className='font-bold text-2xl mx-2 p-2'>استعراض بطاقتك الرقمية</h1>
          <div className='card rounded-md w-full px-2'>
            <div id='header' className='p-2 flex flex-wrap '>
              <div className='mb-1 flex gap-4'>
                <div id='avatar' className='flex flex-col gap-2'>
                  <Image
                    className='rounded-xl w-auto h-auto'
                    src={
                      doctorInfo?.gender.value === "male"
                        ? doctorInfo?.avatar[0]
                        : doctorInfo?.avatar[1] || doctorInfo?.avatar[0]
                    }
                    width={50}
                    height={50}
                    alt='avatar'
                  />
                </div>
                <div id='title' className='flex flex-col gap-1'>
                  <h1 className='font-bold text-[18px] text-sky-500'>
                    {doctorInfo?.title.text + " "}
                    {doctorInfo?.name}
                  </h1>
                  <h2 className='font-semibold '>{doctorInfo?.speciality.text}</h2>
                  <div className='border-b-[1px] border-gray-400 w-full'></div>
                  {doctorInfo?.otherServices.isFullTimeOpen && (
                    <h2 className='flex items-start gap-2 py-1 text-cyan-400 text-sm'>
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
                  {doctorInfo?.otherServices.insurance && (
                    <h2 className='flex items-start gap-2 text-green-500 text-sm'>
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
                  {doctorInfo?.otherServices.homeVisits && (
                    <h2 className='flex items-start gap-2 text-yellow-500 text-sm'>
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
                  <h2 className='flex items-start gap-2 text-blue-300  text-sm'>
                    <Image src='/images/location-png.png' width={18} height={15} alt='location' />
                    {doctorInfo?.address.wilaya.text + "، "}
                    {doctorInfo?.address.daira.text + "، "}
                    {doctorInfo?.address.commune.text &&
                      doctorInfo?.address.commune.text !== doctorInfo?.address.daira.text &&
                      doctorInfo?.address.commune.text + "، "}
                    {doctorInfo?.address.street}
                  </h2>
                </div>
              </div>
              <div className='mb-1 flex flex-col  gap-2 grow shrink'>
                <div className='flex gap-8 justify-center items-center m-auto'>
                  {doctorInfo?.facebook && (
                    <Link href='https://www.facebook.com/doctorInfo?.facebook'>
                      <Image
                        className='w-auto h-auto'
                        src='/images/facebook-color.png'
                        width={25}
                        height={25}
                        alt='logo'
                      />
                    </Link>
                  )}
                  {doctorInfo?.instagram && (
                    <Link href={`https://www.instagram.com/${doctorInfo?.instagram}`}>
                      <Image
                        className='w-auto h-auto'
                        src='/images/Insta-color.png'
                        width={25}
                        height={25}
                        alt='logo'
                      />
                    </Link>
                  )}
                  {doctorInfo?.whatsapp && (
                    <Link href={`https://wa.me/${doctorInfo?.whatsapp}`}>
                      <Image
                        className='w-auto h-auto'
                        src='/images/whatsapp-color.png'
                        width={25}
                        height={25}
                        alt='logo'
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className='border-b-[1px] border-gray-600 my-2'></div>
            <div id='specialities' className=''>
              <h1 className='font-bold text-[18px] text-sky-500'>التخصصات</h1>
              <div className='flex flex-wrap gap-2 p-2'>
                {doctorInfo?.specialities.map((specialitie, index) => (
                  <button
                    key={index}
                    className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                    <p>{specialitie.text}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className='border-b-[1px] border-gray-600 my-2'></div>
            <div id='specialities' className=''>
              <h1 className='font-bold text-[18px] text-sky-500'>الخدمات الطبية</h1>
              <div className='flex flex-wrap gap-2 p-2'>
                {doctorInfo?.services.map((service, index) => (
                  <button
                    key={index}
                    className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                    <p>{service.text}</p>
                  </button>
                ))}
              </div>
              <h1 className='font-bold mt-8 text-sky-500'>طرق الدفع</h1>
              <div className='flex flex-wrap gap-8 p-2'>
                {doctorInfo?.payment.cash && (
                  <h2 className='flex gap-2 text-yellow-500 text-sm'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/cash.png'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    نقدا
                  </h2>
                )}
                {doctorInfo?.payment.check && (
                  <h2 className='flex gap-2 text-yellow-500 text-sm'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/check.png'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    الشيك
                  </h2>
                )}
                {doctorInfo?.payment.card && (
                  <h2 className='flex gap-2 text-yellow-500 text-sm'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/card-payment.png'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    بطاقة الصرف
                  </h2>
                )}
              </div>
            </div>
            <div className='border-b-[1px] border-gray-600 my-2'></div>
            <div id='specialities' className=''>
              <h1 className='font-bold text-[18px] text-sky-500'>صور العيادة</h1>
              <div className='flex flex-wrap  gap-2 p-2'>
                {doctorInfo?.officePics.map((image, index) => (
                  <Link key={index} className='  flex gap-2' href={image}>
                    <div key={index} className='relative w-64 h-64'>
                      <Image className='w-auto h-auto' src={image} fill alt='avatar' />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PreviewDoctorCard