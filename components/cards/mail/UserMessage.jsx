import { DropInput, IconInput, TextInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "@utils/firebase";

function UserMessage({ id }) {
  const {
    messageToSend,
    handleInputChange,
    loadingSppiner,
    uploadDone,
    handleSubmitMessage,
    uploadImage,
  } = useStore();
  return (
    <div className='card p-4 flex flex-col gap-2'>
      <form className='flex flex-col gap-2' onSubmit={(e) => handleSubmitMessage(e, toast, id,"doctors")}>
        <h1 className='font-semibold p-2 text-center'>اكتب رسالتك</h1>
        <TextInput
          name='title'
          value={messageToSend?.title}
          onChange={(e) => handleInputChange(e, "messageToSend")}
          type='text'
          label='السؤال:'
          placeholder='عنوان رسالتك '
        />
        <TextareaInput
          name='text'
          rows={5}
          value={messageToSend?.text}
          onChange={(e) => handleInputChange(e, "messageToSend")}
          type='text'
          placeholder='أكتب رسالتك هنا'
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
              `questions/${messageToSend?.title}/`,
              "messageToSend"
            )
          }
          label='ملفات مرفقة:'
        />
        <div className='text-center text-sm mx-auto'>
          <button
            type='submit'
            className='bg-yellow-400 rounded-xl my-2 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
            إرســال
            <svg className='w-5 h-5' viewBox='0 0 48 48'>
              <path
                fill='#cfd8dc'
                d='M40,9H8c-2.209,0-4,1.79-4,4v20c0,2.208,1.791,4,4,4h32c2.209,0,4-1.792,4-4V13 C44,10.79,42.209,9,40,9z'
              />
              <path
                fill='#78909c'
                d='M24,25.529L4.385,11.314C4.144,11.827,4,12.395,4,12.999v0.505L24,28l20-14.496V13 c0-0.605-0.144-1.173-0.385-1.687L24,25.529z'
              />
              <path fill='#2196f3' d='M46 37L37 29 37 45z' />
              <path fill='#2196f3' d='M25 34H38V40H25z' />
            </svg>
          </button>
          سيقوم الطبيب بالرد عليك بعد تقديم رسالتك
        </div>
      </form>
    </div>
  );
}

export default UserMessage;