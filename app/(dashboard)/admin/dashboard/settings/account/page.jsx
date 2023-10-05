import { useStore } from "@context/serverStore";
import AccountForm from "@components/forms/settings/admin/AccountForm";
import StoreInit from "@components/StoreInit";
import GetSession from "@components/GetSession";

export default async function page() {
  const session = await GetSession()
  const { fetchAdmin } = useStore.getState();
  let data = null;
    if (session) {
      data = {
        adminInfo: JSON.stringify(await fetchAdmin(session?._id))
      };
    }
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>حســـــابي</h1>
      {data?.adminInfo && <StoreInit {...data} />}
      <AccountForm />
    </div>
  );
}
