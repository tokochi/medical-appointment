import { useStore } from "@context/serverStore";
import StoreInit from "@components/utils/StoreInit";
import SecurityForm from "@components/forms/settings/admin/SecurityForm";
import GetSession from "@components/session/GetSession";

export default async function page() {
  const session = await GetSession();
  const { fetchAdmin } = useStore.getState();
  const response = await fetchAdmin(session?._id);
 let data=null;
 if (response) { data = {
   adminInfo: JSON.stringify({  _id:response?._id, password: "", verifyPassword:"",oldPassword: "" }),
  }}
 return (
   <div className='flex flex-col gap-4 md:p-4 w-full'>
     <h1 className='text-xl font-semibold grow '>الحمــــــاية</h1>
     {data?.adminInfo && <StoreInit {...data} />}
     <SecurityForm />
   </div>
 );
}
