"use client";
import { useStore } from "@context/store";
import { DropInput, IconInput, SelectInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import toast from "react-hot-toast";

function AccountForm() {
  const {
    companyInfo,
    isLoading,
    handleSubmitCompanyUpdate,
    removeSelectAvatar,
    uploadDone,
    loadingSppiner,
    handleStepperButtonClick,
    handleInputChange,
    handleSelectInput,
    uploadImage,
    wilaya,
    daira,
    commune,
  } = useStore();

 return (
   <div>
     <div
       id='personal-info'
       onClick={() => handleStepperButtonClick("btn_1")}
       className='card rounded-md '>
       <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
         المعلومـــات المهنيـــة
       </div>
       <form
         onSubmit={(e) => handleSubmitCompanyUpdate(e, toast, companyInfo?._id)}
         className='p-2 flex flex-col gap-2 justify-center'>
         <div className='flex flex-wrap gap-4 w-full'>
           <div className='flex flex-wrap gap-2 w-full'>
             <div id='site' className='grow font-roboto scale-y-125'>
               <IconInput
                 icon='/images/website.webp'
                 name='site'
                 value={companyInfo?.site}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='text'
                 placeholder='الموقع الإلكتروني'
                 label='الموقع الإلكتروني:'
               />
             </div>
             <div id='name' className='grow '>
               <IconInput
                 icon='/images/work.webp'
                 name='name'
                 value={companyInfo?.name}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='text'
                 placeholder='اسم المؤسسة'
                 label='اسم المؤسسة:'
               />
             </div>
             <div id='email' className='grow font-roboto scale-y-125'>
               <IconInput
                 icon='/images/email.webp'
                 name='email'
                 value={companyInfo?.email}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='email'
                 placeholder='البريد الإلكتروني '
                 label='البريد الإلكتروني:'
               />
             </div>
           </div>
           <div className='flex flex-wrap gap-2 w-full'>
             <div id='phone' className='grow'>
               <IconInput
                 icon='/images/phone.webp'
                 name='phone.mobile'
                 value={companyInfo?.phone?.mobile}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='phone'
                 placeholder='رقم الجوال'
                 label='رقم الجوال:'
               />
             </div>
             <div id='phone' className='grow'>
               <IconInput
                 icon='/images/fix.webp'
                 name='phone.line1'
                 value={companyInfo?.phone?.line1}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='phone'
                 placeholder='الهاتف الثابت'
                 label='الهاتف الثابت:'
               />
             </div>
             <div id='phone' className='grow'>
               <IconInput
                 icon='/images/fax.webp'
                 name='phone.line2'
                 value={companyInfo?.phone?.line2}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='phone'
                 placeholder='رقم الفاكس'
                 label='رقم الفاكس: '
               />
             </div>
           </div>
           <div className='flex flex-wrap gap-2 w-full'>
             <div id='facebook' className='grow'>
               <IconInput
                 icon='/images/facebook.webp'
                 name='facebook'
                 value={companyInfo?.facebook}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='text'
                 placeholder='فايسبوك'
                 label='فايسبوك:'
               />
             </div>
             <div id='instagram' className='grow'>
               <IconInput
                 icon='/images/instagram.webp'
                 name='instagram'
                 value={companyInfo?.instagram}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='text'
                 placeholder='انستغرام'
                 label='انستغرام:'
               />
             </div>
             <div id='whatsapp' className='grow'>
               <IconInput
                 icon='/images/whatsapp.webp'
                 name='whatsapp'
                 value={companyInfo?.whatsapp}
                 onChange={(e) => handleInputChange(e, "companyInfo")}
                 type='text'
                 placeholder='واتساب'
                 label='واتساب:'
               />
             </div>
           </div>
         </div>
         <div id='avatar' className='flex gap-2 justify-center items-center min-w-[250px]'>
           <DropInput
             id='12'
             name='avatar'
             accept='image/*'
             completed={uploadDone?.avatar}
             loader={loadingSppiner?.avatar}
             onChange={(e) =>
               uploadImage(e, ref, uploadBytes, getDownloadURL, storage, "company/", "companyInfo")
             }
             label='الصورة الشعار: '
           />
           <div className='pt-4'>
             <div className=' '>
               {companyInfo?.avatar?.length > 1 && (
                 <button
                   name={companyInfo?.avatar?.[0]}
                   onClick={(e) => removeSelectAvatar(e, "companyInfo")}>
                   <svg
                     className='w-6 h-6 z-20 relative top-2 select-none pointer-events-none'
                     viewBox='0 0 24 24'>
                     <path
                       d='M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z'
                       fill='#7D7D7D'
                     />
                   </svg>
                 </button>
               )}
               <Image
                 className='rounded-xl w-auto h-auto'
                 src={companyInfo?.avatar?.[0]}
                 width={70}
                 height={70}
                 alt='avatar'
               />
             </div>
           </div>
         </div>
         <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
           الموقع الجغرافي
         </div>
         <div id='wilaya' className=''>
           <SelectInput
             name='address?.wilaya'
             value={companyInfo?.address?.wilaya?.value}
             onChange={(e) => handleSelectInput(e, "companyInfo")}
             options={wilaya}
             option_value='value'
             option_text='text'
             placeholder='الولاية'
             label='الولاية:'
           />
         </div>
         <div id='daira' className=''>
           <SelectInput
             name='address?.daira'
             value={companyInfo?.address?.daira?.value}
             onChange={(e) => handleSelectInput(e, "companyInfo")}
             options={daira.filter(
               (region) => region?.wilaya === companyInfo?.otherServices?.value
             )}
             option_value='value'
             option_text='text'
             placeholder='الدائرة'
             label='الدائرة:'
           />
         </div>
         <div id='commune' className=''>
           <SelectInput
             name='address?.commune'
             value={companyInfo?.address?.commune?.value}
             onChange={(e) => handleSelectInput(e, "companyInfo")}
             options={commune.filter(
               (region) => region?.daira === companyInfo?.address?.daira?.value
             )}
             option_value='value'
             option_text='text'
             placeholder='البلدية'
             label='البلدية:'
           />
         </div>
         <div id='street' className=''>
           <IconInput
             icon='/images/map.webp'
             name='address?.street'
             value={companyInfo?.address?.street}
             onChange={(e) => handleInputChange(e, "companyInfo")}
             type='text'
             placeholder='الشارع، الحي'
             label='الشارع، الحي:'
           />
         </div>
         <div className='text-center  flex flex-col gap-2'>
           <button
             type='submit'
             onClick={() => useStore.setState({ isLoading: true })}
             className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
             حفظ المعلومات
             {!isLoading ? (
               <Image
                 className='w-auto h-auto'
                 src='/images/send.webp'
                 width={20}
                 height={20}
                 alt='input'
               />
             ) : (
               <svg className='w-4 h-4 animate-spin fill-blue-700' viewBox='0 0 24 24'>
                 <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
               </svg>
             )}
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

export default AccountForm;
