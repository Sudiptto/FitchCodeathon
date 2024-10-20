import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginPage from './pages/LoginPage';
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

const App: React.FC = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;