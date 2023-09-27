"use client";
import '@app/globals.css'
import '@app/SyncfussionCSS.css'
import Header from '@components/Header';
import { useStore } from "@context/store";
import Footer from '@components/Footer';
import Modal from "@components/Modal";
import Provider from '@components/Provider';
import ToasterContext from '@context/ToasterContext';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function RootLayout({ children }) {
  const { dark, dir, modal, fetchDoctors, fetchQuestions, fetchPosts } = useStore()
  function closeModelAnywhere(e) {
    if (modal.isOpen === true && e.target.getAttribute("name") == "modal") { useStore.setState((state) => ({ modal: state.modalClosed })) }
  }
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (JSON?.parse(localStorage?.getItem('theme')) === true) {
          useStore.setState({dark:true})
        } else {
          useStore.setState({ dark: false })
        }
      }
    } catch (error) {
      console.log("error localStorage")
    }
    fetchDoctors();
    fetchQuestions();
    fetchPosts();
  }, [])
  
  return (
    <html lang='en' dir={dir} className={`${dark && "dark dark-mode"}`}>
      <body  className='text-gray-900 dark:text-gray-100 w-full '>
        <div onClick={(e) => closeModelAnywhere(e)}>
        <ToasterContext />  
        <Modal />
        <Provider >
          <Header />
          {children}
          <Footer />
          </Provider>
        </div>
      </body>
    </html>
  );
}
