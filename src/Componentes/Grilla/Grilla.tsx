import { SetStateAction, useEffect, useState } from "react";
import Instrumento from "../../Entidades/Instrumento";
import {
  deleteInstrumento,
  getAllCategorias,
  getAllInstrumentos,
} from "../../Servicios/FuncionesApi";
import { NavBar } from "../Commons/NavBar";
import "../styles.css";
import Categorias from "../../Entidades/Categorias";
import Usuario from "../../Entidades/Usuario";
import { Roles } from "../../Entidades/Roles";

export const Grilla = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  {
    /*Nota: Primero correr Json server con npm run server*/
  }
  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getAllInstrumentos();
    setInstrumentos(datos);
  };

  const getCategorias = async () => {
    const datos: Categorias[] = await getAllCategorias();
    setCategorias(datos);
  };
  const deleteInstru = async (idInstru: number) => {
    deleteInstrumento(idInstru);
    window.location.reload();
  };

  useEffect(() => {
    getInstrumentos();
    getCategorias();
  }, []);

  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleChangeCategoria = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategoriaFiltro(e.target.value);
  };


  const filteredInstrumentos = categoriaFiltro
    ? instrumentos.filter(
        (instrumento) => instrumento.categoria.denominacion === categoriaFiltro
      )
    : instrumentos;

  return (
    <>
      <NavBar />
      <div className="Busqueda">
        <div className="Boton">
          
          <a className="btn btn-primary" href={`/Agregar/0`}>
            Agregar
          </a>
        </div>

        <select value={categoriaFiltro} onChange={handleChangeCategoria}>
          <option value="">Todas las categorías</option>
          {/* Aquí deberías generar opciones para cada categoría única de tus instrumentos */}
          {Array.from(
            new Set(categorias.map((categoria) => categoria.denominacion))
          ).map((denominacion) => (
            <option key={denominacion} value={denominacion}>
              {denominacion}
            </option>
          ))}
        </select>
      </div>
      <div className="Grilla">
        <div className="row">
          <div className="col">
            <b>ID</b>
          </div>
          <div className="col">
            <b>Nombre</b>
          </div>
          <div className="col">
            <b>Marca</b>
          </div>
          <div className="col">
            <b>Modelo</b>
          </div>
          <div className="col">
            <b>Categoría</b>
          </div>
          <div className="col">
            <b>Precio</b>
          </div>
          <div className="col">
            <b>Envio</b>
          </div>
          <div className="col">
            <b>Modificar</b>
          </div>
          <div className="col">
            <b>Eliminar</b>
          </div>
        </div>
        {filteredInstrumentos.map((intru: Instrumento) => (
          <div className="row" key={intru.id}>
            <div className="col">{intru.id}</div>
            <div className="col">{intru.instrumento}</div>
            <div className="col">{intru.marca}</div>
            <div className="col">{intru.modelo}</div>
            <div className="col">{intru.categoria.denominacion}</div>
            <div className="col">{intru.precio}</div>
            <div className="col">{intru.costoEnvio}</div>
            {usuarioLogueado.rol == Roles.ADMIN ? (
              <div className="col">
                <a
                  className="btn btn-info"
                  style={{ marginBottom: 10 }}
                  href={`/Agregar/` + intru.id}
                >
                  Modificar
                </a>
              </div>
            ) : (
              <div className="col"></div>
            )}
            {usuarioLogueado.rol == Roles.ADMIN ? (
              <div className="col">
                <a
                  className="btn btn-danger"
                  style={{ marginBottom: 10 }}
                  onClick={() => deleteInstru(intru.id)}
                >
                  Eliminar
                </a>
              </div>
            ) : (
              <div className="col"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
