import { server } from "@/lib/constants/constant";
import { setIsverified, setworker, userExist } from "@/redux/reducers/auth";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Firebase Auth Imports (added)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Configuration (added)
const firebaseConfig = {
  apiKey: "AIzaSyDLQzuZ3usjZJYs2-y84ynyosbnry0ilFI",
  authDomain: "service-connect-598bf.firebaseapp.com",
  projectId: "service-connect-598bf",
  storageBucket: "service-connect-598bf.appspot.com",
  messagingSenderId: "372520966691",
  appId: "1:372520966691:web:cffdb4b309219ac7792f96",
  measurementId: "G-M9GNXM5Q9T",
};

// Initialize Firebase (added)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const api = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:3000", // Set the base URL here
});

export default function Register() {
  const [role, setRole] = useState("user"); // 'user', 'worker', 'admin'
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpScreen, setIsOtpScreen] = useState(false); // Determines if OTP screen should show
  const dispatch = useDispatch();
  // Worker-specific fields
  const [workerName, setWorkerName] = useState("");
  const [service, setService] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [identityType, setIdentityType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const toastId = toast.loading("registering...");


    try {
      const identity = {
        identityNumber,
        identityType,
      }
      const payload =
        role === "worker"
          ? {
            role,
            email,
            password,
            name,
            workerName,
            service,
            phone,
            location,
            avatar,
            identity
          }
          : { role, email, password, name };
      const config = {
        withCredentials: true,
      }
      const { data } = await axios.post(`${server}/api/auth/signup`, payload, config)
      console.log(data);
      dispatch(userExist(data.user));
      if (role !== 'user') {
        dispatch(setworker(true));
      }
      toast.success(data.message, { id: toastId });
      setIsOtpScreen(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Somthing went wrong", { id: toastId })
    }
    finally {
      setAvatar(null);
      setConfirmPassword('');
      setIdentityNumber('');
      setIdentityType('');
      setLocation('');
      setMessage('');
      setname('');
      setWorkerName('');
      setService('');
      setIsOtpScreen(true);
      setPhone('');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("verifying...");
    try {
      const { data } = await api.post(`${server}/api/auth/verifyemail`, { otp, email, role }, { withCredentials: true });
      toast.success(data.message, { id: toastId });
      dispatch(setIsverified(true));
      navigate("/login");
    } catch (error) {
      console.error("Error during OTP verification:", error.response?.data);
      toast.error(error?.response?.data?.message || "Somthing went wrong", { id: toastId })
    }
  };

  // Firebase Auth: Google Sign-In Handler (added)
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Google Sign-In Successful!");
      console.log("Google User:", user);
      // Here you may want to send the Google user details to your backend API,
      // dispatch actions, or navigate to a different page.
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      toast.error("Google Sign-In failed. Try again.");
    }
    navigate("/verifyemail");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {isOtpScreen ? (
          <>
            {/* OTP Verification Form */}
            <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <label className="block text-gray-700 font-semibold">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="bg-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className=" w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </>
        ) : (
          <>
            {/* Role Selection */}
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border p-2 w-full bg-white"
                >
                  <option value="user">User</option>
                  <option value="worker">Worker</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Common Fields for All Roles */}
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className=" bg-white border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white border p-2 w-full"
                  required
                />
              </div>

              {/* Worker-Specific Fields */}
              {role === "worker" && (
                <>
                  <div>
                    <label className="block mb-2">Worker Name</label>
                    <input
                      type="text"
                      value={workerName}
                      onChange={(e) => setWorkerName(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Service</label>
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Location (Longitude, Latitude)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Avatar URL</label>
                    <input
                      type="text"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Role</label>
                    <select
                      value={identityType}
                      onChange={(e) => setRole(e.target.value)}
                      className="border p-2 w-full bg-white"
                    >
                      <option value="user">Adhar</option>
                      <option value="worker">Bina Adhar</option>
                      <option value="admin">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2">Identity Number</label>
                    <input
                      type="text"
                      value={identityNumber}
                      onChange={(e) => setIdentityNumber(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Register
              </button>
            </form>
            <p className="text-center mt-4 text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>

            {/* Firebase Auth Button for Google Sign-In (added) */}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Sign up with Google
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
