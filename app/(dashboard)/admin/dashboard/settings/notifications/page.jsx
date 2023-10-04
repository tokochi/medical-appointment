import { useStore } from "@context/serverStore";
import StoreInit from "@components/StoreInit";
import NotificationForm from "@components/forms/settings/admin/NotificationForm";

export default async function page() {
  const { fetchAdmin, session } = useStore.getState();
  const response = await fetchAdmin(session?._id);
 let data;
  if (response) { data = {
    adminInfo: JSON.stringify({
      _id: response._doc._id,
      notifications: response._doc?.notifications,
    }),
  }; };
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>التنبيهـــــات</h1>
      {data && <StoreInit {...data} />}
      <NotificationForm />
    </div>
  );
}
