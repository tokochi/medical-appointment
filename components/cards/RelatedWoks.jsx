import { useStore } from "@context/serverStore";
import Link from "next/link";
import Image from "next/image";
function RelatedWoks() {
  const { relatedWorks } = useStore.getState();
  return (
    <div>
      <h1 id='title' className='font-bold text-xl mx-2 p-2'>
        الأعمال الطبية ذات الصلة
      </h1>
      <div id='others' className='card p-2'>
        <div className='flex flex-col gap-2'>
          {relatedWorks.map((speciality, index) => (
            <Link
              key={index}
              href='#'
              className='border-b-[1px] border-dashed border-gray-600 dark:border-gray-300 '>
              <button className='w-full flex gap-2 text-sm items-start justify-start'>
                <Image
                  className='w-auto h-auto'
                  src='/images/inscription.png'
                  width={20}
                  height={5}
                  alt='avatar'
                />
                <p className='font-semibold text-right text-sky-400 mx-1'>{speciality.text}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedWoks;
