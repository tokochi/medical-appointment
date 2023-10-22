"use client";
import moment from "moment";
import { useStore } from "@context/store";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Account() {
  const { dropDowns, session } = useStore();
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
        <Link href={session?.isUser ? "/user" : session?.isDoctor ? "/doctor" : "/admin"}>
          <li
            className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1 `}>
            حسـابي
          </li>
        </Link>
        <Link href='/'>
          <li
            onClick={() => {
              signOut();
              router.refresh();
              router.push("/");
            }}
            className={`card flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
            خروج
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Account;
