import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoLogged from "../components/NoLogged";

export default function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(true);

  useEffect(() => {
    // async function checkLoginStatus() {
    //   try {
    //     const response = await fetch("/api/auth/check");
    //     if (!response.ok) {
    //       throw new Error("Not logged in");
    //     }

    //     const data = await response.json();
    //     setIsLoggedIn(data.isLoggedIn);
    //   } catch {
    //     setIsLoggedIn(false);
    //   }
    // }

    // checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5E5D3]">
        <p className="text-lg text-[#704214]">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <NoLogged />;
  }

  return (
    <div className="min-h-screen bg-[#F5E5D3]">
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
