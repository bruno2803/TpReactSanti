import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useCarrito } from "../../hooks/useCarrito.tsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Usuario from "../../Entidades/Usuario.ts";
import { Roles } from "../../Entidades/Roles.ts";
export const NavBar = () => {
  const { cart } = useCarrito();
  const navigate = useNavigate();

  let tiene: boolean = false;
  if (cart.length >= 1) {
    tiene = true;
  }
  const cerrarSesion = async () => {
    localStorage.setItem("usuario", "");
    localStorage.removeItem("usuario");
    navigate("/Home", {
      replace: true,
      state: {
        logged: false,
      },
    });
    window.location.reload();
  };
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  console.log("JSON " + jsonUsuario);
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DondeEstamos">
                Donde Estamos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/App">
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Grilla">
                Grilla de Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Pedidos">
                Pedidos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Estadisticas">
                Estadísticas
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex ms-auto position-relative">
          <a className="nav-link">
            Usuario: {usuarioLogueado?.usuario}{" "}
            {usuarioLogueado?.rol == Roles.ADMIN ? "" : "Visitante"}
          </a>
          <a
            className="nav-link"
            style={{ marginRight: "20px", marginLeft: "10px" }}
            onClick={cerrarSesion}
          >
            <AccountCircleIcon />
          </a>
        </div>
        <div className="d-flex ms-auto position-relative">
          <a
            className="nav-link"
            href="/Carrito"
            style={{ marginRight: "20px" }}
          >
            <i className="fas fa-shopping-cart"></i>
            {tiene && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                1
              </span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};
