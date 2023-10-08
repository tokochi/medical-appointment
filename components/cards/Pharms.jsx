import { useStore } from "@context/serverStore";
import Link from "next/link";
import Image from "next/image";
import SlicerServices from "@components/SlicerServices";
import ShowPhoneNum from "../buttons/ShowPhoneNum";

async function Pharms() {
  const { fetchPharms } = useStore.getState();
  const pharms = await fetchPharms();
  return (
    <div className='flex flex-col gap-4'>
      {pharms.map((item, index) => (
        <div key={item?._id} className=' p-2 card rounded-md'>
          <div
            id='header'
            className='p-2 flex flex-wrap justify-center items-start border-b-[1px] border-gray-600'>
            <div
              className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
              href='/pharms/profile'>
              <Link
                className='mb-1 grow shrink basis-[70%] min-w-[280px] flex gap-4'
                id={item?._id}
                href={`/pharms/profile/${item?._id}`}>
                <div id={item?._id}>
                  <Image
                    className='rounded-xl w-auto h-auto'
                    src={item?.avatar?.[0]}
                    width={80}
                    height={80}
                    alt='avatar'
                  />
                </div>
                <div id='title' className='flex flex-col'>
                  <h1 className='font-bold text-clamp-xl text-sky-500  '>
                    {item?.title?.text + " "}
                    {item?.name}
                  </h1>
                  <h2 className='font-semibold'>{item?.speciality?.text}</h2>
                  <div className='border-b-[1px] border-gray-400 dark:border-gray-100 w-full m-1' />
                  {item?.otherServices?.isFullTimeOpen && (
                    <h2 className='flex items-start gap-2 pt-1 text-cyan-400 text-sm'>
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
                  {item?.otherServices?.insurance && (
                    <h2 className='flex items-start gap-2 pt-1 text-green-500 text-sm'>
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
                  {item?.otherServices?.homeVisits && (
                    <h2 className='flex items-start gap-2 pt-1 text-yellow-500 text-sm'>
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
                  <h2 className='flex gap-2 items-start text-blue-600  text-sm'>
                    <Image
                      className='w-auto h-auto'
                      src='/images/location-png.webp'
                      width={18}
                      height={15}
                      alt='location'
                    />
                    {item?.address?.wilaya?.text + "، "}
                    {item?.address?.daira?.text + "، "}
                    {item?.address?.commune?.text &&
                      item?.address?.commune?.text !== item?.address?.daira?.text &&
                      item?.address?.commune?.text + "، "}
                    {item?.address?.street}
                  </h2>
                </div>
              </Link>
            </div>
            <div className='mb-1 flex flex-col gap-2 grow shrink'>
              <ShowPhoneNum phone={item?.phone} />
            </div>
          </div>
          <div id='body' className='p-2'>
            <div className='flex flex-wrap gap-2'>
              {item?.officePics?.slice(0, 6).map((image, index) => (
                <Link key={index} className=' flex gap-2' href={image}>
                  <Image
                    className='w-auto h-auto'
                    src={image}
                    width={40}
                    height={40}
                    alt='avatar'
                  />
                </Link>
              ))}
              <SlicerServices item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pharms;
