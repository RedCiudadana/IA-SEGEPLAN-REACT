import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { logUserLogin } from '../utils/logUser';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await logUserLogin(user);
      onLogin(); 
      navigate('/');
    } catch (error) {
      alert('Correo o contraseña incorrectos');
      console.error(error.message);
    }
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
                      <Link to="/reset">¿Olvidó la contraseña?</Link>
                    </div>
                    <button type="submit" className="rts-btn btn-primary">Inicia Sesión</button>
                    <p>
                      ¿No tienes una cuenta?{' '}
                      <Link className="ml--5" to="/register">Registrate Gratis</Link>
                    </p>
                  </form>
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
