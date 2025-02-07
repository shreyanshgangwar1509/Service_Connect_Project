/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Admin from "./Admin/Admin";
import AdminRoute from "./Admin/AdminRoute";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import Map from "./components/Map";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import BookPage from "./Pages/Booking/Booking";
import ChatBot from "./Pages/ChatBot/ChatBot";
import Home from "./Pages/Home/Home";
import HomeWorker from "./Worker/HomeWorker";
// import Provider from "./Pages/Provider";
import ARScanner from "./components/ARScanner";
import GetHiredPage from "./components/GetHired/page";
import BookingsPage from "./Pages/Booking/BookingsPage";
import MyBookings from "./Pages/Booking/MyBookings";
import Inventory from "./Pages/Inventory";
import Profile from "./Pages/Profile";
import RecommendationPage from "./Pages/Recommendation";
import AllService from "./Pages/Services/AllService";
import ServiceTemplate from "./Pages/Services/ServiceTemplate";
import VoiceCommandScreen from "./Pages/VoiceCommandScreen";

import Analytics from "./Worker/Analytics";
import ChatWindow from "./Worker/ChatWindow";
import Community from "./Worker/Community";
import { Bookings } from "./Worker/MyBooking";
import { OrderConfirmationPage } from "./Worker/OrderConfirmation";
import Portfolio from "./Worker/Portfolio";

// import Chat from "./Pages/ChatBot/Chat";

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
        title += "Registration";
        break;
      case "/verify-email":
        title += "Verify Email";
        break;
      case "/dashboard":
        title += "Dashboard";
        break;
      case "/schedule":
        title += "Schedule";
        break;
      case "/admin-panel":
        title += "Admin Panel";
        break;
      default:
        title += "Service Connect"; // Default title
    }
    document.title = title;
  }, [location]);

  return null;
};

function App() {
  return (
    <div className="w-full bg-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/voicebook" element={<VoiceCommandScreen/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<AllService />} />
          <Route path="/become-provider" element={<GetHiredPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/location-tracking" element={<Map />} />
          {/* <Route path='/chat' element={<Chat/>}/> */}
          {/* Service Routes */}
          <Route path="/plumbing" element={<ServiceTemplate serviceName="Plumbing"  />} />
          <Route path="/painting" element={<ServiceTemplate serviceName="Painting" />} />
          <Route path="/cleaning" element={<ServiceTemplate serviceName="HomeCleaning"/>} />
          <Route path="/maids" element={<ServiceTemplate serviceName="Maids" />} />
          <Route path="/laundry" element={<ServiceTemplate serviceName="Laundry" />} />
          <Route path="/car" element={<ServiceTemplate serviceName="CarRepair" />} />
          <Route path="/salon" element={<ServiceTemplate serviceName="Salon" />} />
          <Route path="/electronics" element={<ServiceTemplate serviceName="Electronics" />} />
          <Route path="/events" element={<ServiceTemplate serviceName="EventManagement" />} />
          <Route path="/become-provider" element={<GetHiredPage/>} />
          <Route path="/bookings" element={<BookingsPage/>}/>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
          <Route path="/ar" element={<ARScanner />} />
          <Route path="/map" element={<Map/>}/>
          {/* Admin and Worker Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin-panel" element={<Admin />} />
          </Route>
          {/* <Route element={<WorkerRoutes />}> */}
          <Route path="/HomeWorker" element={<HomeWorker/> } />
            <Route path="/mybooking" element={<MyBookings/> } />
            <Route path="/pastbookings" />
            <Route path="/review" />

            <Route path="/portfolio"element={<><Portfolio/><Analytics/></> }  />
            <Route path="/community"  element={<Community/> } />
            <Route path="/allbookings"  element={<Bookings/>} />
            <Route path="/Chat"  element={<ChatWindow/>} />

            <Route path="/complain" />
            {/* <Route path="/analytics" /> */}
            <Route path="/order-confirmation"  element={<OrderConfirmationPage/>} />

          {/* </Route> */}
        </Routes>
        <ChatBot />
        {/* <ToastIcon/> */}
        <Footer />
       
      </Router>
    </div>
  );
}

export default App;
