import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderList.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getAuth } from "firebase/auth";

function HeaderList({ showLoginINfo, setShowLoginInfo, isAdmin, setIsAdmin }) {
  let navigate = useNavigate();

  const LoginHandler = () => {
    navigate("/login");
  };
  const HomeHandler = () => {
    navigate("/");
  };
  const categoryHandler = () => {
    navigate("/category");
  };
  const ShopHandler = () => {
    navigate("/Shop");
  };
  const ContactHandler = () => {
    navigate("/Contact");
  };
  return (
    <ul className="header__list">
      {isAdmin && <li onClick={() => navigate("/admin")}>Administration</li>}
      {showLoginINfo.login && (
        <li
          onClick={() => {
            navigate("/cart");
          }}
        >
          <ShoppingCartIcon />
        </li>
      )}
      <li onClick={HomeHandler}>home</li>
      <li onClick={categoryHandler}>Category</li>
      {/* <li> About Us</li> */}
      {/* <li>Dashboard</li> */}
      <li onClick={ContactHandler}>About Us</li>
      {showLoginINfo.login ? (
        <li
          onClick={() => {
            setShowLoginInfo({ login: false });
            setIsAdmin(false)
            getAuth().signOut();
          }}
        >
          Logout
        </li>
      ) : (
        <li onClick={LoginHandler}>Login</li>
      )}
      {showLoginINfo.login && <li>Hi Mr {getAuth().currentUser.displayName}</li>}
    </ul>
  );
}

export default HeaderList;
