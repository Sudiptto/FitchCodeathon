import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add sign up logic here
    navigate('/homepage');
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white px-8 py-12 font-comfortaa" style={{ width: '430px', height: '932px' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="/Ecocycle.png" alt="Ecocycle logo" className="w-48 h-48 mx-auto mb-2" />
        </div>
        <h2 className="mb-8 text-4xl font-normal text-center">Join Us!</h2>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="absolute right-4 top-3.5">
              <img src="/eye.webp" alt="Show password" className="w-6 h-6" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Referral Code"
            className="w-full px-4 py-3 text-lg font-normal border-2 border-black rounded-md"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 text-lg font-normal text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-full max-w-md mt-8">
        <div className="relative flex items-center justify-center mb-6">
          <hr className="w-full border-gray-300" />
          <span className="absolute px-4 text-sm font-normal text-gray-500 bg-white">or</span>
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <img src="/facebook.png" alt="Facebook signup" className="w-12 h-12 rounded-md" />
          <img src="/google.png" alt="Google signup" className="w-12 h-12 rounded-md" />
          <img src="/apple.png" alt="Apple signup" className="w-12 h-12 rounded-md" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-normal text-gray-600">
            Have an account? <Link to="/" className="font-normal text-green-600">Log In</Link>
          </p>
          <p className="text-sm font-normal text-gray-600">
            Are you a vendor? <Link to="/vendorlogin" className="font-normal text-green-600">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;