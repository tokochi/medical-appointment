import { sectionSpecialities } from "@utils/data.js";
import Image from "next/image";
import Link from "next/link";
function  SectionSpecialties () {
  return (
    <div className='bg-[#305779] dark:bg-gray-700 py-4 px-6'>
      <div className='text-white'>
        <h1 className='font-bold text-clamp-2xl text-center'>تصفح حسب التخصصات</h1>
        <h2 className='text-clamp-xl leading-normal mb-4 text-center '>
          البحث عن أطباء ذوي خبرة في جميع التخصصات
        </h2>
      </div>
      <div className='flex flex-wrap  gap-2'>
        {sectionSpecialities.map((item) => (
          <Link
            className='grow shrink basis-1/4 min-w-[280px] lg:max-w-[300px] '
            key={item.id}
            href={item.link}>
            <div key={item.id} className=' flex gap-4 p-4 items-center rounded-[163px] shadow-md border-[1px] border-gray-400 bg-slate-200 hover:bg-sky-200 dark:border-gray-700 dark:bg-inputDark hover:border-gray-100 dark:hover:opacity-90'>
              <Image className="w-auto h-auto" src={item.icon} width={30} height={30} alt='input' />
              <div className=''>
                <h1 className='text-lg pb-2 font-bold hover:text-blue-700'>{item.title}</h1>
                <h2 className='font-semibold text-sm flex gap-2'>
                  أطباء:<p className='text-green-700'>{item.desc}</p>
                </h2>
              </div>
              <Image
                className='mr-auto w-auto h-auto'
                src='/images/arrow.png'
                width={20}
                height={20}
                alt='input'
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionSpecialties;
