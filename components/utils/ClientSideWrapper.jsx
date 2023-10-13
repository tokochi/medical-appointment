"use client";
import { useEffect } from "react";
import { useStore } from "@context/store";
import Modal from "@components/utils/Modal";
import ToasterContext from "@context/ToasterContext";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWH9edHVRRGVdWUBwVkY="
);
console.warn = () => {};
console.error = () => { };
console.log = () => { };

function ClientSideWrapper({ children }) {
  const { closeModelAnywhere, darkTheme } = useStore();
  const path = usePathname();
  useEffect(() => {
    const isDarkMode = JSON?.parse(localStorage?.getItem("theme")) === true;
    const stylesheetUrl = isDarkMode
      ? "https://cdn.syncfusion.com/ej2/material-dark.css"
      : "https://cdn.syncfusion.com/ej2/material.css";

    // Check if a link element with the specified href exists
    const existingLinks = document.querySelectorAll('link[href*="https://cdn.syncfusion.com"]');
    if (existingLinks.length > 0) {
      // If the link element exists, update its href
      existingLinks.forEach((linkElement) => {
        linkElement.href = stylesheetUrl;
      });
    } else {
      // If the link element doesn't exist, create a new one
      const newLinkElement = document.createElement("link");
      newLinkElement.rel = "stylesheet";
      newLinkElement.href = stylesheetUrl;

      // Append the new link element to the head
      document.head.appendChild(newLinkElement);
    }
    // Add or remove the "dark" class based on the theme
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme, path]);
  return (
    <div onClick={(e) => closeModelAnywhere(e)}>
      <ToasterContext />
      <Modal />
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}

export default ClientSideWrapper;
