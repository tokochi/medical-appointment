import { useStore } from "@context/serverStore";
import StoreInit from "@components/StoreInit";
import NotificationForm from "@components/forms/settings/admin/NotificationForm";
import GetSession from "@components/GetSession";

export default async function page() {
  const session = await GetSession();
  const { fetchAdmin } = useStore.getState();
  const response = await fetchAdmin(session?._id);
  let data=null;
  if (response) { data = {
    adminInfo: JSON.stringify({
      _id: response?._id,
      notifications: response?.notifications,
    }),
  } }
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>التنبيهـــــات</h1>
      {data?.adminInfo && <StoreInit {...data} />}
      <NotificationForm />
    </div>
  );
}
