import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const VendorLogin = () => {
  const [vendorEmail, setVendorEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vendor-homepage');
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white px-8 py-12 font-comfortaa" style={{ width: '430px', height: '932px' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="/Ecocycle.png" alt="Ecocycle logo" className="w-48 h-48 mx-auto mb-2" />
        </div>
        <h2 className="mb-8 text-4xl font-normal text-center">Welcome Back!</h2>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Vendor Email */}
          <input
            type="email"
            placeholder="Vendor Email"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={vendorEmail}
            onChange={(e) => setVendorEmail(e.target.value)}
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
        <div className="text-center space-y-2">
          <p className="text-sm font-normal text-gray-600">
            Want to join EcoCycle? <a href="#" className="font-normal text-green-600">Contact Us</a>
          </p>
          <p className="text-sm font-normal text-gray-600">
            Why join us? <a href="#" className="font-normal text-green-600">Join Us</a>
          </p>
          <p className="text-sm font-normal text-gray-600">
            Are you a user? <Link to="/" className="font-normal text-green-600">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;