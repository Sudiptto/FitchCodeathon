import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "./icons";
import TooltipButton from "./TooltipButton";
import Referral from "./referral";

interface QRCodeResponse {
  message: string;
}

function NavBar(): JSX.Element {
  const [activeButton, setActiveButton] = useState<string>("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName: string, linkHref: string): void => {
    setActiveButton(buttonName);
    navigate(linkHref);
  };

  const handleCategoriesClick = (buttonName: string): void => {
    setActiveButton(buttonName);
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const fetchQRCode = async (): Promise<void> => {
    try {
      const userEmail = "biswassudiptto@gmail.com";
      const apiUrl = `http://10.170.35.244:5500/EcoCycle/getQRCode/${userEmail}`;

      const response = await fetch(apiUrl);
      const data: QRCodeResponse = await response.json();

      // The QR code URL is directly in the 'message' field
      setQrCodeUrl(data.message);
      setShowQRCode(true);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  return (
    <div className="fixed bottom-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="relative max-w-lg mx-auto">
        {/* Main Nav-Bar Items */}
        <div className="flex items-center">
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
            onClick={() => handleButtonClick("status", "/Status")}
            svgSrc={icons.statusIcon}
          />
          <div className="w-16"></div>
          <TooltipButton
            tooltipId="tooltip-categories"
            tooltipText="Categories"
            srText="Categories"
            isActive={activeButton === "categories"}
            onClick={() => handleCategoriesClick("categories")}
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

        {/* Dropdown menu for Categories */}
        {isCategoriesOpen && (
          <div
            className="absolute bottom-[100%] right-[60px] mb-0 bg-none shadow-none rounded-lg p-0"
          >
            <ul className="p-6 space-y-4 bg-gray-100 rounded-full">
              <li className="flex flex-col items-center justify-center w-full">
                <TooltipButton
                  tooltipId="tooltip-rewards"
                  tooltipText="Rewards"
                  srText="Rewards"
                  isActive={activeButton === "rewards"}
                  onClick={() => handleButtonClick("rewards", "/Rewards")}
                  svgSrc={icons.rewardsIcon}
                />
              </li>

              <li className="flex flex-col items-center justify-center w-full">
                <TooltipButton
                  tooltipId="tooltip-leaderboard"
                  tooltipText="Leaderboard"
                  srText="Leaderboard"
                  isActive={activeButton === "leaderboard"}
                  onClick={() =>
                    handleButtonClick("leaderboard", "/Leaderboard")
                  }
                  svgSrc={icons.leaderboardIcon}
                />
              </li>

              <li className="flex flex-col items-center justify-center w-full">
                <Referral />
              </li>
            </ul>
          </div>
        )}

        {/* Middle Center Button */}
        <div className="absolute inset-x-0 flex justify-center -top-6">
          <button
            type="button"
            onClick={fetchQRCode}
            className="flex items-center justify-center w-16 h-16 text-white bg-green-700 rounded-full shadow-lg"
          >
            <img src={icons.scanIcon} alt="Scan" className="w-8 h-8" />
          </button>
        </div>

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-3 rounded-lg max-w-[250px] w-full">
              <p className="mb-2 text-sm font-bold leading-tight text-center">
                SCAN THIS QR CODE AT THE CASHIER TO GET YOUR PLATE!
              </p>
              <div className="p-1 mb-2 border-2 border-black">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-full h-auto max-w-[200px] mx-auto"
                />
              </div>
              <button
                onClick={() => setShowQRCode(false)}
                className="w-full px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
