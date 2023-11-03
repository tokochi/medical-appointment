import Image from "next/image";

export const Metadata = {
  title: "من نحن",
  description: "صحتي تاجي",
};

function page() {

  return (
    <div className='bg-slate-100 dark:bg-slate-800 p-4 flex flex-wrap justify-center items-center '>
      <div className='basis-[60%] grow shrink min-w-[300px] flex flex-col gap-2'>
        <h1 className='font-semibold text-2xl p-4 text-center'>من نحن؟</h1>

        <h1 className='font-bold text-xl text-sky-500'>للمرضى</h1>
        <div className='card flex flex-col gap-2 p-2'>
          <p>
            تشعر بالقلق، شك، تحتاج إلى المشورة الصحية؟
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            هو الحل.
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            هو منصة مبتكرة تسمح لك العثور بسرعة على أقرب طبيب لك وتحديد موعد على الانترنت مجانا.
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            يتيح لك طرح أسئلتك عبر الإنترنت مباشرة للأطباء مع مراعاة شروط السرية.
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            هو محرك البحث للعثور على صيدلية قريبة.
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            يعطيك معلومات عن أعراض المرض الأكثر شيوعا.
          </p>
        </div>
        <h1 className='font-bold text-xl text-sky-500'>للمهنيين الصحيين</h1>
        <div className='card p-2 flex flex-col gap-2'>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            هو أداة عصرية شاملة لإدارة عيادتك الطبية، تسمح لمرضاك بحجز مواعيدهم مباشرة عبر الإنترنت،
            يساعدك كذلك على تنظيم مواعيدك و إدارة جدول أعمالك عن طريق بضع نقرات
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            يتيح لك التواصل مع المرضى والإجابة عن أسئلتهم.
          </p>
          <p>
            <Image
              className='w-auto h-auto mx-1 inline-block'
              src='/images/logo-text.webp'
              width={50}
              height={50}
              alt='hero'
            />
            هدفنا النهائي هو تحسين الحصول على الرعاية من خلال توفير أدوات بسيطة وبديهية حتى يشترك
            الجميع في المحيط الصحي و نحافظ على سلامة الروح البشرية.
          </p>
        </div>
        <h1 className='font-bold text-xl text-sky-500'>للتواصل</h1>
        <div className='card p-2 flex flex-col gap-2'>
          <p>العنوان: حي البدر منطقة 2، شلف، الجزائر</p>
          <p>البريد الالكتروني: contact@sehatitaji.com</p>
          <p>رقم الهاتف: 2130560708090+</p>
        </div>
        <div></div>
      </div>
      <div id='hero-img' className='basis-[40%] grow shrink min-w-[350px] p-4'>
        <Image className='mx-auto' src='/images/about.webp' width={450} height={450} alt='hero' />
      </div>
    </div>
  );
}

export default page;
