import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import ClientSideWrapper from '@components/utils/ClientSideWrapper';
import { cookies } from 'next/headers'
export const dynamic = 'force-dynamic'
// if (process.env.NODE_ENV !== 'production') {
  // Disable warnings
// console.warn = () => { };
// console.error = () => { };
// }

export const Metadata = {
  title: "صحتي تاجي",
  description: "الشبكة الطبية المهنية الأولى",
};
export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const getCookie = cookieStore?.get('darkTheme')
  let darkTheme = null;
  if (!getCookie || getCookie.value === "false") {
    darkTheme = false;
  } else {
    darkTheme = true;
  }
  return (
    <html lang='en' dir="rtl" className={`${darkTheme ? "dark" : ""}`}>
      <body className='text-gray-900 bg-gray-200 dark:bg-slate-900 dark:text-gray-100 w-full ' >
        <ClientSideWrapper>
          {children}
        </ClientSideWrapper>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
