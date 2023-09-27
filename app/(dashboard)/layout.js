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
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense("ORg4AjUWIQA/Gnt2VlhhQlJCfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5adERiWn9bc3dSQWJV");

export default function RootLayout({ children }) {
  const { dark, dir, modal } = useStore()
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
  }, [])
  
  return (
    <html lang='en' dir={dir} className={`${dark && "dark dark-mode"}`}>
      <head>
        {dark ? 
        <link rel='stylesheet' href={`https://cdn.syncfusion.com/ej2/material-dark.css`} />
       : <link rel='stylesheet' href={`https://cdn.syncfusion.com/ej2/material.css`} />}
      </head>
      <body className='text-gray-900 dark:text-gray-100 w-full bg-gray-200 dark:bg-gray-900'>
        <div onClick={(e) => closeModelAnywhere(e)}>
        <ToasterContext />  
        {/* <Modal /> */}
        <Provider >
        
          {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
