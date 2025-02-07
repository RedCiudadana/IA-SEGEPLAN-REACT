import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Header arriba */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Contenedor general del dashboard (sidebar + contenido) */}
      <div className="dash-board-main-wrapper">
        {/* Sidebar a la izquierda */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Contenido principal a la derecha del sidebar */}
        <div className="main-center-content-m-left">
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default MainLayout;
