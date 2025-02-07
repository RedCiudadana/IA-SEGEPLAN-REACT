import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ChatbotOficio from "./pages/ChatbotOficio";
import Login from "./pages/Login";

function PrivateRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si hay un token en localStorage para mantener la sesión iniciada
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    // Simula un inicio de sesión exitoso
    localStorage.setItem("authToken", "fake-token");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login onLogin={handleLogin} />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}> 
          <Route path="/" element={<MainLayout onLogout={handleLogout} />}> 
            <Route index element={<Home />} />
            <Route path="chatbot" element={<ChatbotOficio />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;