"use client";
import { useStore } from "@context/store";
import Image from "next/image";
import Cookies from "js-cookie";

function DarkModeToggle() {
  function toggleDark() {
    try {
      if (typeof window !== "undefined") {
        const getCookie = Cookies.get("darkTheme");
        let darkTheme = null;
        if (!getCookie || getCookie === "false") {
          darkTheme = false;
        } else {
          darkTheme = true;
        }
        Cookies.set("darkTheme", JSON.stringify(!darkTheme), { expires: 365 }); // Set the theme cookie with the new value
        if (!darkTheme) {
          document.documentElement.classList?.add("dark");
        } else {
          document.documentElement.classList?.remove("dark");
        }
        useStore.setState({ darkTheme: !darkTheme });
      }
    } catch (error) {
      console.log("🚀 ~error localStorage", error);
    }
  }

  return (
    <button
      onClick={toggleDark}
      type='button'
      className={` mx-2 origin-center dark:rotate-180 transition-all duration-300`}>
      <Image src='/images/dark.webp' width={20} height={20} alt='Flowbite Logo' />
    </button>
  );
}

export default DarkModeToggle;
