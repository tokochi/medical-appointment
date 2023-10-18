import Link from "next/link";
import Image from "next/image";


function DoctorQuestion({ doctor }) {

  return (
    <div>
      <Link
        className='my-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
        href={`/doctors/profile/${doctor?._id}`}>
        <div id='avatar'>
          <Image
            className='rounded-xl w-auto h-auto'
            src={doctor?.avatar?.[0] || "/images/heart.webp"}
            width={80}
            height={80}
            alt='avatar'
          />
        </div>
        <div id='title' className='flex flex-col'>
          <h1 className='font-bold text-clamp-xl text-sky-500  '>
            {doctor?.title?.text + " "}
            {doctor?.name}
          </h1>
          <h2 className='font-semibold'>{doctor?.speciality?.text}</h2>
        </div>
      </Link>
    </div>
  );
}

export default DoctorQuestion