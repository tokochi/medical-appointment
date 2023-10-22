"use client";
import { useStore } from "@context/store";
import {
  CheckboxInput,
  DropInput,
  MultiSelectInput,
  SelectInput,
  TextInput,
} from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "@components/inputs/DatePicker";
import moment from "moment";
import "moment/locale/ar-dz";
import RadioInput from "@components/inputs/RadioInput";

function HealthInfoForm(props) {
  const {
    userInfo,
    isLoading,
    submitUserUpdateHealthInfo,
    healthInfo,
    chronicDiseases,
    removeItemFromArray,
    removeSelectExam,
    handleSelectChrnoDiseases,
    bloodTypes,
    addedAlergy,
    addedsurgery,
    addedInheritDiseases,
    addedVaccination,
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

  moment().locale("ar-dz");
  const router = useRouter();
  useEffect(
    () =>
      useStore.setState((state) => ({
        userInfo: session,
        healthInfo: session?.healthInfo || state.healthInfo,
      })),
    [session]
  );
  return (
    <div>
      <div id='personal-info' className='card rounded-md '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات الطبية
        </div>
        <form
          onSubmit={(e) => submitUserUpdateHealthInfo(e, toast, router, userInfo?._id)}
          className='flex flex-wrap gap-2 items-start'>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <div id='age-weight-height' className='flex flex-wrap gap-2'>
              <div className='grow shrink basis-[27%] min-w-[80px]'>
                <TextInput
                  name='age'
                  value={healthInfo?.age}
                  onChange={(e) => handleInputChange(e, "healthInfo")}
                  type='number'
                  min={1}
                  max={120}
                  placeholder='35 سنة'
                  label='السًّن:'
                />
              </div>
              <div className='grow shrink basis-[27%] min-w-[80px]'>
                <TextInput
                  name='weight'
                  value={healthInfo?.weight}
                  onChange={(e) => handleInputChange(e, "healthInfo")}
                  type='number'
                  min={1}
                  max={250}
                  placeholder='75 كغ'
                  label='الوزن: (كغ)'
                />
              </div>
              <div className='grow shrink basis-[27%] min-w-[80px]'>
                <TextInput
                  name='height'
                  value={healthInfo?.height}
                  onChange={(e) => handleInputChange(e, "healthInfo")}
                  type='number'
                  min={1}
                  max={350}
                  placeholder='175 سم'
                  label='الطول: (سم)'
                />
              </div>
            </div>
            <div id='blood-type' className=''>
              <SelectInput
                name='bloodType'
                value={healthInfo?.bloodType?.value}
                onChange={(e) => handleSelectInput(e, "healthInfo")}
                options={bloodTypes}
                option_value='value'
                option_text='text'
                placeholder='فصيلة الدم'
                label='فصيلة الدم:'
              />
            </div>
            <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
              أسألـة تخصك
            </div>
            <div id='questions' className='flex flex-col '>
              <div className='flex flex-wrap gap-4 justify-between'>
                <p className=''>هل تعاني من أمراض جلدية مثل الصدفية أو الأكزيما؟</p>
                <div className='flex gap-2 '>
                  <RadioInput
                    name='skinDisease'
                    checked={healthInfo?.questions?.skinDisease}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: {
                            ...state.healthInfo?.questions,
                            skinDisease: e.target.checked,
                          },
                        },
                      }))
                    }
                    type='text'
                    label='نعم'
                  />
                  <RadioInput
                    name='skinDisease'
                    checked={!healthInfo?.questions?.skinDisease}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: {
                            ...state.healthInfo?.questions,
                            skinDisease: !e.target.checked,
                          },
                        },
                      }))
                    }
                    type='text'
                    label='لا'
                  />
                </div>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                <p className=''>هل تدخن أو تتعاطى أي مواد مخدرة؟</p>
                <div className='flex gap-2 '>
                  <RadioInput
                    name='smoking'
                    checked={healthInfo?.questions?.smoking}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: { ...state.healthInfo?.questions, smoking: e.target.checked },
                        },
                      }))
                    }
                    type='text'
                    label='نعم'
                  />
                  <RadioInput
                    name='smoking'
                    checked={!healthInfo?.questions?.smoking}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: { ...state.healthInfo?.questions, smoking: !e.target.checked },
                        },
                      }))
                    }
                    type='text'
                    label='لا'
                  />
                </div>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                <p className=''>هل تعاني من مشكلة تساقط الشعر؟</p>
                <div className='flex gap-2 '>
                  <RadioInput
                    name='hairLose'
                    checked={healthInfo?.questions?.hairLose}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: { ...state.healthInfo?.questions, hairLose: e.target.checked },
                        },
                      }))
                    }
                    type='text'
                    label='نعم'
                  />
                  <RadioInput
                    name='hairLose'
                    checked={!healthInfo?.questions?.hairLose}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: {
                            ...state.healthInfo?.questions,
                            hairLose: !e.target.checked,
                          },
                        },
                      }))
                    }
                    type='text'
                    label='لا'
                  />
                </div>
              </div>
              <div className='flex flex-wrap gap-4 justify-between'>
                <p className=''>هل تعاني من آلام في المفاصل أو العضلات؟</p>
                <div className='flex gap-2 '>
                  <RadioInput
                    name='ArticulationIssue'
                    checked={healthInfo?.questions?.ArticulationIssue}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: {
                            ...state.healthInfo?.questions,
                            ArticulationIssue: e.target.checked,
                          },
                        },
                      }))
                    }
                    type='text'
                    label='نعم'
                  />
                  <RadioInput
                    name='ArticulationIssue'
                    checked={!healthInfo?.questions?.ArticulationIssue}
                    onChange={(e) =>
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          questions: {
                            ...state.healthInfo?.questions,
                            ArticulationIssue: !e.target.checked,
                          },
                        },
                      }))
                    }
                    type='text'
                    label='لا'
                  />
                </div>
              </div>
            </div>
            <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
              الامراض المزمنة
            </div>
            <div id='chrono-disease' className='flex flex-wrap gap-2 '>
              {chronicDiseases.map((disease, index) => (
                <div key={index} className='gorw shrink basis-full md:basis-[45%] lg:basis-[27%] '>
                  <CheckboxInput
                    name='healthInfo.chrnoDiseases'
                    checked={healthInfo?.chrnoDiseases?.find(
                      (item) => item.value === disease.value
                    )}
                    onChange={(e) => handleSelectChrnoDiseases(e, disease, "userInfo")}
                    label={disease.text}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <div id='alergies'>
              <MultiSelectInput
                name='add-alergy'
                value={addedAlergy}
                source={healthInfo}
                onChange={(e) => useStore.setState({ addedAlergy: e.target.value })}
                field='alergies'
                addField='addedAlergy'
                keyValue='healthInfo'
                label='إضافة حساسية:'
                placeholder='حساسية القطط، حساسية الحشرات...'
              />
            </div>
            <div id='inherited-diseases'>
              <MultiSelectInput
                name='inherited-diseases'
                value={addedInheritDiseases}
                source={healthInfo}
                onChange={(e) => useStore.setState({ addedInheritDiseases: e.target.value })}
                field='inheritDiseases'
                addField='addedInheritDiseases'
                keyValue='healthInfo'
                label='الأمراض العائلية المتوارثة:'
                placeholder='الأب:فقر الدم، الأم:سرطان الرئة...'
              />
            </div>
            <div id='vaccinations'>
              <div className='flex flex-col justify-center gap-2'>
                <p className='mb-2 block text-sm font-medium text-gray-900 dark:text-white '>
                  إضافة تلقيحــات :
                </p>
                <div className='flex flex-wrap gap-2 min-w-[250px]'>
                  <div className='grow shrink basis-full md:basis-[27%]'>
                    <TextInput
                      value={addedVaccination?.text}
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedVaccination: { ...state.addedVaccination, text: e.target.value },
                        }))
                      }
                      name='addedVaccination'
                      type='text'
                      label='التلقيح:'
                      placeholder='التلقيح'
                    />
                  </div>
                  <div className='grow shrink basis-full md:basis-[27%]'>
                    <DatePicker
                      local='ar-DZ'
                      label='التوقيت:'
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedVaccination: { ...state.addedVaccination, time: e.value },
                        }))
                      }
                      value={addedVaccination?.time}
                    />
                  </div>
                  <div className='flex items-end gap-1 grow shrink basis-full md:basis-[27%]'>
                    <TextInput
                      value={addedVaccination?.hosp}
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedVaccination: { ...state.addedVaccination, hosp: e.target.value },
                        }))
                      }
                      name='addedVaccination'
                      type='text'
                      label=' العيادة:'
                      placeholder=' العيادة'
                    />
                    <button
                      className='pb-1'
                      onClick={(e) => {
                        e.preventDefault();
                        addedVaccination?.text !== "" &&
                          useStore.setState((state) => ({
                            healthInfo: {
                              ...state.healthInfo,
                              vaccinations: [...state.healthInfo?.vaccinations, addedVaccination],
                            },
                          }));
                        useStore.setState({
                          addedVaccination: { text: "", time: new Date(), hosp: "" },
                        });
                      }}>
                      <Image
                        src='/images/add.webp'
                        className='min-w-[30px]'
                        width={30}
                        height={25}
                        alt='cancel'
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap  gap-2 py-2'>
                {healthInfo?.vaccinations?.map((vaccine, index) => (
                  <div
                    key={index}
                    className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                    <button
                      name={vaccine?.text}
                      onClick={(e) => removeItemFromArray(e, "healthInfo", "vaccinations")}>
                      <Image
                        name={vaccine?.text}
                        src='/images/cancel.webp'
                        width={20}
                        height={15}
                        alt='cancel'
                      />
                    </button>
                    <p>{vaccine?.text + " - "}</p>
                    <p>{moment(vaccine?.time).format("LL") + " -"}</p>
                    <p>{vaccine?.hosp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id='surgeries'>
              <div className='flex flex-col justify-center gap-2'>
                <p className='mb-2 block text-sm font-medium text-gray-900 dark:text-white '>
                  إضافة عملية جراحية:
                </p>
                <div className='flex flex-wrap gap-2 min-w-[250px]'>
                  <div className='grow shrink basis-full md:basis-[27%]'>
                    <TextInput
                      value={addedsurgery?.text}
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedsurgery: { ...state.addedsurgery, text: e.target.value },
                        }))
                      }
                      name='addedsurgery'
                      type='text'
                      label='العملية:'
                      placeholder='العملية'
                    />
                  </div>
                  <div className='grow shrink basis-full md:basis-[27%]'>
                    <DatePicker
                      local='ar-DZ'
                      label='التوقيت:'
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedsurgery: { ...state.addedsurgery, time: e.value },
                        }))
                      }
                      value={addedsurgery?.time}
                    />
                  </div>
                  <div className='flex items-end gap-1 grow shrink basis-full md:basis-[27%]'>
                    <TextInput
                      value={addedsurgery.hosp}
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedsurgery: { ...state.addedsurgery, hosp: e.target.value },
                        }))
                      }
                      name='addedsurgery'
                      type='text'
                      label=' العيادة:'
                      placeholder=' العيادة'
                    />
                    <button
                      className='pb-1'
                      onClick={(e) => {
                        e.preventDefault();
                        addedsurgery?.text !== "" &&
                          useStore.setState((state) => ({
                            healthInfo: {
                              ...state.healthInfo,
                              surgeries: [...state.healthInfo?.surgeries, addedsurgery],
                            },
                          }));
                        useStore.setState({
                          addedsurgery: { text: "", time: new Date(), hosp: "" },
                        });
                      }}>
                      <Image
                        src='/images/add.webp'
                        className='min-w-[30px]'
                        width={30}
                        height={25}
                        alt='cancel'
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap  gap-2 py-2'>
                {healthInfo?.surgeries?.map((surgery, index) => (
                  <div
                    key={index}
                    className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                    <button
                      name={surgery?.text}
                      onClick={(e) => removeItemFromArray(e, "healthInfo", "surgeries")}>
                      <Image
                        name={surgery?.text}
                        src='/images/cancel.webp'
                        width={20}
                        height={15}
                        alt='cancel'
                      />
                    </button>
                    <p>{surgery?.text + " - "}</p>
                    <p>{moment(surgery?.time).format("LL") + " -"}</p>
                    <p>{surgery?.hosp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              id='examinations'
              className='flex flex-col gap-2 justify-center items-center min-w-[250px]'>
              <DropInput
                id='12'
                name='examinations'
                multiple
                accept='application/pdf, .pdf,image/*'
                completed={uploadDone?.examinations}
                loader={loadingSppiner?.examinations}
                onChange={(e) =>
                  uploadImage(
                    e,
                    ref,
                    uploadBytes,
                    getDownloadURL,
                    storage,
                    `users/health/${userInfo?._id}/`,
                    "healthInfo"
                  )
                }
                label='آخر الفحوصات و تحاليل طبية:'
              />
              <div className='flex gap-2'>
                {healthInfo?.examinations?.map((exam, index) => (
                  <div key={index} className=' '>
                    <button name={exam} onClick={(e) => removeSelectExam(e, "healthInfo")}>
                      <svg
                        className='w-6 h-6 z-20 relative top-2 select-none pointer-events-none'
                        viewBox='0 0 24 24'>
                        <path
                          d='M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z'
                          fill='#7D7D7D'
                        />
                      </svg>
                    </button>
                    {exam.includes(".pdf") ? (
                      <div>
                        <svg className='h-[70px] w-[70px]' viewBox='0 0 48 48'>
                          <path fill='#FF5722' d='M40 45L8 45 8 3 30 3 40 13z' />
                          <path fill='#FBE9E7' d='M38.5 14L29 14 29 4.5z' />
                          <path
                            fill='#FFEBEE'
                            d='M15.81 29.5V33H13.8v-9.953h3.391c.984 0 1.77.306 2.355.916s.878 1.403.878 2.379-.29 1.745-.868 2.311S18.175 29.5 17.149 29.5H15.81zM15.81 27.825h1.381c.383 0 .679-.125.889-.376s.314-.615.314-1.094c0-.497-.107-.892-.321-1.187-.214-.293-.501-.442-.861-.447H15.81V27.825zM21.764 33v-9.953h2.632c1.162 0 2.089.369 2.778 1.107.691.738 1.043 1.75 1.057 3.035v1.613c0 1.308-.346 2.335-1.035 3.079C26.504 32.628 25.553 33 24.341 33H21.764zM23.773 24.722v6.61h.602c.67 0 1.142-.177 1.415-.53.273-.353.417-.962.431-1.828v-1.729c0-.93-.13-1.578-.39-1.944-.26-.367-.702-.56-1.326-.578H23.773zM34.807 28.939h-3.124V33h-2.01v-9.953h5.51v1.675h-3.5v2.55h3.124V28.939z'
                          />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        className='rounded-xl w-auto h-auto'
                        src={exam}
                        width={50}
                        height={50}
                        alt='avatar'
                      />
                    )}
                  </div>
                ))}
              </div>
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

export default HealthInfoForm;
