import React from "react";

import LoginForm from "../login/loginForm.jsx";
import ImgCarousel from "../carousel/carousel.jsx";

const Home = () => {
  return (
    <div className="home-wrapper">
      <h1>FITNESS APP</h1>
      <div className="home-components-wrapper">
        <div className="carousel-wrapper">
          <ImgCarousel />
        </div>

        <div className="login-wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
