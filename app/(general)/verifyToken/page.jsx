import { useStore } from "@context/serverStore";
import NewPassword from "@components/forms/doctor/NewPassword";

async function page({ searchParams }) {
  const { fetchDoctor } = useStore.getState();
  const doctor = await fetchDoctor(searchParams?.id);
  return (
    <div className='w-full'>
      <NewPassword id={searchParams?.id} email={doctor?.email} />
    </div>
  );
}

export default page;
