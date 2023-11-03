import SidebarDoctor from "@components/layout/SidebarDoctor";
import GetSession from '@components/session/GetSession';
import { redirect } from "next/navigation";
import { useStore } from "@context/serverStore";

export const Metadata = {
  title: "حسابي",
  description: "صحتي تاجي",
};


export default async function RootLayout({ children }) {
  const session = await GetSession()
  const { fetchDoctor } = useStore.getState()
  if (!session) {
    redirect("/login");
  }
  const currentUser = await fetchDoctor(session?._id);
  if (!currentUser?.isDoctor) {
    redirect("/login");
  }
  return (
    <div className="flex overflow-x-hidden p-1 md:p-2 items-start">
        {/* {data?.session && <StoreInit {...data} />} */}
      <SidebarDoctor />
            {children}
     
</div>
  );
}
