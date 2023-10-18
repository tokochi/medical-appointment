"use client"
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";


function LoadingComponent({ loading, size }) {
  return <ClipLoader size={size} color='#004563' loading={loading} />;
}

export default LoadingComponent