import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "./icons";
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
        <div className="flex items-center">
          <div className="flex-1 flex justify-center">
            <TooltipButton
              tooltipId="tooltip-home"
              tooltipText="Home"
              srText="Home"
              isActive={activeButton === "home"}
              onClick={() => handleButtonClick("home", "/VendorHomepage")}
              svgSrc={icons.homeIcon}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <TooltipButton
              tooltipId="tooltip-status"
              tooltipText="Status"
              srText="Status"
              isActive={activeButton === "status"}
              onClick={() => handleButtonClick("status", "/vendorstatus")}
              svgSrc={icons.statusIcon}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <TooltipButton
              tooltipId="tooltip-inventory"
              tooltipText="Inventory"
              srText="Inventory"
              isActive={activeButton === "inventory"}
              onClick={() => handleButtonClick("inventory", "/VendorInventory")}
              svgSrc={icons.appsIcon}
            />
          </div>
          <div className="flex-1 flex justify-center">
            <TooltipButton
              tooltipId="tooltip-profile"
              tooltipText="Profile"
              srText="Profile"
              isActive={activeButton === "profile"}
              onClick={() => handleButtonClick("profile", "/VendorProfile")}
              svgSrc={icons.profileIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarVendor;
