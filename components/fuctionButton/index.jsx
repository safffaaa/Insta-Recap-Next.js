import React from "react";
import Image from "next/image";

const FunctionButton = ({ className, buttonName, icon, iconClassName, onClick }) => {
  return (
    <button className={`rounded flex items-center ${className}`} onClick={onClick}>
      {icon && (
        <Image 
          src={icon} 
          alt="icon" 
          width={20} 
          height={20}
          className={`mr-2 ${iconClassName}`} 
        />
      )}
      {buttonName}
    </button>
  );
};

export default FunctionButton;
