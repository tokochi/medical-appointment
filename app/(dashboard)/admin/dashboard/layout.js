"use client";
import Modal from "@components/Modal";
import HeadTitle from "@components/cards/HeadTitle";
import Footer from "@components/dashboard/Footer";
import Header from "@components/dashboard/Header";
import Sidebar from "@components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
export default function RootLayout({ children }) {

  return (
      <div className="flex h-screen">
        <div className="flex h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="">
            <Header />
          </div>
          <div className="">
            <HeadTitle />
        </div>
          <div className="flex-1  overflow-y-auto">
            {children}
          </div>
          <Modal />
          {/* <div className="">
            <Footer />
          </div> */}
        </div>
      </div>
  );
}
