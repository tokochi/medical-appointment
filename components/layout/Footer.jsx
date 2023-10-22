"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Footer() {
  const path = usePathname();
  return (
    <div className='mt-auto'>
      <div
        className={`bg-gray-50 ${
          path.includes("/user") ||
          path.includes("/login") ||
          path.includes("/verifyToken") ||
          path.includes("/doctor")
            ? "hidden"
            : ""
        } dark:bg-gray-900 flex flex-wrap p-4 gap-4`}>
        <div className='basis17 flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <Image
              className='w-auto h-auto'
              src='/images/logo.webp'
              width={60}
              height={60}
              alt='logo'
            />
            <div className=''>
              <h1 className='font-semibold'>الشبكة الطبية</h1>
              <h1 className='font-semibold'>المهنية الأولى</h1>
            </div>
          </div>
          <div className=''>
            <Link href='/about'>
              <h2 className=' text-sky-500'>من نحن؟</h2>
            </Link>
            <Link href='/contact-us'>
              <h2 className=' text-sky-500'>اتصل بنا</h2>
            </Link>
            <h2 className=' text-sky-500'>ميثاق الممارسات الجيدة</h2>
            <h2 className=' text-sky-500'>شروط وأحكام الاستخدام</h2>
            <h2 className=' text-sky-500'>سياسة الخصوصية</h2>
          </div>
        </div>
        <div className='basis17 flex flex-col gap-2'>
          <h1 className='font-semibold my-2'>عما تبحث ؟</h1>
          <Link href='/doctors'>
            <h2 className=' text-sky-500'>طبيب</h2>
          </Link>
          <Link href='/pharms'>
            <h2 className=' text-sky-500'>صيدلية</h2>
          </Link>
          <Link href='/hospitals'>
            <h2 className=' text-sky-500'>مصحة</h2>
          </Link>
          <Link href='/labs'>
            <h2 className=' text-sky-500'>مختبر</h2>
          </Link>
          <Link href='/questions'>
            <h2 className=' text-sky-500'>استشارات طبية</h2>
          </Link>
        </div>
        <div className='basis17 flex flex-col gap-2'>
          <h1 className='font-semibold my-2'>عمليات البحث الشائعة</h1>
          <h2 className=' text-sky-500'>أخصائي امراض القلب و الشرايين</h2>
          <h2 className=' text-sky-500'>طبيب أسنان بن عروس</h2>
          <h2 className=' text-sky-500'>أخصائي الامراض الجلدية و التناسلية </h2>
          <h2 className=' text-sky-500'>أخصائي أمراض الجهاز الهضمي</h2>
          <h2 className=' text-sky-500'>أخصائي أمراض النساء والتوليد </h2>
          <h2 className=' text-sky-500'>أخصائي الأمراض النفسية والعصبية ميلة</h2>
          <h2 className=' text-sky-500'>أخصائي طب العيون</h2>
          <h2 className=' text-sky-500'>أخصائي أمراض النساء والتوليد وهران</h2>
        </div>
        <div className='basis17 flex flex-col gap-2'>
          <h1 className='font-semibold my-2'>البحث عن طبيب</h1>
          <h2 className=' text-sky-500'>ابحث عن طبيب أسنان</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب أمراض جلدية</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب المعدة</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب عام</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب نساء</h2>
          <h2 className=' text-sky-500'>ابحث عن مختص العلاج الطبيعي</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب عيون</h2>
          <h2 className=' text-sky-500'>ابحث عن طبيب الأنف والأذن والحنجرة</h2>
        </div>
      </div>
      <div className='border-b-4 border-b-border w-full'></div>
      <div className='bg-primary text-white p-4 flex flex-wrap w-full justify-around'>
        <h1 className='font-semibold my-2'>كل الحقوق محفوظة sehatitaji.com .2023</h1>
        <div className='flex gap-4 justify-center items-center'>
          <Image
            className='w-auto h-auto'
            src='/images/facebook.webp'
            width={35}
            height={35}
            alt='logo'
          />
          <Image
            className='w-auto h-auto'
            src='/images/instagram.webp'
            width={35}
            height={35}
            alt='logo'
          />
          <Image
            className='w-auto h-auto'
            src='/images/whatsapp.webp'
            width={35}
            height={35}
            alt='logo'
          />
        </div>
        <div className=''></div>
      </div>
    </div>
  );
}

export default Footer;
