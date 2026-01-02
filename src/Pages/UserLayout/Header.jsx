import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <h2 className="font-bold text-lg">TicketHub</h2>

      <nav className="flex gap-6 text-sm">
        <NavLink to="/user/dashboard">Dashboard</NavLink>
        <NavLink to="/user/my-bookings">My Bookings</NavLink>

        {/* EVENTS LINK */}
        <NavLink
          to="/user/event"
          className={({ isActive }) =>
            isActive
              ? "text-orange-500 font-semibold"
              : "text-gray-600"
          }
        >
          Events
        </NavLink>

        <NavLink to="/user/profile">Profile</NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-1 bg-red-500 text-white rounded-full text-sm"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};

export default Header;
