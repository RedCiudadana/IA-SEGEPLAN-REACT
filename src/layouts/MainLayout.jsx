import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function MainLayout() {

  return (
    <>
      {/* Header arriba */}
      <Header />

      {/* Contenedor general del dashboard (sidebar + contenido) */}
      <div className="dash-board-main-wrapper">
        {/* Sidebar a la izquierda */}
        <Sidebar />

        {/* Contenido principal a la derecha del sidebar */}
        <div className="main-center-content-m-left">
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default MainLayout;
