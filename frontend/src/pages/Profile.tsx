import { User } from 'lucide-react';
import NavBar from "../components/NavBar";

const UserProfile = () => {
  return (
  <>
  <div className="flex flex-col min-h-screen bg-white">
      <div className="p-4 flex flex-col items-center">
        <img
        src="/Ecocycle.png"
        alt="Ecocycle Logo"
        className="ww-48 mt-4 mb-6 mx-auto"
        style={{ width: "168px", height: "137px" }}
        />
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <User size={40} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold">Aaron Liu</h2>
        <p className="text-gray-600">9372 points</p>
        <p className="text-sm text-gray-500">155 Orders</p>
        <button className="mt-2 px-4 py-1 bg-green-400 text-white rounded-full text-sm">
          My Rewards
        </button>
      </div>

      <div className="flex-grow px-4 py-2">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value="aaronliu@gmail.com"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value="••••••"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            readOnly
          />
        </div>
        <button className="w-full py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </div>
    </div>
    <div className="mt-auto">
        <NavBar />
    </div>
  </>
    
  );
};

export default UserProfile;