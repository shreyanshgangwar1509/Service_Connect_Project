
// import axios from "axios";
// // import dotenv from 'dotenv';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // dotenv.config();
// const api = axios.create({
//   baseURL: "http://localhost:3000", // Set the base URL here
// });

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [isOtpScreen, setIsOtpScreen] = useState(false); // Determines if OTP screen should show

//   const navigate = useNavigate();

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       const response = await api.post("/api/auth/register", { email, password, username });
//       if (response.status === 200) {
//         setIsOtpScreen(true); // Show OTP screen on successful registration
//       }
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/api/auth/verifyemail", { otp, email });
//       setMessage(response.data.message);
//       navigate("/"); // Redirect to home on successful OTP verification
//     } catch (error) {
//       console.error("Error during OTP verification:", error.response?.data);
//       setMessage(error.response?.data?.message || "Invalid OTP or OTP expired. Please try again.");
//     }
//   };
    
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
//         {isOtpScreen ? (
//           // OTP Verification Form
//           <>
//             <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>
//             <form onSubmit={handleOtpSubmit} className="space-y-4">
//               <label className="block text-gray-700 font-semibold">OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
//               >
//                 Verify OTP
//               </button>
//             </form>
//             {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//           </>
//         ) : (
//           // Registration Form
//           <>
//             <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleRegisterSubmit} className="space-y-4">
//               <div>
//                 <label className="block mb-2">Username</label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="border p-2 w-full bg-white"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border p-2 w-full bg-white"
//                   required
//                 />
//               </div>
//               <div className="mt-4">
//                 <label className="block mb-2">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="border p-2 w-full bg-white"
//                   required
//                 />
//               </div>
//               <div className="mt-4">
//                 <label className="block mb-2">Confirm Password</label>
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="border p-2 w-full bg-white"
//                   required
//                 />
//               </div>
//               <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg">
//                 Register
//               </button>
//               <p className="text-center mt-4 text-gray-500">
//           Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
//         </p>
//             </form>
//           </>
//         )}
      
//         </div>
//       </div>
    
//   );
// }


import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000", // Set the base URL here
});

export default function Register() {
  const [role, setRole] = useState("user"); // 'user', 'worker', 'admin'
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpScreen, setIsOtpScreen] = useState(false); // Determines if OTP screen should show

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

    try {
      const payload =
        role === "worker"
          ? {
              role,
              email,
              password,
              username,
              workerName,
              service,
              phone,
              location,
              avatar,
              identityType,
              identityNumber,
            }
          : { role, email, password, username };

      const response = await api.post("/api/auth/register", payload);

      if (response.status === 200) {
        setIsOtpScreen(true); // Show OTP screen on successful registration
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/verifyemail", { otp, email });
      setMessage(response.data.message);
      navigate("/"); // Redirect to home on successful OTP verification
    } catch (error) {
      console.error("Error during OTP verification:", error.response?.data);
      setMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
    }
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
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                    <label className="block mb-2">Name</label>
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
                    <label className="block mb-2">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Identity Type</label>
                    <input
                      type="text"
                      value={identityType}
                      onChange={(e) => setIdentityType(e.target.value)}
                      className="bg-white border p-2 w-full"
                    />
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

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                Register
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
