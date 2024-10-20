import React from "react";

interface ColoredHeaderProps {
  name: string;
  points?: number;
  rank?: number;
  photoUrl?: string;
}

const ColoredHeader: React.FC<ColoredHeaderProps> = ({ name, points, rank, photoUrl }) => {
  return (
    <div className="relative bg-green-200 text-center p-6 rounded-b-3xl">
      <img src="/Ecocycle.png" alt="Ecocycle Logo" className="w-20 mx-auto mb-2" />

      {/* Profile Picture and Rank Badge (conditionally rendered) */}
      {(photoUrl || rank !== undefined) && (
        <div className="relative inline-block">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${name}'s photo`}
              className="w-24 h-24 rounded-full mx-auto border-4 border-white"
            />
          ) : null}

          {rank !== undefined && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-full text-black font-bold">
              {rank}
            </div>
          )}
        </div>
      )}

      {/* Name and Points */}
      <h2 className="mt-4 text-xl font-bold">{name}</h2>
      {points !== undefined ? (
        <p className="text-gray-500">{points} Points</p>
      ) : (
        <p className="text-gray-500"></p>
      )}
    </div>
  );
};

export default ColoredHeader;