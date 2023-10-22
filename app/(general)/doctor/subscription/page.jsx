import { useStore } from "@context/serverStore";
import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
import GetSession from "@components/session/GetSession";
import Image from "next/image";

async function page() {
  const { fetchDoctor } = useStore.getState();
  const session = await GetSession();
  const doctor = await fetchDoctor(session?._id);
  const subscription = doctor?.subscription;
  if (subscription == null)
    return (
      <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
        <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
          لايوجد أي اشتراك خاص بك
        </div>
      </div>
    );
  return (
    <div className='flex flex-col gap-4 overflow-x-auto w-full md:m-10'>
      <div className='card p-4 rounded-md overflow-x-auto w-full'>
        <div className='flex flex-wrap gap-2 justify-start items-start  p-2  border-b-[1px] border-gray-300 dark:border-gray-700 bg-white rounded-xl shadow  dark:bg-slate-800'>
          <div className=''>
            <Image
              className='rounded-xl w-auto h-auto'
              src={doctor?.avatar?.[0]}
              width={40}
              height={40}
              alt='avatar'
            />
          </div>
          <div id='title' className='flex flex-col'>
            <h1 className='font-bold text-sky-500'>
              {doctor?.title?.text + " "}
              {doctor?.name}
            </h1>
            <h2 className='font-semibold text-sm'>{doctor?.speciality?.text}</h2>
          </div>
          <div className='mx-auto flex gap-2 flex-wrap justify-center items-center'>
            <p>الإشتــــراك:</p>
            <p className='mx-auto p-1 bg-green-200 rounded-xl text-green-600 font-semibold'>
              مفـــعــل
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 '>
          <p className='p-2 font-semibold  text-sky-500'>المـــدة:</p>
          من:<p className='btn4 '> {moment(subscription?.startDate).format("LL")}</p>
           إلى:<p className='btn4'> {moment(subscription?.endDate).format("LL")}</p>
          <p>
            <p className=' text-sky-500 font-semibold p-2'>عدد الأيام:</p>
            <p className='btn4'>
              {" "}
              {moment(doctor?.subscription?.endDate).diff(
                moment(doctor?.subscription?.startDate),
                "days"
              ) + "  يوم  "}
            </p>
          </p>
        </div>
        <div className=''>
          <p className='p-2 font-semibold text-sky-500'>العـــرض:</p>
          <p className='btn4'>{subscription?.plan}</p>
        </div>
        <div className=''>
          <p className='p-2 font-semibold text-sky-500'>الســـعر:</p>
          <p className='btn4'>{subscription?.price + " دج "}</p>
        </div>
      </div>
    </div>
  );
}

export default page;
