/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Admin from './Admin/Admin';
import AdminRoute from './Admin/AdminRoute';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import CarRepair from './Pages/Services/CarRepair';
import Electronics from './Pages/Services/Electronics';
import EventMange from './Pages/Services/EventMange';
import Laundry from './Pages/Services/Laundry';
import Mainds from './Pages/Services/Mainds';
import Painting from './Pages/Services/Painting';
import Plumbing from './Pages/Services/Plumbing';
import Salon from './Pages/Services/Salon';


const TitleUpdater = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
   
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to the top on initial page load
    window.scrollTo(0, 0);

    return () => {
      // Reset scrollRestoration to auto on component unmount (optional)
      window.history.scrollRestoration = "auto";
    };
  }, [pathname]);

  useEffect(() => {
    const { pathname } = location;
    let title = "";

    switch (pathname) {
      case "/":
        title += "Home";
        break;
      case "/login":
        title += "Login";
        break;
      case "/register":
        title += " Registration";
        break;
      case "/verify-email":
        title += " Verify Email";
        break;
      case "/dashboard":
        title += " Dashboard";
        break;
      case "/schedule":
        title += " Schedule";
        break;
      case "/admin-panel":
        title += " Admin Panel";
        break;
      default:
        title += "";
        
    }
    document.title = title;
  }, [location]);

  return null;
};

function App() {
  
  return (
    <div className=" w-full bg-white">
      <Router>
      
          <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* all services worke rlist  */}
          <Route path='/plumbing' element={<Plumbing />} />
          <Route path='/painting' element={<Plumbing />} />
          <Route path='/cleaning' element={<Painting />} />
          <Route path='/maids' element={<Mainds />} />
          <Route path='/laundry' element={<Laundry />} />
          <Route path='/car' element={<CarRepair />} />
          <Route path='/salon' element={<Salon />} />
          <Route path='/electronics' element={<Electronics />} />
          <Route path='/events' element={<EventMange />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin-panel" element={<Admin />} />
          </Route>
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;