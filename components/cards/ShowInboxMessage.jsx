import React from "react";
import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
function ShowInboxMessage({ message }) {
  return (
    <div id='doct-cards' className='p-4 card rounded-md'>
      <div id='title' className='flex flex-col gap-6'>
        <div className='w-full border-b-[1px] border-gray-600'>
          <h1 className='font-bold text-xl text-sky-500'>{message?.email}</h1>
          <h2 className='font-bold  text-sky-300'>{message?.author}</h2>
          <h3>{moment(message?.date).format("LLL")}</h3>
        </div>
        <p className='text-justify'>{message?.text}</p>
      </div>
    </div>
  );
}

export default ShowInboxMessage;
