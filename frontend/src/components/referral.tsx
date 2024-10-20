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
          <span className="text-sm">Refferal</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg p-6 max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center">
          <img src={icons.refferalIcon} alt="Referral Icon" className="w-16 h-16 mb-4" />
          <h2 className="text-green-400 font-bold text-xl mb-2">REFERRAL CODE</h2>
          <h3 className="text-2xl font-bold mb-4">Send to Friend!</h3>
          <p className="text-5xl font-bold mb-4">{user? (user["referral_code"]):(<p>Are you signed in?</p>)}</p>
          <button 
            className="bg-green-400 text-white py-2 px-8 rounded-full mb-4"
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