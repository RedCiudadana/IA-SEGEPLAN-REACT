import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember Me:', rememberMe);
    onLogin(); // Llamamos a la función de login para cambiar el estado de autenticación
    navigate('/'); // Redirigimos al usuario al índice después del login
  };

  return (
    <div className="main-center-content-m-center center-content">
      <div style={{ margin: '100px auto' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-form-s-wrapper">
                <div className="head">
                    <div className="left-logo-area">
                        <Link to="/">
                            <img src="/assets/images/LOGO-RED_NEGRO.png" alt="logo-image" />
                        </Link>
                    </div>
                  <span>Bienvenido</span>
                  <h5 className="title">Inicia Sesión</h5>
                </div>
                <div className="body">
                  <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="check-wrapper">
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Captcha
                        </label>
                      </div> */}
                      <Link to="/reset">¿Olvidó la contraseña?</Link>
                    </div>
                    <button type="submit" className="rts-btn btn-primary">Inicia Sesión</button>
                    <p>
                      ¿No tienes una cuenta?{' '}
                      <Link className="ml--5" to="/register">Registrate Gratis</Link>
                    </p>
                  </form>
                </div>
                {/* <div className="other-separator">
                  <span>o</span>
                </div> */}
                <div className="sign-in-otherway">
                  <div className="single">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" width="18" height="18">
                            <path fill="#4285f4" d="M533.5 278.4c0-18.6-1.5-37.1-4.8-55.2H272v104.5h146.7c-6.4 34.7-25.3 64.1-53.7 83.9v69.7h86.8c50.7-46.7 81.7-115.5 81.7-202.9z" />
                            <path fill="#34a853" d="M272 544.3c72.6 0 133.6-23.9 178.1-65.1l-86.8-69.7c-24.1 16.2-55 25.7-91.3 25.7-69.9 0-129.1-47.3-150.3-110.5h-89.2v69.3c44.7 88.4 137.3 150.3 239.5 150.3z" />
                            <path fill="#fbbc04" d="M121.7 324.7c-10.4-30.3-10.4-62.8 0-93.1v-69.3h-89.2c-38.4 75.7-38.4 164.1 0 239.8l89.2-69.3z" />
                            <path fill="#ea4335" d="M272 107.7c39.5-.6 77.6 14 106.4 40.7l79.4-79.4c-48.3-45.2-111.6-70.5-185.8-68.8-102.1 0-194.7 61.9-239.5 150.3l89.2 69.3c21.1-63.2 80.4-110.5 150.3-110.5z" />
                        </svg>
                    </div>
                    <p>Continua con Google</p>
                  </div>

                  <div className="single">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="15" height="19">
                            <path d="M318.7 268.6c-.2-46.9 38.2-69.3 39.8-70.4-21.7-31.8-55.5-36.2-67.5-36.6-28.8-2.9-56.1 16.9-70.6 16.9-14.6 0-37.1-16.5-61-16.1-31.4.5-60.4 18.3-76.5 46.5-32.7 56.6-8.4 140 23.4 185.9 15.5 22.3 33.8 47.3 58 46.3 23.1-.9 31.8-15 59.7-15 27.8 0 35.8 15 60.4 14.6 24.9-.4 40.5-22.7 55.6-45.2 17-24.7 24-48.7 24.2-49.9-.5-.2-46.2-17.7-46.5-70.3zM250.5 83.5c13-15.7 21.7-37.6 19.3-59.5-18.7.7-41.3 12.6-54.8 28.3-12 14-22.5 36.4-19.6 57.8 20.8 1.6 42.1-10.4 55.1-26.6z" />
                        </svg>
                    </div>
                    <p>Continua con Apple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
