// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         console.log("Email:", email);
//         console.log("Password:", password);

//         // Temporary login logic
//         if (email && password) {
//             alert("Login successful!");
//             navigate("/");
//         } else {
//             alert("Please fill all fields");
//         }
//     };

//     return (
//         <main className="flex items-center justify-center w-full px-4 min-h-screen">
//             <form onSubmit={handleSubmit} className="flex w-full flex-col max-w-96">
//                 <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>

//                 <p className="mt-4 text-base text-gray-500/90">
//                     Please enter email and password to access.
//                 </p>

//                 <div className="mt-10">
//                     <label className="font-medium">Email</label>
//                     <input
//                         placeholder="Please enter your email"
//                         className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
//                         required
//                         type="email"
//                         name="email"
//                     />
//                 </div>

//                 <div className="mt-6">
//                     <label className="font-medium">Password</label>
//                     <input
//                         placeholder="Please enter your password"
//                         className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
//                         required
//                         type="password"
//                         name="password"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
//                 >
//                     Login
//                 </button>

//                 <p className="text-center py-8">
//                     Don't have an account?{" "}
//                     <a href="/signup" className="text-indigo-600 hover:underline">
//                         Sign up
//                     </a>
//                 </p>
//             </form>
//         </main>
//     );
// }
