"use client"
import { useStore } from "@context/store";
import Image from "next/image";
function DarkModeToggle() {
     function toggleDark() {
       try {
         if (typeof window !== "undefined") {
           const value = JSON.parse(localStorage?.getItem("theme"));
           localStorage?.setItem("theme", JSON.stringify(!value));
           document.documentElement.classList?.toggle("dark");
           useStore.setState({ darkTheme: !value });
         }
       } catch (error) {
         console.log("🚀 ~error localStorage");
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