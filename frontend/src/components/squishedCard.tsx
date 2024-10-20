const SquishedCard = ({ 
  title, 
  subtitle, 
  time 
}: { 
  title: string, 
  subtitle?: string, 
  time: string 
}) => {
  return (
    <div
      className="w-full max-w-md m-auto my-2 p-4 rounded-lg shadow-lg flex items-center justify-between bg-white cursor-pointer"
    >
      {/* Left section (Title + Subtitle) */}
      <div className="flex flex-col">
        <h2 className="text-black text-lg font-semibold">{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Right section (Time) */}
      <div className="text-black text-xl font-bold">
        {time}
      </div>
    </div>
  );
};

export default SquishedCard;