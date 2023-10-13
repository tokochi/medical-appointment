import { useStore } from "@context/serverStore";
import Link from "next/link";
import Image from "next/image";
import ShowPhoneNum from "@components/buttons/ShowPhoneNum";
import TakeAppointment from "@components/buttons/TakeAppointment";
import SendMessage from "@components/buttons/SendMessage";

async function page({ params }) {
  const { fetchDoctor } = useStore.getState();
  const doctor = await fetchDoctor(params?.id);
  return (
    <div className='p-4 flex flex-wrap gap-4 bg-gray-300 dark:bg-slate-900'>
      <div id='info' className='grow shrink basis-[60%] min-w-[300px]  '>
        <div className=' p-2 card rounded-md'>
          <div id='header' className='p-2 flex flex-wrap justify-center items-start'>
            <Link className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4' href='#'>
              <div id='avatar' className='flex flex-col gap-2'>
                <Image
                  className='rounded-xl w-auto h-auto min-w-[100px]'
                  src={doctor?.avatar?.[0]}
                  width={120}
                  height={120}
                  alt='avatar'
                />
                {/* <div className='flex flex-col items-center gap-2 rounded-xl bg-slate-200 dark:bg-slate-600 p-1'>
                  <Image
                    className='rounded-md p-1 w-auto h-auto'
                    src='/images/qr.webp'
                    width={100}
                    height={100}
                    alt='avatar'
                  />
                  <h2 className='text-sm font-semibold'>تابع نشاطاتي</h2>
                </div> */}
              </div>
              <div id='title' className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl text-sky-500'>
                  {doctor?.title?.text + " "}
                  {doctor?.name}
                </h1>
                <h2 className='font-semibold'>{doctor?.speciality?.text}</h2>
                <div className='border-b-[1px] border-gray-400 m-1 dark:border-gray-100 w-full' />
                {doctor?.otherServices?.isFullTimeOpen && (
                  <h2 className='flex items-start gap-2 py-1 text-cyan-400 text-sm'>
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
                {doctor?.otherServices?.insurance && (
                  <h2 className='flex items-start gap-2 text-green-500 text-sm'>
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
                {doctor?.otherServices?.homeVisits && (
                  <h2 className='flex items-start gap-2 text-yellow-500 text-sm'>
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
                <h2 className='flex gap-2 text-blue-300  text-sm'>
                  <Image src='/images/location-png.webp' width={18} height={15} alt='location' />
                  {doctor?.address?.wilaya?.text + "، "}
                  {doctor?.address?.daira?.text + "، "}
                  {doctor?.address?.commune?.text &&
                    doctor?.address?.commune?.text !== doctor?.address?.daira?.text &&
                    doctor?.address?.commune?.text + "، "}
                  {doctor?.address?.street}
                </h2>
              </div>
            </Link>
            <div className='mb-1 flex flex-col  gap-2 grow shrink'>
              <TakeAppointment data={JSON.stringify(doctor)} />
              <ShowPhoneNum phone={doctor?.phone} />
              <SendMessage data={JSON.stringify(doctor)} />
              <div className='flex gap-8 justify-center items-center m-auto'>
                {doctor?.facebook?.length > 0 && (
                  <Link href={doctor?.facebook}>
                    <Image
                      className='w-auto h-auto'
                      src='/images/facebook-color.webp'
                      width={35}
                      height={35}
                      alt='logo'
                    />
                  </Link>
                )}
                {doctor?.facebook?.instagram > 0 && (
                  <Link href={doctor?.instagram}>
                    <Image
                      className='w-auto h-auto'
                      src='/images/Insta-color.webp'
                      width={35}
                      height={35}
                      alt='logo'
                    />
                  </Link>
                )}
                {doctor?.facebook?.instagram > 0 && (
                  <Link href={doctor?.whatsapp}>
                    <Image
                      className='w-auto h-auto'
                      src='/images/whatsapp-color.webp'
                      width={35}
                      height={35}
                      alt='logo'
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className='border-b-[1px] border-gray-600 my-2'></div>
          <div id='specialties' className=''>
            <h1 className='font-bold text-xl text-sky-500'>التخصصات</h1>
            <div className='flex flex-wrap gap-2 p-2'>
              {doctor?.specialities?.map((specialitie, index) => (
                <button
                  key={index}
                  className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <p>{specialitie?.text}</p>
                </button>
              ))}
            </div>
          </div>
          <div className='border-b-[1px] border-gray-600 my-2'></div>
          <div id='specialties' className=''>
            <h1 className='font-bold text-xl text-sky-500'>الخدمات الطبية</h1>
            <div className='flex flex-wrap gap-2 p-2'>
              {doctor?.services?.map((service, index) => (
                <button
                  key={index}
                  className='p-1 px-2 bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <p>{service?.text}</p>
                </button>
              ))}
            </div>
            <h1 className='font-bold mt-8 text-sky-500'>طرق الدفع</h1>
            <div className='flex flex-wrap gap-8 p-2'>
              {doctor?.payment?.cash && (
                <h2 className='flex gap-2 text-yellow-500 text-sm'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/cash.webp'
                    width={18}
                    height={15}
                    alt='location'
                  />
                  نقدا
                </h2>
              )}
              {doctor?.payment?.check && (
                <h2 className='flex gap-2 text-yellow-500 text-sm'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/check.webp'
                    width={18}
                    height={15}
                    alt='location'
                  />
                  الشيك
                </h2>
              )}
              {doctor?.payment?.card && (
                <h2 className='flex gap-2 text-yellow-500 text-sm'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/card-payment.webp'
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
          <div id='specialties' className=''>
            <h1 className='font-bold text-xl text-sky-500'>صور العيادة</h1>
            <div className='flex flex-wrap  gap-2 p-2'>
              {doctor?.officePics?.map((image, index) => (
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
      <div className='grow shrink basis-[25%] min-w-[400px] flex flex-col gap-2 items-center'>
        <div id='calendar' className='w-full flex flex-col items-center p-4 card rounded-md '>
          <div className='p-2 rounded-xl bg-orange-100'>
            <h2 className='flex justify-center items-start gap-2 text-orange-500 text-sm'>
              <Image
                className='w-auto h-auto'
                src='/images/risk.webp'
                width={18}
                height={18}
                alt='location'
              />
              يستخدم هذا الطبيب نظام الطابور، سيكون عليك انتظار دورك.
            </h2>
          </div>
          <h1 className='font-bold text-xl text-sky-500 my-2 text-center'>برنامج العمل اليومي</h1>
          <table className='w-[400px]'>
            <thead>
              <tr>
                <th className='w-1/4 text-center text-yellow-600 p-2'>اليوم</th>
                <th className='w-1/2 text-center text-yellow-600 p-2'>الإفتتاح</th>
                <th className='w-1/2 text-center text-yellow-600 p-2'>الإغلاق</th>
              </tr>
            </thead>
            <tbody>
              {doctor?.workTime?.map((date, index) => (
                <tr key={index} className='text-center p-2'>
                  <td className='text-center p-2  rounded-md '>{date?.dayAR}</td>
                  <td>🕒{date?.from}</td>
                  <td>🕒{date?.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          id='location-map'
          className='w-full flex flex-col gap-2 items-center p-4 card rounded-md'>
          <h1 className='font-bold text-xl text-sky-500  text-center'>الموقع الجغرافي</h1>
          <h2 className='flex gap-2 text-blue-400 text-sm'>
            <Image
              className='w-auto h-auto'
              src='/images/location-png.webp'
              width={18}
              height={15}
              alt='location'
            />
            {doctor?.otherServices?.text + "، "}
            {doctor?.address?.daira?.text + "، "}
            {doctor?.address?.commune?.text &&
              doctor?.address?.commune?.text !== doctor?.address?.daira?.text &&
              doctor?.address?.commune?.text + "، "}
            {doctor?.address?.street}
          </h2>
          <iframe
            className='w-full rounded-md'
            src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d103466.46217257043!2d${doctor?.googleMap?.lng}!3d${doctor?.googleMap?.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2sdz!4v1693834683880!5m2!1sar!2sdz`}></iframe>
        </div>

        <div id='questions' className='w-full flex flex-col gap-2 items-center p-4 card rounded-md'>
          <h1 className='font-bold text-xl text-sky-500 my-2 text-center'>إستشارات طبية</h1>
          <div
            id='header'
            className='p-2 flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <Link className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4' href='#'>
              <div id='title' className='flex flex-col'>
                <h1 className='font-bold text-clamp-xl text-sky-500'>تكبير العضلة النائمة </h1>
                <h2 className='font-semibold'>
                  هل فعلا حقن و إبر تكبير الأرداف مضرة و فيها هرمون الذكورة، أريد تجربتها لكنني
                  خائفة من أن تكون دون نتيجة المطلوبة? ما هي أحسن نوعية لتكبير الوركين{" "}
                </h2>
              </div>
            </Link>
          </div>
          <div id='body' className=''>
            <div className='flex flex-wrap gap-2'>
              <Link href='#' className=''>
                <button
                  id='call-btn'
                  className='w-full btn px-4 py-2 flex gap-2 items-enter justify-center'>
                  <Image
                    className='w-auto h-auto'
                    src='/images/view.webp'
                    width={20}
                    height={10}
                    alt='avatar'
                  />
                  <p className='font-semibold text-sm'>انظر الاجابة</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page