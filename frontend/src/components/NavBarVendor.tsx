import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "./icons";
import TooltipButton from "./TooltipButton";

// NavBarVendor component for vendor navigation
function NavBarVendor() {
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState("");
  const navigate = useNavigate();

  // Function to handle button clicks
  const handleButtonClick = (buttonName: string, linkHref: string) => {
    setActiveButton(buttonName);
    navigate(linkHref);
  };

  return (
    // Main container for the navigation bar
    <div className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="relative max-w-lg mx-auto">
        {/* Main Nav-Bar Items */}
        <div className="flex items-center">
          {/* Home button */}
          <div className="flex justify-center flex-1">
            <TooltipButton
              tooltipId="tooltip-home"
              tooltipText="Home"
              srText="Home"
              isActive={activeButton === "home"}
              onClick={() => handleButtonClick("home", "/VendorHomepage")}
              svgSrc={icons.homeIcon}
            />
          </div>
          {/* Status button */}
          <div className="flex justify-center flex-1">
            <TooltipButton
              tooltipId="tooltip-status"
              tooltipText="Status"
              srText="Status"
              isActive={activeButton === "status"}
              onClick={() => handleButtonClick("status", "/vendorstatus")}
              svgSrc={icons.statusIcon}
            />
          </div>
          {/* Inventory button */}
          <div className="flex justify-center flex-1">
            <TooltipButton
              tooltipId="tooltip-inventory"
              tooltipText="Inventory"
              srText="Inventory"
              isActive={activeButton === "inventory"}
              onClick={() => handleButtonClick("inventory", "/VendorInventory")}
              svgSrc={icons.appsIcon}
            />
          </div>
          {/* Profile button */}
          <div className="flex justify-center flex-1">
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