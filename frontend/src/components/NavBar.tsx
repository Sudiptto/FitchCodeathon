import { useState } from "react";
import homeIcon from "./svg_icons/home.svg";
import scanIcon from "./svg_icons/scan.svg";
import statusIcon from "./svg_icons/status.svg";
import appsIcon from "./svg_icons/apps.svg";
import profileIcon from "./svg_icons/profile.svg";
import leaderboardIcon from "./svg_icons/leaderboard.svg";
import refferalIcon from "./svg_icons/refferal.svg";
import rewardsIcon from "./svg_icons/rewards.svg";

// Define the props types for TooltipButton
interface TooltipButtonProps {
  tooltipId: string;
  tooltipText: string;
  svgSrc: string;
  srText: string;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function NavBar() {
  const TooltipButton: React.FC<TooltipButtonProps> = ({
    tooltipId,
    tooltipText,
    svgSrc,
    srText,
    isActive,
    onClick,
  }) => (
    <>
      <button
        data-tooltip-target={tooltipId}
        type="button"
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center p-2 group ${
          isActive ? "text-green-600" : "text-gray-500"
        } hover:bg-gray-50 dark:hover:bg-gray-800`}
      >
        <img src={svgSrc} alt={srText} className="w-6 h-6 mb-1" />
        <span className="text-sm font-medium">{srText}</span>
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {tooltipText}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );

  const [activeButton, setActiveButton] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const handleButtonClick = (buttonName: string, linkHref: string) => {
    setActiveButton(buttonName);
    window.location.href = linkHref;
  };

  const handleCategoriesClick = (buttonName: string) => {
    setActiveButton(buttonName);
    setIsCategoriesOpen(!isCategoriesOpen); // Toggle dropdown visibility
  };

  return (
    <div className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="relative max-w-lg mx-auto">
        <div className="flex items-center">
          <TooltipButton
            tooltipId="tooltip-home"
            tooltipText="Home"
            srText="Home"
            isActive={activeButton === "home"}
            onClick={() => handleButtonClick("home", "#home")}
            svgSrc={homeIcon}
          />
          <TooltipButton
            tooltipId="tooltip-status"
            tooltipText="Status"
            srText="Status"
            isActive={activeButton === "status"}
            onClick={() => handleButtonClick("status", "#status")}
            svgSrc={statusIcon}
          />
          <div className="w-16"></div>
          <TooltipButton
            tooltipId="tooltip-categories"
            tooltipText="Categories"
            srText="Categories"
            isActive={activeButton === "categories"}
            onClick={() => handleCategoriesClick("categories")}
            svgSrc={appsIcon}
          />
          <TooltipButton
            tooltipId="tooltip-profile"
            tooltipText="Profile"
            srText="Profile"
            isActive={activeButton === "profile"}
            onClick={() => handleButtonClick("profile", "#profile")}
            svgSrc={profileIcon}
          />
        </div>

        {/* Dropdown menu for Categories */}
        {isCategoriesOpen && (
          <div
            className="absolute bottom-[100%] right-[60px] mb-2 bg-white shadow-lg rounded-lg p-2"
            style={{ minWidth: "120px" }}
          >
            <ul className="ftext-gray-800">
              <li className="flex items-center justify-center w-full p-2">
                <TooltipButton
                  tooltipId="tooltip-rewards"
                  tooltipText="Rewards"
                  srText="Rewards"
                  isActive={activeButton === "rewards"}
                  onClick={() => handleButtonClick("rewards", "#rewards")}
                  svgSrc={rewardsIcon}
                />
              </li>
              <li className="flex items-center justify-center w-full p-2">
                <TooltipButton
                  tooltipId="tooltip-leaderboard"
                  tooltipText="Leaderboard"
                  srText="Leaderboard"
                  isActive={activeButton === "Leaderboard"}
                  onClick={() =>
                    handleButtonClick("leaderboard", "#leaderboard")
                  }
                  svgSrc={leaderboardIcon}
                />
              </li>
              <li className="flex items-center justify-center w-full p-2"><TooltipButton
                  tooltipId="tooltip-refferal"
                  tooltipText="Refferal"
                  srText="Refferal"
                  isActive={activeButton === "Refferal"}
                  onClick={() =>
                    handleButtonClick("refferal", "#refferal")
                  }
                  svgSrc={refferalIcon}
                /></li>
            </ul>
          </div>
        )}

        {/* Middle Center Button */}
        <div className="absolute inset-x-0 flex justify-center -top-6">
          <button
            type="button"
            onClick={() => handleButtonClick("scan", "#scan")}
            className="flex items-center justify-center w-16 h-16 bg-green-700 text-white rounded-full shadow-lg"
          >
            <img src={scanIcon} alt="Scan" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
