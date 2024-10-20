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
import { useMutation, QueryClient } from '@tanstack/react-query';

const LoginPage: React.FC<{ email: string, setEmail: React.Dispatch<React.SetStateAction<string>>, setPassword: React.Dispatch<React.SetStateAction<string>> }> = ({ email, setEmail, setPassword }) => {
  const [password, setPasswordState] = useState('');
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      fetch(`https://${import.meta.env.VITE_API_URL}/EcoCycle/logIn/${email}/${password}`).then((res) =>
        res.json()
      )
    },
    onSuccess: userW => {
      queryClient.setQueryData(["user", email], userW);
      navigate('/homepage');
    }
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-start px-8 py-12 bg-white font-comfortaa" style={{ width: '430px', height: '932px' }}>
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
              onChange={(e) => setPasswordState(e.target.value)}
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
        <div className="flex justify-center mb-8 space-x-4">
          <img src="/facebook.png" alt="Facebook login" className="w-12 h-12 rounded-md" />
          <img src="/google.png" alt="Google login" className="w-12 h-12 rounded-md" />
          <img src="/apple.png" alt="Apple login" className="w-12 h-12 rounded-md" />
        </div>
        <div className="space-y-2 text-center">
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Routes>
      <Route path="/" element={<LoginPage email={email} setEmail={setEmail} setPassword={setPassword} />} />
      <Route path="/homepage" element={<Homepage email={email} />} />
      <Route path="/leaderboard" element={<Leaderboard email={email} />} />
      <Route path="/vendorlogin" element={<VendorLogin email={email} />} />
      <Route path="/rewards" element={<Rewards email={email} />} />
      <Route path="/status" element={<Status />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="test" element={<Test />} />
      <Route path="/vendorhomepage" element={<VendorHomepage email={email} />} />
      <Route path="/vendorstatus" element={<VendorStatus email={email} />} />
      <Route path="/profile" element={<UserProfile email={email} />} />
    </Routes>
  );
};

export default App;