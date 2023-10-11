import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useStore } from "@context/serverStore";
import ClientSideWrapper from '@components/ClientSideWrapper';
import StoreInit from '@components/StoreInit';
import GetSession from '@components/GetSession';


  export const Metadata = {
    title: "صحتي تاجي",
    description: "الشبكة الطبية المهنية الأولى",
  };
export default async function RootLayout({ children }) {
  const session = await GetSession()
  const { dir, fetchUser, fetchAdmin, fetchDoctor } = useStore.getState()
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
    <html lang='en' dir={dir} >
      <body className='text-gray-900 dark:text-gray-100 w-full flex flex-col justify-between' >
        {data?.session && <StoreInit {...data} />}
        <Header session={currentUser} />
          <ClientSideWrapper>
            {children}
          </ClientSideWrapper>
          <Footer />
      </body>
    </html>
  );
}
