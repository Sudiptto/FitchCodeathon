import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from './icons';
import TooltipButton from "./TooltipButton";

function NavBarVendor() {
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string, linkHref: string) => {
    setActiveButton(buttonName);
    navigate(linkHref);
  };

  return (
    <div className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="relative max-w-lg mx-auto">
        {/* Main Nav-Bar Items */}
        <div className="flex items-center justify-between">
          <TooltipButton
            tooltipId="tooltip-home"
            tooltipText="Home"
            srText="Home"
            isActive={activeButton === "home"}
            onClick={() => handleButtonClick("home", "/Homepage")}
            svgSrc={icons.homeIcon}
          />
          <TooltipButton
            tooltipId="tooltip-status"
            tooltipText="Status"
            srText="Status"
            isActive={activeButton === "status"}
            onClick={() => handleButtonClick("status", "/vendorstatus")}
            svgSrc={icons.statusIcon}
          />
          <div className="w-16"></div>
          <TooltipButton
            tooltipId="tooltip-Inventory"
            tooltipText="Inventory"
            srText="Inventory"
            isActive={activeButton === "inventory"}
            onClick={() => handleButtonClick("inventory", "/Inventory")}
            svgSrc={icons.appsIcon}
          />
          <TooltipButton
            tooltipId="tooltip-profile"
            tooltipText="Profile"
            srText="Profile"
            isActive={activeButton === "profile"}
            onClick={() => handleButtonClick("profile", "/Profile")}
            svgSrc={icons.profileIcon}
          />
        </div>
        
        {/* Middle Center Button */}
        <div className="absolute inset-x-0 flex justify-center -top-6">
          <button
            type="button"
            onClick={() => handleButtonClick("scan", "/scan")}
            className="flex items-center justify-center w-16 h-16 bg-green-700 text-white rounded-full shadow-lg"
          >
            <img src={icons.scanIcon} alt="Scan" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBarVendor;