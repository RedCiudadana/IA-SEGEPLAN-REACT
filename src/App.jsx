import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ChatbotOficio from "./pages/ChatbotOficio";
import Prototipo2 from "./pages/Prototipo2";
import Prototipo3 from "./pages/Prototipo3";
import Prototipo4 from "./pages/Prototipo4";
import Prototipo5 from "./pages/Prototipo5";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";


function PrivateRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  
    return () => unsubscribe();
  }, []);   

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsAuthenticated(false);
    });
  };  

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de Login */}
        <Route path="login" element={<Login onLogin={handleLogin} />} />

        {/* Rutas con MainLayout */}
        <Route path="/" element={<MainLayout onLogout={handleLogout} />}>
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route index element={<Home />} />
            <Route path="prototipo1" element={<ChatbotOficio />} />
            <Route path="prototipo2" element={<Prototipo2 />} />
            <Route path="prototipo3" element={<Prototipo3 />} />
            <Route path="prototipo4" element={<Prototipo4 />} />
            <Route path="prototipo5" element={<Prototipo5 />} />
          </Route>

          {/* Ruta 404 dentro del MainLayout, pero fuera de las rutas protegidas */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
