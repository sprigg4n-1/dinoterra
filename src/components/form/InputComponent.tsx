import React from "react";

const InputComponent = ({
  value,
  onChangeValue,
  placeholder,
  inputType,
  isRequired,
  size,
}: {
  value: string;
  onChangeValue: (value: string) => void;
  placeholder: string;
  inputType: "text" | "password" | "email";
  isRequired: boolean;
  size?: "md" | "lg" | "sm";
}) => {
  const finalBgColor = "";
  const finalTextColor = "";
  const finalPlaceholderColor = "";
  const finalTextSize = "";
  const finalOutline = "";

  return (
    <input
      required={isRequired}
      type={inputType}
      value={value}
      className={`px-1 py-2 focus:outline-none ${finalBgColor} ${finalTextColor} ${finalPlaceholderColor} ${finalTextSize} ${finalOutline}`}
      onChange={(e) => onChangeValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
