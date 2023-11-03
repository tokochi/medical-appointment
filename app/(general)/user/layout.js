import SidebarUser from "@components/layout/SidebarUser";
import GetSession from '@components/session/GetSession';
import { redirect } from "next/navigation";
import { useStore } from "@context/serverStore";




export const Metadata = {
  title: "حسابي",
  description: "صحتي تاجي",
};



export default async function RootLayout({ children }) {
  const session = await GetSession()
  const { fetchUser } = useStore.getState()
  if (!session) {
    redirect("/login");
  }
  const currentUser = await fetchUser(session._id);
  if (!currentUser?.isUser) {
    redirect("/login");
  }
  return (
    <div className="flex overflow-x-hidden p-1 md:p-2 items-start">
        {/* {data?.session && <StoreInit {...data} />} */}
      <SidebarUser />
            {children}
     
</div>
  );
}
