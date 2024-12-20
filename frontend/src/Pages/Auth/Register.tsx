// // import { signIn } from "next-auth/react";
// // import { useState } from "react";

// // export default function SignIn() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSignIn = async (e) => {
// //     e.preventDefault();
// //     const result = await signIn("credentials", {
// //       redirect: false,
// //       email,
// //       password,
// //     });
// //     if (!result.error) {
// //       // Redirect or handle successful login
// //     } else {
// //       alert("Invalid email or password");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
// //       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fade-in">
// //         <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        
// //         <form onSubmit={handleSignIn} className="space-y-4">
// //           <div>
// //             <label className="block text-gray-700 font-semibold">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
// //             />
// //           </div>
          
// //           <div>
// //             <label className="block text-gray-700 font-semibold">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
// //           >
// //             Sign in with Email
// //           </button>
// //         </form>

// //         <div className="my-6 text-center text-gray-500">or sign in with</div>
        
// //         <div className="flex space-x-4 justify-center">
// //           <button
// //             onClick={() => signIn("google")}
// //             className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 transition-transform duration-200 transform hover:scale-110"
// //           >
// //             <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
// //           </button>
// //           <button
// //             onClick={() => signIn("github")}
// //             className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-transform duration-200 transform hover:scale-110"
// //           >
// //             <img src="/github-icon.svg" alt="GitHub" className="w-6 h-6" />
// //           </button>
// //           <button
// //             onClick={() => signIn("facebook")}
// //             className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 transition-transform duration-200 transform hover:scale-110"
// //           >
// //             <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   baseURL: "http://localhost:3000", // Set the base URL here
// });
// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [username, setusername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//         try {
//             const response  = await api.post('/api/auth/register', { email, password,username });
//             // Redirect to login or show a success message
//             if(response.status===200)
//             navigate('/verifyemail',{ state: { email } });

//         } catch (err) {
//             setError('Registration failed');
//         }
//     };

//     return (
//         <div className="container mx-auto w-[70%] flex flex-col items-center justify-center">
//             <h1 className="text-2xl font-bold">Register</h1>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div>
//                     <label className="block mb-2">Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setusername(e.target.value)}
//                         className="border p-2 w-full"
//                         required
//                     />
//                     <label className="block mb-2">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="border p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <div className="mt-4">
//                     <label className="block mb-2">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="border p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <div className="mt-4">
//                     <label className="block mb-2">Confirm Password</label>
//                     <input
//                         type="password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="border p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
//                     Register
//                 </button>
//             </form>
//             <div className="mt-4 text-center">
//                 <p>Or register with:</p>
//                 <div className="flex justify-center mt-2">
//                     <a
//                         href="/api/auth/google"
//                         className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                     >
//                         Google
//                     </a>
//                     <a
//                         href="/api/auth/facebook"
//                         className="bg-blue-700 text-white px-4 py-2 rounded mx-2"
//                     >
//                         Facebook
//                     </a>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import axios from "axios";
// import dotenv from 'dotenv';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// dotenv.config();
const api = axios.create({
  baseURL: "http://localhost:3000", // Set the base URL here
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpScreen, setIsOtpScreen] = useState(false); // Determines if OTP screen should show

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/api/auth/register", { email, password, username });
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
      setMessage(error.response?.data?.message || "Invalid OTP or OTP expired. Please try again.");
    }
  };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {isOtpScreen ? (
          // OTP Verification Form
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <label className="block text-gray-700 font-semibold">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Verify OTP
              </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </>
        ) : (
          // Registration Form
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 w-full bg-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full bg-white"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 w-full bg-white"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 w-full bg-white"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-4 rounded-lg">
                Register
              </button>
              <p className="text-center mt-4 text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
            </form>
          </>
        )}
       
        </div>
      </div>
    
  );
}
