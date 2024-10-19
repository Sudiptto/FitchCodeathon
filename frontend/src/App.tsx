import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './pages/Homepage';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/homepage');
  };

  return (
    <div className="flex flex-col items-center justify-start bg-white px-8 py-12 font-comfortaa" style={{ width: '430px', height: '932px' }}>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/Ecocycle.png" alt="Ecocycle logo" className="w-48 h-48 mx-auto mb-2" />
        </div>
        <h2 className="mb-8 text-4xl font-normal text-center">Welcome back!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <div className="text-right">
            <a href="#" className="text-sm font-normal text-gray-600">Forgot password?</a>
          </div>
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
            Don't have an account? <a href="#" className="font-normal text-green-600">Sign Up</a>
          </p>
          <p className="text-sm font-normal text-gray-600">
            Are you a vendor? <a href="#" className="font-normal text-green-600">Log In</a>
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
    </Routes>
  );
};

export default App;