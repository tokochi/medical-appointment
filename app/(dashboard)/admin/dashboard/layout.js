import GetSession from "@components/GetSession";
import HeadTitle from "@components/cards/HeadTitle";
import Header from "@components/dashboard/Header";
import Sidebar from "@components/dashboard/Sidebar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await GetSession();
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
          <Header session={session} />
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
