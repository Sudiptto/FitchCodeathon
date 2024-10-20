import React, { useState, useEffect } from "react";
import SquishedCard from "../components/squishedCard";
import ColoredHeader from "../components/coloredHeader";
import NavBar from "../components/NavBar";

interface LeaderboardData {
  firstName: string;
  lastName: string;
  points: number;
  rank: number;
  username: string;
}

const Leaderboard = ({email}: {email: string}) => {
  const [data, setData] = useState<LeaderboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://10.170.35.244:5500/EcoCycle/getLeaderboard');
        if (!response.ok) {
          throw new Error('There was an error dude!');
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch leaderboard data');
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <div>No data available</div>;

  return (
    <>
      {/* User Profile Section */}
      <ColoredHeader
        name={`${data[0].firstName} ${data[0].lastName}`}
        points={data[0].points}
        rank={data[0].rank}
        photoUrl="./pfp.png"
      />

      {/* Leaderboard Content */}
      <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
        <div className="flex flex-col w-full px-4 gap-y-4">
          {data.slice(1).map((item, index) => (
            <SquishedCard
              key={index}
              title={`${item.firstName} ${item.lastName}`}
              subtitle={`${item.points} Points`}
              time={`${item.rank}`}
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