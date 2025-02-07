import { server } from "@/lib/constants/constant";
import { userExist } from "@/redux/reducers/auth";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Firebase Imports (added)
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("user");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging...");
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    };
    try {
      const { data } = await axios.post(
        `${server}/api/auth/login`,
        { email, password },
        config
      );
      dispatch(userExist(data.user));
      toast.success(data.message, { id: toastId });
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something Went Wrong",
        { id: toastId }
      );
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  // Firebase Auth: Google Sign-In Handler (added)
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Google Sign-In Successful!");
      console.log("Google User:", user);
      // Optionally, get the token and store or send it to your backend
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      // You might want to dispatch a redux action with the Google user details.
      dispatch(userExist(user));
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      toast.error("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fade-in">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Dont have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

        {/* Firebase Auth Button for Google Sign-In (added) */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
