import SettingsSidebar from "@components/settings/SettingsSidebar";

export default function RootLayout({ children }) {
  return (
          <div className="flex gap-1 p-1 items-start md:px-10">
            <SettingsSidebar />
            {children}
          </div>
  );
}
