import { useParams } from "react-router-dom";
import { NavBar } from "../Commons/NavBar";
import "../styles.css";
import Instrumento from "../../Entidades/Instrumento";
import { useEffect, useState } from "react";
import {
  getAllCategorias,
  getOneInstrumento,
  saveInstrumento,
} from "../../Servicios/FuncionesApi";
import Categorias from "../../Entidades/Categorias";
import { useNavigate } from "react-router-dom";

export const Agregar = () => {
  const { idinstrumento } = useParams();
  const [instru, setInstrumento] = useState<Instrumento>(new Instrumento());
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [txtValidacion, setTxtValidacion] = useState<string>("");
  let TipoCat: String = "";
  const navigate = useNavigate();

  const getCategorias = async () => {
    const datos: Categorias[] = await getAllCategorias();
    setCategorias(datos);
  };

  const getInstrumento = async () => {
    if (Number(idinstrumento) !== 0) {
      let instrumentoSelect: Instrumento = await getOneInstrumento(
        Number(idinstrumento)
      );
      setInstrumento(instrumentoSelect);
    } else {
      let instrumentoSelect: Instrumento = new Instrumento();
      setInstrumento(instrumentoSelect);
    }
  };

  const save = async () => {
    if (instru.instrumento == undefined || instru.instrumento === "") {
      setTxtValidacion("Ingrese el nombre del instrumento");
      return;
    }
    if (instru.marca == undefined || instru.marca === "") {
      setTxtValidacion("Ingrese la marca del instrumento");
      return;
    }
    if (instru.modelo == undefined || instru.modelo === "") {
      setTxtValidacion("Ingrese el modelo del instrumento");
      return;
    }
    if (instru.imagen == undefined || instru.imagen === "") {
      setTxtValidacion("Ingrese la URL de la imagen");
      return;
    }
    if (instru.precio == undefined || instru.precio === 0) {
      setTxtValidacion("El precio debe ser distinto a cero");
      return;
    }
    if (instru.costoEnvio == undefined || instru.costoEnvio === "") {
      setTxtValidacion("Ingrese el costo de envio");
      return;
    }
    if (instru.descripcion == undefined || instru.descripcion === "") {
      setTxtValidacion("Agregue una descripcion");
      return;
    }
    saveInstrumento(instru);
    navigate("/Grilla");
  };

  useEffect(() => {
    getInstrumento();
    getCategorias();
  }, []);

  return (
    <>
      <NavBar />
      <div className="Formulario-Instrumento">
        <h3>Cargar un nuevo instrumento</h3>
        <div className="mb-3" style={{ width: "600px" }}>
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Instrumento
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Nombre del instrumento"
            defaultValue={instru?.instrumento}
            onChange={(e) => (instru.instrumento = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Marca
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese la marca"
            defaultValue={instru?.marca}
            onChange={(e) => (instru.marca = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese el modelo"
            defaultValue={instru?.modelo}
            onChange={(e) => (instru.modelo = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Url de la imagen"
            onChange={(e) => (instru.imagen = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Precio
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese el precio"
            defaultValue={instru?.precio}
            onChange={(e) => (instru.precio = Number(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Costo de envio
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese el costo de envio o G"
            defaultValue={instru?.costoEnvio}
            onChange={(e) => (instru.costoEnvio = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Descripcion
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Breve descripcion"
            defaultValue={instru?.descripcion}
            onChange={(e) => (instru.descripcion = String(e.target.value))}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Categoría
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              TipoCat = e.target.value;

              categorias.forEach((cat: Categorias) => {
                if (cat.denominacion === TipoCat) {
                  instru.categoria = cat;
                }
              });

              console.log(instru.categoria.denominacion); // Log después de la iteración
            }}
          >
            {Number(idinstrumento) !== 0 ? (
              <option value="">{instru?.categoria.denominacion}</option>
            ) : (
              <option value="">Seleccione una categoría</option>
            )}
            {Array.from(
              new Set(categorias.map((cate) => cate.denominacion))
            ).map((denominacion) => (
              <option key={denominacion} value={denominacion}>
                {denominacion}
              </option>
            ))}
          </select>
        </div>
        <div className="BotonAgregar">
          <div>
            <p style={{ color: "red" }}>{txtValidacion}</p>
          </div>
          <button onClick={save} className="btn btn-success" type="button">
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};
