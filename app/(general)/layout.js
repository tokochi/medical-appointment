import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useStore } from "@context/serverStore";
import ClientSideWrapper from '@components/ClientSideWrapper';
import ThemeProvider from '@components/ThemeProvider';
import StoreInit from '@components/StoreInit';
import GetSession from '@components/GetSession';


  export const Metadata = {
    title: "صحتي تاجي",
    description: "الشبكة الطبية المهنية الأولى",
  };
export default async function RootLayout({ children }) {
  const session = await GetSession()
  const { dir} = useStore.getState()
  useStore.setState({ session });
  const data = {
    session: JSON.stringify(session),
  };
  return (
    <html lang='en' dir={dir} >
      <body className='text-gray-900 dark:text-gray-100 w-full ' >
        {data?.session && <StoreInit {...data} />}
        <ThemeProvider>
        <Header session={session}/>
          <ClientSideWrapper>
            {children}
          </ClientSideWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
