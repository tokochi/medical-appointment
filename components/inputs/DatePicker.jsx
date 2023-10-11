"use client"
import React from 'react'
import Localization from "@utils/Localization";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

function DatePicker({ label, type, name, id, placeholder,Onchange, error, helper, ...rest }) {
     Localization("اطباء");
    return (
      <div className='w-full'>
        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {label}
        </label>
        <div
          className={`bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900 text-sm  w-full dark:bg-gray-700 dark:text-white`}>
          <DatePickerComponent
            openOnFocus
            enableRtl
            change={Onchange}
            {...rest}>
            
            </DatePickerComponent>
        </div>
      </div>
    );
}

export default DatePicker