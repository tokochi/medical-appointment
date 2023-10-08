import React from "react";
import { AutoCompleteComponent } from "@syncfusion/ej2-react-dropdowns";



function AutoCompleteInput({
  icon,
  label,
  type,
  name,
  option_value,
  option_text,
  id,
  placeholder,
    helper,
  onChange,
  options,
  ...rest
}) {
  return (
    <div>
      <AutoCompleteComponent
        id={id}
        fields={{ value: "text", text: "text" }}
        dataSource={options}
        change={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default AutoCompleteInput;
