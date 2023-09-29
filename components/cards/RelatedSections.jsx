import { useStore } from "@context/serverStore";
import Link from "next/link";
import Image from "next/image";
function RelatedSections() {
  const { medicalSpecialties } = useStore.getState();
  return (
    <div>
      <h1 id='title' className='font-bold text-xl mx-2 p-2'>
        الاقسام الشائعة
      </h1>
      <div id='others' className='card p-2'>
        <div className='flex flex-col gap-2'>
          {medicalSpecialties.slice(0,12).map((speciality, index) => (
            <Link key={index} href='#' className=''>
              <button className='w-full flex gap-2 text-sm items-start'>
                <Image
                  className='w-auto h-auto'
                  src='/images/inscription.png'
                  width={20}
                  height={5}
                  alt='avatar'
                />
                <p className='font-semibold text-sky-400 mx-1'>{speciality.text}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedSections;
