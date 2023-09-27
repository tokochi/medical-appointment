import React from 'react'
import { PushSpinner } from "react-spinners-kit";
function LoadingComponent() {
  return <PushSpinner size={100} color='#686769' loading={loading} />;
}

export default LoadingComponent