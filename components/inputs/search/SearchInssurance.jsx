"use client";
import { CheckboxInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchInssurance() {
  const { filterInfo, handleCheckbox } = useStore();
  return (
    <CheckboxInput
      name='insurance'
      checked={filterInfo?.insurance}
      onChange={(e) => handleCheckbox(e, "filterInfo")}
      label='يقبل بطاقة التأمين'
    />
  );
}
export default SearchInssurance;
