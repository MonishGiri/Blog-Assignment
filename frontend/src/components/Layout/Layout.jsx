import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content takes all available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer sticks to bottom if content is short */}
      <Footer />
    </div>
  );
}

export default Layout;
