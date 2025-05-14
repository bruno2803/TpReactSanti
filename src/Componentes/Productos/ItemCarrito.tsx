import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  cantidad: number;
  InstrumentoObject: Instrumento;
};

function ItemCarrito(args: InstrumentoParams) {
  const text =
    args.costoEnvio === "G"
      ? "Envio gratis a todo el pais"
      : `Costo de envio al interior de Argentina $${args.costoEnvio}`;

  const { cart, removeCarrito, addCarrito, removeItemCarrito } = useCarrito();

  const verificaPlatoEnCarrito = (product: Instrumento) => {
    return cart.some((item) => item.id === product.id);
  };

  const isPlatoInCarrito = verificaPlatoEnCarrito(args.InstrumentoObject);
  return (
    <>
      <NavBar />
      <div className="card mb-3" style={{ width: "600px", marginTop: "20px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={args.imagen}
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
                className="btn btn-primary"
                onClick={() => removeItemCarrito(args.InstrumentoObject)}
                style={{ marginRight: "5px" }}
              >
                <RemoveIcon />
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
              <a
                className="btn btn-primary"
                onClick={() => addCarrito(args.InstrumentoObject)}
                style={{ marginLeft: "5px" }}
              >
                <AddIcon />
              </a>
              <p className="card-text">
                <small className="text-body-secondary">
                  Cantidad en el carrito: {args.cantidad}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCarrito;
