import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import icons from './icons'; // Assuming this is where your icons are imported from

const Referral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchReferralCode = async () => {
        //get api call
        const response = await fetch('/api/getUser')
        const data = await response.json()
        setUser(data)
        };
        fetchReferralCode();
    }, []);


  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-col items-center">
          <img src={icons.refferalIcon} alt="Referral Icon" className="w-6 h-6 mb-1" />
          <span className="text-sm">Referral</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-6 mx-auto bg-white rounded-lg">
        <div className="flex flex-col items-center text-center">
          <img src={icons.refferalIcon} alt="Referral Icon" className="w-16 h-16 mb-4" />
          <h2 className="mb-2 text-xl font-bold text-green-400">REFERRAL CODE</h2>
          <h3 className="mb-4 text-2xl font-bold">Send to Friend!</h3>
          <p className="mb-4 text-5xl font-bold">{user? (user["referral_code"]):(<p>Are you signed in?</p>)}</p>
          <button 
            className="px-8 py-2 mb-4 text-white bg-green-400 rounded-full"
            onClick={closeDialog}
          >
            Continue
          </button>
          <p className="text-sm text-gray-600">
            Send this referral code to someone who's never signed up before!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Referral;