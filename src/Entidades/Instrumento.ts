
import Categorias from "./Categorias";
export default class Instrumento{

    id:number=0;
    instrumento:string = "";
    marca:string = "";
    modelo:string = "";
    imagen:string = "";
    precio:number= 0;
    costoEnvio: string ="";
    cantidadVendida: string ="";
    descripcion: string ="";
    cantidad:number = 1;
    categoria = new Categorias ();

}