import Appearance from "@components/forms/settings/admin/Appearance";

export default async function page() {
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>المظهــــر</h1>
      <Appearance />
    </div>
  );
}
