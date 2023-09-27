import Image from "next/image";
import Link from "next/link";
function Footer() {
  return (
    <div className=''>
      <div className='border-b-4 border-b-border w-full'></div>
      <div className='bg-primary text-white p-2 flex flex-wrap w-full justify-around'>
        <h1 className='font-semibold my-2'>كل الحقوق محفوظة  sehatitaji.com .2023</h1>
        <div className='flex gap-4 justify-center items-center'>
          <Image className="w-auto h-auto" src='/images/facebook.png' width={35} height={35} alt='logo' />
          <Image className="w-auto h-auto" src='/images/instagram.png' width={35} height={35} alt='logo' />
          <Image className="w-auto h-auto" src='/images/whatsapp.png' width={35} height={35} alt='logo' />
        </div>
      </div>
    </div>
  );
}

export default Footer;
