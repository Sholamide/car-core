"use client";

import { ButtonProps } from "@/types";
import clsx from "clsx";
import Image from "next/image";

const CustomButton = ({
  title,
  btnType,
  handleClick,
  containerStyles,
  textStyles,
  rightIcon,
}: ButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={clsx(`custom-btn ${containerStyles}`)}
      disabled={false}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            alt="rightIcon"
            fill
            src={rightIcon}
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
