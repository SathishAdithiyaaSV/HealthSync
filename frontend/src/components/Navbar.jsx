import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [dashboard, setDashboard] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    // Clear any authentication-related data (e.g., JWT token)
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setShowLogoutConfirm(false); // Close the confirmation popup
    // Redirect to login if needed
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.role);

      if (decodedToken.role === "admin") {
        setDashboard("/admin-dashboard");
      } else if (decodedToken.role === "patient") {
        setDashboard("/patient-dashboard");
      } else if (decodedToken.role === "doctor") {
        setDashboard("/doctor-dashboard");
      } else {
        setDashboard("/login");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">HealthSync</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/hero" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-blue-600">
          About
        </Link>
        <Link to="/news" className="text-gray-600 hover:text-blue-600">
          News
        </Link>
        <Link to="/blog" className="text-gray-600 hover:text-blue-600">
          Blog
        </Link>
        <Link to={dashboard} className="text-gray-600 hover:text-blue-600">
          Dashboard
        </Link>
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png"
                alt="User Icon"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
