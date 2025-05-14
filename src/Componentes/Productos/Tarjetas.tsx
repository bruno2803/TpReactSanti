import { useState, useEffect } from "react";
import Instrumento from "../../Entidades/Instrumento";
import { getAllInstrumentos } from "../../Servicios/FuncionesApi";
import "../styles.css";
import ItemInstrumento from "./ItemInstrumento";
import { NavBar } from "../Commons/NavBar";

export const Tarjetas = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getAllInstrumentos();
    setInstrumentos(datos);
  };

  useEffect(() => {
    getInstrumentos();
  }, []);
  return (
    <>
      <NavBar />
      {instrumentos.map((instru: Instrumento) => (
        <ItemInstrumento
          key={instru.id}
          id={instru.id}
          instrumento={instru.instrumento}
          marca={instru.marca}
          modelo={instru.modelo}
          imagen={instru.imagen}
          precio={instru.precio}
          costoEnvio={instru.costoEnvio}
          cantidadVendida={instru.cantidadVendida}
          descripcion={instru.descripcion}
          InstrumentoObject={instru}
        ></ItemInstrumento>
      ))}
    </>
  );
};
