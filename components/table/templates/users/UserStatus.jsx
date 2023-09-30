import React from "react";

export default function Status(props) {

  const timeDifference = Date.now() - props?.lastLogin;
   const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
   console.log("🚀 ~ daysDifference:", daysDifference)

  if (daysDifference > 30)
    return (
      <p className='capitalize text-center rounded-3xl px-1 py-1 bg-rose-100 text-rose-500'>
        غير نشط
      </p>
    );
  if (props?.subscription)
    return (
      <p className='capitalize text-center rounded-3xl px-1 py-2 bg-emerald-100 text-emerald-600 '>
        نشط
      </p>
    );

}
