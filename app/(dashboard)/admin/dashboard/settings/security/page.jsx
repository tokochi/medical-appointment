import { useStore } from "@context/serverStore";
import StoreInit from "@components/StoreInit";
import SecurityForm from "@components/forms/settings/admin/SecurityForm";

export default async function page() {
  const { fetchAdmin, session } = useStore.getState();
  const response = await fetchAdmin(session?._id);
 let data;
  if (response) { data = {
    adminInfo: JSON.stringify({  _id:response._doc._id, password: "", verifyPassword:"",oldPassword: "" }),
  }; };
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>الحمــــــاية</h1>
      {data && <StoreInit {...data} />}
      <SecurityForm />
    </div>
  );
}
