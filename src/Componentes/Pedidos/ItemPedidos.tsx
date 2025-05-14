import DetallePedido from "../../Entidades/DetallePedido";
import CheckoutMP from "../MercadoPago/CheckoutMp";

type PedidosParams = {
  id: number;
  titulo: string;
  fecha: Date;
  totalPedido: number;
  detalle: DetallePedido;
};

export const ItemPedidos = (args: PedidosParams) => {
  return (
    <div className="card mb-3" style={{ width: "800px", marginTop: "10px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src="https://previews.123rf.com/images/scanrail/scanrail1503/scanrail150300001/37439219-creativo-abstracto-env%C3%ADo-log%C3%ADstica-y-productos-en-paquetes-al-por-menor-entrega-concepto-de-negocio.jpg"
            className="img-fluid rounded-start"
            alt="..."
          ></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Pedido con id: {args.id}</h5>
            <h5 className="card-text">
              Contenido: {args.detalle.instrumento.instrumento}
            </h5>
            <h5 className="card-text">Total del pedido: ${args.totalPedido}</h5>
            <CheckoutMP montoCarrito={args.totalPedido}></CheckoutMP>
          </div>
        </div>
      </div>
    </div>
  );
};
