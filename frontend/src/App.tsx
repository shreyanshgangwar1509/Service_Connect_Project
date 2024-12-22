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
// import Provider from "./Pages/Provider";
import GetHiredPage from "./components/GetHired/page";
import WorkerRoutes from "./Worker/WorkerRoutes";
import {
  // AllService,
  Painting,
  CarRepair,
  Electronics,
  EventManagement,
  HomeCleaning,
  Laundry,
  Maids,
  Plumbing,
  Salon,
} from "./Pages/Services/ServiceTemplate"; // Updated import path
import AllService from "./Pages/Services/AllService";
import BookingsPage from "./Pages/Booking/BookingsPage";
import Inventory from "./Pages/Inventory";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<AllService />} />
          <Route path="/become-provider" element={<GetHiredPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/location-tracking" element={<Map />} />
          {/* Service Routes */}
          <Route path="/plumbing" element={<Plumbing />} />
          <Route path="/painting" element={<Painting />} />
          <Route path="/cleaning" element={<HomeCleaning />} />
          <Route path="/maids" element={<Maids />} />
          <Route path="/laundry" element={<Laundry />} />
          <Route path="/car" element={<CarRepair />} />
          <Route path="/salon" element={<Salon />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/events" element={<EventManagement />} />
          <Route path="/gethired" />
          <Route path="/bookings" element={<BookingsPage/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          {/* Admin and Worker Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin-panel" element={<Admin />} />
          </Route>
          <Route element={<WorkerRoutes />}>
            <Route path="/mybooking" />
            <Route path="/portfolio" />
            <Route path="/community" />
            <Route path="/pastbookings" />
            <Route path="/review" />
            <Route path="/complain" />
            <Route path="/analytics" />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
