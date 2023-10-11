
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";


const MultiSelectInput = ({
  icon,
  label,
  type,
  name,
  option_value,
  option_text,
  id,
  placeholder,
  helper,
  options = [],
  ...rest
}) => {
  const sportsData = data[temp];
  const fields = { text: "Game", value: "Id" };

  return (
    <div>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {label}
      </label>
      <div
        className={`bg-gray-50 border text-gray-900 text-sm  w-full p-1 dark:bg-gray-700  dark:text-white`}>
        <MultiSelectComponent
          id={id}
          allowCustomValue
          dataSource={options}
          enableRtl
          mode='Box'
          fields={{ text: option_text, value: option_value }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
export default MultiSelectInput;
