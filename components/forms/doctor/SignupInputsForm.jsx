import { useStore } from "@context/store";
import { useRef, useEffect } from "react";
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
    doctorInfo,
    uploadDone,
    loadingSppiner,
    addedSpeciality,
    addedService,
    handleStepperButtonClick,
    handleSelectSpecialities,
    removeSelectSpecialities,
    handleInputChange,
    handleSelectInput,
    removeSelectService,
    uploadImage,
    handleCheckbox,
    setWorkTime,
    specialities,
    titles,
    wilaya,
    daira,
    commune,
  } = useStore();

  const filtredspecialities = specialities.filter(
    (specialty) =>
      !doctorInfo?.specialities.some((addedspecialty) => addedspecialty.text === specialty.text)
  );
  const personalInfo_ref = useRef(null);
  const workInfo_ref = useRef(null);
  const geoInfo_ref = useRef(null);
  const workSchedule_ref = useRef(null);
  const documentsUpload_ref = useRef(null);
  useEffect(() => {
    useStore.setState({ personalInfo_ref });
    useStore.setState({ workInfo_ref });
    useStore.setState({ geoInfo_ref });
    useStore.setState({ workSchedule_ref });
    useStore.setState({ documentsUpload_ref });
  }, [personalInfo_ref, workInfo_ref, geoInfo_ref, workSchedule_ref, documentsUpload_ref]);

  return (
    <div>
      <div
        id='personal-info'
        onClick={() => handleStepperButtonClick("btn_1")}
        ref={personalInfo_ref}
        className='card rounded-md '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات الشخصية
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
          <div id='gender' className=''>
            <SelectInput
              name='gender'
              value={doctorInfo?.gender?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
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
          <div id='title' className=''>
            <SelectInput
              name='title'
              value={doctorInfo?.title?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
              options={titles(doctorInfo?.gender?.value)}
              option_value='value'
              option_text='text'
              placeholder='الكنية'
              label='الكنية:'
            />
          </div>
          <div id='name' className=''>
            <IconInput
              icon='/images/user.webp'
              name='name'
              value={doctorInfo?.name}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='text'
              placeholder='الإسم كامل بالعربية'
              label='الإسم كامل بالعربية:'
            />
          </div>
          <div id='email' className=''>
            <IconInput
              icon='/images/email.webp'
              name='email'
              value={doctorInfo?.email}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='email'
              placeholder='البريد الإلكتروني '
              label='البريد الإلكتروني:'
            />
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.mobile'
              value={doctorInfo?.phone?.mobile}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='phone'
              placeholder='رقم الجوال'
              label='رقم الجوال:'
            />
          </div>

          <div id='facebook' className=''>
            <IconInput
              icon='/images/facebook.webp'
              name='facebook'
              value={doctorInfo?.facebook}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='text'
              placeholder='فايسبوك'
              label='فايسبوك:'
            />
          </div>
          <div id='instagram' className=''>
            <IconInput
              icon='/images/instagram.webp'
              name='instagram'
              value={doctorInfo?.instagram}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='text'
              placeholder='انستغرام'
              label='انستغرام:'
            />
          </div>
          <div id='whatsapp' className=''>
            <IconInput
              icon='/images/whatsapp.webp'
              name='whatsapp'
              value={doctorInfo?.whatsapp}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
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
                  `doctors/avatar/${doctorInfo?.email}/`,
                  "doctorInfo"
                )
              }
              label='الصورة الشخصية: '
            />
          </div>
        </div>
      </div>
      <div
        id='work-info'
        onClick={() => handleStepperButtonClick("btn_2")}
        ref={workInfo_ref}
        className='card rounded-md my-4 '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات المهنية
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
          <div id='main-speciality' className=''>
            <SelectInput
              name='speciality'
              value={doctorInfo?.speciality?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
              options={specialities}
              option_value='value'
              option_text='text'
              placeholder='التخصص'
              label='التخصص  الرئيسي:'
            />
          </div>
          <div id='other-specialities' className=''>
            <SelectInput
              name='specialities'
              onChange={(e) => handleSelectSpecialities(e, "doctorInfo")}
              options={filtredspecialities}
              option_value='value'
              option_text='text'
              placeholder='تخصصات أخرى'
              label='تخصصات أخرى:'
            />
            <div className='flex flex-wrap gap-2 py-2'>
              {doctorInfo?.specialities?.map((speciality, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button
                    name={speciality?.text}
                    onClick={(e) => removeSelectSpecialities(e, "doctorInfo")}>
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
                    doctorInfo: {
                      ...state.doctorInfo,
                      specialities: [
                        ...state.doctorInfo?.specialities,
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
                      doctorInfo: {
                        ...state.doctorInfo,
                        services: [
                          ...state.doctorInfo?.services,
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
              {doctorInfo?.services?.map((service, index) => (
                <div
                  key={index}
                  className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                  <button
                    name={service?.text}
                    onClick={(e) => removeSelectService(e, "doctorInfo")}>
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
              checked={doctorInfo?.otherServices?.homeVisits}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='تنقل لعلاج منزلي'
              placeholder='خدمات اخرى:'
            />
            <CheckboxInput
              name='otherServices?.insurance'
              checked={doctorInfo?.otherServices?.insurance}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='يقبل بطاقة ضمان اجمتاعي'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='otherServices?.isFullTimeOpen'
              checked={doctorInfo?.otherServices?.isFullTimeOpen}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='عيادة مفتوحة 24/7'
              placeholder='&nbsp;'
            />
          </div>
          <div id='visit-time' className='flex flex-wrap items-center pt-2 gap-2'>
            <SelectInput
              name='sessionAvrgTime'
              value={doctorInfo?.sessionAvrgTime?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
              options={[
                { text: "15 دقيقة", value: "15min" },
                { text: "30 دقيقة", value: "30min" },
                { text: "45 دقيقة", value: "45min" },
                { text: "1 ساعة", value: "1h" },
                { text: "1 ساعة و نصف", value: "1h 30min" },
                { text: "2 ساعة", value: "2h" },
                { text: "2 ساعات و نصف", value: "2h 30min" },
                { text: "3 ساعات او اكثر", value: "3h or more" },
              ]}
              option_value='value'
              option_text='text'
              placeholder='متوسط مدة الاستشارة'
              label='متوسط مدة الاستشارة:'
            />
          </div>

          <div id='payment' className='flex flex-wrap items-center gap-2'>
            <CheckboxInput
              name='payment.cash'
              checked={doctorInfo?.payment?.cash}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='نقدا'
              placeholder='طرق الدفع:'
            />
            <CheckboxInput
              name='payment.check'
              checked={doctorInfo?.payment?.check}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='شيك'
              placeholder='&nbsp;'
            />
            <CheckboxInput
              name='payment.card'
              checked={doctorInfo?.payment?.card}
              onChange={(e) => handleCheckbox(e, "doctorInfo")}
              label='بطاقة صرف'
              placeholder='&nbsp;'
            />
          </div>
        </div>
      </div>
      <div
        id='geo-info'
        onClick={() => handleStepperButtonClick("btn_3")}
        ref={geoInfo_ref}
        className='card rounded-md my-4'>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          الموقع الجغرافي
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
          <div id='wilaya' className=''>
            <SelectInput
              name='address?.wilaya'
              value={doctorInfo?.otherServices?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
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
              value={doctorInfo?.address?.daira?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
              options={daira.filter(
                (region) => region?.wilaya === doctorInfo?.otherServices?.value
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
              value={doctorInfo?.address?.commune?.value}
              onChange={(e) => handleSelectInput(e, "doctorInfo")}
              options={commune.filter(
                (region) => region?.daira === doctorInfo?.address?.daira?.value
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
              value={doctorInfo?.address?.street}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='text'
              placeholder='الشارع، الحي'
              label='الشارع، الحي:'
            />
          </div>
          <h3 className='text-sm'>
            علِّم موقعك الجغرافي على الخريطة ليتم تحديد الوجهة الى عيادتك:
          </h3>
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
                value={doctorInfo?.googleMap?.lat}
                type='text'
              />
            </div>
            <div className='flex gap-2 items-center'>
              <h3 className='text-sm whitespace-nowrap'>خطوط العرض:</h3>
              <input
                className="className='bg-gray-50  border border-gray-300 text-gray-900 text-sm  placeholder:font-semibold  block w-1/2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '"
                name='longitude'
                readOnly
                value={doctorInfo?.googleMap?.lng}
                type='text'
              />
            </div>
          </div>
          <div id='divider' className='border-b-[1px] border-gray-600 my-2'></div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.line1'
              value={doctorInfo?.phone?.line1}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='phone'
              placeholder='رقم الهاتف'
              label='رقم الهاتف :'
            />
          </div>
          <div id='phone' className=''>
            <IconInput
              icon='/images/phone.webp'
              name='phone.line2'
              value={doctorInfo?.phone?.line2}
              onChange={(e) => handleInputChange(e, "doctorInfo")}
              type='phone'
              placeholder='رقم الهاتف'
              label='رقم الهاتف ثابت :'
            />
          </div>
        </div>
      </div>
      <div
        id='work-schedule'
        onClick={() => handleStepperButtonClick("btn_4")}
        ref={workSchedule_ref}
        className='card rounded-md my-4'>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          برنماج العمل
        </div>
        <div className='p-2 '>
          <table className='min-w-[280px] text-sm lg:text-base'>
            <thead>
              <tr>
                <th className=' text-center text-yellow-600 p-2'>اليوم</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>الإفتتاح</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>الإغلاق</th>
                <th className='w-1/3 text-center text-yellow-600 p-2'>الوضع</th>
              </tr>
            </thead>
            <tbody>
              {doctorInfo?.workTime.map((date, index) => (
                <tr key={index} className='text-center p-2'>
                  <td className='text-center p-2  rounded-md '>{date?.dayAR}</td>
                  <td>
                    <div id='from' className={`${date.state === "close" && "hidden"}`}>
                      <SelectInput
                        day={date?.day}
                        name='from'
                        value={date?.from}
                        onChange={(e) => setWorkTime(e)}
                        options={[
                          { text: "🕒6:00", value: "06:00" },
                          { text: "🕒6:30", value: "06:30" },
                          { text: "🕒7:00", value: "07:00" },
                          { text: "🕒7:30", value: "07:30" },
                          { text: "🕒8:00", value: "08:00" },
                          { text: "🕒8:30", value: "08:30" },
                          { text: "🕒9:00", value: "09:00" },
                          { text: "🕒9:30", value: "09:30" },
                          { text: "🕒10:00", value: "10:00" },
                          { text: "🕒10:30", value: "10:30" },
                          { text: "🕒11:00", value: "11:00" },
                        ]}
                        option_value='value'
                        option_text='text'
                      />
                    </div>
                  </td>
                  <td>
                    <div className={`${date?.state === "close" && "hidden"}`}>
                      <SelectInput
                        day={date?.day}
                        name='to'
                        value={date?.to}
                        onChange={(e) => setWorkTime(e)}
                        options={[
                          { text: "🕒15:30", value: "15:30" },
                          { text: "🕒16:00", value: "16:00" },
                          { text: "🕒16:30", value: "16:30" },
                          { text: "🕒17:00", value: "17:00" },
                          { text: "🕒17:30", value: "17:30" },
                          { text: "🕒18:00", value: "18:00" },
                          { text: "🕒18:30", value: "18:30" },
                          { text: "🕒19:00", value: "19:00" },
                          { text: "🕒19:30", value: "19:30" },
                        ]}
                        option_value='value'
                        option_text='text'
                      />
                    </div>
                  </td>
                  <td>
                    <div className=''>
                      <SelectInput
                        day={date?.day}
                        name='state'
                        value={date?.state}
                        onChange={(e) => setWorkTime(e)}
                        options={[
                          { text: "يشتغل", value: "open" },
                          { text: "مغلق", value: "close" },
                        ]}
                        option_value='value'
                        option_text='text'
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id='documents-upload'
        onClick={() => handleStepperButtonClick("btn_5")}
        ref={documentsUpload_ref}
        className='card rounded-md my-4'>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          تحميل وثائق
        </div>
        <div className='p-2 flex flex-col gap-2 justify-center'>
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
                  `doctors/workPlace/${doctorInfo?.email}/`,
                  "doctorInfo"
                )
              }
              label='صور العيادة: (10 صور حد اقصى):'
            />
          </div>
          <div id='proofPics' className='min-w-[250px]'>
            <h3 className='text-sm'>الكفائة مهنية:</h3>
            <DropInput
              id='14'
              name='proofPics'
              accept='application/pdf, .pdf,image/*'
              multiple={true}
              completed={uploadDone?.proofPics}
              loader={loadingSppiner?.proofPics}
              onChange={(e) =>
                uploadImage(
                  e,
                  ref,
                  uploadBytes,
                  getDownloadURL,
                  storage,
                  `doctors/proof/${doctorInfo?.email}/`,
                  "doctorInfo"
                )
              }
              label='يرجى ارسال بطاقة عملك المهنية أو رخصة مزاولة مهنة الطب للتأكد من صحة المعلومات
                    المقدمة.'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupInputsForm;
