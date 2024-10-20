import React from "react";
import SquishedCard from "../components/squishedCard";
import NavBar from "../components/NavBar";

const Leaderboard: React.FC = () => {
  const data = [
    {
      title: "Participant A",
      subtitle: "Completed 10 tasks",
      time: "1h 30m",
    },
    {
      title: "Participant B",
      subtitle: "Completed 8 tasks",
      time: "2h 15m",
    },
    {
      title: "Participant C",
      subtitle: "Completed 6 tasks",
      time: "1h 50m",
    },
    {
      title: "Participant D",
      subtitle: "Completed 4 tasks",
      time: "1h 50m",
    },
    {
      title: "Participant E",
      subtitle: "Completed 3 tasks",
      time: "1h 50m",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
      <img src="/Ecocycle.png" alt="Ecocycle Logo" className="w-48 mt-4 mb-6" />
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
      <NavBar />
    </div>
  );
};

export default Leaderboard;
