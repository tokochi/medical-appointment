"use client";
import { CheckboxInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchFullTime() {
  const { filterInfo, handleCheckbox } = useStore();
  return (
    <CheckboxInput
      name='isFullTimeOpen'
      checked={filterInfo?.isFullTimeOpen}
      onChange={(e) => handleCheckbox(e, "filterInfo")}
      label='عيادات طبية 24/7'
    />
  );
}

export default SearchFullTime;
