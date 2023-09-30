import StoreInit from "@components/StoreInit";
import DoctorsTable from "@components/table/DoctorsTable";
import { useStore } from "@context/serverStore";

async function page() {
  const { fetchDoctors } = useStore.getState();
  const data = {
    doctors: JSON.stringify(await fetchDoctors()),
  };
  return (
    <div className=''>
      <StoreInit {...data} />
      <DoctorsTable />
    </div>
  );
}

export default page;
