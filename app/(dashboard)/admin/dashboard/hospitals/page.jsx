import StoreInit from "@components/StoreInit";
import HospsTable from "@components/table/HospsTable";
import { useStore } from "@context/serverStore";


async function page() {
  const { fetchHosps } = useStore.getState();
  const data = {
    hosps: JSON.stringify(await fetchHosps()) || [],
  };
  return (
    <div className=''>
      {data && <StoreInit {...data} />}
      <HospsTable />
    </div>
  );
}

export default page;
