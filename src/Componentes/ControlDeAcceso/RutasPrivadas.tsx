import { ReactNode, useState } from "react";
import Usuario from "../../Entidades/Usuario";
import { Navigate } from "react-router-dom";

export const RutasPrivada = ({ children }: { children: ReactNode }) => {
  const [usuario] = useState<Usuario>(
    localStorage.getItem("usuario") as unknown as Usuario
  );

  return usuario ? children : <Navigate to="/login" />;
};
