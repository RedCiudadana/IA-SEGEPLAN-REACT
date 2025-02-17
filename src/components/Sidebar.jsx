import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({ isCollapsed }) {
  const navigate = useNavigate(); // Para redirigir después de cerrar sesión

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken"); // Elimina el token de autenticación
    navigate("/login"); // Redirige al login
  };

  return (
    <div className={`left-side-bar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="overlay-mobile-area"></div>
      <div className="inner">
        {/* Primer bloque de menús */}
        <div className="single-menu-wrapper">
          <Link to="/" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/01.png" alt="icons" />
            </div>
            <p>Inicio</p>
          </Link>
          <Link to="/" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/02.png" alt="icons" />
            </div>
            <p>Acerca de</p>
          </Link>
        </div>

        {/* Segundo bloque de menús */}
        <div className="single-menu-wrapper">
          <Link to="/chatbot" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/04.png" alt="icons" />
            </div>
            <p>Prototipo 1</p>
          </Link>
          <Link to="/" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/05.png" alt="icons" />
            </div>
            <p>Prototipo 2</p>
          </Link>
          <Link to="/login" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/06.png" alt="icons" />
            </div>
            <p>Prototipo 3</p>
          </Link>
        </div>

        {/* Tercer bloque de menús */}
        <div className="single-menu-wrapper">
          <Link to="/" className="single-menu">
            <div className="icon">
              <img src="/assets/images/icons/07.png" alt="icons" />
            </div>
            <p>Registrate</p>
          </Link>

          <Link
            to="#"
            className="collapse-btn collapsed single-menu"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={(e) => {
              e.preventDefault();
              const collapseElement = document.getElementById("collapseExample");
              collapseElement.classList.toggle("show");
            }}
          >
            <div className="icon">
              <img src="/assets/images/icons/08.png" alt="icons" />
            </div>
            <p>Ajustes</p>
          </Link>

          <div className="collapse" id="collapseExample">
            <ul className="submenu rts-default-sidebar-list">
              <li>
                <Link to="/faq" className="submenu-link">
                  <i className="fa-sharp fa-regular fa-user"></i>
                  <span>FAQ's</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="submenu-link">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>Inicia Sesión</span>
                </Link>
              </li>
              <li>
                <Link to="/reset-password" className="submenu-link">
                  <i className="fa-solid fa-user"></i>
                  <span>Resetea tu Contraseña</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Botón para cerrar sesión */}
          <a href="#" className="single-menu" onClick={handleLogout}>
            <div className="icon">
              <img src="/assets/images/icons/09.png" alt="icons" />
            </div>
            <p>Cierra Sesión</p>
          </a>
        </div>
      </div>

      {/* Bloque inferior con el usuario */}
      <div className="bottom-user">
        <div className="user-wrapper">
          <img src="/redciudadana.png" style={{ width: '50px' }} alt="avatar" />
          <div className="info">
            <h6 className="title">Red Ciudadana</h6>
            <a href="#">ia@redciudadana.org</a>
          </div>
          {/* <span>Free</span> */}
        </div>
        <div className="pro-upgrade">
          <button
            className="rts-btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@mdo"
          >
            <img src="assets/images/icons/14.png" alt="icons" />
            Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
