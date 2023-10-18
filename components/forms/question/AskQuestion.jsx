"use client";
import { DropInput, IconInput, SelectInput, TextInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "@utils/firebase";
import { useRouter } from "next/navigation";
function AskQuestion() {
  const {
    askQuestion,
    handleInputChange,
    loadingSppiner,
    uploadDone,
    medicalSpecialties,
    handleSelectInput,
    uploadImage,
    errorInput,
    handleSubmitQuestion,
  } = useStore();
    const router = useRouter();
  return (
    <div className='card m-1 flex flex-col gap-2'>
      <form className='flex flex-col  p-2 gap-2' onSubmit={(e) => handleSubmitQuestion(e, toast,router)}>
        <h1 className='font-semibold p-2 text-center'>اكتب سؤالك</h1>
        <SelectInput
          name='speciality'
          value={askQuestion?.speciality?.value}
          onChange={(e) => {
            useStore.setState({ errorInput: { speciality: false } });
            const selectedIndex = e.target?.selectedIndex;
            const selectedText = e.target?.options[selectedIndex]?.text;
            const selectedTag = e.target?.options[selectedIndex]?.getAttribute('tag');
            useStore.setState((state) => ({
              askQuestion: {
                ...state.askQuestion,
                speciality: { value: e.target.value, text: selectedText, tag: selectedTag },
              },
            }));
          }}
          options={medicalSpecialties}
          error={errorInput.speciality}
          option_value='value'
          option_text='text'
          placeholder='الفئة'
          label='الفئة:'
        />
        <TextInput
          name='title'
          value={askQuestion?.title}
          onChange={(e) => handleInputChange(e, "askQuestion")}
          error={errorInput.title}
          type='text'
          label='السؤال:'
          placeholder='عنوان لمشكلتك الصحية'
        />
        <TextareaInput
          name='text'
          rows={5}
          value={askQuestion?.text}
          onChange={(e) => handleInputChange(e, "askQuestion")}
          error={errorInput.text}
          type='text'
          placeholder='أكتب سؤالك هنا'
        />
        <DropInput
          id='12'
          name='files'
          accept='application/pdf, .pdf,image/*'
          multiple={true}
          completed={uploadDone?.files}
          loader={loadingSppiner?.files}
          onChange={(e) =>
            uploadImage(
              e,
              ref,
              uploadBytes,
              getDownloadURL,
              storage,
              `questions/${askQuestion?.title}/`,
              "askQuestion"
            )
          }
          label='ملفات مرفقة:'
        />
        <div className='text-center text-sm flex flex-col gap-2'>
          <button
            type='submit'
            className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            تقديم السؤال
            <Image
              className='w-auto h-auto'
              src='/images/send.webp'
              width={20}
              height={20}
              alt='input'
            />
          </button>
          سيقوم أحد الأطباء بالرد عليك بعد تقديم سؤالك
        </div>
      </form>
    </div>
  );
}

export default AskQuestion;
