// src/components/Sidebar.jsx
import React from "react";

function Sidebar() {
  return (
    <div className="left-side-bar">
      <div className="overlay-mobile-area"></div>
      <div className="inner">
        {/* Primer bloque de menús */}
        <div className="single-menu-wrapper">
          <a href="#" className="single-menu active openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/01.png" alt="icons" />
            </div>
            <p>Home</p>
          </a>
          <a href="community-feed.html" className="single-menu openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/02.png" alt="icons" />
            </div>
            <p>Community Feed</p>
          </a>
          <a href="manage-subscription.html" className="single-menu openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/03.png" alt="icons" />
            </div>
            <p>Manage Subscription</p>
          </a>
        </div>

        {/* Segundo bloque de menús */}
        <div className="single-menu-wrapper">
          <a href="chatbot.html" className="single-menu openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/04.png" alt="icons" />
            </div>
            <p>AI Chat Bot</p>
          </a>
          <a href="image-generator.html" className="single-menu openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/05.png" alt="icons" />
            </div>
            <p>Image Generator</p>
          </a>
          <a href="#" className="single-menu openuptip" flow="right" tooltip="Search">
            <div className="icon">
              <img src="assets/images/icons/06.png" alt="icons" />
            </div>
            <p>Voice Generate</p>
          </a>
        </div>

        {/* Tercer bloque de menús */}
        <div className="single-menu-wrapper">
          <a href="register.html" className="single-menu">
            <div className="icon">
              <img src="assets/images/icons/07.png" alt="icons" />
            </div>
            <p>Register</p>
          </a>
          <a
            className="collapse-btn collapsed single-menu"
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div className="icon">
              <img src="assets/images/icons/08.png" alt="icons" />
            </div>
            <p>Settings</p>
          </a>
          <div className="collapse" id="collapseExample">
            <ul className="submenu rts-default-sidebar-list">
              <li>
                <a href="faq.html">
                  <i className="fa-sharp fa-regular fa-user"></i>
                  <span>FAQ's</span>
                </a>
              </li>
              <li>
                <a href="login.html">
                  <i className="fa-sharp fa-regular fa-shopping-bag"></i>
                  <span>Log In</span>
                </a>
              </li>
              <li>
                <a href="reset-password.html">
                  <i className="fa-sharp fa-regular fa-users"></i>
                  <span>Reset Password</span>
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="single-menu">
            <div className="icon">
              <img src="assets/images/icons/09.png" alt="icons" />
            </div>
            <p>Logout</p>
          </a>
        </div>
      </div>

      {/* Bloque inferior con el usuario */}
      <div className="bottom-user">
        <div className="user-wrapper">
          <img src="assets/images/avatar/02.png" alt="avatar" />
          <div className="info">
            <h6 className="title">Mack Gok</h6>
            <a href="#">openup@net.com</a>
          </div>
          <span>Free</span>
        </div>
        <div className="pro-upgrade">
          <button
            className="rts-btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            <img src="assets/images/icons/14.png" alt="icons" />
            Upgrade To Pro
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
