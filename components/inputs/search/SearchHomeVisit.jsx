"use client";
import { CheckboxInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchHomeVisit() {
  const { filterInfo, handleCheckbox } = useStore();
  return (
    <CheckboxInput
      name='homeVisits'
      checked={filterInfo?.homeVisits}
      onChange={(e) => handleCheckbox(e, "filterInfo")}
      label='زيارة منزلية'
    />
  );
}

export default SearchHomeVisit;
