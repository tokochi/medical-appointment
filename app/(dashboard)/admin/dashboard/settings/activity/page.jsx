import { useStore } from "@context/serverStore";
import StoreInit from "@components/StoreInit";
import Activity from "@components/forms/settings/admin/Activity";

export default async function Company() {
  const { fetchActivity } = useStore.getState();
  const response = await fetchActivity();
  let data;
  if(response){data = { activity: JSON.stringify(response) };}
  return (
    <div className='w-full overflow-hidden'>
      <h1 className='text-xl font-semibold grow '>النشاطـــات</h1>
      {data && <StoreInit {...data} />}
      <Activity />
    </div>
  );
}
