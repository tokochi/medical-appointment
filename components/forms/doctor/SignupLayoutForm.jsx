import SignupInputsForm from "./SignupInputsForm";
import Image from "next/image";
import { useStore } from "@context/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
function SignupLayoutForm() {
  const { handleRulesCheckbox, isRulesChecked, handleSubmitDoctors } = useStore();
  const router = useRouter();
  return (
    <form onSubmit={(e) => handleSubmitDoctors(e, toast, router, signIn)}>
      <SignupInputsForm />
      <div id='divider' className='border-b-[1px] border-gray-600 my-2'></div>
      <div className='flex items-center gap-2'>
        <input
          id='isRulesChecked.first'
          name='isRulesChecked.first'
          checked={isRulesChecked.first}
          onChange={(e) => handleRulesCheckbox(e)}
          type='checkbox'
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        <label
          htmlFor='first-checkbox'
          className='text-sm font-medium text-gray-900 dark:text-gray-300'>
          <div className='flex gap-1'>
            <p>أوافق على</p>
            <p className='text-sky-500'> شروط وأحكام الإستخدام</p>
            <p>في الموقع </p>
          </div>
        </label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          id='isRulesChecked.seconde'
          name='isRulesChecked.seconde'
          checked={isRulesChecked.seconde}
          onChange={(e) => handleRulesCheckbox(e)}
          type='checkbox'
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        <label
          htmlFor='seconde-checkbox'
          className='text-sm font-medium text-gray-900 dark:text-gray-300'>
          أتعهد ان كل المعلومات المقدمة موثوقة و محققة
        </label>
      </div>
      <div className='text-center text-sm flex flex-col gap-2'>
        <button
          type='submit'
          className='bg-yellow-400 hover:bg-yellow-500  focus:ring-2 focus:ring-yellow-700 flex mt-2 gap-2 text-w justify-center items-center text-lg w-full pr-5 p-1  dark:border-gray-600  dark:text-black'>
          تقديم الطلب
          <Image
            className='w-auto h-auto'
            src='/images/send.png'
            width={20}
            height={20}
            alt='input'
          />
        </button>
        سيقوم أحد مستشارينا بالرد عليك بعد تقديم طلبك
      </div>
    </form>
  );
}

export default SignupLayoutForm;
