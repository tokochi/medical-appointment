"use client";
import { SelectInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchSpeciality({ placeholder, label,type }) {
  const { specialities,medicalSpecialties, filterInfo, handleSelectInput } = useStore();
  return (
    <SelectInput
      name='speciality'
      value={filterInfo?.speciality?.value}
      onChange={(e) => handleSelectInput(e, "filterInfo")}
      options={type === "hosp" ? medicalSpecialties : specialities}
      option_value='value'
      option_text='text'
      placeholder={placeholder}
      label={label}
    />
  );
}

export default SearchSpeciality;
