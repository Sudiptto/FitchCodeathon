import { User } from 'lucide-react';
import VendorNavBar from "../components/NavBarVendor";

const VendorProfile = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex flex-col items-center p-4">
          <img
            src="/Ecocycle.png"
            alt="Ecocycle Logo"
            className="mx-auto mt-0 mb-6 ww-48"
            style={{ width: "168px", height: "137px" }}
          />
          <div className="flex items-center justify-center w-20 h-20 mb-2 bg-gray-200 rounded-full">
            <User size={40} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-bold">Resturant</h2>
          <p className="text-sm text-gray-500">Vendor</p>
          <p className="text-gray-600">1550 orders</p>
        </div>
        <div className="flex-grow px-4 py-2">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value="aaronliu@gmail.com"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value="••••••"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              readOnly
            />
          </div>
          <button 
            className="w-full py-2 text-white bg-red-500 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <VendorNavBar />
      </div>
    </>
  );
};

export default VendorProfile;