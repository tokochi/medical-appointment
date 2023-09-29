import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useStore } from "@context/store";
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ClientSideWrapper from '@components/ClientSideWrapper';
import ThemeProvider from '@components/ThemeProvider';
import StoreInit from '@components/StoreInit';

  export const Metadata = {
    title: "صحتي تاجي",
    description: "الشبكة الطبية المهنية الأولى",
  };
export default async function RootLayout({ children }) {
  const session = await getServerSession(options)
  const { dir, fetchDoctors, fetchQuestions, fetchPosts, fetchPharms, fetchLabs, fetchHosps } = useStore.getState()
  useStore.setState({ session });
  const data = {
    // doctors: JSON.stringify(await fetchDoctors()),
    // questions: JSON.stringify(await fetchQuestions()),
    // posts: JSON.stringify(await fetchPosts()),
    // pharms: JSON.stringify(await fetchPharms()),
    // labs: JSON.stringify(await fetchLabs()),
    // hosps: JSON.stringify(await fetchHosps()),
    session: JSON.stringify(await getServerSession(options)),
  };
  return (
    <html lang='en' dir={dir} >
      <body className='text-gray-900 dark:text-gray-100 w-full ' >
        <StoreInit {...data} />
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
