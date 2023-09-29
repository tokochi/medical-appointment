"use client";
import { useEffect } from "react";
import { useStore } from "@context/store";
import Modal from "./Modal";
import ToasterContext from "@context/ToasterContext";
import StoreInit from "./StoreInit";

function ClientSideWrapper({ children }) {
  const { closeModelAnywhere } = useStore();

    return (
      <div  onClick={(e) => closeModelAnywhere(e)}>
        <ToasterContext />
        <Modal />
        {children}
      </div>
    );
}

export default ClientSideWrapper;

// ******* initilize Theme from LocalStorage in the first Client component ***********
     if (typeof window !== "undefined") {
       if (JSON?.parse(localStorage?.getItem("theme")) === true) {
         document.documentElement.classList.add("dark");
       } else {
         document.documentElement.classList.remove("dark");
       }
     }