import React from "react";
import SquishedCard from "../components/squishedCard";
import ColoredHeader from "../components/coloredHeader";
import NavBar from "../components/NavBar";

const Leaderboard: React.FC = () => {
  const data = [
    {
      title: "Sudiptto Biswas",
      subtitle: "900 Points",
      time: "2",
    },
    {
      title: "Samin Sarwar",
      subtitle: "850 Points",
      time: "3",
    },
    {
      title: "Ashraful Mahin",
      subtitle: "800 Points",
      time: "4",
    },
    {
      title: "Evan Haque",
      subtitle: "750 Points",
      time: "5",
    },
  ];

  return (
    <>
      {/* User Profile Section */}
      <ColoredHeader
        name="Aaron Liu"
        points={1000}
        rank={1}
        photoUrl="./pfp.png"
      />

      {/* Leaderboard Content */}
      <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
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

      {/* Bottom Navbar */}
      <div className="mt-auto">
        <NavBar />
      </div>
    </>
  );
};

export default Leaderboard;
