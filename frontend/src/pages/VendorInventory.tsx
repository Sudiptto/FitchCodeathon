import SquishedCard from "../components/squishedCard";
import ColoredHeader from "../components/coloredHeader";
import VendorNavBar from "../components/NavBarVendor";

const VendorInventory: React.FC = () => {
  const inhand = [
    {
      title: "Plate",
      time: "59",
    },
    {
      title: "Knives",
      time: "105",
    },
    {
      title: "Spoons",
      time: "182",
    },
    {
      title: "Forks",
      time: "201",
    },
  ];

  const outgoing = [
    {
      title: "Plate",
      time: "48",
    },
    {
      title: "Knives",
      time: "24",
    },
    {
      title: "Spoons",
      time: "30",
    },
    {
      title: "Forks",
      time: "30",
    },
  ];

  return (
    <>
      <ColoredHeader name="Inventory" />
      
      {/* Inventory In-Hand Section */}
      <div className="max-w-md mx-auto p-4 bg-white">
        <h1 className="text-black text-lg font-bold mb-4">Inventory In-Hand</h1>
        <div className="flex flex-col gap-y-4">
          {inhand.map((item, index) => (
            <SquishedCard key={index} title={item.title} time={item.time} />
          ))}
        </div>
      </div>

      {/* Outgoing Section */}
      <div className="max-w-md mx-auto p-4 bg-white mt-6">
        <h1 className="text-black text-lg font-bold mb-4">Inventory Outgoing</h1>
        <div className="flex flex-col gap-y-4">
          {outgoing.map((item, index) => (
            <SquishedCard key={index} title={item.title} time={item.time} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <VendorNavBar />
      </div>
    </>
  );
};

export default VendorInventory;