import SquishedCard from "../components/squishedCard";
import NavBar from "../components/NavBar";

const Status: React.FC = () => {
    const data = [
        {
          title: "Current Order",
          subtitle: "$18.00",
          time: "Plate 5",
        },
        {
          title: "Order 2",
          subtitle: "$14.00",
          time: "+300",
        },
        {
          title: "Order 1",
          subtitle: "$22.00",
          time: "+200",
        },
      ];

  return (
    <>
      <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
        <img
          src="/Ecocycle.png"
          alt="Ecocycle Logo"
          className="w-30 mt-4 mb-6"
        />
        <img
          src="/map.png"
          alt="Govisland Map"
          className="w-50 mt-4 mb-6"
        />
        <img
          src="/status.png"
          alt="Status Time"
          className="w-50 mt-4 mb-6"
        />
        <div className="flex flex-col w-full gap-y-4 px-4">
          {data.map((item, index) => (
            <SquishedCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              time={item.time}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </>
  );
};

export default Status;
