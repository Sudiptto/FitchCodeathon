import React, { useEffect, useState } from "react";
import Card from "../components/card";
import NavBar from "../components/NavBar";
import TypewriterText from "../components/TypewriterText";

interface CardData {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface UserImpactData {
  co2_savings_kg: number;
  email: string;
  energy_savings_mj: number;
  landfill_waste_saved_plates: number;
  waste_saved_lbs: number;
}

const Homepage: React.FC = () => {
  const [userImpact, setUserImpact] = useState<UserImpactData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const data: CardData[] = [
    {
      title: "OTHER OF PEARL",
      description: "by Jenny Kendler Friday-Sunday through November 3",
      image:
        "https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail/Schenck-Governors-Island-NRDC-Jenny-Kendler-2024_06_13-DSC_6628.png",
      link: "https://www.govisland.com/things-to-do/public-art/other-of-pearl",
    },
    {
      title: "BLAZING SADDLES BIKE RENTALS",
      description: "",
      image:
        "https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail2x/blazing-saddles-grid-todd-barbee.jpg",
      link: "https://www.govisland.com/things-to-do/recreation/bike-rentals",
    },
    {
      title: "FAD MARKET",
      description: "2024 Pop-Ups October 19 + 20",
      image:
        "https://gov-island-site.s3.amazonaws.com/pages/_eventThumbnail2x/FAD-Market-at-Gov-Island.jpeg",
      link: "https://www.govisland.com/things-to-do/events/fad-market-2",
    },
  ];

  useEffect(() => {
    const fetchUserImpact = async () => {
      try {
        /* When getEmail is implmenet we can change to responsev2, currently hard coded using response to get a user gmail */
        const email = await fetch("http://10.170.35.244:5500/EcoCycle/");
        const responseV2 = await fetch(
          "http://10.170.35.244:5500/EcoCycle/getUserImpact?email=${encodeURIComponent(email)}"
        );

        const response = await fetch(
          "http://10.170.35.244:5500/EcoCycle/getUserImpact/mahinEvan@gmail.com"
        );

        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }

        const result = await response.json();
        console.log("Fetched data:", result);

        setUserImpact(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user impact:", error);
        setError("Failed to fetch user impact data");
        setIsLoading(false);
      }
    };

    fetchUserImpact();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto bg-white">
      <img
        src="/Ecocycle.png"
        alt="Ecocycle Logo"
        style={{ width: "168px", height: "137px" }}
        className="mt-4 mb-6"
      />

      <h2 className="mt-8 mb-2 text-center text-xl text-green-600">Your EcoCycle Impact</h2>

      {isLoading ? (
        <p>Loading user impact...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userImpact ? (
        <div className="mb-6">
          <TypewriterText
            textArray={[
              `CO2 Savings: ${userImpact.co2_savings_kg} kg`,
              `Energy Savings: ${userImpact.energy_savings_mj} MJ`,
              `Landfill Waste Saved: ${userImpact.landfill_waste_saved_plates} plates`,
              `Waste Saved: ${userImpact.waste_saved_lbs} lbs`,
            ]}
            typeSpeed={50}
            deleteSpeed={30}
            delay={1000}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}

      <div className="flex flex-col w-full gap-y-4 px-4">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Homepage;
