"use client"
import React from 'react'
import { PushSpinner } from "react-spinners-kit";
import { useSession } from "next-auth/react";

function LoadingComponent() {
  const {  status } = useSession();
  return <PushSpinner size={100} color='#686769' loading={status === "loading"} />;
}

export default LoadingComponent