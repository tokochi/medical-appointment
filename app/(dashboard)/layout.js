import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import { useStore } from "@context/serverStore";
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';
import ClientSideWrapper from '@components/ClientSideWrapper';
import StoreInit from '@components/StoreInit';
import Footer from '@components/dashboard/Footer';


export const Metadata = {
  title: "صحتي تاجي",
  description: "الشبكة الطبية المهنية الأولى",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(options)
  const { dir } = useStore.getState()
  useStore.setState({ session: session?.user?._doc });
  const data = {
    session: JSON.stringify(session?.user?._doc),
  };
  return (
    <html lang='en' dir={dir}  >
      <body className='text-gray-900 bg-white dark:bg-slate-800 dark:text-gray-100 w-full ' >
        <StoreInit {...data} />
          <ClientSideWrapper>
            {children}
          </ClientSideWrapper>
          {/* <Footer /> */}
      </body>
    </html>
  );
}
