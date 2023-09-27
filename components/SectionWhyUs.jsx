import Image from "next/image";
function SectionWhyUs() {
  return (
    <div className='bg-sky-50 dark:bg-gray-900'>
      <div className='py-2'>
        
        <h1 className='font-bold text-clamp-2xl  py-4 text-center'>
          لماذا تحدد موعد عن بعد مع منصة         <Image
            className='w-auto h-auto inline-block'
            src='/images/logo-text.png'
            width={80}
            height={20}
            alt='hero'
          />
        </h1>
        <h2 className='text-clamp-xl leading-normal m-2 text-center '>
          مع تطبيق الشفاء الطبية خذ موعدًا عبر الإنترنت بطريقة أخرى
        </h2>
      </div>
      <div className='flex flex-wrap py-5 justify-center items-stretch'>
        <div className='basis3'>
          <Image
            className='mx-auto my-8 w-auto h-auto'
            src='/images/illustration1.png'
            width={300}
            height={300}
            alt='hero'
          />
          <p className='text-center font-semibold text-lg'>تحصل على طبيبك بسرعة</p>
        </div>
        <div className='basis3'>
          <Image
            className='mx-auto my-8 w-auto h-auto'
            src='/images/illustration2.png'
            width={300}
            height={300}
            alt='hero'
          />
          <p className='text-center font-semibold text-lg'>خذ موعدا على الإنترنت في أي وقت</p>
        </div>
        <div className='basis3'>
          <Image
            className='mx-auto my-8 w-auto h-auto'
            src='/images/illustration3.png'
            width={300}
            height={300}
            alt='hero'
          />
          <p className='text-center font-semibold  text-lg'>
            تلقى تذكير عبر رسائل قصيرة/رسائل إلكترونية
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionWhyUs;
