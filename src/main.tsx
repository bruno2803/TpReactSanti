import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { DetalleInstrumento } from "./Componentes/Productos/DetalleInstrumento.tsx";
import { Home } from "./Componentes/Home/Home.tsx";
import { DondeEstamos } from "./Componentes/DondeEstamos/DondeEstamos.tsx";
import { Grilla } from "./Componentes/Grilla/Grilla.tsx";
import { Agregar } from "./Componentes/Grilla/Agregar.tsx";
import { Carrito } from "./Componentes/Productos/Carrito.tsx";
import { CarritoContextProvider } from "./context/CarritoContext.tsx";
import { Pedidos } from "./Componentes/Pedidos/Pedidos.tsx";
import { Login } from "./Componentes/login/login.tsx";
import { RutasPrivada } from "./Componentes/ControlDeAcceso/RutasPrivadas.tsx";
import { Roles } from "./Entidades/Roles.ts";
import RolesUsuario from "./Componentes/ControlDeAcceso/RolesUsuario.tsx";
import { ChartsGoogle } from "./Componentes/Estadisticas/ChartsGoogle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarritoContextProvider>
        <Routes>
          //Rutas publicas
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DondeEstamos" element={<DondeEstamos />} />
          //Rutas privadas
          <Route
            path="/Grilla"
            element={
              <RutasPrivada>
                <Grilla />
              </RutasPrivada>
            }
          />
          <Route
            path="/App"
            element={
              <RutasPrivada>
                <App />
              </RutasPrivada>
            }
          />
          <Route element={<RolesUsuario rol={Roles.ADMIN} />}>
            <Route path="/Agregar/:idinstrumento" element={<Agregar />} />
          </Route>
          <Route
            path="/Carrito"
            element={
              <RutasPrivada>
                <Carrito />
              </RutasPrivada>
            }
          ></Route>
          <Route
            path="/Pedidos"
            element={
              <RutasPrivada>
                <Pedidos />
              </RutasPrivada>
            }
          ></Route>
          <Route
            path="/Detalle/:idinstrumento"
            element={
              <RutasPrivada>
                <DetalleInstrumento />
              </RutasPrivada>
            }
          />
          <Route
            path="/Estadisticas"
            element={
              <RutasPrivada>
                <ChartsGoogle />
              </RutasPrivada>
            }
          />
        </Routes>
      </CarritoContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
