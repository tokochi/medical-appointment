import SidebarUser from "@components/layout/SidebarUser";


export default async function RootLayout({ children }) {
 
  return (
    <div className="flex overflow-x-hidden p-1 md:p-2 items-start">
        {/* {data?.session && <StoreInit {...data} />} */}
      <SidebarUser />
            {children}
     
</div>
  );
}
