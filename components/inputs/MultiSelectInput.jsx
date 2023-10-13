"use client";
import Image from "next/image";
import TextInput from "./TextInput";
import { useStore } from "@context/store";
const MultiSelectInput = ({
  label,
  type,
  name,
  field,
  addField,
  id,
  source,
  keyValue,
  onChange,
  placeholder,
  value,
  helper,
  options = [],
  ...rest
}) => {
  const { handleMultiselectAddButton, removeItemFromArray } = useStore();
  return (
    <div>
      <div className='flex items-center gap-2'>
        <TextInput
          value={value}
          onChange={onChange}
          name={name}
          type='text'
          label={label}
          placeholder={placeholder}
        />
        <button
          className='mt-auto py-1'
          name={value}
          onClick={(e) => handleMultiselectAddButton(e, keyValue, field, addField)}>
          <Image
            className='pointer-events-none'
            src='/images/add.webp'
            width={30}
            height={25}
            alt='cancel'
          />
        </button>
      </div>
      <div className='flex flex-wrap  gap-2 py-2'>
        {source?.[field]?.map((item, index) => (
          <div
            key={index}
            className='p-1 px-2 flex gap-1 justify-between bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-slate-700 hover:bg-slate-400 font-medium'>
            <button name={item?.text} onClick={(e) => removeItemFromArray(e, keyValue, field)}>
              <Image
                name={item?.text}
                src='/images/cancel.webp'
                width={20}
                height={15}
                alt='cancel'
              />
            </button>
            <p>{item?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultiSelectInput;
