/* Reward Card format with image */
const RewardCard = ({
  title,
  subtitle,
  points,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  points: string;
  imageUrl: string;
}) => {
  return (
    <div className="w-full max-w-md m-auto my-2 p-4 rounded-lg shadow-lg flex items-center justify-between bg-white cursor-pointer">
      {/* Left section (Image + Text) */}
      <div className="flex items-center">
        <img src={imageUrl} alt={title} className="w-12 h-12 rounded-lg mr-4" />
        {/* Title + Subtitle */}
        <div className="flex flex-col">
          <h2 className="text-black text-md font-semibold">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Right section (Points) */}
      <div className="text-blue-600 text-lg font-bold">
        {points}
      </div>
    </div>
  );
};

export default RewardCard;