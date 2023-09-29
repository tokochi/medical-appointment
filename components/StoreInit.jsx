"use client";
import { useRef } from "react";
import { useStore } from "@context/store";


function StoreInit(props) {
    const { setStoreProps} = useStore();
    const initialized = useRef(false)
    if (!initialized.current) {
        setStoreProps(props); 
        initialized.current= true;
    }
    return null;
}

export default StoreInit;
