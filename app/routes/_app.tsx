import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfessionalNavbar from "../components/ProfessionalNavbar";
import UserNavbar from "../components/UserNavbar";

export default function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setIsLoggedIn(false);
          window.location.href = "/login";
          return;
        }

        const userData = await response.json();
        setRoleId(userData.role_id);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        window.location.href = "/login";
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E5D3]">
        <p className="text-lg text-[#704214]">Loading...</p>
      </div>
    );
  }

  const renderNavbar = () => {
    switch (roleId) {
      case 1:
        return <Navbar />;
      case 2:
        return <ProfessionalNavbar />;
      case 3:
        return <UserNavbar />;
      default:
        return null;
    }
  };

  const fileName = window.location.pathname.split("/").pop();
  const capitalizedFileName = fileName ? fileName.charAt(0).toUpperCase() + fileName.slice(1) : '';

  return (
    <div className="min-h-screen bg-[#F5E5D3]">
      <title>ByJesi - {capitalizedFileName}</title>
      {isLoggedIn && renderNavbar()}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
