import StoreInit from "@components/StoreInit";
import UsersTable from "@components/table/UsersTable";
import { useStore } from "@context/serverStore";


async function page() {
  const { fetchUsers } = useStore.getState();
    const data = {
      users: JSON.stringify(await fetchUsers()) || [],
    };
  return (
    <div className=''>
      {data && <StoreInit {...data} />}
      <UsersTable />
    </div>
  );
}

export default page;
