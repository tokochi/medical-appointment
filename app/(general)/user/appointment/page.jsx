import { useStore } from "@context/serverStore";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar-dz";
import GetSession from "@components/session/GetSession";
 moment().locale("ar-dz");
async function page() {
  const { fetchAppointments } = useStore.getState();
   const session = await GetSession();
  const appointmentsList = await fetchAppointments();
  const appointments = appointmentsList.filter(apoint => apoint?.user?.id === session?._id);
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      {appointments.length === 0 && (
        <div className='bg-sky-50 w-full dark:bg-primary m-4 md:m-4 rounded '>
          <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
            لايوجد أي موعد طبي خاص بك
          </div>
        </div>
      )}
      {appointments.map((appoint, index) => (
        <div key={index} className=''>
          <div className='font-semibold card rounded-md p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
            الموعد الطبي: {"#" + appoint?._doc._id.toString().substr(18)}
          </div>
          <div
            key={appoint?.doctor?._doc?._id}
            className='flex flex-wrap gap-4 p-2 card rounded-md'>
            <h1>موعد مع :</h1>
            <div id='header' className='p-2 flex flex-wrap justify-center items-start '>
              <div
                className='mb-1 grow shrink basis-[70%] min-w-[250px] flex gap-4'
                href='/doctors/profile'>
                <div className='mb-1  flex gap-4'>
                  <div>
                    <Image
                      className='rounded-xl w-auto h-auto'
                      src={appoint?.doctor?._doc?.avatar?.[0]}
                      width={80}
                      height={80}
                      alt='avatar'
                    />
                  </div>
                  <div id='title' className='flex flex-col'>
                    <h1 className='font-bold text-clamp-xl text-sky-500  '>
                      {appoint?.doctor?._doc?.title?.text + " "}
                      {appoint?.doctor?._doc?.name}
                    </h1>
                    <h2 className='font-semibold'>{appoint?.doctor?._doc?.speciality?.text}</h2>
                    <div className='border-b-[1px] border-gray-400 dark:border-gray-100 w-full m-1' />
                  </div>
                </div>
              </div>
            </div>
            <div className='md:mx-auto'>
              <p>موعدك على:</p>
              <p className='mx-auto text-sky-500 font-semibold p-2'>
                {moment(appoint?._doc.date).format("LL") + " 🕒 " + appoint?._doc.time}
              </p>
            </div>
            <div className='md:mx-auto'>
              <p className='pb-2'>الحالة:</p>
              {!moment(appoint?._doc?.date).isBefore(moment()) ? (
                <p className='mx-auto text-green-700 bg-green-200 rounded-2xl font-semibold p-2'>
                  قيد الإنتظـار
                </p>
              ) : (
                <p className='mx-auto text-red-700 bg-red-200 rounded-2xl font-semibold p-2'>
                  انقضى الموعد
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
