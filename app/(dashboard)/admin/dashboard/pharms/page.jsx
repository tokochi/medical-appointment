import StoreInit from "@components/StoreInit";
import PharmsTable from "@components/table/PharmsTable";
import { useStore } from "@context/serverStore";

async function page() {
  const { fetchPharms } = useStore.getState();
    const data = {
      pharms: JSON.stringify(await fetchPharms()),
    };
  return (
    <div className=''>
      {data?.pharms && <StoreInit {...data} />}
      <PharmsTable />
    </div>
  );
}

export default page;
