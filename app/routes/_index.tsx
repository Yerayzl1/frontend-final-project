import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('img/modeloPelo.jpg')" }}>
      {/* Logo */}
      <div className="absolute top-4 left-4 text-white text-lg font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
        ByJesi
      </div>

      {/* Central Button */}
      <div className="flex items-center justify-center h-full">
        <Link to="/login" className="bg-white text-black py-2 px-6 rounded-full shadow-md hover:bg-gray-200 transition">
          JOIN US NOW
        </Link>
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-4 left-4 flex space-x-4">
        <Link to="https://www.instagram.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-instagram" style={{ color: "white", fontSize: "24px" }}></i>
        </Link>
        <Link to="https://www.whatsapp.com" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-whatsapp" style={{ color: "white", fontSize: "24px" }}></i>
        </Link>
      </div>
    </div>
  );
}
