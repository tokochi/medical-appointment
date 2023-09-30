import HeadTitle from "@components/cards/HeadTitle";
import Header from "@components/dashboard/Header";
import Sidebar from "@components/dashboard/Sidebar";
import { useStore } from "@context/serverStore";
import { redirect } from "next/navigation";

export default function RootLayout({ children }) {
  const {  session } = useStore.getState();
  if (!session?.isAdmin) {
    redirect("/admin");
  }
  return (
    <div className="flex h-screen overflow-y-auto">
      <div className="flex h-screen overflow-y-auto">
          <Sidebar />
        </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="">
            <Header />
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
