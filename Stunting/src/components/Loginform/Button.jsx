import React from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const Button = ({ className }) => {
  const handleLogout = () => {
    // Remove the "authToken" cookie
    Cookies.remove("authToken");
    window.location.href = "/";
  };

  // Check if the user is logged in based on the presence of "authToken" cookie
  const isLoggedIn = Cookies.get("authToken");

  return (
    <button
      onClick={isLoggedIn ? handleLogout : null}
      className={`px-6 py-2 rounded-lg font-poppins hover:scale-110 ${className}`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
