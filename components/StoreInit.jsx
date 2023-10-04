"use client";
import { useRef, useEffect } from "react";
import { useStore } from "@context/store";


function StoreInit(props) {
     const { setStoreProps} = useStore();
    // const initialized = useRef(false)
    // if (!initialized.current) {
    //     setStoreProps(props); 
    //     initialized.current= true;
    // }
    // return null;
      useEffect(() => {
    // Call setStoreProps in useEffect to ensure it runs after initial rendering
    setStoreProps(props);
  }, [props]);

  return null;
}

export default StoreInit;
