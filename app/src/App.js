import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Categories from "./Components/Categories/Categories";
import Banner from "./Components/Genral/Banner/Banner";
import Blog from "./Components/Genral/Blog/Blog";
import Contact from "./Components/Genral/Contact/Contact";
import Footer from "./Components/Genral/Footer/Footer";
import Header from "./Components/Genral/Header/Header";
import InfoSection from "./Components/Genral/InfoSection/InfoSection";
import MoreInfo from "./Components/Genral/MoreInfo/MoreInfo";
import Service from "./Components/Genral/Service/Service";
import TopView from "./Components/Genral/TopView/TopView";
import Cart from "./MainView/Cart/Cart";
import Login from "./MainView/Login/Login";
import Signup from "./MainView/Signup/Signup";
import './config/firebaseConfig';
import Admin from "./MainView/admin/Admin"
// Import area for fetch all the needed compenents

function Cont() {
  // Contact compenent
  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href =
        "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
      // Import the tailwind css library
      document.head.appendChild(stylesheet);
    }
  }, []);
  return (
    <div className="Contact">
      <header className="App-header">
        <div className="py-6">
          {/* add the contact main Compenent */}
          <Contact />
        </div>
      </header>
    </div>
  );
}
// setup app compenent
function App() {
  // create a use state for show the login or not
  const [showLoginINfo, setShowLoginInfo] = useState({ login: false });
  const [isAdmin, setIsAdmin] = useState(false);
  function Home() {
    return (
      <React.Fragment>
        {/* add all the main compnent on the Home area */}
        <Banner />
        <Service />
        <InfoSection />
        <TopView />
        <MoreInfo />
        <Blog />
      </React.Fragment>
    );
  }

  return (
    <div className="app">
      {/* setup the header */}
      <Header
        showLoginINfo={showLoginINfo}
        setShowLoginInfo={setShowLoginInfo}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      {/* setup the router */}
      <Routes>
        {/* add the home router for Home Component */}
        <Route path="/" element={<Home />} />
        {/* add the login router for Login Component */}
        <Route
          path="/login"
          element={
            <Login
              showLoginINfo={showLoginINfo}
              setShowLoginInfo={setShowLoginInfo}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        {/* add the signup router for signup Component */}
        <Route path="/signup" element={<Signup />} />
        {/* add the cart router for cart Component */}
        <Route path="/cart" element={<Cart />} />
        {/* add the category router for category Component */}
        <Route path="/category" element={<Categories />} />
        {/* add the Contact router for Contact Component */}
        <Route path="/Contact" element={<Cont />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* and add the footer */}
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
