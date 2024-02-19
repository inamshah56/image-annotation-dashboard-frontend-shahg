import { useAppData } from "@/context/appDataContext";
import { useEffect, useState } from "react";
import Select from "react-select";

interface SelectedOption {
  value: string;
  label: string;
}

interface SelectOptProps {
  label: string;
  overAll?: boolean;
  disabled?: boolean;
}

const SelectOpt: React.FC<SelectOptProps> = ({ label, disabled, overAll }) => {
  const {
    cropConditions,
    processedResult,
    updatePreviousResults,
    updateProcessedResult,
  } = useAppData();

  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
    null
  );

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      padding: "2px 8px",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      backgroundColor: disabled
        ? "#cbd5e1"
        : state.isFocused
        ? "#bbf7d0"
        : "#f3f4f6",
      boxShadow: state.isFocused ? "0 0 0 3px #15803d" : "none",
      "&:hover": {
        backgroundColor: disabled ? "#cbd5e1" : "#bbf7d0",
      },
      cursor: "pointer",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#15803d" : "inherit",
      color: state.isFocused
        ? "#ffffff"
        : state.isSelected
        ? "#15803d"
        : "#000000",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#15803d",
    }),
  };

  const handleSelect = (selected: SelectedOption | null) => {
    let select: Record<string, string | undefined> = {};
    select[processedResult.img_column] = selected?.value || "not annotated";
    const imageKey = `image${processedResult.img_column.match(/\d+/) || ""}`;

    // Update previousResults
    updatePreviousResults({ [imageKey]: select[processedResult.img_column] });

    setSelectedOption(selected);
    const keyToUpdate = overAll ? "overall_result" : "result";
    updateProcessedResult({ [keyToUpdate]: selected?.value || null });
  };
  useEffect(() => {
    if (cropConditions.length < 1) {
      setSelectedOption(null);
    }
  }, [cropConditions]);

  return (
    <div>
      <h6
        className={`text-lg font-semibold mb-2 ${disabled && "text-gray-400"}`}
      >
        {label}
      </h6>
      <div className={`${disabled && "cursor-not-allowed"}`}>
        <Select
          className={disabled ? "disabled-select" : "pointer-select"}
          styles={customStyles}
          defaultValue={selectedOption}
          onChange={handleSelect}
          options={cropConditions}
          isDisabled={disabled}
        />
      </div>
    </div>
  );
};

export default SelectOpt;
