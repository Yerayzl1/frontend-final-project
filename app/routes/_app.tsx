import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      window.location.href = "/login"; 
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E5D3]">
        <p className="text-lg text-[#704214]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E5D3]">
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </>
      ) : null}
    </div>
  );
}
