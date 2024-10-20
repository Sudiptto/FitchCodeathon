import React from 'react';
import NavBarVendor from '@/components/NavBarVendor';

const VendorHomepage = ({email}: {email: string}) => {
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
        className="mx-auto mt-4 mb-6 ww-48"
      />
      <div className="flex flex-col items-center w-full px-4 mb-4">
        {stats.map((stat, index) => (
          <p key={index} className="mb-4 text-xl font-semibold text-center font-comfortaa">{stat.label}</p>
        ))}
        <p className="mt-2 font-bold text-center">Thank you!</p>
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