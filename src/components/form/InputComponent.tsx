"use client";
import { useState } from "react";

import Image from "next/image";

import eyeOff from "@/images/vectors/eye-off.svg";
import eyeShow from "@/images/vectors/eye-show.svg";

interface Props {
  value: string | number;
  valueOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  type?: string;
  placeholder?: string;
  isRequired?: boolean;

  text?: string;
  showPasswordButton?: boolean;
  customLabelStyles?: string;

  borderColor?: "orange" | "gray" | "transparent";
  textStyle?: "small" | "normal";
  colorStyle?: "black" | "light";
}

const InputComponent = ({
  value,
  valueOnChange,
  type = "text",
  placeholder = "Уведіть дані",
  isRequired = false,
  text = "",
  showPasswordButton = false,
  customLabelStyles = "",
  borderColor = "gray",
  textStyle = "normal",
  colorStyle = "light",
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const inputType = isPassword && isShowPassword ? "text" : type;

  const borderColorStyle =
    borderColor === "orange"
      ? "border-brightOrange"
      : borderColor === "transparent"
      ? "border-transparent"
      : "border-softGray";

  const textSizeStyle =
    textStyle === "small"
      ? "text-[14px] sm:text-[16px]"
      : "text-[16px] md:text-[18px]";

  const paddingSize = textStyle === "small" ? "py-2 px-1" : "py-3 px-2";

  const inputColorStyle =
    colorStyle === "black"
      ? "bg-darkGray text-white focus:border-brightOrange"
      : "text-darkGray focus:border-darkGray";

  const finalStyles = `${borderColorStyle} ${textSizeStyle} ${paddingSize} ${inputColorStyle}`;

  return (
    <label className={`flex flex-col relative ${customLabelStyles}`}>
      {/* LABEL TEXT */}
      {text && <span className={`${textSizeStyle}`}>{text}</span>}

      {/* INPUT */}
      <div className="w-full relative">
        <input
          className={`w-full border-2 focus:outline-none ${finalStyles} `}
          type={inputType}
          required={isRequired}
          placeholder={placeholder}
          value={value}
          onChange={valueOnChange}
        />

        {/* SHOW PASSWORD BUTTON */}
        {showPasswordButton && isPassword && (
          <button
            className="absolute right-3 top-4 h-3 w-6"
            type="button"
            onClick={() =>
              setIsShowPassword((isShowPassword) => !isShowPassword)
            }
          >
            {isShowPassword ? (
              <Image src={eyeShow} alt="show password" />
            ) : (
              <Image src={eyeOff} alt="not show password" />
            )}
          </button>
        )}
      </div>
    </label>
  );
};

export default InputComponent;
