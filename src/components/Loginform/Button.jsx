import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const Button = ({ className, closeDropdown }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Remove the "authToken" cookie
    Cookies.remove("authToken");
    window.location.href = "/";
  };

  const isLoggedIn = Cookies.get("authToken");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = () => {
    if (closeDropdown) {
      closeDropdown();
    }
    toggleDropdown();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Klik di luar dropdown, tutup dropdown
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Tambahkan event listener ketika komponen dimount
    document.addEventListener("click", handleClickOutside);

    // Hapus event listener saat komponen di-unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center" ref={dropdownRef}>
      {isLoggedIn ? (
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className={`rounded-full p-1 focus:outline-none ${className}`}
          >
            <img
              src="https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png"
              alt="User Avatar"
              className="rounded-full w-14 h-14"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 -mr-8 bg-white border rounded shadow-md md:-mr-0">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/login">
            <button
              onClick={() => handleClick()}
              className={`px-6 py-2 rounded-lg mr-3 font-poppins hover:scale-110 ${className}`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </Link>

          <Link to="/register">
            <button
              onClick={() => handleClick()}
              className="px-3 py-2 rounded-lg bg-[#E9E3FF] hover:scale-110 text-primary"
            >
              Sign up
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  closeDropdown: PropTypes.func,
};

export default Button;
