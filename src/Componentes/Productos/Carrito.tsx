import { useCarrito } from "../../hooks/useCarrito.tsx";
import Instrumento from "../../Entidades/Instrumento.ts";
import ItemCarrito from "./ItemCarrito.tsx";
import { Button } from "@mui/material";
import Pedido from "../../Entidades/Pedido.ts";
import DetallePedido from "../../Entidades/DetallePedido.ts";
import { saveDetallePedido, savePedido } from "../../Servicios/FuncionesApi.ts";
import "../styles.css";
import { NavBar } from "../Commons/NavBar.tsx";

export const Carrito = () => {
  const { cart, limpiarCarrito } = useCarrito();

  const pedido = new Pedido();
  const detalles: DetallePedido[] = [];

  const Envios = () => {
    CrearDetalle();
    CrearPedidos();
  };

  const CrearDetalle = () => {
    cart.forEach((instrumento: Instrumento) => {
      const detalle = new DetallePedido();
      detalle.cantidad = instrumento.cantidad;
      detalle.instrumento = instrumento;
      detalles.push(detalle);
      console.log(detalle);
      saveDetallePedido(detalle);
    });
  };

  const CrearPedidos = () => {
    pedido.fecha = new Date();
    pedido.totalPedido = SacarTotal();
    console.log(pedido);
    detalles.forEach((detal: DetallePedido) => {
      pedido.detalle = detal;
    });
    pedido.activo = true;
    EnviarPedido();
  };

  const EnviarPedido = () => {
    if (pedido.fecha == undefined) {
      return;
    }
    if (pedido.id == undefined) {
      return;
    }
    if (pedido.totalPedido == undefined || pedido.totalPedido == 0) {
      return;
    }
    console.log("Pedido enviado");
    alert("Pedido " + pedido.id + " enviado con éxito");
    savePedido(pedido);
    limpiarCarrito();
  };

  function SacarTotal() {
    let resultado: number = 0;
    cart.forEach((instru: Instrumento) => {
      resultado += instru.precio * instru.cantidad;
    });
    return resultado;
  }

  return (
    <>
      <NavBar />
      <div
        style={{
          maxHeight: "20px",
          marginTop: "60px",
          display: "flex",
        }}
      >
        <div className={cart.length > 0 ? "divVisible" : "divInvisible"}>
          <Button
            variant="outlined"
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={limpiarCarrito}
          >
            Vaciar carrito
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={Envios}
          >
            Enviar Pedido
          </Button>
        </div>
      </div>
      {cart.length === 0 ? (
        <h3 className="LabelCarrito">El carrito está vacío</h3>
      ) : (
        cart.map((instru: Instrumento) => (
          <ItemCarrito
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
            cantidad={instru.cantidad}
          ></ItemCarrito>
        ))
      )}
    </>
  );
};
