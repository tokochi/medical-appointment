import SignupInputsForm from "@components/forms/user/SignupInputsForm";

async function page() {

  return (
    <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
      <SignupInputsForm />
    </div>
  );
}
export default page;
