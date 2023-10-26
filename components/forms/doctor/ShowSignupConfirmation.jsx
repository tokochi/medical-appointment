"use client"
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

function ShowSignupConfirmation({ doctor }) {
const { handleDoctorConfirmation,isLoading } = useStore();
  return (
    <div className='p-4 flex flex-wrap gap-4 bg-gray-300 dark:bg-slate-900'>
      <div id='info' className='grow shrink basis-[60%] min-w-[300px]  '>
        <div className=' p-2 card rounded-md'>
          <div id='header' className='p-2 flex flex-wrap justify-center items-start'>
            <div className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'>
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
                <h2 className='font-roboto'>{doctor?.email}</h2>
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
                <h2 className='flex gap-2 items-start text-blue-300  text-sm'>
                  <Image src='/images/location-png.webp' width={18} height={15} alt='location' />
                  {doctor?.address?.wilaya?.text && doctor?.address?.wilaya?.text + "، "}
                  {doctor?.address?.daira?.text && doctor?.address?.daira?.text + "، "}
                  {doctor?.address?.commune?.text &&
                    doctor?.address?.commune?.text !== doctor?.address?.daira?.text &&
                    doctor?.address?.commune?.text + "، "}
                  {doctor?.address?.street&&doctor?.address?.street}
                </h2>
              </div>
            </div>
            <div className='mb-1 flex flex-col  gap-2 grow shrink'>
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
                  className='p-1 px-2 pointer-events-none bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
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
                  className='p-1 px-2 pointer-events-none bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
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
            <h1 className='text-sky-500 my-4 text-lg font-semibold'> الهــاتف</h1>
            <div className='flex flex-col gap-4 items-start justify-start'>
              {doctor?.phone?.mobile && (
                <div className='flex min-w-[150px]  w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
                  {doctor?.phone?.mobile}
                  <svg className='h-6 w-6 ' viewBox='0 0 48 48'>
                    <path
                      fill='#0f0'
                      d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                    />
                    <path
                      fill='#FFF'
                      d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                    />
                  </svg>
                </div>
              )}
              {doctor?.phone?.line1 && (
                <div className='flex min-w-[150px] w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
                  {doctor?.phone?.line1}
                  <svg className='h-6 w-6 ' viewBox='0 0 48 48'>
                    <path
                      fill='#0f0'
                      d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                    />
                    <path
                      fill='#FFF'
                      d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                    />
                  </svg>
                </div>
              )}
              {doctor?.phone?.line2 && (
                <div className='flex min-w-[150px]  w-auto text-gray-900 bg-green-200 rounded-lg mx-auto justify-center items-center gap-2'>
                  {doctor?.phone?.line2}
                  <svg className='h-6 w-6 ' viewBox='0 0 48 48'>
                    <path
                      fill='#0f0'
                      d='M13,42h22c3.866,0,7-3.134,7-7V13c0-3.866-3.134-7-7-7H13c-3.866,0-7,3.134-7,7v22C6,38.866,9.134,42,13,42z'
                    />
                    <path
                      fill='#FFF'
                      d='M35.45,31.041l-4.612-3.051c-0.563-0.341-1.267-0.347-1.836-0.017c0,0,0,0-1.978,1.153c-0.265,0.154-0.52,0.183-0.726,0.145c-0.262-0.048-0.442-0.191-0.454-0.201c-1.087-0.797-2.357-1.852-3.711-3.205c-1.353-1.353-2.408-2.623-3.205-3.711c-0.009-0.013-0.153-0.193-0.201-0.454c-0.037-0.206-0.009-0.46,0.145-0.726c1.153-1.978,1.153-1.978,1.153-1.978c0.331-0.569,0.324-1.274-0.017-1.836l-3.051-4.612c-0.378-0.571-1.151-0.722-1.714-0.332c0,0-1.445,0.989-1.922,1.325c-0.764,0.538-1.01,1.356-1.011,2.496c-0.002,1.604,1.38,6.629,7.201,12.45l0,0l0,0l0,0l0,0c5.822,5.822,10.846,7.203,12.45,7.201c1.14-0.001,1.958-0.248,2.496-1.011c0.336-0.477,1.325-1.922,1.325-1.922C36.172,32.192,36.022,31.419,35.45,31.041z'
                    />
                  </svg>
                </div>
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
          <h1 className='font-bold text-xl text-sky-500'>رخصة العمل الطبي</h1>
          <div className='flex flex-wrap  gap-2 p-2'>
            {doctor?.proofPics?.map((image, index) => (
              <div className='flex gap-2' key={index}>
                {image.includes(".pdf") ? (
                  <div>
                    <Link href={image}>
                      <svg className='h-[100px] w-[100px]' viewBox='0 0 48 48'>
                        <path fill='#FF5722' d='M40 45L8 45 8 3 30 3 40 13z' />
                        <path fill='#FBE9E7' d='M38.5 14L29 14 29 4.5z' />
                        <path
                          fill='#FFEBEE'
                          d='M15.81 29.5V33H13.8v-9.953h3.391c.984 0 1.77.306 2.355.916s.878 1.403.878 2.379-.29 1.745-.868 2.311S18.175 29.5 17.149 29.5H15.81zM15.81 27.825h1.381c.383 0 .679-.125.889-.376s.314-.615.314-1.094c0-.497-.107-.892-.321-1.187-.214-.293-.501-.442-.861-.447H15.81V27.825zM21.764 33v-9.953h2.632c1.162 0 2.089.369 2.778 1.107.691.738 1.043 1.75 1.057 3.035v1.613c0 1.308-.346 2.335-1.035 3.079C26.504 32.628 25.553 33 24.341 33H21.764zM23.773 24.722v6.61h.602c.67 0 1.142-.177 1.415-.53.273-.353.417-.962.431-1.828v-1.729c0-.93-.13-1.578-.39-1.944-.26-.367-.702-.56-1.326-.578H23.773zM34.807 28.939h-3.124V33h-2.01v-9.953h5.51v1.675h-3.5v2.55h3.124V28.939z'
                        />
                      </svg>
                    </Link>
                  </div>
                ) : (
                  <Link href={image}>
                    <Image
                      className='rounded-xl w-auto h-auto'
                      src={image}
                      width={120}
                      height={120}
                      alt='avatar'
                    />
                  </Link>
                )}
              </div>
            ))}
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
          <h2 className='flex items-start gap-2 text-blue-400 text-sm'>
            <Image
              className='w-auto h-auto'
              src='/images/location-png.webp'
              width={18}
              height={15}
              alt='location'
            />
            {doctor?.address?.wilaya?.text + "، "}
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
      </div>
      <div className='p-4 flex flex-wrap gap-4 text-center mx-auto'>
        <button
          onClick={(e) => handleDoctorConfirmation(e, toast, doctor?._id, doctor?.email)}
          className='bg-yellow-400 rounded-xl hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
          تأكيد التسجيل
          {!isLoading ? (
            <svg className='w-5 h-5' viewBox='0 0 48 48'>
              <linearGradient
                id='HoiJCu43QtshzIrYCxOfCa'
                x1='21.241'
                x2='3.541'
                y1='39.241'
                y2='21.541'
                gradientUnits='userSpaceOnUse'>
                <stop offset='.108' stopColor='#0d7044' />
                <stop offset='.433' stopColor='#11945a' />
              </linearGradient>
              <path
                fill='url(#HoiJCu43QtshzIrYCxOfCa)'
                d='M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019C18.627,42.193,17.373,42.193,16.599,41.42z'
              />
              <linearGradient
                id='HoiJCu43QtshzIrYCxOfCb'
                x1='-15.77'
                x2='26.403'
                y1='43.228'
                y2='43.228'
                gradientTransform='rotate(134.999 21.287 38.873)'
                gradientUnits='userSpaceOnUse'>
                <stop offset='0' stopColor='#2ac782' />
                <stop offset='1' stopColor='#21b876' />
              </linearGradient>
              <path
                fill='url(#HoiJCu43QtshzIrYCxOfCb)'
                d='M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019C11.807,36.627,11.807,35.373,12.58,34.599z'
              />
            </svg>
          ) : (
            <svg className='w-4 h-4 animate-spin fill-blue-700' viewBox='0 0 24 24'>
              <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
            </svg>
          )}
        </button>
        {/* <button
          // onClick={(e) => handleDoctorConfirmation(e, toast, doctor._id)}
          className='bg-sky-400 rounded-xl hover:bg-sky-500  focus:ring-2 focus:ring-sky-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
          إرسال رسالة
          {!isLoading ? (
            <Image
              className='w-auto h-auto'
              src='/images/email.webp'
              width={20}
              height={20}
              alt='input'
            />
          ) : (
            <svg className='w-4 h-4 animate-spin fill-blue-700' viewBox='0 0 24 24'>
              <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
            </svg>
          )}
        </button> */}
      </div>
    </div>
  );
}

export default ShowSignupConfirmation;