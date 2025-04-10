"use client"

import Navigation from "./Navigation/Navigation";

const Header: React.FC = () => {
  return (
    <div className="h-16 bg-black">
      <div className="h-[inherit] px-6">
        <Navigation />
      </div>
    </div>
  )
}

export default Header;
