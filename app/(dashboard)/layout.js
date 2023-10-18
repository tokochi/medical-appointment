import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import ClientSideWrapper from '@components/utils/ClientSideWrapper';
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
  return (
    <html lang='ar' dir="rtl"  >
      <body className='text-gray-900 bg-gray-200 dark:bg-slate-900 dark:text-gray-100 w-full ' >
        <ClientSideWrapper>
          {children}
        </ClientSideWrapper>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
