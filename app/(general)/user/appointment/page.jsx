import { useStore } from "@context/serverStore";

import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
import GetSession from "@components/session/GetSession";
import ShowAppointDetails from "@components/buttons/ShowAppointDetails";
async function page() {
  const { fetchAppointments } = useStore.getState();
   const session = await GetSession();
  const appointmentsList = await fetchAppointments();
  const appointments = appointmentsList.filter((apoint) => apoint?.user?.id === session?._id);
  if (appointments?.length === 0)
      return (
        <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
          <div className='card rounded-lg p-4  m-10 text-xl font-semibold'>
            لايوجد أي موعد طبي خاص بك
          </div>
        </div>
    );
    return (
      <div className='flex flex-col gap-4 overflow-x-auto w-full md:m-10'>
        <div className='card p-4 rounded-md overflow-x-auto w-full'>
          <table className='text-sm whitespace-nowrap md:text-base min-w-[600px] w-full'>
            <thead>
              <tr>
                <th className='w-1/4 text-center text-yellow-600 p-2'>موعد مع</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>سبب زيارة</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>ملف طبي</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>توقيت</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.reverse()?.map((appoint, index) => (
                <tr
                  key={index}
                  className={`text-center  border-b border-gray-300 dark:border-gray-600 hover:bg-sky-500/50 p-2`}>
                  <td className='text-center p-2'>
                    <div id='avatar' className='text-right  flex flex-col'>
                      <h1 className='font-bold  text-sky-500  '>
                        {appoint?.doctor?._doc?.title?.text + " "}
                        {appoint?.doctor?._doc?.name}
                      </h1>
                      <h2 className='font-semibold '>{appoint?.doctor?._doc?.speciality?.text}</h2>
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='flex gap-2 justify-center '>
                      <p>{appoint?.visitArg || "زيارة طبية"}</p>
                      <p className='truncate font-thin max-w-[120px]'>{appoint?.desc}</p>
                    </div>
                  </td>
                  <td className='text-center p-2'>
                    <ShowAppointDetails data={JSON.stringify(appoint)}>
                      <svg className='h-6 w-6 fill-yellow-400' viewBox='0 0 24 24'>
                        <path d='M20,6h-8l-1.414-1.414C10.211,4.211,9.702,4,9.172,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z' />
                      </svg>
                    </ShowAppointDetails>
                  </td>
                  <td className='text-center p-2 '>
                    {moment(appoint?._doc.date).format("LL") + " 🕒 " + appoint?._doc.time}
                  </td>
                  <td className='text-center p-2'>
                    <div className=''>
                      {!moment(appoint?._doc?.date).isBefore(moment()) ? (
                        <p className=' text-green-700 bg-green-200 rounded-2xl font-semibold p-1'>
                          قيد الإنتظـار
                        </p>
                      ) : (
                        <p className=' text-red-700 bg-red-200 rounded-2xl font-semibold p-1'>
                          انقضى الموعد
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default page;
