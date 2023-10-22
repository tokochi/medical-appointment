import { DropInput,  TextInput, TextareaInput } from "@components/inputs";
import Image from "next/image";
import { useStore } from "@context/store";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "@utils/firebase";

function UserMessage({ id }) {
  const {
    messageToSend,
    isLoading,
    handleInputChange,
    loadingSppiner,
    uploadDone,
    handleSubmitMessage,
    errorInput,
    uploadImage,
  } = useStore();
  return (
    <div className='card p-4 flex flex-col gap-2'>
      <form
        className='flex flex-col gap-2'
        onSubmit={(e) => handleSubmitMessage(e, toast, id, "doctors")}>
        <h1 className='font-semibold p-2 text-center'>اكتب رسالتك</h1>
        <TextInput
          name='title'
          value={messageToSend?.title}
          onChange={(e) => handleInputChange(e, "messageToSend")}
          type='text'
          error={errorInput.title}
          label='السؤال:'
          placeholder='عنوان رسالتك '
        />
        <TextareaInput
          name='text'
          rows={5}
          value={messageToSend?.text}
          error={errorInput.text}
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
              `inbox/users-messages/${messageToSend?.title}/`,
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
            {isLoading ? (
              <svg className='w-4 h-4 animate-spin fill-cyan-900' viewBox='0 0 24 24'>
                <path d='M12,1C5.925,1,1,5.925,1,12s4.925,11,11,11s11-4.925,11-11S18.075,1,12,1z M12.198,20.806c-2.87,0-5.567-1.405-7.215-3.76c-0.316-0.452-0.207-1.075,0.246-1.393c0.455-0.316,1.077-0.206,1.393,0.246c1.274,1.819,3.359,2.906,5.577,2.906c3.75,0,6.802-3.051,6.802-6.802c0-3.525-2.749-6.504-6.259-6.781c-0.551-0.044-0.962-0.525-0.918-1.076c0.044-0.55,0.522-0.957,1.076-0.918C17.441,3.588,21,7.442,21,12.004C21,16.857,17.052,20.806,12.198,20.806z' />
              </svg>
            ) : (
              <Image
                className='w-auto h-auto'
                src='/images/send.webp'
                width={20}
                height={20}
                alt='input'
              />
            )}
          </button>
          سيقوم الطبيب بالرد عليك بعد تقديم رسالتك
        </div>
      </form>
    </div>
  );
}

export default UserMessage;