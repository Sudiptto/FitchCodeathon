import React, { useState } from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import VendorLogin from './pages/VendorLogin';
import SignUp from './pages/Signup';
import Test from './pages/test';
import VendorHomepage from './pages/VendorHomepage';
import Leaderboard from './pages/Leaderboard';
import Status from './pages/Status';
import Rewards from './pages/Rewards';
import VendorStatus from './pages/VendorStatus';
import UserProfile from './pages/Profile';
import VendorInventory from './pages/VendorInventory';
import VendorProfile from './pages/VendorProfile';

// This is the User Login Page
const LoginPage: React.FC = () => {
  // state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/homepage');
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white px-8 py-12 font-comfortaa" style={{ width: '430px', height: '932px' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="/Ecocycle.png" alt="Ecocycle logo" className="w-48 h-48 mx-auto mb-2" />
        </div>
        <h2 className="mb-8 text-4xl font-normal text-center">Welcome back!</h2>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show Password */}
            <button type="button" className="absolute right-4 top-3.5">
              <img src="/eye.webp" alt="Show password" className="w-6 h-6" />
            </button>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm font-normal text-gray-600">Forgot password?</a>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-normal text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-full max-w-md mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute px-4 text-sm font-normal text-gray-500 bg-white">or</span>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <img src="/facebook.png" alt="Facebook login" className="w-12 h-12 rounded-md" />
          <img src="/google.png" alt="Google login" className="w-12 h-12 rounded-md" />
          <img src="/apple.png" alt="Apple login" className="w-12 h-12 rounded-md" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-normal text-gray-600">
            Don't have an account? <Link to="/signup" className="font-normal text-green-600">Sign Up</Link>
          </p>
          <p className="text-sm font-normal text-gray-600">
            Are you a vendor? <Link to="/vendorlogin" className="font-normal text-green-600">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/vendorlogin" element={<VendorLogin />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/status" element={<Status />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="test" element={<Test/>} />
      <Route path="/vendorhomepage" element={<VendorHomepage />} />
      <Route path="/vendorinventory" element={<VendorInventory />} />
      <Route path="/VendorProfile" element={<VendorProfile />} />
      <Route path="/vendorstatus" element={<VendorStatus />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default App;