import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/landingPage/landing';
import SignIn from './pages/authenticate/SignIn/SignIn';
import SignUp from './pages/authenticate/SignUp/Signup';
import ProfileInfo from './pages/authenticate/SignUp/ProfileInfo';
import Archive from './pages/archivePage/Archive';
import Card from './components/Card/Card';
import Dropdown from './components/Filter/Dropdown';
import MembershipAuth from './pages/authenticate/SignUp/MembershipAuth/MembershipAuth';
import BottomSheet from './components/BottomSheet/BottomSheet.jsx';
import MembershipAuthFail from './pages/authenticate/SignUp/MembershipAuth/MembershipAuthFail.jsx';
import Profile from './pages/profilePage/profile.jsx';
import EditProfilePicture from './pages/profilePage/editProfilePicture.jsx';
import SignUpSuccess from './pages/authenticate/SignUp/SignUpSuccess/SignUpSuccess.jsx';
import Modal from './components/ProfileDetail/Modal.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <NavBarController isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/membership" element={<MembershipAuth />} />
        <Route path="/signup/info" element={<ProfileInfo />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/card" element={<Card />} />
        <Route path="/filter" element={<Dropdown />}></Route>
        <Route path="/bottomsheet" element={<BottomSheet />}></Route>
        <Route path="/signup/membership/fail" element={<MembershipAuthFail />}></Route>
        <Route path='/member' element={<Profile />}/>
        <Route path='/signup/edit-objet' element={<EditProfilePicture />}/>
        <Route path='/signup/success' element={<SignUpSuccess />}/>
        <Route path='modal' element={<Modal/>}/>


        {/* PrivateRouter Can be used to protect routes */}
      </Routes>
    </Router>
  );
}

function NavBarController({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const hideNavPaths = ['/signin', '/signup', '/auth/register'];

  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));

  return shouldHideNav ? null : <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;