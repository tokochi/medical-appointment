"use client";
import { useStore } from "@context/store";
import { useEffect, useState } from "react";
function Doctors() {
  const { doctors, fetchDoctors } = useStore();
   useEffect(() => {
     fetchDoctors();
   }, []);
  return (
    <div className='inline-block'>
      <div className='card  rounded-xl shadow-md p-4 flex justify-around items-start gap-4'>
        <div className='p-4 bg-orange-200 rounded-xl'>
          <svg
            className='h-6 w-6 fill-orange-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <path d='M4 2C3.466 2 2.9629375 2.2079375 2.5859375 2.5859375C2.2079375 2.9639375 2 3.467 2 4L2 7C2 9.9420354 3.8300481 12.454406 6.4082031 13.486328C6.7620442 14.101886 7.32167 14.575434 8 14.816406L8 18C8 20.209 9.791 22 12 22L16 22C18.209 22 20 20.209 20 18L20 17.826172 A 3 3 0 0 0 22 15 A 3 3 0 0 0 19 12 A 3 3 0 0 0 16 15 A 3 3 0 0 0 18 17.824219L18 18C18 19.105 17.105 20 16 20L12 20C10.895 20 10 19.105 10 18L10 14.816406C10.67833 14.575434 11.237956 14.101886 11.591797 13.486328C14.169952 12.453453 16 9.9369908 16 6.9765625L16 4C16 2.895 15.105 2 14 2L13 2C12.448 2 12 2.448 12 3C12 3.552 12.448 4 13 4L14 4L14 6.7773438C14 9.3863437 12.098953 11.721609 9.5019531 11.974609C9.3156406 11.992859 9.1294736 12.001847 8.9472656 12C6.2141455 11.972292 4.0010156 9.7384375 4.0019531 6.9765625L4 4L5 4C5.552 4 6 3.552 6 3C6 2.448 5.552 2 5 2L4 2 z' />
          </svg>
        </div>

        <div className='text-xl'>
          <h1>الأطبـــــــاء</h1>
          <h1 className='font-bold text-center'>{doctors.length}</h1>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
// async function Doctors() {
//   const res = await fetch("http://localhost:3000/api/doctors");
//   const data = await res.json()
//   console.log("🚀 ~ data:", data)
//   return <div>{JSON.stringify(data)}</div>;
// }
// export default Doctors;
