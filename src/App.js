import HeaderWelcome from './HeaderAndFooter/HeaderWelcome';
import Header from './HeaderAndFooter/Header';
import Footer from './HeaderAndFooter/Footer';
import Welcome from './WelcomePage';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import HomePage from './HomePage';
import EditProfilePage from './UserPage/EditProfile';
import GeneralPage from './UserPage/General';
import PasswordPage from './UserPage/Password';
import WedDevelopment from './WedDevelopmentPage';
import FormAddWedsite from './WedDevelopmentPage/FormAddWedsite';
import MasterEnglish from './MasterEnglish';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import './App.css';
import Provider from './UseContext/Provider';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };

  const [currentUser, setCurrentUser] = useState()
  const user = JSON.parse(localStorage.getItem('current-user'))
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await axios.get('https://uwd-node.vercel.app/v1/user/current-user', { headers: { token: `Bearer ${user.token}` } })
          .then (res => {
            if (res.data.code === 200) {
              setCurrentUser(res.data.currentUser._doc);
            }
          })
      }
    };
    fetchData();
  }, []);

  const CommonLayout = ({ children }) => {
    return (
      <>
        <Header user={currentUser}/>
        {children} 
        <Footer />
      </>
    );
  };

  return (
    <Router>
       <ScrollToTop />
      <Provider>
        <div className="App"> 
            <Routes>
              <Route path='/' element={<><HeaderWelcome/><Welcome/></>} />
              <Route path='/signup/new' element={<Signup />}/>
              <Route path='/signin' element={<Signin />}/>
              <Route path='/home' element={<CommonLayout children={<HomePage user={currentUser}/>} />}/>
              <Route path='/account/edit-profile' element={<CommonLayout children={<EditProfilePage user={currentUser}/>} />} />
              <Route path='/account/general' element={<CommonLayout children={<GeneralPage user={currentUser}/>} />} />
              <Route path='/account/password' element={<CommonLayout children={<PasswordPage user={currentUser}/>} />} />
              <Route path='/wed-ui-design' element={<CommonLayout children={<WedDevelopment user={currentUser} />} />} />
              <Route path='/wed-ui-design/add-new' element={<CommonLayout children={<FormAddWedsite />} />} />
              <Route path='/master-english' element={<CommonLayout children={<MasterEnglish />} />} />
            </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
