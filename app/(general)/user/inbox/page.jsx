import HealthInfoForm from "@components/forms/user/HealthInfoForm";

async function page() {
  
  return (
    <div className='bg-sky-50 w-full dark:bg-primary m-1 md:m-4 rounded '>
      <HealthInfoForm />
    </div>
  );
}
export default page;
