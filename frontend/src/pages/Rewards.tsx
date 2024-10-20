import RewardCard from "../components/rewardCard";
import ColoredHeader from "../components/coloredHeader"; 
import NavBar from "../components/NavBar";

const Rewards = ({email}: {email: string}) => {
    const data = [
        {
          title: "Transit OMNY Credit",
          subtitle: "$10 Credit",
          points: "1000 Points",
          imageUrl: "./transit.png",
        },
        {
          title: "Blazing Saddles Credit",
          subtitle: "$5 Credit",
          points: "500 Points",
          imageUrl: "./blazing-saddles.png",
        },
        {
          title: "Restaurant Credit",
          subtitle: "$5 Credit",
          points: "500 Points",
          imageUrl: "./restaurant.png",
        },
        {
          title: "Fad Market Voucher",
          subtitle: "$5 Credit",
          points: "500 Points",
          imageUrl: "./fad-market.png",
        },
        {
          title: "Ferry Ticket",
          subtitle: "$5 Credit (Oct - May)",
          points: "500 Points",
          imageUrl: "./nyc-ferry.svg",
        },
      ];

  return (
    <>
      {/* User Profile Section */}
      <ColoredHeader
        name="Rewards"
        points={9872}
      />

      {/* Rewards Content */}
      <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
        <div className="flex flex-col w-full px-4 overflow-scroll gap-y-4 h-7/8">
          {data.map((item, index) => (
            <RewardCard
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              points={item.points}
              imageUrl={item.imageUrl}
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

export default Rewards;