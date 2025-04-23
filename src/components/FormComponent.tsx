import React from "react";

interface ISelectItem {
  key: string;
  value: string;
}

const FormComponent = ({
  choise,
  title,
  inputValue,
  inputType,
  onChangeInputValue,
  selectItems,
  selectedItem,
  onChangeSelectItem,
}: {
  choise: "input" | "select";
  title: string;
  inputValue?: string;
  inputType?: "text" | "password" | "email";
  onChangeInputValue?: (value: string) => void;
  selectItems?: ISelectItem[];
  selectedItem?: string;
  onChangeSelectItem?: (value: string) => void;
}) => {
  return (
    <>
      {choise === "input" ? (
        <>
          <span>{title}</span>
          <input
            type={inputType}
            value={inputValue}
            onChange={(e) => onChangeInputValue?.(e.target.value)}
          />
        </>
      ) : choise === "select" ? (
        <>
          <span>{title}</span>
          <select
            value={selectedItem}
            onChange={(e) => onChangeSelectItem?.(e.target.value)}
          >
            {selectItems?.map((item) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </>
      ) : (
        ""
      )}
    </>
  );
};
