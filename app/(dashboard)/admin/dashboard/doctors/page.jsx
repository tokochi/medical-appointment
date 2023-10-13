import StoreInit from "@components/utils/StoreInit";
import DoctorsTable from "@components/table/DoctorsTable";
import { useStore } from "@context/serverStore";

async function page() {
  const { fetchDoctors } = useStore.getState();
  const data = {
    doctors: JSON.stringify(await fetchDoctors()) || [],
  };
  return (
    <div className=''>
      {data?.doctors && <StoreInit {...data} />}
      <DoctorsTable />
    </div>
  );
}

export default page;
