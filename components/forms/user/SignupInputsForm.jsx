"use client";
import { useStore } from "@context/store";
import { DropInput, IconInput, SelectInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect } from "react";
import DatePicker from "@components/inputs/DatePicker";

function SignupInputsForm(props) {
  const {
    userInfo,
    isLoading,
    session,
    handleSubmitUserUpdate,
    removeSelectAvatar,
    uploadDone,
    loadingSppiner,
    handleInputChange,
    handleSelectInput,
    uploadImage,
    wilaya,
    daira,
    commune,
  } = useStore();

  useEffect(() => useStore.setState({ userInfo: session }), [session]);

  return (
    <div>
      <div id='personal-info' className='card rounded-md '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات الشخصية
        </div>
        <form
          onSubmit={(e) => handleSubmitUserUpdate(e, toast,  userInfo?._id)}
          className='flex flex-wrap gap-2 items-start'>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <div id='gender' className=''>
              <SelectInput
                name='gender'
                value={userInfo?.gender?.value}
                onChange={(e) => handleSelectInput(e, "userInfo")}
                options={[
                  { text: "رجل", value: "male" },
                  { text: "إمرأة", value: "female" },
                ]}
                option_value='value'
                option_text='text'
                placeholder='الجنس'
                label='الجنس:'
              />
            </div>
            <div id='name' className=''>
              <IconInput
                icon='/images/user.webp'
                name='name'
                value={userInfo?.name}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='text'
                placeholder='الإسم كامل بالعربية'
                label='الإسم كامل بالعربية:'
              />
            </div>
            <div id='email' className=''>
              <IconInput
                icon='/images/email.webp'
                name='email'
                value={userInfo?.email}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='email'
                placeholder='البريد الإلكتروني '
                label='البريد الإلكتروني:'
              />
            </div>
            <div id='phone' className=''>
              <IconInput
                icon='/images/phone.webp'
                name='phone.mobile'
                value={userInfo?.phone?.mobile}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='phone'
                placeholder='رقم الجوال'
                label='رقم الجوال:'
              />
            </div>
            <div id='facebook' className=''>
              <IconInput
                icon='/images/facebook.webp'
                name='facebook'
                value={userInfo?.facebook}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='text'
                placeholder='فايسبوك'
                label='فايسبوك:'
              />
            </div>
            <div id='instagram' className=''>
              <IconInput
                icon='/images/instagram.webp'
                name='instagram'
                value={userInfo?.instagram}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='text'
                placeholder='انستغرام'
                label='انستغرام:'
              />
            </div>
            <div id='whatsapp' className=''>
              <IconInput
                icon='/images/whatsapp.webp'
                name='whatsapp'
                value={userInfo?.whatsapp}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='text'
                placeholder='واتساب'
                label='واتساب:'
              />
            </div>
          </div>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <DatePicker
              local='ar-DZ'
              label='تاريخ الإزدياد:'
              value={userInfo?.birthDate || new Date()}
            />
            <div id='avatar' className='flex gap-2 justify-center items-center min-w-[250px]'>
              <DropInput
                id='12'
                name='avatar'
                accept='image/*'
                completed={uploadDone?.avatar}
                loader={loadingSppiner?.avatar}
                onChange={(e) =>
                  uploadImage(
                    e,
                    ref,
                    uploadBytes,
                    getDownloadURL,
                    storage,
                    `users/avatar/${userInfo?._id}/`,
                    "userInfo"
                  )
                }
                label='الصورة الشخصية: '
              />
              <div className='pt-4'>
                <div className=' '>
                  {userInfo?.avatar?.length > 1 && (
                    <button
                      name={userInfo?.avatar?.[0]}
                      onClick={(e) => removeSelectAvatar(e, "userInfo")}>
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
                    src={userInfo?.avatar?.[0]}
                    width={70}
                    height={70}
                    alt='avatar'
                  />
                </div>
              </div>
            </div>
            <div id='wilaya' className=''>
              <SelectInput
                name='address.wilaya'
                value={userInfo?.address?.wilaya?.value}
                onChange={(e) => handleSelectInput(e, "userInfo")}
                options={wilaya}
                option_value='value'
                option_text='text'
                placeholder='الولاية'
                label='الولاية:'
              />
            </div>
            <div id='daira' className=''>
              <SelectInput
                name='address.daira'
                value={userInfo?.address?.daira?.value}
                onChange={(e) => handleSelectInput(e, "userInfo")}
                options={daira.filter(
                  (region) => region?.wilaya === userInfo?.address?.wilaya?.value
                )}
                option_value='value'
                option_text='text'
                placeholder='الدائرة'
                label='الدائرة:'
              />
            </div>
            <div id='commune' className=''>
              <SelectInput
                name='address.commune'
                value={userInfo?.address?.commune?.value}
                onChange={(e) => handleSelectInput(e, "userInfo")}
                options={commune.filter(
                  (region) => region?.daira === userInfo?.address?.daira?.value
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
                name='address.street'
                value={userInfo?.address?.street}
                onChange={(e) => handleInputChange(e, "userInfo")}
                type='text'
                placeholder='الشارع، الحي'
                label='الشارع، الحي:'
              />
            </div>
          </div>

          <div className='p-4 text-center mx-auto'>
            <button
              type='submit'
              onClick={() => useStore.setState({ isLoading: true })}
              className='bg-yellow-400 rounded-xl hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2  justify-center items-center text-lg w-full pr-5 p-2.5  dark:border-gray-600  dark:text-black'>
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

export default SignupInputsForm;
