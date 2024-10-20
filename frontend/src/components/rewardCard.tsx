import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
    const pointsValue = parseInt(points.replace(/\D/g, ''));
    console.log(`${import.meta.env.VITE_API_URL}/EcoCycle/redeemReward/${pointsValue}/${user["email"]}`)
    // API call to update user data
  fetch(`${import.meta.env.VITE_API_URL}/EcoCycle/redeemReward/${pointsValue}/${user["email"]}`).then(() => {
    window.location.reload();
  })
    closeDialog();
  }

  const fetchReferralCode = async () => {
    //get api call
    const response = await fetch(`${import.meta.env.VITE_API_URL}/EcoCycle/getUserInfo/mahinEvan@gmail.com`)
    const data = await response.json()
    console.log(data)
    setUser(data)
    };
  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetchReferralCode();
}, []);

  return (
    // Dialog component for reward confirmation
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger for opening the dialog */}
      <DialogTrigger asChild>
        <div className="flex items-center justify-between w-full max-w-md p-4 m-auto my-2 bg-white rounded-lg shadow-lg cursor-pointer">
          {/* Left section (Image + Text) */}
          <div className="flex items-center">
            <img src={imageUrl} alt={title} className="w-12 h-12 mr-4 rounded-lg" />
            {/* Title + Subtitle */}
            <div className="flex flex-col">
              <h2 className="font-semibold text-black text-md">{title}</h2>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          {/* Right section (Points) */}
          <div className="text-lg font-bold text-blue-600">
            {points}
          </div>
        </div>
      </DialogTrigger>
      {/* Dialog content */}
      <DialogContent className="w-5/6 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="mb-4 text-2xl">Do you want to buy {title} for {points}</h2>
          <div className="flex items-center justify-center mb-4">
            <img src={imageUrl} alt={title} className="object-contain w-48 h-24" />
          </div>
          <div className="flex justify-between">
            <button className="px-6 py-2 text-lg font-semibold text-white bg-red-500 rounded-md" onClick={closeDialog}>Decline</button>
            <button className="px-6 py-2 text-lg font-semibold text-white bg-green-400 rounded-md" onClick={subtractPoints}>Confirm</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardCard;