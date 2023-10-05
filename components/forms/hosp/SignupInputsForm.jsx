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
    hospInfo,
    uploadDone,
    loadingSppiner,
    addedSpeciality,
    addedService,
    addSelectAdmin,
    addedAdmins,
    handleStepperButtonClick,
    handleSelectSpecialities,
    removeSelectSpecialities,
    handleInputChange,
    handleSelectInput,
    removeSelectService,
    medicalSpecialties,
    uploadImage,
    handleCheckbox,
    removeSelectAdmin,
    specialities,
    wilaya,
    daira,
    commune,
  } = useStore();
console.log(addedAdmins);
  const filtredspecialities = specialities.filter(
    (specialty) =>
      !hospInfo?.specialities?.some((addedspecialty) => addedspecialty.text === specialty.text)
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
              value={hospInfo?.name}
              onChange={(e) => handleInputChange(e, "hospInfo")}
              type='text'
              placeholder='الإسم بالعربية'
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
              <button className='mt-auto py-1' onClick={(e) => addSelectAdmin(e, "hospInfo")}>
                <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
              </button>
            </div>
            <div className='flex flex-wrap  gap-2 py-2'>
              {hospInfo?.admins.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button name={service} onClick={(e) => removeSelectAdmin(e, "hospInfo")}>
                    <Image
                      name={service}
                      src='/images/cancel.webp'
                      width={20}
                      height={15}
                      alt='cancel'
                    />
                  </button>
                  <p>{service}</p>
                </div>
              ))}
            </div>
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.mobile'
              value={hospInfo?.phone?.mobile}
              onChange={(e) => handleInputChange(e, "hospInfo")}
              type='phone'
              placeholder='رقم الجوال'
              label='رقم الجوال:'
            />
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.line2'
              value={hospInfo?.phone?.line2}
              onChange={(e) => handleInputChange(e, "hospInfo")}
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
                  `hosps/avatar/${hospInfo?.name}`,
                  "hospInfo"
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
                  `hosps/workPlace/${hospInfo?.name}`,
                  "hospInfo"
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
          <div id='main-speciality' className=''>
            <SelectInput
              name='speciality'
              value={hospInfo?.speciality?.value}
              onChange={(e) => handleSelectInput(e, "hospInfo")}
              options={medicalSpecialties}
              option_value='value'
              option_text='text'
              placeholder='التخصص'
              label='التخصص  الرئيسي:'
            />
          </div>
          <div id='other-specialities' className=''>
            <SelectInput
              name='specialities'
              onChange={(e) => handleSelectSpecialities(e, "hospInfo")}
              options={filtredspecialities}
              option_value='value'
              option_text='text'
              placeholder='تخصصات أخرى'
              label='تخصصات أخرى:'
            />
            <div className='flex flex-wrap gap-2 py-2'>
              {hospInfo?.specialities?.map((speciality, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button
                    name={speciality?.text}
                    onClick={(e) => removeSelectSpecialities(e, "hospInfo")}>
                    <Image
                      name={speciality?.text}
                      src='/images/cancel.webp'
                      width={20}
                      height={15}
                      alt='cancel'
                    />
                  </button>
                  <p>{speciality?.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div id='add-speciality' className='flex items-center gap-2'>
            <TextInput
              value={addedSpeciality}
              onChange={(e) => useStore.setState({ addedSpeciality: e.target.value })}
              name='add-speciality'
              type='text'
              label='إضافة تخصصات أخرى'
              placeholder='إضافة تخصصات أخرى'
            />
            <button
              className='mt-auto py-1'
              onClick={(e) => {
                e.preventDefault();
                addedSpeciality !== "" &&
                  useStore.setState((state) => ({
                    hospInfo: {
                      ...state.hospInfo,
                      specialities: [
                        ...state.hospInfo?.specialities,
                        { text: addedSpeciality, value: addedSpeciality },
                      ],
                    },
                  }));
                useStore.setState({ addedSpeciality: "" });
              }}>
              <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
            </button>
          </div>
          <div id='divider' className='border-b-[1px] border-gray-600 my-2'></div>
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
                      hospInfo: {
                        ...state.hospInfo,
                        services: [
                          ...state.hospInfo?.services,
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
              {hospInfo?.services?.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button name={service?.text} onClick={(e) => removeSelectService(e, "hospInfo")}>
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
          <div id='other-services' className='flex flex-wrap items-center gap-2'>
            <CheckboxInput
              name='otherServices?.homeVisits'
              checked={hospInfo?.otherServices?.homeVisits}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
              label='تنقل لعلاج منزلي'
              placeholder='خدمات اخرى:'
            />
            <CheckboxInput
              name='otherServices?.insurance'
              checked={hospInfo?.otherServices?.insurance}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
              label='يقبل بطاقة ضمان اجمتاعي'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='otherServices?.isFullTimeOpen'
              checked={hospInfo?.otherServices?.isFullTimeOpen}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
              label='عيادة مفتوحة 24/7'
              placeholder='&nbsp;'
            />
          </div>
          <div id='payment' className='flex flex-wrap items-center gap-2'>
            <CheckboxInput
              name='payment.cash'
              checked={hospInfo?.payment?.cash}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
              label='نقدا'
              placeholder='طرق الدفع:'
            />
            <CheckboxInput
              name='payment.check'
              checked={hospInfo?.payment?.check}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
              label='شيك'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='payment.card'
              checked={hospInfo?.payment?.card}
              onChange={(e) => handleCheckbox(e, "hospInfo")}
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
              name='address?.wilaya'
              value={hospInfo?.otherServices?.value}
              onChange={(e) => handleSelectInput(e, "hospInfo")}
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
              value={hospInfo?.address?.daira?.value}
              onChange={(e) => handleSelectInput(e, "hospInfo")}
              options={daira.filter((region) => region?.wilaya === hospInfo?.otherServices?.value)}
              option_value='value'
              option_text='text'
              placeholder='الدائرة'
              label='الدائرة:'
            />
          </div>
          <div id='commune' className=''>
            <SelectInput
              name='address?.commune'
              value={hospInfo?.address?.commune?.value}
              onChange={(e) => handleSelectInput(e, "hospInfo")}
              options={commune.filter(
                (region) => region?.daira === hospInfo?.address?.daira?.value
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
              value={hospInfo?.address?.street}
              onChange={(e) => handleInputChange(e, "hospInfo")}
              type='text'
              placeholder='الشارع، الحي'
              label='الشارع، الحي:'
            />
          </div>
          <h3 className='text-sm'>علِّم موقعك الجغرافي على الخريطة ليتم تحديد الوجهة :</h3>
          <div id='map' className='min-w-[260px] h-[300px] lg:h-[500px]'>
            <LeafletMap />
          </div>
          <div id='coordinates' className='flex flex-wrap gap-2'>
            <div className='flex gap-2 items-center'>
              <h3 className='text-sm whitespace-nowrap'>خطوط الطول:</h3>
              <input
                className="className='bg-gray-50  border border-gray-300 text-gray-900 text-sm  placeholder:font-semibold  block w-1/2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '"
                name='latitude'
                readOnly
                value={hospInfo?.googleMap?.lat}
                type='text'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <h3 className='text-sm whitespace-nowrap'>خطوط العرض:</h3>
              <input
                className="className='bg-gray-50  border border-gray-300 text-gray-900 text-sm  placeholder:font-semibold  block w-1/2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '"
                name='longitude'
                readOnly
                value={hospInfo?.googleMap?.lng}
                type='text'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupInputsForm;
