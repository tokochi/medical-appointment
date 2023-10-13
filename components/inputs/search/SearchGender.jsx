"use client";
import { SelectInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchGender({ placeholder, label }) {
  const { filterInfo, handleSelectInput } = useStore();
  return (
    <SelectInput
      name='gender'
      value={filterInfo?.gender?.value}
      onChange={(e) => handleSelectInput(e, "filterInfo")}
      options={[
        { text: "رجل", value: "male" },
        { text: "إمرأة", value: "female" },
      ]}
      option_value='value'
      option_text='text'
      placeholder={placeholder}
      label={label}
    />
  );
}

export default SearchGender;
