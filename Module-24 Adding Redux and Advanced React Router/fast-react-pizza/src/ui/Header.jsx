import React from "react";
import { Link } from "react-router-dom";
import SearcOrder from "../features/order/SearcOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-4 py-3 uppercase border-b border-stone-200 sm:px-6 ">
      {/* >=640px screens ke liye sm wala apply hoga usse small ke liye normal wala hi apply hoga */}
      <Link to="/" className="tracking-wide">
        Fast React Pizza Co.
      </Link>
      <SearcOrder />
      <Username/>
    </header>
  );
}

export default Header;
