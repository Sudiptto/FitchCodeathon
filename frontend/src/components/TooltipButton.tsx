/* Helper file to create a reusable TooltipButton component in React.
    This component displays a button with an associated tooltip, 
    Customizable with different icons, text, and an active state. */  


//interface TooltipButtonProps {
//  tooltipId: string;
//  tooltipText: string;
//  svgSrc: string;
//  srText: string;
//  isActive: boolean;
//  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
//}

const TooltipButton = ({
  tooltipId,
  tooltipText,
  svgSrc,
  srText,
  isActive,
  onClick,
}:
{
  tooltipId: string,
  tooltipText: string,
  svgSrc: string,
  srText: string,
  isActive: boolean,
  onClick: any,
}) => (
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
      <div
      id={tooltipId}
      role="tooltip"
      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      onClick={onClick}
    >
      {tooltipText}
      <div onClick={onClick} className="tooltip-arrow" data-popper-arrow></div>
    </div>
    </button>
);

export default TooltipButton;