import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '/src/assets/images/Logo.png';
import bannerImage from '/src/assets/images/Super-reality-bg.jpg';

export default function TopNav() {
  const navigate = useNavigate();

  return (

    <header className="main-header">
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-6 wow fadeInLeft animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <ul className="header-info d-flex list-unstyled mb-0">
                <li><a href="#"><i className="fa fa-envelope me-3"></i>Quick Email</a></li>
              </ul>
            </div>
            <div className="col-6 wow fadeInRight animated" data-wow-duration="1000ms" data-wow-delay="600ms">
              <ul className="top-social-icon d-flex list-unstyled justify-content-end mb-0">
                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="banner" id="#home">
        <img src={bannerImage} className="img-fluid" alt="banner image" />
        <nav className="navbar navbar-expand-lg menu-bar">
          <div className="container">
            <div className="row">
              <div className="menu-wrap d-flex align-items-center">
                <div className="col-lg-2 full-width">
                  <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon"></span>
                    <span className="navbar-toggler-icon mb-0"></span>
                  </button>
                  <div className="website-logo">
                  <img src={Logo} className="img-fluid" alt="this is logo image" />
                  </div>
                </div>
                <div id="navbarCollapse" className="col-lg-10 justify-content-end collapse navbar-collapse">
                  <div className="navbar-nav flex-links">
                    <ul className="navigation-links d-flex list-unstyled mb-0 align-items-center">
                      <li className="nav-item nav-link active">
                        <a href="#home" className="nav-anchor">
                          Home
                        </a>
                      </li>
                      <li className="nav-item nav-link" >
                        <a href="#About_Us" className="nav-anchor">
                          About Us
                        </a>
                      </li>
                      <li className="nav-item nav-link">
                        <a href="#Our-AI" className="nav-anchor">
                          Our AI's
                        </a>
                      </li>
                      <li className="nav-item nav-link">
                        <a href="#Our-Work" className="nav-anchor">
                          Videos
                        </a>
                      </li>
                      <li className="nav-item nav-link">
                        <a href="#" className="nav-anchor">
                          Meme Paper
                        </a>
                      </li>
                      <li className="nav-item nav-link">
                        <a href="#" className="nav-anchor">
                          Buy Super
                        </a>
                      </li>
                      <li className="nav-item nav-link">
                        <a href="#Contact-Us" className="nav-anchor">
                          Contact Us
                        </a>
                      </li>
                      <li className="nav-item nav-link Admin">
                        <a href="#">
                          Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="text">
              <div className="col-lg-6 col-md-8 wow fadeInLeft animated" data-wow-duration="1000ms" data-wow-delay="600ms">
                <div className="text-wrap">
                  <h1 className="heading gradient-text">super reality</h1>
                  <h3 className="tagline">future of eductaion</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="col-lg-6 col-md-4 wow fadeInLeft animated" data-wow-duration="1000ms" data-wow-delay="600ms">

                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </header>
  );
}
