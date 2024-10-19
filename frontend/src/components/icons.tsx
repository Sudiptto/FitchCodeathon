/* Helper file to import SVG icons as variables and export them as a typed object.
   This allows easy access to SVG icon paths across the application with proper TypeScript typing. */
import homeIcon from "./svg_icons/home.svg";
import scanIcon from "./svg_icons/scan.svg";
import statusIcon from "./svg_icons/status.svg";
import appsIcon from "./svg_icons/apps.svg";
import profileIcon from "./svg_icons/profile.svg";
import leaderboardIcon from "./svg_icons/leaderboard.svg";
import refferalIcon from "./svg_icons/refferal.svg";
import rewardsIcon from "./svg_icons/rewards.svg";

/* Define the type for the icons object */
type IconSet = {
  homeIcon: string;
  scanIcon: string;
  statusIcon: string;
  appsIcon: string;
  profileIcon: string;
  leaderboardIcon: string;
  refferalIcon: string;
  rewardsIcon: string;
};

/* Export the icons as a typed object */
const icons: IconSet = {
  homeIcon,
  scanIcon,
  statusIcon,
  appsIcon,
  profileIcon,
  leaderboardIcon,
  refferalIcon,
  rewardsIcon,
};

export default icons;