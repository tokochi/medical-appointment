"use client";
import React, { useState } from "react";
import { useStore } from "@context/store";
import DoctorsTable from "@components/table/DoctorsTable";


function page() {

  const { currentAdmin } = useStore();
  console.log("🚀 ~ currentAdmin:", currentAdmin)
  return (
    <div className="">
     <DoctorsTable/>
    </div>
  );
}

export default page;
