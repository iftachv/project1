import React from "react";
import logo from "../../../images/logo.png";
import HeaderList from "./HeaderList/HeaderList";
import "./Header.css";
function Header({ showLoginINfo, setShowLoginInfo, isAdmin, setIsAdmin }) {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="" />
      <HeaderList
        showLoginINfo={showLoginINfo}
        setShowLoginInfo={setShowLoginInfo}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
    </div>
  );
}

export default Header;
