import { useStore } from "@context/store";
import Image from "next/image";
import { CheckboxInput, DropInput, IconInput, SelectInput, TextInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("@components/map/LeafletMap"), {
  ssr: false,
});
function SignupInputsForm(props) {
  const {
    pharmInfo,
    uploadDone,
    loadingSppiner,
    addedSpeciality,
    addedService,
    addSelectAdmin,
    addedAdmins,
    handleStepperButtonClick,
   handleSelectServices,
    removeSelectSpecialities,
    handleInputChange,
    handleSelectInput,
    removeSelectService,
    uploadImage,
    handleCheckbox,
    removeSelectAdmin,
    worksPharms,
    wilaya,
    daira,
    commune,
  } = useStore();
const filtredservices = worksPharms?.filter(
    (service) => !pharmInfo?.services?.some((addedservices) => addedservices?.text === service?.text)
  );

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
          <div id='name' className=''>
            <IconInput
              icon='/images/user.webp'
              name='name'
              value={pharmInfo?.name}
              onChange={(e) => handleInputChange(e, "pharmInfo")}
              type='text'
              placeholder='الإسم بالعربية:'
              label='الإسم بالعربية:'
            />
          </div>
          <div id='add-admin'>
            <div className='flex   items-center gap-2'>
              <TextInput
                value={addedAdmins}
                onChange={(e) => useStore.setState({ addedAdmins: e.target.value })}
                name='admins'
                type='text'
                label='إضافة المشرفين:'
                placeholder='الدكتور عصام شاهر، البروفيسور أحمد منير....'
              />
              <button className='mt-auto py-1' onClick={(e) => addSelectAdmin(e, "pharmInfo")}>
                <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
              </button>
            </div>
            <div className='flex flex-wrap  gap-2 py-2'>
              {pharmInfo?.admins?.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button name={service} onClick={(e) => removeSelectAdmin(e, "pharmInfo")}>
                    <Image
                      name={service?.text}
                      src='/images/cancel.webp'
                      width={20}
                      height={15}
                      alt='cancel'
                    />
                  </button>
                  <p>{service?.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.mobile'
              value={pharmInfo?.phone?.mobile}
              onChange={(e) => handleInputChange(e, "pharmInfo")}
              type='phone'
              placeholder='رقم الجوال'
              label='رقم الجوال:'
            />
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.line2'
              value={pharmInfo?.phone?.line2}
              onChange={(e) => handleInputChange(e, "pharmInfo")}
              type='phone'
              placeholder='رقم الهاتف'
              label='رقم الهاتف ثابت :'
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
                  `pharms/avatar/${pharmInfo?.name}`,
                  "pharmInfo"
                )
              }
              label='الصورة الشخصية: '
            />
          </div>
          <div id='OfficePics' className='min-w-[250px]'>
            <DropInput
              id='13'
              name='officePics'
              accept='image/*'
              multiple={true}
              completed={uploadDone?.officePics}
              loader={loadingSppiner?.officePics}
              onChange={(e) =>
                uploadImage(
                  e,
                  ref,
                  uploadBytes,
                  getDownloadURL,
                  storage,
                  `pharms/workPlace/${pharmInfo?.name}`,
                  "pharmInfo"
                )
              }
              label='صور العيادة: (10 صور حد اقصى):'
            />
          </div>
        </div>
      </div>
      <div
        id='work-info'
        onClick={() => handleStepperButtonClick("btn_2")}
        className='card rounded-md my-4 '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات المهنية
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
          {/* <div id='main-speciality' className=''>
            <SelectInput
              name='speciality'
              value={pharmInfo?.speciality?.value}
              onChange={(e) => handleSelectInput(e, "pharmInfo")}
              options={specialities}
              option_value='value'
              option_text='text'
              placeholder='التخصص'
              label='التخصص  الرئيسي:'
            />
          </div> */}
          <div id='other-specialities' className=''>
            <SelectInput
              name='services'
              onChange={(e) => handleSelectServices(e, "pharmInfo")}
              options={filtredservices}
              option_value='value'
              option_text='text'
              placeholder='خدمات'
              label='خدمات:'
            />
          </div>
          <div id='add-service'>
            <div className='flex   items-center gap-2'>
              <TextInput
                value={addedService}
                onChange={(e) => useStore.setState({ addedService: e.target.value })}
                name='service'
                type='text'
                label='إضافة خدمات:'
                placeholder='مخطط كهربية القلب، الفحص الصحي، علاج التغذية...'
              />
              <button
                className='mt-auto py-1'
                onClick={(e) => {
                  e.preventDefault();
                  addedService !== "" &&
                    useStore.setState((state) => ({
                      pharmInfo: {
                        ...state.pharmInfo,
                        services: [
                          ...state.pharmInfo?.services,
                          { text: addedService, value: addedService },
                        ],
                      },
                    }));
                  useStore.setState({ addedService: "" });
                }}>
                <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
              </button>
            </div>
            <div className='flex flex-wrap  gap-2 py-2'>
              {pharmInfo?.services?.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button name={service?.text} onClick={(e) => removeSelectService(e, "pharmInfo")}>
                    <Image
                      name={service?.text}
                      src='/images/cancel.webp'
                      width={20}
                      height={15}
                      alt='cancel'
                    />
                  </button>
                  <p>{service?.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div id='divider' className='border-b-[1px] border-gray-600 my-2'></div>
          {/* <div id='add-service'>
            <div className='flex   items-center gap-2'>
              <TextInput
                value={addedService}
                onChange={(e) => useStore.setState({ addedService: e.target.value })}
                name='service'
                type='text'
                label='إضافة خدمات:'
                placeholder='مخطط كهربية القلب، الفحص الصحي، علاج التغذية...'
              />
              <button
                className='mt-auto py-1'
                onClick={(e) => {
                  e.preventDefault();
                  addedService !== "" &&
                    useStore.setState((state) => ({
                      pharmInfo: {
                        ...state.pharmInfo,
                        services: [
                          ...state.pharmInfo?.services,
                          { text: addedService, value: addedService },
                        ],
                      },
                    }));
                  useStore.setState({ addedService: "" });
                }}>
                <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
              </button>
            </div>
            <div className='flex flex-wrap  gap-2 py-2'>
              {pharmInfo?.services.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button name={service?.text} onClick={(e) => removeSelectService(e, "pharmInfo")}>
                    <Image
                      name={service?.text}
                      src='/images/cancel.webp'
                      width={20}
                      height={15}
                      alt='cancel'
                    />
                  </button>
                  <p>{service?.text}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div id='other-services' className='flex flex-wrap items-center gap-2'>
            <CheckboxInput
              name='otherServices.homeVisits'
              checked={pharmInfo?.otherServices?.homeVisits}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='تنقل لعلاج منزلي'
              placeholder='خدمات اخرى:'
            />
            <CheckboxInput
              name='otherServices.insurance'
              checked={pharmInfo?.otherServices?.insurance}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='يقبل بطاقة ضمان اجمتاعي'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='otherServices.isFullTimeOpen'
              checked={pharmInfo?.otherServices?.isFullTimeOpen}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='عيادة مفتوحة 24/7'
              placeholder='&nbsp;'
            />
          </div>
          <div id='payment' className='flex flex-wrap items-center gap-2'>
            <CheckboxInput
              name='payment.cash'
              checked={pharmInfo?.payment?.cash}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='نقدا'
              placeholder='طرق الدفع:'
            />
            <CheckboxInput
              name='payment.check'
              checked={pharmInfo?.payment?.check}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='شيك'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='payment.card'
              checked={pharmInfo?.payment?.card}
              onChange={(e) => handleCheckbox(e, "pharmInfo")}
              label='بطاقة صرف'
              placeholder='&nbsp;'
            />
          </div>
        </div>
      </div>
      <div
        id='geo-info'
        onClick={() => handleStepperButtonClick("btn_3")}
        className='card rounded-md my-4'>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          الموقع الجغرافي
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
          <div id='wilaya' className=''>
            <SelectInput
              name='address.wilaya'
              value={pharmInfo?.address?.wilaya?.value}
              onChange={(e) => handleSelectInput(e, "pharmInfo")}
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
              value={pharmInfo?.address?.daira?.value}
              onChange={(e) => handleSelectInput(e, "pharmInfo")}
              options={daira?.filter(
                (region) => region?.wilaya === pharmInfo?.address?.wilaya?.value
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
              value={pharmInfo?.address?.commune?.value}
              onChange={(e) => handleSelectInput(e, "pharmInfo")}
              options={commune.filter(
                (region) => region?.daira === pharmInfo?.address?.daira?.value
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
              value={pharmInfo?.address?.street}
              onChange={(e) => handleInputChange(e, "pharmInfo")}
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
