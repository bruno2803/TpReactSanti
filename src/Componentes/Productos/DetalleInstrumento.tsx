import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getOneInstrumento } from "../../Servicios/FuncionesApi";
import Instrumento from "../../Entidades/Instrumento";
import "../styles.css";
import { NavBar } from "../Commons/NavBar";

export const DetalleInstrumento = () => {
  const { idinstrumento } = useParams();
  const [Instru, setInstrumento] = useState<Instrumento>();
  const getInstrumento = async () => {
    const instrumentoSelect: Instrumento = await getOneInstrumento(
      Number(idinstrumento)
    );
    setInstrumento(instrumentoSelect);
  };
  useEffect(() => {
    getInstrumento();
  }, []);

  const generarPDF = () => {
    window.open("http://localhost:9000/api/v1/Instrumentos/pdf/" + idinstrumento);
  };

  const text =
    Instru?.costoEnvio === "G"
      ? "Envio gratis a todo el pais"
      : `Costo de envio al interior de Argentina $${Instru?.costoEnvio}`;
  return (
    <>
      <NavBar />
      <div className="card mb-3" style={{ width: "800px", marginTop: "10px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={Instru?.imagen}
              className="img-fluid rounded-start"
              alt="..."
            ></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{Instru?.instrumento}</h5>
              <h5 className="card-text">${Instru?.precio}</h5>
              <p className="card-text">
                <b>Descripcion: </b>
                {Instru?.descripcion}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">{text}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {Instru?.cantidadVendida} vendidos
                </small>
              </p>
              <a href="" className="btn btn-primary">
                Agregar al carrito
              </a>
              <a
                onClick={(e) => generarPDF()}
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
              >
                Generar PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetalleInstrumento;
