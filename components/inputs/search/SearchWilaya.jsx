"use client";
import { SelectInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchWilaya({ placeholder, label }) {
  const { wilaya, filterInfo, handleSelectInput } = useStore();
  return (
    <SelectInput
      name='wilaya'
      value={filterInfo?.wilaya?.value}
      onChange={(e) => {
        handleSelectInput(e, "filterInfo");
        useStore.setState((state) => ({
          filterInfo: { ...state.filterInfo, daira: null, commune: null },
        }));
      }}
      options={wilaya}
      option_value='value'
      option_text='text'
      placeholder='الولاية'
      label={label}
    />
  );
}

export default SearchWilaya;
