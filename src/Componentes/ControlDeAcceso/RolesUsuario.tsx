import { useState } from "react";
import Usuario from "../../Entidades/Usuario";
import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../../Entidades/Roles";

interface Props {
  rol: Roles;
}

function RolesUsuario({ rol }: Props) {
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  //si esta logueado y es administrador lo dejo ingresar si no
  if (usuarioLogueado && usuarioLogueado.rol === rol) {
    return <Outlet />;
  } else if (usuarioLogueado) {
    return <Navigate replace to="/Grilla" />;
  } else {
    return <Navigate replace to="/login" />;
  }
}
export default RolesUsuario;
