import { useStore } from "@context/serverStore";
import AccountForm from "@components/forms/settings/admin/AccountForm";
import StoreInit from "@components/utils/StoreInit";
import GetSession from "@components/session/GetSession";
export default async function AccountPanel() {
  const { fetchAdmin } = useStore.getState()
  const session = GetSession()
  const data = { adminInfo : JSON.stringify(await fetchAdmin(session?._id)) };
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>حســـــابي</h1>
      {data && <StoreInit {...data} />}
      <AccountForm />
    </div>
  );
}
