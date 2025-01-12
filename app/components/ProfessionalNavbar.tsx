import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfessionalNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_id");
    navigate("/login");
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-[#F5E5D3] p-4">
        <Link to="/dashboard">
          <button className="text-2xl font-bold text-[#704214] font-inter">
            ByJesi Professional
          </button>
        </Link>
        <button
          className="text-[#704214]"
          onClick={handleToggleMenu}
          title="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleCloseMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCloseMenu();
            }
          }}
        ></div>
      )}

      {/* Dropdown Menu */}
      <div
        className={`absolute top-16 right-4 w-48 bg-white shadow-lg rounded-md p-4 z-20 transition-transform transform ${
          menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/dashboard")}
        >
          <span className="text-[#704214]">Dashboard</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/services")}
        >
          <span className="text-[#704214]">Services</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/calendar")}
        >
          <span className="text-[#704214]">Calendar</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/professionals")}
        >
          <span className="text-[#704214]">Professionals</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/inventory")}
        >
          <span className="text-[#704214]">Inventory</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/appointments")}
        >
          <span className="text-[#704214]">Appointments</span>
        </button>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={() => (window.location.href = "/profile")}
        >
          <span className="text-[#704214]">Profile</span>
        </button>
        <button
          className="w-full text-left py-2 px-2 hover:bg-gray-200 rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          <span className="text-[#704214]">Logout</span>
        </button>
      </div>
    </div>
  );
}
