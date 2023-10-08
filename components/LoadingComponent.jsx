"use client"
import React from 'react'
import { PushSpinner } from "react-spinners-kit";


function LoadingComponent({ loading, size }) {
  return <PushSpinner size={size} color='#686769' loading={loading} />;
}

export default LoadingComponent