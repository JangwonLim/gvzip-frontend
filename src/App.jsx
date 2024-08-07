import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/landingPage/landing';
import SignIn from './pages/authenticate/SignIn/SignIn';
import SignUp from './pages/authenticate/SignUp/Signup';
import ProfileInfo from './pages/authenticate/SignUp/ProfileInfo';
import Archive from './pages/archivePage/Archive';
import Card from './components/Card/Card';
import MembershipAuth from './pages/authenticate/SignUp/MembershipAuth/MembershipAuth';
import MembershipAuthFail from './pages/authenticate/SignUp/MembershipAuth/MembershipAuthFail.jsx';
import Profile from './pages/profilePage/profile.jsx';
import EditProfilePicture from './pages/profilePage/editProfilePicture.jsx';
import SignUpSuccess from './pages/authenticate/SignUp/SignUpSuccess/SignUpSuccess.jsx';
import { AuthProvider } from './utils/AuthContext.jsx';
import EditProfileInfo from './pages/profilePage/editProfileInfo/EditProfileInfo.jsx';
import Education from './pages/authenticate/SignUp/Education.jsx';
import Career from './pages/authenticate/SignUp/Career.jsx';
import { FormDataProvider } from './utils/FormDataContext.jsx';
function App() {

  return (
    <AuthProvider>
      <FormDataProvider>
        <Router>
          <NavBarController />
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/membership" element={<MembershipAuth />} />
            <Route path="/signup/info" element={<ProfileInfo />} />
            <Route path="/archive" element={<Archive/>} />
            <Route path="/card" element={<Card />} />
            <Route path="/signup/membership/fail" element={<MembershipAuthFail />}></Route>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/profile/editObjet' element={<EditProfilePicture />}/>
            <Route path='/signup/success' element={<SignUpSuccess />}/>
            <Route path='/profile/editInfo' element={<EditProfileInfo/>}/>
            <Route path='/add/education' element={<Education/>}/>
            <Route path='/add/career' element={<Career/>}/>
          </Routes>
        </Router>
      </FormDataProvider>
    </AuthProvider>
  );
}

function NavBarController({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const hideNavPaths = ['/signin', '/signup', '/auth/register', '/profile/edit'];

  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));

  return shouldHideNav ? null : <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;