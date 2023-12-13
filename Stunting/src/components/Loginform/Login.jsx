import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import library js-cookie
import LogoGoogle from "../../assets/Google.png";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button, Spinner } from "@chakra-ui/react";
// ...

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (!loginData.email.trim()) {
      isValid = false;
      validationErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      isValid = false;
      validationErrors.email = "Invalid email address";
    }

    if (!loginData.password.trim()) {
      isValid = false;
      validationErrors.password = "Please enter your password";
    } else if (loginData.password.length < 8) {
      isValid = false;
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (isValid) {
      try {
        setLoading(true); // Set loading ke true saat proses login dimulai

        // Beri jeda sebelum melakukan login (contoh: 2 detik)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.get("http://localhost:8000/users");

        const user = response.data.find(
          (user) =>
            user.email === loginData.email &&
            user.password === loginData.password
        );

        if (user) {
          // Simpan token ke dalam cookies
          Cookies.set("authToken", user.token);

          // Beri jeda sebelum menampilkan alert sukses (contoh: 2 detik)
          await new Promise((resolve) => setTimeout(resolve, 2000));

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });

          // Redirect setelah alert sukses muncul
          setTimeout(() => {
            window.location.href = "/calculate";
          }, 2000);
        } else {
          isValid = false;
          validationErrors.email = "Email not found or incorrect password";
        }
      } catch (error) {
        console.error("Error:", error);
        isValid = false;
        validationErrors.email = "Error during login. Please try again later.";
      } finally {
        setLoading(false); // Set loading ke false setelah proses login selesai
      }
    }

    setValid(isValid);
    setErrors(validationErrors);
  };

  // ...

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="p-8 bg-white border-2 rounded shadow-xl w-96">
        <h2 className="mb-6 text-2xl font-bold">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={loginData.email}
            onChange={(event) =>
              setLoginData({
                ...loginData,
                email: event.target.value,
              })
            }
            className={`w-full p-2 border border-gray-300 rounded ${
              !valid && errors.email && "border-red-500"
            }`}
            placeholder="Your Email"
          />
          {!valid && errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={loginData.password}
            onChange={(event) =>
              setLoginData({
                ...loginData,
                password: event.target.value,
              })
            }
            className={`w-full p-2 border border-gray-300 rounded ${
              !valid && errors.password && "border-red-500"
            }`}
            placeholder="Your Password"
          />
          {!valid && errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Sign In Button */}
        <Button
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
          onClick={handleSubmit}
          colorScheme="blue"
          size="lg"
          rounded="md"
          isLoading={loading}
          loadingText="Logging in..."
        >
          Login
        </Button>

        {/* Or Separator */}
        <div className="flex items-center my-6">
          <div className="w-full border-b"></div>
          <div className="mx-3 text-gray-600">Or</div>
          <div className="w-full border-b"></div>
        </div>

        {/* Google Sign In Button */}
        <button className="flex items-center justify-center w-full p-2 bg-white border-2 rounded shadow-lg text-slate-950 hover:scale-110">
          <img src={LogoGoogle} alt="google" className="h-10 pr-3" />
          Sign In with Google
        </button>

        {/* Register Link */}
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
