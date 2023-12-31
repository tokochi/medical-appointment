import StoreInit from "@components/utils/StoreInit";
import HospsTable from "@components/table/HospsTable";
import { useStore } from "@context/serverStore";


async function page() {
  const { fetchHosps } = useStore.getState();
    const data = {
      hosps: JSON.stringify(await fetchHosps()),
    };
  return (
    <div className=''>
      {data?.hosps && <StoreInit {...data} />}
      <HospsTable />
    </div>
  );
}

export default page;
