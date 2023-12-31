import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useStore } from "@context/serverStore";
import ClientSideWrapper from '@components/utils/ClientSideWrapper';
import StoreInit from '@components/utils/StoreInit';
import GetSession from '@components/session/GetSession';
import { cookies } from 'next/headers'
export const dynamic = 'force-dynamic'

  export const Metadata = {
    title: "صحتي تاجي",
    description: "الشبكة الطبية المهنية الأولى",
  };
export default async function RootLayout({ children }) {
  const session = await GetSession()
  
  const cookieStore = cookies()
  const { dir, fetchUser, fetchAdmin, fetchDoctor } = useStore.getState()
  const getCookie = cookieStore?.get('darkTheme')
  let darkTheme = null;
  if (!getCookie || getCookie.value === "false") {
    darkTheme = false;
  } else {
    darkTheme = true;
  }
 let currentUser = null;
  if (session) {
    switch (true) {
      case session.isUser:
        currentUser = await fetchUser(session._id);
        break;
        case session.isAdmin:
          currentUser = await fetchAdmin(session._id);
          break;
          case session.isDoctor:
            currentUser = await fetchDoctor(session._id);
            break;
          }
        }
        useStore.setState({ session });
        const data = {
          session: JSON.stringify(currentUser),
        };
      
  return (
    <html lang='en' dir={dir} className={`${darkTheme ? "dark":""}`}>
      <body className={` bg-cover text-gray-900 dark:text-gray-100 bg-gradient-to-l from-gray-200 via-cyan-200 to-cyan-600 dark:bg-gradient-to-b dark:from-[#002b3d] dark:via-[#062235] dark:to-[#002b3d] w-full flex flex-col justify-between` } >
        {data?.session && <StoreInit {...data} />}
        <Header data={JSON.stringify(currentUser)} />
          <ClientSideWrapper>
            {children}
          </ClientSideWrapper>
          <Footer />
      </body>
    </html>
  );
}
