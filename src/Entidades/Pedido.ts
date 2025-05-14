import DetallePedido from "./DetallePedido";

export default class Pedido{

  id: number = 0;
  titulo: string = "";
  fecha: Date = new Date();
  totalPedido: number = 0;
  detalle: DetallePedido = new DetallePedido();
  activo: boolean = false;
    

}