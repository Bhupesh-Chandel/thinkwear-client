// import { IoIosMail } from "react-icons/io";
// import { FaKey } from "react-icons/fa6";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../../Context/AuthProvider";
// import { Link } from "react-router";
// import { api } from "@/http/client";

// function LoginForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { setAuthUser } = useAuth();

//   const onFormSubmit = async (data: { email: string; password: string }) => {
//     try {
//       const response = await api.post("auth/login", data, {
//         withCredentials: true,
//       });

//       if (response.data.accessToken && response.data.refreshToken) {
//         localStorage.setItem("accessToken", response.data.accessToken);
//         localStorage.setItem("refreshToken", response.data.refreshToken);
//       }

//       localStorage.setItem("ThinkWear", JSON.stringify(response.data.user));
//       setAuthUser(response.data.user);
//       alert("Login Successful");
//     } catch (err: any) {
//       if (err.response) {
//         alert(err.response.data.message);
//       } else {
//         alert("Unknown Login Error");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#fdf1ff] to-[#e4cfff] dark:from-[#1b0d27] dark:to-[#2d1242]">
//       <form onSubmit={handleSubmit(onFormSubmit)}>
//         <div className="rounded-2xl shadow-2xl border border-[#d8b4fe] dark:border-[#6a4b91] bg-white dark:bg-[#1a0e2a] w-[400px] max-w-full">
//           <div className="p-8 flex flex-col gap-8">
//             <div className="text-center">
//               <h1 className="text-3xl font-extrabold text-[#A524E3] dark:text-[#CC4ECF] mb-1">
//                 Email Messenger
//               </h1>
//               <h2 className="text-lg text-gray-700 dark:text-gray-300">
//                 Login with your <span className="text-[#A524E3] dark:text-[#CC4ECF]">Account</span>
//               </h2>
//             </div>

//             <div className="flex flex-col gap-5">
//               <label className="flex items-center border border-[#A524E3] dark:border-[#CC4ECF] bg-white dark:bg-[#2a183f] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#CC4ECF]">
//                 <IoIosMail className="text-2xl text-[#A524E3] dark:text-[#CC4ECF] mr-2" />
//                 <input
//                   {...register("email", {
//                     required: { value: true, message: "**This Field is Required**" },
//                   })}
//                   type="text"
//                   placeholder="Email"
//                   className="w-full bg-transparent text-lg text-gray-800 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </label>
//               {errors.email && (
//                 <p className="text-red-500 text-sm pl-1">{errors.email.message}</p>
//               )}

//               <label className="flex items-center border border-[#A524E3] dark:border-[#CC4ECF] bg-white dark:bg-[#2a183f] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#CC4ECF]">
//                 <FaKey className="text-xl text-[#A524E3] dark:text-[#CC4ECF] mr-2" />
//                 <input
//                   {...register("password", {
//                     required: { value: true, message: "**This Field is Required**" },
//                   })}
//                   type="password"
//                   placeholder="Password"
//                   className="w-full bg-transparent text-lg text-gray-800 dark:text-white outline-none placeholder-gray-500 dark:placeholder-gray-400"
//                 />
//               </label>
//               {errors.password && (
//                 <p className="text-red-500 text-sm pl-1">{errors.password.message}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full h-12 rounded-lg text-white bg-gradient-to-r from-[#A524E3] to-[#CC4ECF] hover:brightness-110 transition-all font-semibold tracking-wide"
//             >
//               Log in
//             </button>

//             <div className="text-center text-gray-700 dark:text-gray-300">
//               <p>
//                 Don&apos;t have an Account?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-[#A524E3] dark:text-[#CC4ECF] underline font-medium"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;




import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthProvider";
// import { useAuthStore } from "@/store";
import { Link, useNavigate } from "react-router";
import { api } from "../../http/client";
import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuthUser } = useAuth();
  //  const { setUser} = useAuthStore();

   
  

  const onFormSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await api.post("auth/login", data, {
        withCredentials: true,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      localStorage.setItem("ThinkWear", JSON.stringify(response.data));
      // console.log(response.data);
      setAuthUser(response.data);
        setAuthUser(response.data);
      setIsLoading(false);
      setSuccessMessage("Login Successful");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
        setIsLoading(false);
      } else {
        alert("Unknown Login Error");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/30">

      <div className="w-full max-w-md flex flex-col justify-center">
        {/* {successMessage && (
          <div className="w-[50%] px-4 py-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900 dark:text-green-200 dark:border-green-700 transition-all duration-300">
            ✅ {successMessage}
          </div>
        )} */}
        {successMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700 px-4 py-2 rounded-md text-sm shadow-md z-50 transition-all duration-300">
            ✅ {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onFormSubmit as any )} className="space-y-8">
          {/* Header */}

          {/* Form Card */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-200/50 dark:border-purple-700/50 p-8 space-y-6">
            {/* Email Field */}

            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Email Messenger
            </h1> */}
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Welcome back! Please sign in to your account
              </p>
            </div>


            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
              </div>
              {errors.email && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  {errors.email.message as any}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                </div>
                <input
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-pink-200 dark:border-purple-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-pink-500 text-sm flex items-center gap-1 mt-1">
                  <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                  {errors.password.message as any}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            {/* <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 font-medium transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-xl py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {/* <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <Mail className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div> */}
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <Mail className="w-4 h-4" />
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200 dark:border-purple-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              to="/signup"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-pink-200 dark:border-purple-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-pink-50 dark:hover:bg-purple-700/30 hover:border-pink-300 dark:hover:border-purple-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              Create an account
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-purple-600 dark:text-pink-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-purple-600 dark:text-pink-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;