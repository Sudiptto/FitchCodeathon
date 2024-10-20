import React, { useEffect, useState } from "react";
import NavBarVendor from '@/components/NavBarVendor';
import TypewriterText from "../components/TypewriterText";

interface VendorImpactData {
  co2_savings_kg: number;
  email: string;
  energy_savings_mj: number;
  landfill_waste_saved_plates: number;
  waste_saved_lbs: number;
}

const VendorHomepage: React.FC = () => {
  const [vendorImpact, setVendorImpact] = useState<VendorImpactData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendorImpact = async () => {
      try {
        const response = await fetch(
          "http://10.170.35.244:5500/EcoCycle/getVendorImpact"
        );

        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }

        const result = await response.json();
        console.log("Fetched data:", result);

        setVendorImpact(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user impact:", error);
        setError("Failed to fetch user impact data");
        setIsLoading(false);
      }
    };

    fetchVendorImpact();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md text-center bg-white">
      <img
        src="/Ecocycle.png"
        alt="Ecocycle Logo"
        style={{ width: "168px", height: "137px" }}
        className="ww-48 mt-4 mb-6 mx-auto"
      />
      <h2 className="mt-0 mb-1 text-center text-xl text-green-600">Your EcoCycle Vendor Impact </h2>

      {isLoading ? (
        <p>Loading vendor impact...</p>
      ) : error ? (
        <p>{error}</p>
      ) : vendorImpact ? (
        <div className="mb-2 mt-2">
          <TypewriterText
            textArray={[
              `CO2 Savings: ${vendorImpact.co2_savings_kg} kg`,
              `Energy Savings: ${vendorImpact.energy_savings_mj} MJ`,
              `Landfill Waste Saved: ${vendorImpact.landfill_waste_saved_plates} plates`,
              `Waste Saved: ${vendorImpact.waste_saved_lbs} lbs`,
            ]}
            typeSpeed={50}
            deleteSpeed={30}
            delay={1000}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}

<h2 className="mt-1 mb-2 text-center text-xl text-green-600">Thank You!</h2>
<div className="w-full px-4 mb-4">
        <img
          src="/graph.png"
          alt="Graph"
          className="w-full"
        />
      </div>
      <NavBarVendor />
    </div>
  );
};

export default VendorHomepage;