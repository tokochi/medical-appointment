import GetSession from "@components/GetSession";
import HeadTitle from "@components/cards/HeadTitle";
import Header from "@components/dashboard/Header";
import Sidebar from "@components/dashboard/Sidebar";
import { redirect } from "next/navigation";
import { useStore } from "@context/serverStore";

export default async function RootLayout({ children }) {
  const session = await GetSession();
  const {  fetchAdmin } = useStore.getState()
  if (!session?.isAdmin) {
    redirect("/admin");
  }
  const currentUser = await fetchAdmin(session._id);
  useStore.setState({ session });
  const data = {
    session: JSON.stringify(currentUser),
  };
  return (
    <div className="flex h-screen overflow-y-auto">
      <div className="flex h-screen overflow-y-auto">
        {data?.session && <StoreInit {...data} />}
          <Sidebar />
        </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="">
          <Header session={currentUser} />
          </div>
          <div className="">
            <HeadTitle />
        </div>
        <div className="flex-1  ">
            {children}
          </div>
          {/* <div className="">
            <Footer />
          </div> */}
        </div>
      </div>
  );
}
