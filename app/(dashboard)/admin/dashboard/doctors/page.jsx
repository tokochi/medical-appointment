"use client";
import React, { useState } from "react";
import { useStore } from "@context/store";
import DoctorsTable from "@components/table/DoctorsTable";


function page() {

  const { currentAdmin } = useStore();
  return (
    <div className="">
     <DoctorsTable/>
    </div>
  );
}

export default page;
