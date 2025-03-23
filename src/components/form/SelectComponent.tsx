import React from "react";

const SelectComponent = ({ options }: { options: string[] }) => {
  return (
    <select>
      {options.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
