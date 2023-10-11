"use client";
import { useStore } from "@context/store";
import { CheckboxInput, DropInput, IconInput, SelectInput, TextInput } from "@components/inputs";
import { storage } from "@utils/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "@components/inputs/DatePicker";
import moment from "moment";
import "moment/locale/ar-dz";

function HealthInfoForm(props) {
  const {
    userInfo,
    isLoading,
    healthInfo,
    chronicDiseases,
    removeItemFromArray,
    handleSelectChrnoDiseases,
    bloodTypes,
    addedAlergy,
    addedsurgery,
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
  console.log("🚀 ~ healthInfo:", healthInfo);
  moment().locale("ar-dz");
  const router = useRouter();
  useEffect(() => useStore.setState({ userInfo: session }), [session]);
  return (
    <div>
      <div id='personal-info' className='card rounded-md '>
        <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
          المعلومات الطبية
        </div>
        <form
          onSubmit={(e) => handleSubmitUserUpdate(e, toast, router, userInfo?._id)}
          className='flex flex-wrap gap-2 items-start'>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <div className='flex flex-wrap gap-2'>
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
            <div className=''></div>
            <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
              الامراض المزمنة
            </div>
            <div className='flex flex-wrap gap-2 '>
              {chronicDiseases.map((disease) => (
                <div className='gorw shrink basis-full md:basis-[45%] lg:basis-[27%] '>
                  <CheckboxInput
                    name='healthInfo.chrnoDiseases'
                    checked={healthInfo?.chrnoDiseases.find((item) => item.value === disease.value)}
                    onChange={(e) => handleSelectChrnoDiseases(e, disease, "userInfo")}
                    label={disease.text}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='grow shrink basis-[45%] p-2 flex flex-col gap-2 justify-center'>
            <div id='alergies'>
              <div className='flex items-center gap-2'>
                <TextInput
                  value={addedAlergy}
                  onChange={(e) => useStore.setState({ addedAlergy: e.target.value })}
                  name='add-alergy'
                  type='text'
                  label='إضافة حساسية:'
                  placeholder='إضافة حساسية '
                />
                <button
                  className='mt-auto py-1'
                  onClick={(e) => {
                    e.preventDefault();
                    addedAlergy !== "" &&
                      useStore.setState((state) => ({
                        healthInfo: {
                          ...state.healthInfo,
                          alergies: [
                            ...state.healthInfo?.alergies,
                            { text: addedAlergy, value: addedAlergy },
                          ],
                        },
                      }));
                    useStore.setState({ addedAlergy: "" });
                  }}>
                  <Image src='/images/add.webp' width={30} height={25} alt='cancel' />
                </button>
              </div>
              <div className='flex flex-wrap  gap-2 py-2'>
                {healthInfo?.alergies?.map((alergy, index) => (
                  <div
                    key={index}
                    className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
                    <button
                      name={alergy?.text}
                      onClick={(e) => removeItemFromArray(e, "healthInfo", "alergies")}>
                      <Image
                        name={alergy?.text}
                        src='/images/cancel.webp'
                        width={20}
                        height={15}
                        alt='cancel'
                      />
                    </button>
                    <p>{alergy?.text}</p>
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
                      value={addedsurgery?.name}
                      onChange={(e) =>
                        useStore.setState((state) => ({
                          addedsurgery: { ...state.addedsurgery, name: e.target.value },
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
                        addedsurgery?.name !== "" &&
                          useStore.setState((state) => ({
                            healthInfo: {
                              ...state.healthInfo,
                              surgeries: [...state.healthInfo?.surgeries, addedsurgery],
                            },
                          }));
                        useStore.setState({
                          addedsurgery: { name: "", time: new Date(), hosp: "" },
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
                      name={surgery?.name}
                      onClick={(e) => removeItemFromArray(e, "healthInfo", "surgeries")}>
                      <Image
                        name={surgery?.name}
                        src='/images/cancel.webp'
                        width={20}
                        height={15}
                        alt='cancel'
                      />
                    </button>
                    <p>{surgery?.name + " - "}</p>
                    <p>{moment(surgery?.time).format("LL") + " -"}</p>
                    <p>{surgery?.hosp}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id='blood-type' className=''>
              <SelectInput
                name='bloodType'
                value={healthInfo?.bloodType.value}
                onChange={(e) => handleSelectInput(e, "healthInfo")}
                options={bloodTypes}
                option_value='value'
                option_text='text'
                placeholder='فصيلة الدم'
                label='فصيلة الدم:'
              />
            </div>
          </div>
          <div className=' p-4  text-center mx-auto  flex flex-col gap-2'>
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
