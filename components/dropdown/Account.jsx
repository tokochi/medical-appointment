"use client";
import moment from "moment";
import { useStore } from "@context/store";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Account() {
  const {  session, setDropDowns,dropDowns } = useStore();
  const router = useRouter();

  return (
    <div
      name='account'
      id='dropdown'
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`absolute left-0 top-[35px]  z-[900] max-h-[300px] w-[200px] overflow-y-auto  
       rounded-lg shadow ${!dropDowns?.accountIsOpen && "hidden"} bg-cyan-900`}>
      <ul className=' text-sm text-gray-700 z-[500] dark:text-gray-200'>
        <li
          onClick={() => {
            if (session?.isUser) {
              router.push("/user");
            } else if (session?.isDoctor) {
              router.push("/doctor");
            } else if (session?.isAdmin) {
              router.push("/admin");
            }
            router.refresh();
            setDropDowns("close");
          }}
          className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
          حسـابي
        </li>
        {/* <li
          className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
          حسـابي
        </li> */}
        <li
          onClick={() => {
            signOut();
            router.refresh();
            router.push("/");
            setDropDowns("close");
          }}
          className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
          خروج
        </li>
      </ul>
    </div>
  );
}

export default Account;
