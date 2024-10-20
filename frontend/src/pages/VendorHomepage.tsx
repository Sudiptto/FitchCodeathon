import React from 'react';
import NavBarVendor from '@/components/NavBarVendor';

const VendorHomepage: React.FC = () => {
  const stats = [
    { label: "You're business saved 500 plates" },
    { label: "You're business saved $20" },
    { label: "You're business prevented 20 KG of carbon" },
    { label: "You're business prevented 20 lbs of waste" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-md text-center bg-white">
      <img
        src="/Ecocycle.png"
        alt="Ecocycle Logo"
        style={{ width: "168px", height: "137px" }}
        className="ww-48 mt-4 mb-6 mx-auto"
      />
      <div className="flex flex-col items-center w-full px-4 mb-4">
        {stats.map((stat, index) => (
          <p key={index} className="text-center mb-4 font-comfortaa text-xl font-semibold">{stat.label}</p>
        ))}
        <p className="text-center font-bold mt-2">Thank you!</p>
      </div>
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