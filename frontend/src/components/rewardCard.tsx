import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import icons from './icons';

/* Reward Card format with image */
const RewardCard = ({
  title,
  subtitle,
  points,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  points: string;
  imageUrl: string;
}) => {
  // State for controlling dialog open/close
  const [isOpen, setIsOpen] = useState(false);
  // State for storing user data
  const [user, setUser] = useState<any>();

  // Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  // Function to subtract points from user's account
  const subtractPoints = async () => {
    let newPoints;
    if (user) {
      const pointsValue = parseInt(points.replace(/\D/g, ''));
      newPoints = parseInt(user?.points) - pointsValue;
    } else {
      console.log("User not signed in");
    }
    const newUser = {
      ...user,
      points: `${newPoints ? newPoints : user?.points} points`,
    };
    // API call to update user data
    fetch('/api/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    closeDialog();
  }

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    const fetchReferralCode = async () => {
      //get api call
      const response = await fetch('/api/getUser')
      const data = await response.json()
      setUser(data)
    };
    fetchReferralCode();
  }, []);

  return (
    // Dialog component for reward confirmation
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger for opening the dialog */}
      <DialogTrigger asChild>
        <div className="w-full max-w-md m-auto my-2 p-4 rounded-lg shadow-lg flex items-center justify-between bg-white cursor-pointer">
          {/* Left section (Image + Text) */}
          <div className="flex items-center">
            <img src={imageUrl} alt={title} className="w-12 h-12 rounded-lg mr-4" />
            {/* Title + Subtitle */}
            <div className="flex flex-col">
              <h2 className="text-black text-md font-semibold">{title}</h2>
              <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
          </div>
          {/* Right section (Points) */}
          <div className="text-blue-600 text-lg font-bold">
            {points}
          </div>
        </div>
      </DialogTrigger>
      {/* Dialog content */}
      <DialogContent className="w-5/6 max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl mb-4">Do you want to buy {title} for {points}</h2>
          <div className="flex justify-center items-center mb-4">
            <img src={imageUrl} alt={title} className="w-48 h-24 object-contain" />
          </div>
          <div className="flex justify-between">
            <button className="px-6 py-2 bg-red-500 text-white rounded-md text-lg font-semibold" onClick={closeDialog}>Decline</button>
            <button className="px-6 py-2 bg-green-400 text-white rounded-md text-lg font-semibold" onClick={subtractPoints}>Confirm</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardCard;