import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/main';
import Home from './components/main/Home';
import Login from './components/main/Login';
import Signup from './components/main/Signup';
import User from './components/user';
import UserProfile from './components/user/UserProfile';
import BrandLogin from './components/main/brand_login';
import BrandSignup from './components/main/brand_signup';
import UserProvider from './context/UserProvider';
import { useState } from 'react';
import JobDetails from './components/main/JobDetails';
import BrowseJobs from './components/main/BrowseJobs';
import Enroll from './components/user/Enroll';
import Brand from './components/brand';
import ManageJobs from './components/brand/ManageJobs';
import AddJob from './components/brand/AddJob';
import PublicInfluencerProfile from './components/main/PublicInfluencerProfile';
import UserCampaigns from './components/user/UserCampaigns';
import BrandProfile from './components/brand/BrandProfile';
import BrandProvider from './context/BrandProvider';

function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  return (
    <div>
      <BrowserRouter>
        <UserProvider currentUser={currentUser}>
          <BrandProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="main" element={<Main />}>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="brandlogin" element={<BrandLogin />} />
                <Route path="brandsignup" element={<BrandSignup />} />
                <Route path="jobdetails/:jobid" element={<JobDetails />} />
                <Route path="influencer/:id" element={<PublicInfluencerProfile />} />
                <Route path="browsejobs" element={<BrowseJobs />} />
              </Route>

              <Route path="user" element={<User />}>
                <Route path="userprofile" element={<UserProfile />} />
                <Route path="enroll" element={<Enroll />} />
                <Route path="userjobs" element={<UserCampaigns />} />
              </Route>

              <Route path="brand" element={<Brand />}>
                <Route element={<AddJob />} path="addjob" />
                <Route element={<ManageJobs />} path="managejob" />
                <Route element={<BrandProfile />} path="profile" />
              </Route>

              <Route path="home" element={<Home />} />
            </Routes>
          </BrandProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
