import SidebarDoctor from "@components/layout/SidebarDoctor";


export default async function RootLayout({ children }) {
 
  return (
    <div className="flex overflow-x-hidden p-1 md:p-2 items-start">
        {/* {data?.session && <StoreInit {...data} />} */}
      <SidebarDoctor />
            {children}
     
</div>
  );
}
