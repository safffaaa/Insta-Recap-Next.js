import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { selectIsAuthenticated } from "../../store/authSlice";

const MenuButton = ({ img1, img1Text, img2, img2Text, img3, copyText }) => {
  const [copyStatus, setCopyStatus] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleCopy = async () => {
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus(""), 2000);
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Insta Share",
          text: copyText,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: alert if the share API is not supported
      console.warn("Share API is not supported on this browser.");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality with backend
  };

  return (
    <div className="flex items-center gap-4 sm:gap-8 pt-4">
      <div
        className="flex items-center px-[8px] sm:px-[10px] py-[6px] sm:py-[6px] border-2 rounded-lg border-[#5BF5FF]"
        onClick={handleShare}
      >
        <img src={img1} alt="" className="w-[18px] h-[18px]" />
        <p className="px-2 font-inter text-[10px] sm:text-[12px] text-[#5BF5FF]">
          {img1Text}
        </p>
      </div>
      <div
        className="flex items-center px-[8px] sm:px-[10px] py-[6px] sm:py-[6px] border-2 border-[#5BF5FF] rounded-lg"
        onClick={handleCopy}
      >
        <img src={img2} alt="" className="w-[18px] h-[18px]" />
        <p className="px-2 font-inter text-[10px] sm:text-[12px] text-[#5BF5FF]">
          {copyStatus || img2Text}
        </p>
      </div>
      {isAuthenticated && img3 && (
        <div
          className="flex items-center px-[8px] sm:px-[10px] py-[6px] sm:py-[6px] border-2 border-[#5BF5FF] rounded-lg cursor-pointer"
          onClick={handleBookmark}
        >
          <img src={img3} alt="" className="w-[18px] h-[18px]" />
        </div>
      )}
    </div>
  );
};

MenuButton.propTypes = {
  img1: PropTypes.string.isRequired,
  img1Text: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired,
  img2Text: PropTypes.string.isRequired,
  img3: PropTypes.string,
  copyText: PropTypes.string.isRequired
};

export default MenuButton;
