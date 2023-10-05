import { useStore } from "@context/store";
import { DropInput, IconInput, SelectInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function SignupInputsForm(props) {
  const {
    userInfo,
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
          المعلومات الشخصية
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
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
              icon='/images/Facebook.webp'
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
              icon='/images/Instagram.webp'
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
          <div id='avatar' className='min-w-[250px]'>
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
          </div>
          <div id='wilaya' className=''>
            <SelectInput
              name='address?.wilaya'
              value={userInfo?.otherServices?.value}
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
              name='address?.daira'
              value={userInfo?.address?.daira?.value}
              onChange={(e) => handleSelectInput(e, "userInfo")}
              options={daira.filter(
                (region) => region?.wilaya === userInfo?.otherServices?.value
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
              name='address?.street'
              value={userInfo?.address?.street}
              onChange={(e) => handleInputChange(e, "userInfo")}
              type='text'
              placeholder='الشارع، الحي'
              label='الشارع، الحي:'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupInputsForm;
