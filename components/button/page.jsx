'use client';

import Image from 'next/image';
import PropTypes from "prop-types";

const Button = ({ buttonText, buttonIcon, onClick }) => {
  return (
    <div>
      <button 
        onClick={onClick}
        className="text-xs text-gray-700 bg-white px-2 py-1 rounded flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
      >
        <Image 
          src={buttonIcon} 
          alt={`${buttonText} icon`} 
          width={16} 
          height={16} 
          className="pr-1"
        />
        {buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
