import React from "react";

const MobileNavbar = () => {
  return (
    <div className="absolute left-0 top-15 w-full">
      <ul className="py-5 flex flex-col text-center gap-5 bg-purple-900 text-white text-xl">
        <li>Home</li>
        <li>Opportunities</li>
        <li>Chat</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
