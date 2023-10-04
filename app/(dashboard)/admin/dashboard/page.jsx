import { useStore } from "@context/serverStore";
import Image from "next/image";
import Doctors from "@components/cards/dashboard/Doctors";

async function page() {
  const { fetchUsers, fetchDoctors } = useStore.getState();
  const users = await fetchUsers();
  const doctors = await fetchDoctors();
  return (
    <div className='bg-gray-200 dark:bg-slate-900 p-2 flex flex-wrap gap-2 justify-center'>
      <div
        id='cards'
        className='grow shrink basis-full gap-2 flex flex-wrap justify-around items-center'>
        <Doctors />
        <Doctors />
        <Doctors />
        <Doctors />
      </div>
      <div id='doctors-sumbit' className='grow shrink basis-1/3  md:w-auto card p-2 rounded-xl'>
        <h1 className='font-bold md:text-xl text-sky-500 my-2 text-center'>طلبات تسجيل الأطباء</h1>
        <table className='w-full text-sm md:text-base'>
          <thead>
            <tr>
              <th className='w-1/4 text-center text-yellow-600 p-2'>الأطباء</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الوقت</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الملف</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor?._id} className='text-center p-2'>
                <td className='text-center p-2  rounded-md '>
                  <div className='flex flex-wrap md:flex-nowrap items-start gap-4'>
                    <Image
                      className='rounded-xl min-w-[50px] '
                      src={doctor?.avatar?.[0]}
                      width={50}
                      height={50}
                      alt='avatar'
                    />
                    <div
                      id='avatar'
                      className='text-right md:whitespace-nowrap flex flex-col gap-2'>
                      <h1 className='font-bold text-sm text-sky-500'>
                        {doctor?.title?.text + " "}
                        {doctor?.name}
                      </h1>
                      <h2 className='text-sm'>{doctor?.speciality?.text}</h2>
                    </div>
                  </div>
                </td>
                <td>{doctor?.date?.toISOString()?.substring(0, 10)}</td>
                <td>
                  <button>
                    <svg
                      className='h-6 w-6 fill-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                      <path d='M20,6h-8l-1.414-1.414C10.211,4.211,9.702,4,9.172,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z' />
                    </svg>
                  </button>
                </td>
                <td>
                  <div className='p-1.5 rounded-2xl bg-red-100'>
                    <p className='text-red-600 text-sm md:whitespace-nowrap'>قيد الانتظار</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='last-sub' className='grow shrink basis-1/3  md:w-auto card p-2 rounded-xl '>
        <h1 className='font-bold md:text-xl text-sky-500 my-2 text-center'>آخر التسجيلات</h1>
        <table className='w-full text-sm md:text-base'>
          <thead>
            <tr>
              <th className='w-1/4 text-center text-yellow-600 p-2'>المستخدم</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الوقت</th>
              <th className='w-1/3 text-center text-yellow-600 p-2'>الولاية</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(-4).map((doctor) => (
              <tr key={doctor._id} className='text-center p-2'>
                <td className='text-center p-2  rounded-md font-roboto'>
                  <div className='flex flex-wrap md:flex-nowrap items-start gap-4'>
                    <svg
                      className='h-6 w-6 fill-cyan-600'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                      <path d='M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M12,4.75 c1.795,0,3.25,1.455,3.25,3.25s-1.455,3.25-3.25,3.25S8.75,9.795,8.75,8S10.205,4.75,12,4.75z M12,20 c-2.438,0-4.621-1.091-6.088-2.812c-0.381-0.447-0.296-1.118,0.173-1.471C7.602,14.576,10.366,14,12,14s4.398,0.576,5.916,1.717 c0.469,0.353,0.554,1.025,0.173,1.471C16.621,18.909,14.438,20,12,20z' />
                    </svg>
                    <div id='avatar' className='text-right  flex flex-col'>
                      <h1 className='font-bold hidden md:inline-block text-sm text-sky-500'>
                        {doctor?.email}
                      </h1>
                      <h2 className='text-sm'>{doctor?.name}</h2>
                    </div>
                  </div>
                </td>
                <td className='p-2 align-top'>{doctor?.date?.toISOString()?.substring(0, 10)}</td>
                <td className='p-2 align-top'>
                  <button className='flex flex-wrap mx-auto md:flex-nowrap items-center gap-2'>
                    <svg
                      className='h-5 w-5 fill-yellow-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'>
                      <path d='M12 1C8.686 1 6 3.686 6 7C6 10.323 9.6065625 15.105891 11.226562 17.087891C11.627562 17.577891 12.370484 17.577891 12.771484 17.087891C14.392484 15.105891 18 10.323 18 7C18 3.686 15.314 1 12 1 z M 12 4.8574219C13.184 4.8574219 14.142578 5.816 14.142578 7C14.142578 8.183 13.183 9.1425781 12 9.1425781C10.817 9.1425781 9.8574219 8.184 9.8574219 7C9.8574219 5.816 10.816 4.8574219 12 4.8574219 z M 6.9941406 15.564453C6.9172363 15.56473 6.8383906 15.574375 6.7597656 15.59375C3.9047656 16.29875 2 17.56 2 19C2 21.209 6.477 23 12 23C17.523 23 22 21.209 22 19C22 17.56 20.095234 16.299703 17.240234 15.595703C16.611234 15.440703 16 15.926219 16 16.574219C16 17.028219 16.302187 17.433969 16.742188 17.542969C18.547187 17.990969 19.644219 18.612047 19.949219 18.998047C19.434219 19.653047 16.694 20.998047 12 20.998047C7.306 20.998047 4.5657813 19.653047 4.0507812 18.998047C4.3547813 18.611047 5.4528125 17.990969 7.2578125 17.542969C7.6978125 17.434969 8 17.028219 8 16.574219C8 16.006344 7.5324707 15.562512 6.9941406 15.564453 z' />
                    </svg>
                    <p className='text-sm text-sky-500 md:whitespace-nowrap'>الجزائر</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='last-posts' className='title'></div>
    </div>
  );
}

export default page;
