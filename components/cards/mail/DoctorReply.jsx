import { DropInput, IconInput, TextInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "@utils/firebase";

function DoctorReply({ id }) {
  const {
    askQuestion,
    handleInputChange,
    loadingSppiner,
    uploadDone,
    handleSubmitMessage,
    uploadImage,
  } = useStore();
  return (
    <div className='card p-4 flex flex-col gap-2'>
      <form className='flex flex-col gap-2' onSubmit={(e) => handleSubmitMessage(e, toast, id)}>
        <h1 className='font-semibold p-2 text-center'>اكتب سؤالك</h1>
        <TextInput
          name='title'
          value={askQuestion?.title}
          onChange={(e) => handleInputChange(e, "askQuestion")}
          type='text'
          label='السؤال:'
          placeholder='عنوان لمشكلتك الصحية'
        />
        <TextareaInput
          name='text'
          rows={5}
          value={askQuestion?.text}
          onChange={(e) => handleInputChange(e, "askQuestion")}
          type='text'
          placeholder='أكتب سؤالك هنا'
        />
        {/* <div className='flex  gap-4'>
          <IconInput
            name='details.weight'
            icon='/images/kg.webp'
            value={askQuestion?.details?.weight}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='number'
            label='الوزن:'
            // placeholder={85}
          />
          <IconInput
            name='details.length'
            icon='/images/cm.webp'
            value={askQuestion?.details?.length}
            onChange={(e) => handleInputChange(e, "askQuestion")}
            type='number'
            label='الطول:'
            // placeholder={180}
          />
        </div> */}
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
        <div className='text-center text-sm mx-auto'>
          <button
            type='submit'
            className='bg-yellow-400 rounded-xl my-2 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            تقديم السؤال
            <Image
              className='w-auto h-auto'
              src='/images/send.webp'
              width={20}
              height={20}
              alt='input'
            />
          </button>
          سيقوم الطبيب بالرد عليك بعد تقديم سؤالك
        </div>
      </form>
    </div>
  );
}

export default DoctorReply