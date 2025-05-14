import { useCarrito } from "../../hooks/useCarrito.tsx";
import Instrumento from "../../Entidades/Instrumento.ts";
import { NavBar } from "../Commons/NavBar.tsx";

type InstrumentoParams = {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: string;
  descripcion: string;
  InstrumentoObject: Instrumento;
};

function ItemInstrumento(args: InstrumentoParams) {
  const text =
    args.costoEnvio === "G"
      ? "Envio gratis a todo el pais"
      : `Costo de envio al interior de Argentina $${args.costoEnvio}`;

  const { cart, removeCarrito, addCarrito } = useCarrito();

  const verificaPlatoEnCarrito = (product: Instrumento) => {
    return cart.some((item) => item.id === product.id);
  };

  const isPlatoInCarrito = verificaPlatoEnCarrito(args.InstrumentoObject);
  return (
    <>
      <NavBar />
      <div className="card mb-3" style={{ width: "600px", marginTop: "60px" }}>
        <div className="row g-0">
          <div className="col-md-4">
          <img src={args.imagen}
              className="img-fluid rounded-start"
              alt="..."
            ></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{args.instrumento}</h5>
              <h5 className="card-text">${args.precio}</h5>
              <p className="card-text">
                <small className="text-body-secondary">{text}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {args.cantidadVendida} vendidos
                </small>
              </p>
              <a
                href={`Detalle/${args.id}`}
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
              >
                Ver Detalle
              </a>
              <a
                className="btn btn-primary"
                onClick={() => {
                  isPlatoInCarrito
                    ? removeCarrito(args.InstrumentoObject)
                    : addCarrito(args.InstrumentoObject);
                }}
              >
                {isPlatoInCarrito ? (
                  <i className="fas fa-cart-arrow-down"></i>
                ) : (
                  <i className="fas fa-shopping-cart"></i>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemInstrumento;
