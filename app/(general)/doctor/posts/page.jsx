import { useStore } from "@context/serverStore";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ar-dz";
import GetSession from "@components/session/GetSession";
import PostsTable from "@components/table/templates/PostsTable";
 moment().locale("ar-dz");
async function page() {
  const { fetchAppointments } = useStore.getState();
   const session = await GetSession();
  const appointmentsList = await fetchAppointments();
  const appointments = appointmentsList.filter(apoint => apoint?.user?.id === session?._id);
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
<PostsTable/>
    </div>
  );
}

export default page;
