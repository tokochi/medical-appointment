"use client";
import { SelectInput } from "@components/inputs";
import { useStore } from "@context/store";

function SearchWilayaFull() {
  const { wilaya, daira, filterInfo, commune, handleSelectInput } = useStore();
  return (
    <div>
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
        label='الولاية:'
      />
      {filterInfo?.wilaya?.value && (
        <SelectInput
          name='daira'
          value={filterInfo?.daira?.value}
          onChange={(e) => {
            handleSelectInput(e, "filterInfo");
            useStore.setState((state) => ({
              filterInfo: { ...state.filterInfo, commune: null },
            }));
          }}
          options={daira.filter((region) => region?.wilaya === filterInfo?.wilaya?.value)}
          option_value='value'
          option_text='text'
          placeholder='الدائرة'
        />
      )}
      {filterInfo?.daira?.value && (
        <SelectInput
          name='commune'
          value={filterInfo?.commune?.value}
          onChange={(e) => handleSelectInput(e, "filterInfo")}
          options={commune.filter((region) => region?.daira === filterInfo?.daira?.value)}
          option_value='value'
          option_text='text'
          placeholder='البلدية'
        />
      )}
    </div>
  );
}

export default SearchWilayaFull;
