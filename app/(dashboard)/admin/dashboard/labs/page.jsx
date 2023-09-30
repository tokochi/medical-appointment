import StoreInit from "@components/StoreInit";
import LabsTable from "@components/table/LabsTable";
import { useStore } from "@context/serverStore";


async function page() {
  const { fetchLabs } = useStore.getState();
    const data = {
      labs: JSON.stringify(await fetchLabs()),
    };
  return (
    <div className=''>
      <StoreInit {...data} />
      <LabsTable />
    </div>
  );
}

export default page;
