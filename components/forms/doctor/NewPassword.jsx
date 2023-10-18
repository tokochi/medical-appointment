"use client";
import { useStore } from "@context/store";
import { TextInput, IconInput } from "@components/inputs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function NewPassword({ id, email }) {
  const {
    doctorInfo,
    errorInput,
    errorPassword,
    handleSubmitDoctorUpdate,
    isLoading,
    handleInputChange,
  } = useStore();
const router = useRouter();
  return (
    <div className='flex flex-col items-center md:mx-20 md:mt-10'>
      <div id='personal-info' className='card rounded-md'>
        <div className='flex flex-col gap-2 items-center p-4 bg-green-200 text-lg text-slate-800 '>
          <svg className='h-8 w-8' viewBox='0 0 48 48'>
            <linearGradient
              id='IMoH7gpu5un5Dx2vID39Ra'
              x1='9.858'
              x2='38.142'
              y1='9.858'
              y2='38.142'
              gradientUnits='userSpaceOnUse'>
              <stop offset='0' stopColor='#9dffce' />
              <stop offset='1' stopColor='#50d18d' />
            </linearGradient>
            <path
              fill='url(#IMoH7gpu5un5Dx2vID39Ra)'
              d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
            />
            <linearGradient
              id='IMoH7gpu5un5Dx2vID39Rb'
              x1='13'
              x2='36'
              y1='24.793'
              y2='24.793'
              gradientUnits='userSpaceOnUse'>
              <stop offset='.824' stopColor='#135d36' />
              <stop offset='.931' stopColor='#125933' />
              <stop offset='1' stopColor='#11522f' />
            </linearGradient>
            <path
              fill='url(#IMoH7gpu5un5Dx2vID39Rb)'
              d='M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z'
            />
          </svg>
          <p className='text-center'>
            لقد تم تأكيد تسجيلك بنجاح، يمكنك الآن تسجيل دخولك الى منصة الأطباء
          </p>
        </div>
        <h1 className='text-center p-4'>
          البريد الإلكتروني: <span className='font-roboto'>{email}</span>{" "}
        </h1>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          ادخل كلمة سر خاصة بك
        </div>
        <form
          onSubmit={(e) => handleSubmitDoctorUpdate(e, toast, id, router, "new")}
          className='p-2 flex flex-col gap-2 justify-center'>
          <div id='name' className='grow'>
            <IconInput
              icon='/images/lock.webp'
              name='newPassword'
              value={doctorInfo?.newPassword}
              error={errorInput?.newPassword}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='password'
              placeholder='كلمة السر الجديدة'
              label='كلمة السر الجديدة:'
            />
          </div>
          <div id='email' className='grow'>
            <TextInput
              type='password'
              name='verifyPassword'
              value={doctorInfo?.verifyPassword}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              placeholder='تحقق من كلمة السر'
              label='تاكيد كلمة السر:'
            />
            {errorPassword && (
              <h2 className='text-red-600 text-sm font-semibold transistion-all duration-300'>
                يرجى تحقق من كلمة السر
              </h2>
            )}
          </div>
          <div className='text-center   mx-auto'>
            <button
              type='submit'
              onClick={(e) => {
                if (
                  doctorInfo?.verifyPassword !== doctorInfo?.newPassword ||
                  doctorInfo?.newPassword === ""
                ) {
                  e.preventDefault();
                  useStore.setState({ isLoading: true, errorPassword: true });
                } else {
                  useStore.setState({ isLoading: true });
                }
              }}
              className='bg-yellow-400  rounded-xl hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
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

export default NewPassword;
