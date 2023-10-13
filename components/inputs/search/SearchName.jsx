"use client";
import { IconInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchName({ placeholder,label }) {
  const {  filterInfo, handleInputChange } = useStore();
  return (
    <IconInput
      name='name'
      value={filterInfo?.name}
      onChange={(e) => handleInputChange(e, "filterInfo")}
      icon='/images/search.webp'
      type='text'
      placeholder={placeholder}
      label={label}
    />
  );
}

export default SearchName;
